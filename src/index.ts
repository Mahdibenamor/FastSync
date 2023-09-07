import { useExpressServer } from "routing-controllers";
import { SyncController } from "./implemetation/controllers/sync.controller";
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


var cors = require("cors");
app.use(bodyParser.json({ limit: "1000mb" }));
app.use(bodyParser.urlencoded({ limit: "1000mb", extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

useExpressServer(app, {
  routePrefix: "/express",
  cors: true,
  controllers: [
    SyncController,
  ],
  middlewares: [cors()],
});

mongoose
  .connect("mongodb://localhost:27017/deema", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

app.use(express.json());
app.use(cors());


app.listen(3000, () =>
  console.log(`listening on port ${3000}`)
);
