import 'package:fast_sync_client/fast_sync_client.dart';
import 'package:fast_sync_hive_dao/fast_sync_hive_dao.dart';
import 'package:hive/hive.dart';
import 'package:json_annotation/json_annotation.dart';
import 'package:uuid/uuid.dart';
part 'syncable_object_model.g.dart';

@JsonSerializable(explicitToJson: true)
class SyncableItemModel implements SyncableObject {
  @HiveField(249)
  @override
  String id = Uuid().v4();

  @JsonKey(defaultValue: false)
  @HiveField(250)
  @override
  bool deleted = false;

  @override
  @JsonKey(defaultValue: false)
  bool dirty = false;

  @override
  late String metadataId;

  @HiveField(251)
  @override
  SyncMetadataModel metadata = SyncMetadataModel();

  SyncableItemModel();

  factory SyncableItemModel.fromJson(Map<String, dynamic> json) =>
      _$SyncableItemModelFromJson(json);

  Map<String, dynamic> toJson() => _$SyncableItemModelToJson(this);

  static Function get intoJson => _$SyncableItemModelToJson;

  @override
  num? getVersion() {
    return metadata.version;
  }
}
