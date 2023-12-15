import 'package:fast_sync_client/fast_sync_client.dart';
import 'package:fast_sync_sqflite_dao/fast_sync_sqflite_dao.dart';
import 'package:json_annotation/json_annotation.dart';
import 'package:uuid/uuid.dart';
part 'syncable_object_model.g.dart';

@JsonSerializable(explicitToJson: true)
class SyncableItemModel implements SyncableObject {
  @override
  String id = Uuid().v4();

  @JsonKey(defaultValue: false)
  @override
  bool deleted = false;

  @override
  @JsonKey(defaultValue: false)
  bool dirty = false;

  @JsonKey(readValue: readMetadataId)
  late final String metadataId;

  @override
  SyncMetadataModel metadata = SyncMetadataModel();

  SyncableItemModel();

  @override
  num? getVersion() {
    return metadata.version;
  }

  factory SyncableItemModel.fromJson(Map<String, dynamic> json) =>
      _$SyncableItemModelFromJson(json);

  Map<String, dynamic> toJson() => _$SyncableItemModelToJson(this);

  static Function get intoJson => _$SyncableItemModelToJson;

  static String readMetadataId(Map map, String key) => map['metadata']['id'];

  static String plugSyncMetadataObject<T>({List<String>? extraColumns}) {
    String baseColumns = '''
      id TEXT PRIMARY KEY,
      deleted BOOLEAN NOT NULL DEFAULT false,
      dirty BOOLEAN NOT NULL DEFAULT false,
      metadataId TEXT,
    ''';

    if (extraColumns != null && extraColumns.isNotEmpty) {
      baseColumns += "${extraColumns.join(", ")}";
    }

    String command = '''
      CREATE TABLE IF NOT EXISTS ${T.toString()} (
        $baseColumns
      )
    ''';
    return command;
  }
}
