import { SyncableObjectDataSource } from 'fast-sync-memory-dao';
import { Item } from './item';

export class ItemDataSource extends SyncableObjectDataSource<Item> {
  constructor() {
    super();
  }
}
