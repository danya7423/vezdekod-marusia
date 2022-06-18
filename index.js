const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
// const https = require('https');
const http = require('http');
const rateLimit = require('express-rate-limit')

const marusia = require("./routes/index.js");

// const ssl = require('./ssl/index')

// const app = express(ssl);

const app = express();

const limiter = rateLimit({
	windowMs: 1000,
	max: 10,
	standardHeaders: true,
	legacyHeaders: false,
    message: {
        error: 'Too much requests'
    }
})
// const server = https.createServer(ssl, app);

const server = http.createServer(app);

app.use(limiter)

app.use(
  bodyParser.urlencoded({
    limit: "50mb", 
    extended: true
  })
);

app.use(bodyParser.json({limit: "50mb"}));
app.use(cors())

app.use("/marusia", marusia);

const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`Server up and running on port ${port} !`));