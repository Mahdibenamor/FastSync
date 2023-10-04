import 'reflect-metadata';

import { useExpressServer } from "routing-controllers";
import { ConflictsHandler } from "fast-sync-core";
import { ConflictsResolutionStrategyEnum } from "fast-sync-core";
import { IConflictsHandler } from "fast-sync-core";
import { ISyncableObject } from "fast-sync-core";
import { FastSync } from "fast-sync-core";
import { MongooseSyncConfiguration } from "fast-sync-mongoose-dao";
import { ItemRepository } from "./item_repository";
import { Item } from "./item";
import { SyncController } from "./sync.controller";
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
  let fastSync : FastSync = FastSync.getInstance(new MongooseSyncConfiguration());
  let conflictsHandler: IConflictsHandler = new  ConflictsHandler(ConflictsResolutionStrategyEnum.PredefinedRules, conflictsResolutionFunction)
  let repo =  new ItemRepository();
  await fastSync.setSyncalbeObject(Item.name, repo , conflictsHandler);

}


async function conflictsResolutionFunction (oldObject: Item, newObject: Item): Promise<ISyncableObject>{
  newObject.name = 'from conflicts resolving function'
  return newObject;
}
