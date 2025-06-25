const express = require('express');
const subDirRouter = express.Router();

const path = require('path');

// Route for / or /index or /index.html
subDirRouter.get(/^\/$|^\/index(\.html)?$/, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'index.html'));
});

// Route for /test or /test.html
subDirRouter.get(/^\/test(\.html)?$/, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'test.html'));
});

module.exports = subDirRouter;
