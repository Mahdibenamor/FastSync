// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'item.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Item _$ItemFromJson(Map<String, dynamic> json) => Item(
      name: json['name'] as String,
      description: json['description'] as String,
    )
      ..id = json['id'] as String
      ..deleted = SyncableItemModel.parseBool(json, 'deleted') as bool? ?? false
      ..dirty = SyncableItemModel.parseBool(json, 'dirty') as bool? ?? false
      ..metadataId =
          SyncableItemModel.readMetadataId(json, 'metadataId') as String
      ..metadata = const MetadataJsonConverter()
          .fromJson(json['metadata'] as Map<String, dynamic>?);

Map<String, dynamic> _$ItemToJson(Item instance) => <String, dynamic>{
      'id': instance.id,
      'deleted': instance.deleted,
      'dirty': instance.dirty,
      'metadataId': instance.metadataId,
      'metadata': const MetadataJsonConverter().toJson(instance.metadata),
      'name': instance.name,
      'description': instance.description,
    };
