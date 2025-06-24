const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;
const cors = require('cors');

const { logger } = require('./middleware/logEvents');

// Built-in middleware
app.use(express.urlencoded({ extended: false })); // Parses form data
app.use(express.json()); // Parses JSON
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files


// 3rd party middleware
const corsOptions = {
    origin: 'http://localhost:5173'
}
app.use(cors(corsOptions));

// Custom middleware
app.use(logger);

// Routes
app.get(/^\/$|\/index(\.html)?/, (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get(/^\/new-page(\.html)?/, (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get(/^\/old-page(\.html)?/, (req, res) => {
  res.redirect(301, '/new-page.html');
});

// Catch-all 404
app.get(/^.*$/, (req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
