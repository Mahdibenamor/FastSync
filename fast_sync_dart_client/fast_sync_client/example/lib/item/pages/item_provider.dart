import 'package:example/item/item.dart';
import 'package:fast_sync_client/fast_sync_client.dart';
import 'package:fast_sync_hive_dao/fast_sync_hive_dao.dart';
import 'package:flutter/material.dart';
import 'package:uuid/uuid.dart';

class ItemProvider with ChangeNotifier {
  List<Item> items = [];
  ISyncableRepository<Item> repository = FastSync.getObjectRepository("Item");
  ISyncManager syncManager = FastSync.getSyncManager();

  Future<void> pullItems() async {}

  Future<void> push() async {
    SyncZoneTypeConfiguration syncZoneConfiguration =
        SyncZoneTypeConfiguration();
    syncZoneConfiguration.setTypeSyncZone('Item', 'Global');
    await syncManager.push(syncZoneConfiguration);
  }

  Future<Item> saveElement() async {
    SyncMetadataModel metadata = SyncMetadataModel(
        id: Uuid().v4(),
        syncOperation: SyncOperationEnum.add.code,
        syncZone: "user",
        timestamp: 1,
        type: 'Item',
        version: 1);
    Item item = Item(
        id: Uuid().v4(),
        metadata: metadata,
        deleted: false,
        name: 'name',
        description: 'description');
    return await repository.add(item);
  }

  Future<void> deleteElement(Item item) async {}
}
