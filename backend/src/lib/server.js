import cors from 'cors';
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import session from 'express-session';
import Route from '../route/index.js';
import errorHandler from 'errorhandler';

// Initializing APP
const app = express();
const router = express.Router();

// Fetching env Variable
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/debatorsclub";
const NODE_ENV = process.env.NODE_ENV;
const isProduction = NODE_ENV === "PRODUCTION" ? true : false;

// Setting mongoose Promise and Connection to mongodb
mongoose.promise = global.Promise;
mongoose.connect(MONGODB_URI);

// using MiddleWare
// bodyParser MiddleWare
app.use(bodyParser.json(), cors);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));





// Route MiddleWare
// app.use(Route);

app.all('*', (req, res) => {
  console.log('Returning a 404 from the catch-all route');
  return res.sendStatus(404);
});




// //error MiddleWare
app.use(errorHandler());

if(!isProduction) {
  app.use((err, req, res) => {
    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

app.use((err, req, res) => {
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});


export const start = () => {
  app.listen(PORT, () => {
    console.log(`listening on Port : ${PORT}`);
  })
}

export const stop = () => {
  app.close(PORT, () => {
    console.log(`shut down on port : ${PORT}`);
  });
}