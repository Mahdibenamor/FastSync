import 'package:fast_sync_client/fast_sync_client.dart';
import 'package:fast_sync_hive_dao/fast_sync_hive_dao.dart';
import 'package:hive/hive.dart';
import 'package:json_annotation/json_annotation.dart';
part 'syncable_object_model.g.dart';

@JsonSerializable()
class SyncableItemModel implements SyncableObject {
  @HiveField(249)
  @override
  final String id;

  @HiveField(250)
  @override
  bool deleted;

  @HiveField(251)
  @override
  final SyncMetadataModel metadata;

  @HiveField(252)
  bool dirty = false;

  SyncableItemModel(
      {required this.id, required this.metadata, required this.deleted});

  factory SyncableItemModel.fromJson(Map<String, dynamic> json) =>
      _$SyncableItemModelFromJson(json);

  static Map<String, dynamic> toJson(instance) =>
      _$SyncableItemModelToJson(instance);

  @override
  num? getVersion() {
    return metadata.version;
  }
}
