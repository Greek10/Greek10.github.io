import express from "express";
import cors from "cors";
import { Client, GatewayIntentBits } from "discord.js";

const app = express();
app.use(cors());
app.use(express.json());

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.login(process.env.DISCORD_TOKEN);

// ---------------- API ROUTES ----------------

// Get all servers the bot is in
app.get("/guilds", () => {
  const guilds = client.guilds.cache.map(g => ({
    id: g.id,
    name: g.name
  }));
  return guilds;
});

// Get channels in a server
app.get("/channels/:guildId", async (req) => {
  const guild = await client.guilds.fetch(req.params.guildId);
  const channels = guild.channels.cache
    .filter(c => c.isTextBased())
    .map(c => ({
      id: c.id,
      name: c.name
    }));

  return channels;
});

// Get last 100 messages
app.get("/messages/:channelId", async (req) => {
  const channel = await client.channels.fetch(req.params.channelId);
  const messages = await channel.messages.fetch({ limit: 100 });

  return messages.map(m => ({
    author: m.author.username,
    content: m.content,
    timestamp: m.createdAt
  })).reverse();
});

app.listen(3000, () => {
  console.log("API running on http://localhost:3000");
});