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

  Future<void> pull() async {
    await syncManager.pull();
  }

  Future<void> sync() async {
    await syncManager.sync();
  }

  Future<void> push() async {
    await syncManager.push();
  }

  Future<void> hardReset() async {
    await syncManager.hardReset();
  }

  Future<Item> saveElement(Item item) async {
    item = await repository.add(item);
    return item;
  }

  Future<Item> updateElement(Item item) async {
    item = await repository.update(item);
    await getCount();
    return item;
  }

  Future<int> getCount() async {
    int count = await repository.count();
    return count;
  }

  Future<void> resetItemRepo() async {
    await repository.hardDelete();
  }
}
