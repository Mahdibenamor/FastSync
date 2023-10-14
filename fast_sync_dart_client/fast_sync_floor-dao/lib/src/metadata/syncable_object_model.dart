import 'package:fast_sync_client/fast_sync_client.dart';
import 'package:fast_sync_floor_dao/src/metadata/sync_metadata_model.dart';
import 'package:json_annotation/json_annotation.dart';
part 'syncable_object_model.g.dart';

@JsonSerializable()
class SyncableItemModel extends SyncableObject {
  @override
  final SyncMetadataModel metadata;

  const SyncableItemModel(
      {required String id,
      required this.metadata,
      required bool deleted,
      required SyncOperationEnum syncOperation})
      : super(
            id: id,
            metadata: metadata,
            deleted: deleted,
            syncOperation: syncOperation);

  factory SyncableItemModel.fromJson(Map<String, dynamic> json) =>
      _$SyncableItemModelFromJson(json);

  Map<String, dynamic> toJson() => _$SyncableItemModelToJson(this);
}
