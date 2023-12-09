import 'package:fast_sync_client/fast_sync_client.dart';

class SyncPayload<T extends ISyncableObject> {
  Map<String, List<T>> _data;
  SyncOperationMetadata operationMetadata;
  bool hasData = false;

  SyncPayload(
      {Map<String, List<T>>? data, SyncOperationMetadata? operationMetadata})
      : _data = data ?? {},
        operationMetadata = operationMetadata ?? SyncOperationMetadata();

  void pushObjects(String type, List<T> entities) {
    if (entities.isNotEmpty) {
      Map<String, dynamic> typeMetadataJson = {
        "syncZone": FastSync.getTypeSyncZone(type),
        "type": type,
        'id': "id",
        'version': 999,
        'timestamp': 999,
        'syncOperation': 999,
      };
      operationMetadata.setMetadata(type, buildMetadata(typeMetadataJson));
      _data[type] = entities;
      hasData = true;
    }
  }

  List<T> getObjectsForType(String type) {
    return _data.containsKey(type) ? _data[type]! : [];
  }

  List<String> getSyncedTypes() {
    return _data.keys.toList();
  }

  ISyncMetadata getTypeMetadata(String type) {
    final metadata = operationMetadata.getTypeMetadata(type);
    return metadata;
  }

  factory SyncPayload.fromJson(Map<String, dynamic> json) {
    SyncConfiguration configuration = FastSync.getSyncConfiguration();
    final dataMap = json['data'] as Map<String, dynamic>;
    final operationMetadata =
        SyncOperationMetadata.fromJson(json['operationMetadata']);

    final data = <String, List<T>>{};
    dataMap.forEach((key, value) {
      final list = (value as List).cast<Map<String, dynamic>>();
      Function typeFromJson = configuration.getTypeForFromJsonFunction(key);
      List<T> items = List<T>.from(list.map((item) => typeFromJson.call(item)));
      data[key] = items;
    });

    return SyncPayload(
      data: data,
      operationMetadata: operationMetadata,
    );
  }

  Map<String, dynamic> toJson() {
    SyncConfiguration configuration = FastSync.getSyncConfiguration();
    Map<String, List<Map<String, dynamic>>> jsonDataMap = {};

    _data.forEach((key, value) {
      Function typeToJson = configuration.getTypeForToJsonFunction(key);
      List<Map<String, dynamic>> itemsTypeJson = value
          .map((item) => typeToJson.call(item) as Map<String, dynamic>)
          .toList();
      jsonDataMap[key] = itemsTypeJson;
    });
    return {
      'operationMetadata': this.operationMetadata.toJson(),
      'data': jsonDataMap,
    };
  }
}
