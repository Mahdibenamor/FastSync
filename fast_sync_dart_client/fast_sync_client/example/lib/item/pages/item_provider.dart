import 'package:example/item/item.dart';
import 'package:fast_sync_client/fast_sync_client.dart';
import 'package:flutter/material.dart';

class ItemProvider with ChangeNotifier {
  ItemProvider() {
    loadLocalItems();
  }
  List<Item> items = [];
  ISyncableRepository<Item> repository = FastSync.getObjectRepository<Item>();
  ISyncManager syncManager = FastSync.getSyncManager();

  Future<List<Item>> loadLocalItems() async {
    List<Item> localItems = await repository.getAll();
    await getCount();
    items = localItems;
    return localItems;
  }

  Future<void> pullItems() async {
    await syncManager.pull();
  }

  Future<void> push() async {
    await syncManager.push();
  }

  Future<Item> saveElement(Item item) async {
    await getCount();
    item = await repository.add(item);
    await getCount();
    return item;
  }

  Future<Item> updateElement(Item item) async {
    item = await repository.update(item);
    await getCount();
    return item;
  }

  Future<void> getCount() async {
    int count = await repository.count();
    int test = 1 + 1;
  }

  Future<void> resetItemRepo() async {
    await repository.hardDelete();
  }
}
