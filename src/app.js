let express = require("express");
let cors = require("cors");
let bodyParse = require("body-parser");
let http = require('http');
let router = require("../src/routers/index").router;
let dbConnection = require('./loaders/mongoDB')
let dotenv = require('dotenv');

dotenv.config();

const startServer = async () => {
  try {
    let app = express();
    app.use(bodyParse());
    let server = http.Server(app);

    app.use(
      cors({
        origin: "*",
        credentials: true,
      })
    )

    await dbConnection.db()

    router(app);

    server.listen(process.env.PORT || 3003, () => {
      console.log("Connect to port", process.env.PORT);
    });

  } catch (err) {
    console.log(err);
  }
};

startServer();