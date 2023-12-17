import 'package:fast_sync_sqflite_dao/fast_sync_sqflite_dao.dart';
import 'package:json_annotation/json_annotation.dart';
part 'item.g.dart';

@JsonSerializable(explicitToJson: true)
class Item extends SyncableItemModel {
  String name;

  String description;

  Item({required this.name, required this.description});

  @override
  factory Item.fromJson(Map<String, dynamic> json) => _$ItemFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$ItemToJson(this);

  static Function get intoJson => _$ItemToJson;

  static String get createTableCommand {
    return SyncableItemModel.plugSyncMetadataObject<Item>(
        extraColumns: ["name TEXT", "description TEXT"]);
  }
}
