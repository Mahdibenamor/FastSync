import { Injectable } from '@angular/core';
import { Item } from '../item/item';
import { BehaviorSubject } from 'rxjs';
import { FastSync, SyncMetadata } from 'fast-sync-client';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  itemRepository = FastSync.getObjectRepository<Item>(Item.name);
  public itemsSubject: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>(
    []
  );
  constructor() {
    this.getAllLocal();
  }
  async getAllLocal() {
    let items = await this.itemRepository.getAll();
    this.itemsSubject.next(items);
    return items;
  }

  async addItem(item: Item) {
    await this.itemRepository.add(item);
    await this.getAllLocal();
  }

  async updateItem(item: Item) {
    await this.itemRepository.update(item);
    await this.getAllLocal();
  }

  async deleteItem(item: Item) {
    await this.itemRepository.removeMany([item], new SyncMetadata('', 9, ''));
    await this.getAllLocal();
  }

  async pull() {
    let syncManager = FastSync.getSyncManager();
    await syncManager.pull();
    await this.getAllLocal();
  }

  async push() {
    let syncManager = FastSync.getSyncManager();
    await syncManager.push();
    await this.getAllLocal();
  }
}
