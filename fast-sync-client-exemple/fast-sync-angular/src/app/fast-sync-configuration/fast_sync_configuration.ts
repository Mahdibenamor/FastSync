import { FastSync, SyncZoneRestrictionEnum } from 'fast-sync-client';
import { MemorySyncConfiguration } from 'fast-sync-memory-dao';
import { HttpManager } from './http_manager';
import { ItemRepository } from '../item/item_repository';
import { Item } from '../item/item';

export function configureClientFastSync(itemSyncZone: string) {
  FastSync.getInstance(new MemorySyncConfiguration());

  FastSync.setHttpManager(new HttpManager());
  let itemRepository = new ItemRepository();
  FastSync.setTypeSyncZone(
    Item.name,
    SyncZoneRestrictionEnum.restricted,
    itemSyncZone
  );
  FastSync.setSyncableObject(
    Item.name,
    Item.createItem,
    itemRepository,
    SyncZoneRestrictionEnum.global
  );
}
