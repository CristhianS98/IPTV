import fs from "fs";
import path from "path";

export default function handler(req, res) {
  // Token por header o por query (?token=SAVIPE)
  const authHeader = req.headers.authorization;
  const tokenQuery = req.query.token;

  const validToken = process.env.API_TOKEN;

  if (
    (!authHeader || authHeader !== `Bearer ${validToken}`) &&
    tokenQuery !== validToken
  ) {
    return res.status(401).json({ error: "No autorizado 🚫" });
  }

  // Cargar la playlist
  const filePath = path.join(process.cwd(), "playlist.m3u");
  const playlist = fs.readFileSync(filePath, "utf8");

  res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
  res.status(200).send(playlist);
}
