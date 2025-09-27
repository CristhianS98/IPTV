// api/playlist.js
import fs from 'fs';
import path from 'path';

const SECRET = process.env.PLAYLIST_TOKEN || 'SAVIPE'; // tu token

export default function handler(req, res) {
  const token = req.query.token;
  if (!token || token !== SECRET) {
    return res.status(403).send('Forbidden - invalid token');
  }

  const filePath = path.resolve('.', 'playlist.m3u');
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    res.setHeader('Content-Type', 'audio/x-mpegurl');
    return res.status(200).send(content);
  } catch (err) {
    console.error('Error reading playlist:', err);
    return res.status(500).send('Internal Server Error');
  }
}
