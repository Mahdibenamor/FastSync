// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'syncable_object_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

SyncableItemModel _$SyncableItemModelFromJson(Map<String, dynamic> json) =>
    SyncableItemModel()
      ..id = json['id'] as String
      ..deleted = SyncableItemModel.parseBool(json, 'deleted') as bool? ?? false
      ..dirty = SyncableItemModel.parseBool(json, 'dirty') as bool? ?? false
      ..metadataId =
          SyncableItemModel.readMetadataId(json, 'metadataId') as String
      ..metadata = const MetadataJsonConverter()
          .fromJson(json['metadata'] as Map<String, dynamic>?);

Map<String, dynamic> _$SyncableItemModelToJson(SyncableItemModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'deleted': instance.deleted,
      'dirty': instance.dirty,
      'metadataId': instance.metadataId,
      'metadata': const MetadataJsonConverter().toJson(instance.metadata),
    };
