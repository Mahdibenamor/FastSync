import 'package:fast_sync_client/fast_sync_client.dart';
import 'package:fast_sync_sqflite_dao/fast_sync_sqflite_dao.dart';
import 'package:json_annotation/json_annotation.dart';
import 'package:uuid/uuid.dart';
part 'syncable_object_model.g.dart';

@JsonSerializable(explicitToJson: true)
class SyncableItemModel implements ISyncableObject {
  @override
  String id = Uuid().v4();

  @JsonKey(defaultValue: false, readValue: parseBool)
  @override
  bool deleted = false;

  @override
  @JsonKey(defaultValue: false, readValue: parseBool)
  bool dirty = false;

  @override
  @JsonKey(readValue: readMetadataId)
  String metadataId = Constants.emptyString;

  @MetadataJsonConverter()
  @override
  ISyncMetadata metadata = SyncMetadataModel();

  SyncableItemModel();

  @override
  num? getVersion() {
    return metadata.version;
  }

  factory SyncableItemModel.fromJson(Map<String, dynamic> json) =>
      _$SyncableItemModelFromJson(json);

  Map<String, dynamic> toJson() => _$SyncableItemModelToJson(this);

  static Function get intoJson => _$SyncableItemModelToJson;

  static String readMetadataId(Map map, String key) {
    if (map.containsKey('metadataId')) {
      return map['metadataId'];
    }
    if (map.containsKey('metadata')) {
      return map['metadata']['id'];
    }
    Constants.emptyString;
    return Constants.emptyString;
  }

  static bool parseBool(Map map, String key) {
    if (!map.containsKey(key)) {
      return false;
    }
    var value = map[key];
    if (value is bool) {
      return value;
    } else if (value is int) {
      return value == 1;
    } else if (value is String) {
      return value.toLowerCase() == 'true';
    }
    return false;
  }

  static String plugSyncMetadataObject<T>({List<String>? extraColumns}) {
    String baseColumns = '''
      id TEXT PRIMARY KEY,
      deleted BOOLEAN NOT NULL DEFAULT false,
      dirty BOOLEAN NOT NULL DEFAULT false,
      metadataId TEXT,
    ''';

    if (extraColumns != null && extraColumns.isNotEmpty) {
      baseColumns += extraColumns.join(", ");
    }

    String command = '''
      CREATE TABLE IF NOT EXISTS ${T.toString()} (
        $baseColumns
      )
    ''';
    return command;
  }
}
