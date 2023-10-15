import 'package:fast_sync_floor_dao/fast_sync_floor_dao.dart';

class Item extends SyncableItemModel {
  Item(
      {required super.id,
      required super.metadata,
      required super.deleted,
      required super.syncOperation});
}
