// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'sync_metadata_model.dart';

// **************************************************************************
// TypeAdapterGenerator
// **************************************************************************

class MetaDataAdapter extends TypeAdapter<SyncMetadataModel> {
  @override
  final int typeId = 223;

  @override
  SyncMetadataModel read(BinaryReader reader) {
    final numOfFields = reader.readByte();
    final fields = <int, dynamic>{
      for (int i = 0; i < numOfFields; i++) reader.readByte(): reader.read(),
    };
    return SyncMetadataModel(
      id: fields[240] as String,
      syncZone: fields[241] as String?,
      type: fields[242] as String,
      version: fields[243] as num,
      timestamp: fields[244] as num,
      syncOperation: fields[255] as int?,
    );
  }

  @override
  void write(BinaryWriter writer, SyncMetadataModel obj) {
    writer
      ..writeByte(6)
      ..writeByte(240)
      ..write(obj.id)
      ..writeByte(241)
      ..write(obj.syncZone)
      ..writeByte(242)
      ..write(obj.type)
      ..writeByte(243)
      ..write(obj.version)
      ..writeByte(244)
      ..write(obj.timestamp)
      ..writeByte(255)
      ..write(obj.syncOperation);
  }

  @override
  int get hashCode => typeId.hashCode;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is MetaDataAdapter &&
          runtimeType == other.runtimeType &&
          typeId == other.typeId;
}

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

SyncMetadataModel _$SyncMetadataModelFromJson(Map<String, dynamic> json) =>
    SyncMetadataModel(
      id: json['id'] as String,
      syncZone: json['syncZone'] as String?,
      type: json['type'] as String,
      version: json['version'] as num,
      timestamp: json['timestamp'] as num,
      syncOperation: json['syncOperation'] as int?,
    );

Map<String, dynamic> _$SyncMetadataModelToJson(SyncMetadataModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'syncZone': instance.syncZone,
      'type': instance.type,
      'version': instance.version,
      'timestamp': instance.timestamp,
      'syncOperation': instance.syncOperation,
    };
