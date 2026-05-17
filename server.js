const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname)); // Serves index.html, style.css, app.js, etc.
app.use('/uploaded_images', express.static(path.join(__dirname, 'uploaded_images')));

// Ensure data and upload directories exist
if (!fs.existsSync('./data')) fs.mkdirSync('./data');
if (!fs.existsSync('./uploaded_images')) fs.mkdirSync('./uploaded_images');

// Configure Multer for processing local computer disk storage image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploaded_images/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage: storage });

// Helper functions to handle Flat File JSON exchanges
function readFlatFile(filename, defaultData = []) {
  const filePath = `./data/${filename}.json`;
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
    return defaultData;
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeFlatFile(filename, data) {
  fs.writeFileSync(`./data/${filename}.json`, JSON.stringify(data, null, 2));
}

// ENDPOINTS FOR FLAT FILE READ/WRITE DATA EXCHANGES
app.get('/api/data/:file', (req, res) => res.json(readFlatFile(req.params.file)));
app.post('/api/data/:file', (req, res) => {
  writeFlatFile(req.params.file, req.body);
  res.json({ success: true });
});

// IMAGE UPLOAD OVER LOCAL COMPUTER DISK ROUTE
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ url: `/uploaded_images/${req.file.filename}` });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));