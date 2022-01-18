require('dotenv').config({path: './config.env'});

const path = require('path');
const https = require('https');
const helmet = require('helmet');
const express = require('express');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');


// app & db config
const port = process.env.PORT;
const app = express();
connectDB();


// middleware
const corsOpts = {
  credentials: true,
  origin: ['https://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE']
};

const rateLimiter = rateLimit({
  windowMs: 600000, // 10 minutes
  max: 100 // 100 requests at max
});

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'", 'fonts.googleapis.com'],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    fontSrc: ["'self'", 'fonts.gstatic.com'],
    imgSrc: ["'self'", 'openweathermap.org'],
    connectSrc: ["'self'", 'api.ipify.org', 'ipv4.icanhazip.com', 'api.openweathermap.org']
  },
}));

app.use(cookieParser());
app.use(express.json());
app.use(mongoSanitize());
process.env.NODE_ENV !== 'production' && app.use(require('cors')(corsOpts));


// API routes
app.use('/api/v1', rateLimiter);
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/user', require('./routes/user'));
app.use('/api/v1/posts', require('./routes/posts'));


// On Heroku, serve the React client as a static file
app.use(express.static(path.join(__dirname, 'client', 'build')));
process.env.NODE_ENV === 'production' && app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')));


app.use(errorHandler); // needs to be last middleware


// server startup
if (process.env.NODE_ENV === 'production') {

  app.listen(port);

  process.on('unhandledRejection', (error, _) => {
    console.log('Logged Error: ' + error);
  });

} else {

  const cert = require('fs').readFileSync('cert.pem', 'utf8');
  const key  = require('fs').readFileSync('key.pem', 'utf8');
  const credentials = {key: key, cert: cert};

  const httpsServer = https.createServer(credentials, app);
  const server = httpsServer.listen(port, () => console.log('Listening on port ' + port));
  
  process.on('unhandledRejection', (error, _) => {
    console.log('Logged Error: ' + error);
    server.close(() => process.exit(1));
  });

}