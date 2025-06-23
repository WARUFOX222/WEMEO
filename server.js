
const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const upload = multer();

const app = express();
const port = process.env.PORT || 10000;

app.use('/streams', express.static(path.join(__dirname, 'streams')));
app.use('/overlays', express.static(path.join(__dirname, 'overlays')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/rooms.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/rooms.json'));
});

app.post('/upload', upload.single(), (req, res) => {
  const room = req.query.room;
  if (!room) return res.status(400).send("Missing room param");
  const streamPath = path.join(__dirname, 'streams', room);
  fs.writeFileSync(streamPath, req.body);
  res.end("ok");
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
