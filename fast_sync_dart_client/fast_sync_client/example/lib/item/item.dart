import 'package:fast_sync_floor_dao/fast_sync_floor_dao.dart';

class Item extends SyncableItemModel {
  final String name;
  final String description;
  Item(
      {required super.id,
      required super.metadata,
      required super.deleted,
      required super.syncOperation,
      required this.name,
      required this.description});

  static String createShema() {
    return SyncableItemModel.createSchema(
        tableName: "ItemTable", columns: 'name TEXT, description TEXT');
  }
}
