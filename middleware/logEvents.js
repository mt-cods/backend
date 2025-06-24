const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const logEvents = async (message, fileName) => {
  const dateTime = format(new Date(), "dd::yyyy\tHH:mm:ss");
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    const logDir = path.join(__dirname, '..','logs');
    
    if (!fs.existsSync(logDir)) {
      await fsPromises.mkdir(logDir);
    }

    await fsPromises.appendFile(path.join(logDir, fileName), `${logItem}\n`);
  } catch (error) {
    console.error('Error writing to log file:', error);
  }
};

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    console.log(req.method,req.url);
    next();
};

module.exports = { logEvents, logger};
