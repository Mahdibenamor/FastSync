import 'package:fast_sync_client/fast_sync_client.dart';
import 'package:json_annotation/json_annotation.dart';
import 'package:uuid/uuid.dart';
part 'sync_metadata_model.g.dart';

@JsonSerializable(explicitToJson: true)
class SyncMetadataModel implements ISyncMetadata {
  @override
  String id = Uuid().v4();

  @override
  String? syncZone;

  @override
  String type = Constants.emptyString;

  @override
  num version = 0;

  @override
  num timestamp = DateTime.now().secondsSinceEpoch;

  @override
  int? syncOperation = 999;

  SyncMetadataModel();

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

  factory SyncMetadataModel.fromJson(Map<String, dynamic> json) =>
      _$SyncMetadataModelFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$SyncMetadataModelToJson(this);

  static const Function intoJson = _$SyncMetadataModelToJson;

  static String createTableCommand() {
    return '''
      CREATE TABLE IF NOT EXISTS SyncMetadataModel (
        id TEXT PRIMARY KEY,
        syncZone TEXT,
        type TEXT,
        version REAL,
        timestamp REAL,
        syncOperation INTEGER
      )
    ''';
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
