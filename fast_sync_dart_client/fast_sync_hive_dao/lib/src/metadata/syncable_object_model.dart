import 'package:fast_sync_client/fast_sync_client.dart';
import 'package:fast_sync_hive_dao/fast_sync_hive_dao.dart';
import 'package:hive/hive.dart';
import 'package:json_annotation/json_annotation.dart';
part 'syncable_object_model.g.dart';

@JsonSerializable()
class SyncableItemModel extends SyncableObject {
  @HiveField(250)
  @override
  final String id;

  @HiveField(251)
  @override
  final bool deleted;

  @HiveField(253)
  @override
  final SyncMetadataModel metadata;

  const SyncableItemModel(
      {required this.id, required this.metadata, required this.deleted})
      : super(id: id, metadata: metadata, deleted: deleted);

  factory SyncableItemModel.fromJson(Map<String, dynamic> json) =>
      _$SyncableItemModelFromJson(json);

  Map<String, dynamic> toJson() => _$SyncableItemModelToJson(this);
}
