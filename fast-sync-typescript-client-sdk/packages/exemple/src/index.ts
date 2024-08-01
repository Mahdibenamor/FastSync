import { FastSync, SyncZoneRestrictionEnum } from "fast-sync-client";
import { MemorySyncConfiguration } from "fast-sync-memory-dao";
import { ItemRepository } from "./item/item_repository";
import { Item } from "./item/item";
import { HttpManager } from "./http/http_manager";

async function main() {
  await configureFastSync();
  let syncManager = FastSync.getSyncManager();
  let payload = await syncManager.pull();
  let repository = FastSync.getObjectRepository<Item>(Item.name);
  let localItems = await repository.getAll();
  localItems.forEach((element) => {
    console.log(element);
  });

  // save and push element
  let itemToSave = new Item();
  itemToSave.name = "Item2";
  itemToSave.description = "Item2";
  await repository.add(itemToSave);
  payload = await syncManager.push();

  // // pull elements
  // payload = await syncManager.pull();
  // localItems = await repository.getAll();
  // localItems.forEach((element) => {
  //   console.log(element);
  // });
}
async function configureFastSync() {
  FastSync.getInstance(new MemorySyncConfiguration());
  FastSync.setTypeSyncZone(Item.name, SyncZoneRestrictionEnum.global);
  FastSync.setHttpManager(new HttpManager());
  let itemRepository = new ItemRepository();
  await FastSync.setSyncableObject(
    Item.name,
    itemRepository,
    SyncZoneRestrictionEnum.global
  );
}

main().catch((error) => console.error("Error in main function:", error));
