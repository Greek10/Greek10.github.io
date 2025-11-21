# Uploading `test.html` to GitHub

Follow these steps from the repository root to push the updated `test.html` (the full game overlay code) to your GitHub repository.

1. **Make sure the file is present**
   ```bash
   ls test.html
   ```
   If the file exists, you already have the complete version. You can inspect it with:
   ```bash
   sed -n '1,160p' test.html   # repeat with higher ranges to view the rest
   ```
2. **Stage the change**
   ```bash
   git add test.html
   ```
3. **Commit**
   ```bash
   git commit -m "Add updated test.html"
   ```
4. **Push to GitHub**
   ```bash
   git push origin <your-branch-name>
   ```
   Replace `<your-branch-name>` with `main`, `master`, or whichever branch you are using.

Once pushed, the complete code will be available on GitHub. You can open `test.html` in the GitHub UI to copy or download the file as needed.
