import 'reflect-metadata';
import { ConflictsHandler, ConflictsResolutionStrategyEnum, FastSync, IConflictsHandler, ISyncableObject } from "fast-sync-core";
import { MongooseSyncConfiguration } from "fast-sync-mongoose-dao";
import { useExpressServer } from "routing-controllers";
import { Item } from './item';
import { ItemRepository } from './item_repository';
import { SyncController } from './sync.controller';
import * as mongoose from 'mongoose';

const express = require("express");
const app = express();

useExpressServer(app, { 
  routePrefix: "/express",
  cors: true,
  controllers: [
    SyncController,
  ],
  middlewares: [],
});


mongoose.connect("mongodb://localhost:27017/sync");
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
