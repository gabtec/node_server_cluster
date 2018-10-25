const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enable CORS for all origins (must be before routes; before return any response)
app.use(cors());

// router handler modules
const UsersRoutes = require('./api/users/users.routes');

// ROUTES
app.use('/api/v1/users', UsersRoutes);

// ERROR handling:
// when none of the above routes match request, this is the default error response
app.use((req, res, next) => {
  const error = new Error('Not found!');
  error.status = 404;
  next(error); // forwards the error, not the original req
});

// System errors
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
      statusCode: error.status || 500
    },
  });
});

module.exports = app;
