import { SyncableObject } from 'fast-sync-client';

export class Item extends SyncableObject {
  constructor(public name: string = '', public description: string = '') {
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
