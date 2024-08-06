import { Component } from '@angular/core';
import { FastSync } from 'fast-sync-client';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/item/item';
import { ItemService } from 'src/app/service/item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent {
  private itemSubscription: Subscription = new Subscription();
  public items: Item[] = [];
  newItem: { name: string; description: string } = {
    name: '',
    description: '',
  };
  editItemId: string | null = null;
  editItem: Item = new Item();

  constructor(private itemService: ItemService) {
    this.loadItems();
  }

  loadItems(): void {
    this.itemSubscription = this.itemService.itemsSubject.subscribe(
      (items: Item[]) => {
        this.items = items;
      }
    );
  }

  async addItem() {
    if (this.newItem.name.trim() && this.newItem.description.trim()) {
      this.itemService.addItem(
        new Item(this.newItem.name.trim(), this.newItem.description.trim())
      );
    }
  }

  editItemDetails(item: Item): void {
    this.editItemId = item.id;
    this.editItem = item;
  }

  updateItem(): void {
    if (
      this.editItemId !== null &&
      this.editItem.name.trim() &&
      this.editItem.description.trim()
    ) {
      this.itemService.updateItem(this.editItem);
      this.editItemId = null;
      this.editItem = new Item();
    }
  }

  deleteItem(item: Item): void {
    this.itemService.deleteItem(item);
  }

  cancelEdit(): void {
    this.editItemId = null;
    this.editItem = new Item();
  }

  async pull() {
    await this.itemService.pull();
  }

  async push() {
    await this.itemService.push();
  }

  async hardreset() {
    await this.itemService.hardreset();
  }

  async sync() {
    await this.itemService.sync();
  }
}
