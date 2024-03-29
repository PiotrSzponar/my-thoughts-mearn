const AppError = require('../utils/appError');

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = err => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `${value} is already taken. Please use a different value.`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleValidationError = err => {
  const message = `${err.errors.join('\n')}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Invalid access. Please try again!', 401);

const handleJWTExpiredError = () =>
  new AppError('Your access has expired! Please try again.', 401);

const handleMulterCountFiles = () =>
  new AppError('You want to upload too many files.', 401);

const handleMulterLimitSize = () =>
  new AppError('Files you want to upload are too large.', 401);

// Send full error message to developers
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

// Trusted or general error to client (production)
const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    // Programming or other unknown error: don't leak error details
    console.error('ERROR!', err);
    // Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!'
    });
  }
};

// Check the env and choose error message you wand to send
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (err.name === 'CastError') error = handleCastErrorDB(error);
    if (err.code === 11000) error = handleDuplicateFieldsDB(error);
    if (err.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (err.statusCode === 422) error = handleValidationError(error);
    if (err.name === 'JsonWebTokenError') error = handleJWTError();
    if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();
    if (err.code === 'LIMIT_UNEXPECTED_FILE') error = handleMulterCountFiles();
    if (err.code === 'LIMIT_FILE_SIZE') error = handleMulterLimitSize();

    sendErrorProd(error, res);
  }
};
