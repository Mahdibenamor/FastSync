// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'syncable_object_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

SyncableItemModel _$SyncableItemModelFromJson(Map<String, dynamic> json) =>
    SyncableItemModel(
      id: json['id'] as String,
      metadata:
          SyncMetadataModel.fromJson(json['metadata'] as Map<String, dynamic>),
      deleted: json['deleted'] as bool,
      syncOperation:
          $enumDecode(_$SyncOperationEnumEnumMap, json['syncOperation']),
    );

Map<String, dynamic> _$SyncableItemModelToJson(SyncableItemModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'deleted': instance.deleted,
      'syncOperation': _$SyncOperationEnumEnumMap[instance.syncOperation]!,
      'metadata': instance.metadata,
    };

const _$SyncOperationEnumEnumMap = {
  SyncOperationEnum.add: 'add',
  SyncOperationEnum.update: 'update',
  SyncOperationEnum.delete: 'delete',
};
