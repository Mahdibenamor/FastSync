// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'syncable_object_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

SyncableItemModel _$SyncableItemModelFromJson(Map<String, dynamic> json) =>
    SyncableItemModel()
      ..id = json['id'] as String
      ..deleted = json['deleted'] as bool? ?? false
      ..dirty = json['dirty'] as bool? ?? false
      ..metadata =
          SyncMetadataModel.fromJson(json['metadata'] as Map<String, dynamic>);

Map<String, dynamic> _$SyncableItemModelToJson(SyncableItemModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'deleted': instance.deleted,
      'dirty': instance.dirty,
      'metadata': instance.metadata.toJson(),
    };
