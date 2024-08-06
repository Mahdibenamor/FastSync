import { SyncableObject } from "fast-sync-client";

export class Item extends SyncableObject {
  public name: string;
  public description: string;
  constructor() {
    super();
  }

  static createItem(object: Item): Item {
    let item = new Item();
    SyncableObject.create(object, item);
    item.name = object.name;
    item.description = object.description;
    return item;
  }
}
