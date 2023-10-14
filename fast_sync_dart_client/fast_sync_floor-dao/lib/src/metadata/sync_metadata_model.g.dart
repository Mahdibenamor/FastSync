// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'sync_metadata_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

SyncMetadataModel _$SyncMetadataModelFromJson(Map<String, dynamic> json) =>
    SyncMetadataModel(
      id: json['id'] as String,
      syncZone: json['syncZone'] as String,
      type: json['type'] as String,
      version: json['version'] as num,
      timestamp: json['timestamp'] as num,
      syncOperation:
          $enumDecode(_$SyncOperationEnumEnumMap, json['syncOperation']),
    );

Map<String, dynamic> _$SyncMetadataModelToJson(SyncMetadataModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'syncZone': instance.syncZone,
      'type': instance.type,
      'version': instance.version,
      'timestamp': instance.timestamp,
      'syncOperation': _$SyncOperationEnumEnumMap[instance.syncOperation]!,
    };

const _$SyncOperationEnumEnumMap = {
  SyncOperationEnum.add: 'add',
  SyncOperationEnum.update: 'update',
  SyncOperationEnum.delete: 'delete',
};
