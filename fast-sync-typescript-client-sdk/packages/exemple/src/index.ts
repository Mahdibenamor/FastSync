import { FastSync, SyncZoneRestrictionEnum } from "fast-sync-client";
import { MemorySyncConfiguration } from "fast-sync-memory-dao";
import { ItemRepository } from "./item/item_repository";
import { Item } from "./item/item";
import { HttpManager } from "./http/http_manager";

async function main() {
  await configureFastSync();
  let syncManager = FastSync.getSyncManager();
  await syncManager.pull();
  let repository = FastSync.getObjectRepository<Item>(Item.name);
  let localItems = await repository.getAll();
  localItems.forEach((element) => {
    console.log(element);
  });

  // reset the local database
  repository.hardDelete();
  localItems = await repository.getAll();
  localItems.forEach((element) => {
    console.log(element);
  });
  await syncManager.pull();
  localItems = await repository.getAll();
  localItems.forEach((element) => {
    console.log(element);
  });

  // hard reset the local database
  await syncManager.hardReset([Item]);
  localItems = await repository.getAll();
  localItems.forEach((element) => {
    console.log(element);
  });

  // save and push element
  let itemToSave = new Item();
  itemToSave.name = "Item sync";
  itemToSave.description = "Item3 sync";
  await repository.add(itemToSave);
  await syncManager.sync();

  // let itemToSave1 = new Item();
  // itemToSave1.name = "Item4";
  // itemToSave1.description = "Item4";
  // await repository.add(itemToSave1);
  // payload = await syncManager.push();
  // payload = await syncManager.pull();

  // localItems = await repository.getAll();
  // let elementToRemove = localItems.filter((e) => (e.name = "Item3"))[0];
  // await repository.remove(elementToRemove);
  // await syncManager.push();
  // await syncManager.pull();
}
async function configureFastSync() {
  FastSync.getInstance(new MemorySyncConfiguration());
  FastSync.setTypeSyncZone(
    Item.name,
    SyncZoneRestrictionEnum.restricted,
    "user"
  );
  FastSync.setHttpManager(new HttpManager());
  let itemRepository = new ItemRepository();
  await FastSync.setSyncableObject(
    Item.name,
    Item.createItem,
    itemRepository,
    SyncZoneRestrictionEnum.global
  );
}

main().catch((error) => console.error("Error in main function:", error));
