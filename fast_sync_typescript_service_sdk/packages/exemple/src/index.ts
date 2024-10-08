import "reflect-metadata";
import {
  ConflictsHandler,
  ConflictsResolutionStrategyEnum,
  FastSync,
  IConflictsHandler,
  ISyncableObject,
  SyncOperationEnum,
  SyncZoneRestrictionEnum,
} from "fast-sync-core";
import { MongooseSyncConfiguration } from "fast-sync-mongoose-dao";
import { useExpressServer } from "routing-controllers";
import { Item } from "./item";
import { ItemRepository } from "./item_repository";
import { SyncController } from "./sync.controller";
import * as mongoose from "mongoose";
const express = require("express");
const app = express();

useExpressServer(app, {
  routePrefix: "/express",
  cors: true,
  controllers: [SyncController],
  middlewares: [],
});

const uri = "mongodb://localhost:27017/sync";
//const uri = "mongodb+srv://FastSync:FastSyncForAll@fastsync.6o4fi9y.mongodb.net/sync?retryWrites=true&w=majority";

mongoose.connect(uri);

app.use(express.json());
const port = process.env.PORT || 3000;
app.listen(port, async () => {
  console.log(`listening on port ${port}`);
  try {
    await configureFastSync();
    console.log("Configuration completed successfully");
  } catch (error) {
    console.error("Error configuring Fast Sync:", error);
  }
});

async function configureFastSync() {
  let fastSync: FastSync = FastSync.getInstance(
    new MongooseSyncConfiguration()
  );
  let conflictsHandler: IConflictsHandler = new ConflictsHandler(
    ConflictsResolutionStrategyEnum.LastWriterWins,
    conflictsResolutionFunction
  );
  let repo = new ItemRepository();
  await fastSync.setSyncalbeObject(
    Item.name,
    repo,
    conflictsHandler,
    SyncZoneRestrictionEnum.restricted
  );
}

async function conflictsResolutionFunction(
  oldObject: Item,
  newObject: Item
): Promise<ISyncableObject> {
  newObject.name = "from conflicts resolving function";
  return newObject;
}
