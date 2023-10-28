import 'package:fast_sync_client/fast_sync_client.dart';
import 'package:fast_sync_hive_dao/fast_sync_hive_dao.dart';
import 'package:json_annotation/json_annotation.dart';
part 'item.g.dart';

@JsonSerializable()
class Item extends SyncableItemModel {
  String name;
  String description;
  Item(
      {required super.id,
      required super.metadata,
      required super.deleted,
      required super.syncOperation,
      required this.name,
      required this.description});

  @override
  factory Item.fromJson(Map<String, dynamic> json) => _$ItemFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$ItemToJson(this);

  static String createShema() {
    return SyncableItemModel.createSchema(
        tableName: tableName, columns: 'name TEXT, description TEXT');
  }

  static String get tableName => "ItemTable";
}
