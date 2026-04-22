import compression from "compression";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, "dist");
const indexFile = path.join(distDir, "index.html");

const app = express();
const port = Number(process.env.PORT || 3000);

app.use(compression());
app.use(express.static(distDir, { extensions: ["html"] }));

app.get("*", (req, res, next) => {
  if (path.extname(req.path)) {
    next();
    return;
  }

  res.sendFile(indexFile);
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Render server running on port ${port}`);
});