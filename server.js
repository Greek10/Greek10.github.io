import "dotenv/config";
import express from "express";
import cors from "cors";
import { Client, GatewayIntentBits, ChannelType } from "discord.js";

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

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN);

// ---------- ROUTES ----------

// Servers
app.get("/guilds", (req, res) => {
  if (!client.isReady()) return res.json([]);

  const guilds = client.guilds.cache.map(g => ({
    id: g.id,
    name: g.name
  }));

  res.json(guilds);
});

// Channels
app.get("/channels/:guildId", async (req, res) => {
  try {
    const guild = await client.guilds.fetch(req.params.guildId);
    await guild.channels.fetch();

    const channels = guild.channels.cache
      .filter(c => c.type === ChannelType.GuildText)
      .map(c => ({
        id: c.id,
        name: c.name
      }));

    res.json(channels);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Messages
app.get("/messages/:channelId", async (req, res) => {
  try {
    const channel = await client.channels.fetch(req.params.channelId);
    const messages = await channel.messages.fetch({ limit: 100 });

    res.json(
      messages
        .map(m => ({
          author: m.author.username,
          content: m.content,
          timestamp: m.createdTimestamp
        }))
        .reverse()
    );
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(3000, () => {
  console.log("API running on http://localhost:3000");
});