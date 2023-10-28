// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'item.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Item _$ItemFromJson(Map<String, dynamic> json) => Item(
      id: json['id'] as String,
      metadata:
          SyncMetadataModel.fromJson(json['metadata'] as Map<String, dynamic>),
      deleted: json['deleted'] as bool,
      syncOperation:
          $enumDecode(_$SyncOperationEnumEnumMap, json['syncOperation']),
      name: json['name'] as String,
      description: json['description'] as String,
    );

Map<String, dynamic> _$ItemToJson(Item instance) => <String, dynamic>{
      'id': instance.id,
      'deleted': instance.deleted,
      'syncOperation': _$SyncOperationEnumEnumMap[instance.syncOperation]!,
      'metadata': instance.metadata,
      'name': instance.name,
      'description': instance.description,
    };

const _$SyncOperationEnumEnumMap = {
  SyncOperationEnum.add: 'add',
  SyncOperationEnum.update: 'update',
  SyncOperationEnum.delete: 'delete',
};
