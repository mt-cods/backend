const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;
const cors = require('cors');
const cookieParser = require('cookie-parser');

const verifyJWT = require('./middleware/verifyJWT.js');

const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errHandler.js');

const homeRouter = require('./routes/homeRouter.js');
const subDirRouter = require('./routes/subdir.js');
const employeeRouter = require('./routes/api/employeeRouter.js');

const registerRouter = require('./routes/registerRouter.js');
const authRouter = require('./routes/authRouter.js');
const refreshRouter = require('./routes/refreshRouter');
const logoutRouter = require('./routes/logoutRouter');

// Built-in middleware
app.use(express.urlencoded({ extended: false })); // Parses form data
app.use(express.json()); // Parses JSON
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files


// 3rd party middleware
const corsOptions = require('./config/corsOptions.js');
app.use(cors(corsOptions));
app.use(cookieParser())

// Custom middleware
app.use(logger);
app.use(require('./middleware/credentials.js'));

// Routes
app.use('/logout', logoutRouter);
app.use('/refresh', refreshRouter);
app.use('/auth', authRouter);
app.use('/register', registerRouter);
app.use('/subdir', subDirRouter);
app.use('/', homeRouter);
// API routes
app.use('/api/employee', verifyJWT, employeeRouter);

app.use(errorHandler);
// Catch-all 404
app.all(/^.*$/, (req, res) => {
    res.status(404);
  if (req.accepts('html')) {
      res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
      res.json({ error: '404 Not Found' });
  } else {
      res.type('txt').send('404 Not Found');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
