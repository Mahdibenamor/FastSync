// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'item.dart';

// **************************************************************************
// TypeAdapterGenerator
// **************************************************************************

class ItemAdapter extends TypeAdapter<Item> {
  @override
  final int typeId = 1;

  @override
  Item read(BinaryReader reader) {
    final numOfFields = reader.readByte();
    final fields = <int, dynamic>{
      for (int i = 0; i < numOfFields; i++) reader.readByte(): reader.read(),
    };
    return Item(
      id: fields[249] as String,
      metadata: fields[251] as SyncMetadataModel,
      deleted: fields[250] as bool,
      name: fields[1] as String,
      description: fields[2] as String,
    )..dirty = fields[252] as bool;
  }

  @override
  void write(BinaryWriter writer, Item obj) {
    writer
      ..writeByte(6)
      ..writeByte(1)
      ..write(obj.name)
      ..writeByte(2)
      ..write(obj.description)
      ..writeByte(249)
      ..write(obj.id)
      ..writeByte(250)
      ..write(obj.deleted)
      ..writeByte(251)
      ..write(obj.metadata)
      ..writeByte(252)
      ..write(obj.dirty);
  }

  @override
  int get hashCode => typeId.hashCode;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is ItemAdapter &&
          runtimeType == other.runtimeType &&
          typeId == other.typeId;
}

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Item _$ItemFromJson(Map<String, dynamic> json) => Item(
      id: json['id'] as String,
      metadata:
          SyncMetadataModel.fromJson(json['metadata'] as Map<String, dynamic>),
      deleted: json['deleted'] as bool,
      name: json['name'] as String,
      description: json['description'] as String,
    )..dirty = json['dirty'] as bool? ?? false;

Map<String, dynamic> _$ItemToJson(Item instance) => <String, dynamic>{
      'id': instance.id,
      'deleted': instance.deleted,
      'metadata': instance.metadata.toJson(),
      'dirty': instance.dirty,
      'name': instance.name,
      'description': instance.description,
    };
