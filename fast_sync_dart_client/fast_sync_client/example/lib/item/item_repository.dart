import 'package:example/item/item.dart';
import 'package:fast_sync_client/fast_sync_client.dart';

class ItemRepository extends SyncalbeRepository<Item> {
  ItemRepository({required super.dataSource});
}
