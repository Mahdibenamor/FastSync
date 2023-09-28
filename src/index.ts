import 'reflect-metadata';
import { useExpressServer } from "routing-controllers";
import { SyncController } from "./exemple/sync.controller";
import Container from "typedi";
import {SyncConfiguration} from "./core/implementation/service/sync_config";
import { Item } from "./exemple/item";
import { ItemDataSource } from './exemple/item_datasource';
import { ConflictsHandler } from './core/implementation/service/Conflicts_handler';
import { ConflictsResolutionStrategyEnum } from './core/abstraction/service/conflicts_resolution_strategie';
import { IConflictsHandler } from './core/abstraction/service/IConflicts_handler';
import { ISyncableObject } from './core/abstraction/metadata/ISyncable_object';
import { SyncMetadataDataSource } from './mongoose-dao/data/sync_metadata_datasource';
import { ItemRepository } from './exemple/item_repository';
import { FastSync } from './core/implementation/fast_sync';
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
  let fastSync : FastSync = FastSync.getInstance(new SyncConfiguration());
  let conflictsHandler: IConflictsHandler = new  ConflictsHandler(ConflictsResolutionStrategyEnum.PredefinedRules, conflictsResolutionFunction)
  await fastSync.SetSyncalbeObject(Item, new ItemRepository(), conflictsHandler);
}


async function conflictsResolutionFunction (oldObject: Item, newObject: Item): Promise<ISyncableObject>{
  newObject.name = 'from conflicts resolving function'
  return newObject;
}
