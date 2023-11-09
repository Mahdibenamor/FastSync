import 'package:example/item/item.dart';
import 'package:fast_sync_client/fast_sync_client.dart';
import 'package:flutter/material.dart';

class ItemProvider with ChangeNotifier {
  List<Item> items = [];

  Future<void> pullItems() async {
    ISyncManager syncManager = FastSync.getSyncManager();
  }

  Future<void> push() async {
    ISyncManager syncManager = FastSync.getSyncManager();
    await syncManager.push();
  }
}
