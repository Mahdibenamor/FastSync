import 'package:example/item/item.dart';
import 'package:fast_sync_floor_dao/fast_sync_floor_dao.dart';

class ItemDataSource extends SyncalbeObjectDataSource<Item> {
  ItemDataSource({required super.tableName, required super.fromJson});
}
