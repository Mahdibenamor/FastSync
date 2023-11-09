import 'package:fast_sync_client/fast_sync_client.dart';
import 'package:hive/hive.dart';
import 'package:json_annotation/json_annotation.dart';
part 'sync_metadata_model.g.dart';

@HiveType(typeId: 223, adapterName: "MetaDataAdapter")
@JsonSerializable()
class SyncMetadataModel implements SyncMetadata {
  @override
  @HiveField(240)
  String id;

  @override
  @HiveField(241)
  String? syncZone;

  @override
  @HiveField(242)
  final String type;

  @override
  @HiveField(243)
  num? version;

  @override
  @HiveField(244)
  num timestamp;

  @override
  @HiveField(255)
  int? syncOperation;

  SyncMetadataModel(
      {required this.id,
      required this.syncZone,
      required this.type,
      required this.version,
      required this.timestamp,
      required this.syncOperation});

  factory SyncMetadataModel.fromJson(Map<String, dynamic> json) =>
      _$SyncMetadataModelFromJson(json);

  static Map<String, dynamic> toJson(instance) =>
      _$SyncMetadataModelToJson(instance);

  @override
  String computeSyncZone(SyncZoneRestrictionEnum syncZoneRestrictionType) {
    if (syncZoneRestrictionType == SyncZoneRestrictionEnum.restricted) {
      return syncZone!;
    } else {
      return Constants.globalSyncZoneRestriction;
    }
  }

  @override
  String? getSyncZone() {
    return syncZone;
  }
}
