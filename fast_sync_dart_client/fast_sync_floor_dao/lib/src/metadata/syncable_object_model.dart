import 'package:fast_sync_client/fast_sync_client.dart';
import 'package:fast_sync_floor_dao/fast_sync_floor_dao.dart';
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

  static String createSchema({
    required String tableName,
    required String columns,
  }) {
    return ('''
      CREATE TABLE IF NOT EXISTS $tableName (
        id TEXT PRIMARY KEY,
        metadata TEXT,
        type TEXT,
        version REAL,
        timestamp REAL,
        syncOperation INTEGER,
        $columns
      )
    ''');
  }
}
