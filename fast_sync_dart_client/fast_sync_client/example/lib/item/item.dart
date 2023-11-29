import 'package:fast_sync_hive_dao/fast_sync_hive_dao.dart';
import 'package:hive/hive.dart';
import 'package:json_annotation/json_annotation.dart';
part 'item.g.dart';

@HiveType(typeId: 1, adapterName: "ItemAdapter")
@JsonSerializable(explicitToJson: true)
class Item extends SyncableItemModel {
  @HiveField(1)
  String name;

  @HiveField(2)
  String description;

  Item(
      {required super.id,
      required super.metadata,
      required super.deleted,
      required this.name,
      required this.description});

  @override
  factory Item.fromJson(Map<String, dynamic> json) => _$ItemFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$ItemToJson(this);

  static Function get intoJson => _$ItemToJson;
}
