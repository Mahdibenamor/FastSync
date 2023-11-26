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
    )..dirty = json['dirty'] as bool;

Map<String, dynamic> _$SyncableItemModelToJson(SyncableItemModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'deleted': instance.deleted,
      'metadata': instance.metadata.toJson(),
      'dirty': instance.dirty,
    };
