import 'package:fast_sync_client/fast_sync_client.dart';
import 'package:hive/hive.dart';
import 'package:json_annotation/json_annotation.dart';
import 'package:uuid/uuid.dart';
part 'sync_metadata_model.g.dart';

@HiveType(typeId: 223, adapterName: "MetaDataAdapter")
@JsonSerializable(explicitToJson: true)
class SyncMetadataModel implements ISyncMetadata {
  @override
  @HiveField(240)
  String id = Uuid().v4();

  @override
  @HiveField(241)
  String? syncZone;

  @override
  @HiveField(242)
  String type = Constants.emptyString;

  @override
  @HiveField(243)
  num version = 0;

  @override
  @HiveField(244)
  num timestamp = DateTime.now().secondsSinceEpoch;

  @override
  @HiveField(255)
  int? syncOperation = 999;

  SyncMetadataModel();

  factory SyncMetadataModel.fromJson(Map<String, dynamic> json) =>
      _$SyncMetadataModelFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$SyncMetadataModelToJson(this);

  static const Function intoJson = _$SyncMetadataModelToJson;

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

class MetadataJsonConverter
    extends JsonConverter<ISyncMetadata, Map<String, dynamic>?> {
  const MetadataJsonConverter();

  @override
  ISyncMetadata fromJson(Map<String, dynamic>? json) {
    if (json != null) return SyncMetadataModel.fromJson(json);
    return SyncMetadataModel();
  }

  @override
  Map<String, dynamic> toJson(ISyncMetadata object) {
    return object.toJson();
  }
}
