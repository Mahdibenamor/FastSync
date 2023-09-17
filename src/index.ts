import 'reflect-metadata';
import { useExpressServer } from "routing-controllers";
import { SyncController } from "./exemple/sync.controller";
import Container from "typedi";
import {SyncConfiguration} from "./implemetation/services/sync_config";
import { Item } from "./exemple/item";
import { ItemDataSource } from './exemple/item_datasource';
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
  .connect("mongodb://localhost:27017/sync", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

app.use(express.json());
app.use(cors());


app.listen(3000, async() => {  
  console.log(`listening on port ${3000}`);

  try {
    await configureFastSync();
    console.log("Configuration completed successfully");
  } catch (error) {
    console.error("Error configuring Fast Sync:", error);
  }

});

async function configureFastSync(){
  let syncConfiguration  =  Container.get(SyncConfiguration);
  await syncConfiguration.SetSyncalbeObject(Item, new ItemDataSource());
}
