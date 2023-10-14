import 'package:fast_sync_client/fast_sync_client.dart';
import 'package:json_annotation/json_annotation.dart';

part 'sync_metadata_model.g.dart';

@JsonSerializable()
class SyncMetadataModel extends SyncMetadata {
  const SyncMetadataModel(
      {required String id,
      required String syncZone,
      required String type,
      required num version,
      required num timestamp,
      required SyncOperationEnum syncOperation})
      : super(
            id: id,
            syncZone: syncZone,
            type: type,
            version: version,
            timestamp: timestamp,
            syncOperation: syncOperation);

  factory SyncMetadataModel.fromJson(Map<String, dynamic> json) =>
      _$SyncMetadataModelFromJson(json);

  Map<String, dynamic> toJson() => _$SyncMetadataModelToJson(this);
}
