import 'package:fast_sync_client/fast_sync_client.dart';

class SyncPayload<T extends ISyncableObject> {
  Map<String, List<T>> data;
  SyncOperationMetadata operationMetadata;

  SyncPayload(
      {Map<String, List<T>>? data, SyncOperationMetadata? operationMetadata})
      : data = data ?? {},
        operationMetadata = operationMetadata ?? SyncOperationMetadata();

  void pushObjects(String type, List<T> entities, String syncZone) {
    SyncConfiguration configuration = FastSync.getSyncConfiguration();
    Function syncMetadataFromJson =
        configuration.getTypeForFromJsonFunction("SyncMetadataModel");
    Map<String, dynamic> typeMetadataJson = {
      "syncZone": syncZone,
      "type": type,
      'id': "id",
      'version': 999,
      'timestamp': 999,
      'syncOperation': 999,
    };
    operationMetadata.setMetadata(
        type, syncMetadataFromJson.call(typeMetadataJson));
    data[type] = entities;
  }

  List<dynamic> getObjectsForType(String type) {
    return data.containsKey(type) ? data[type]! : [];
  }

  List<String> getSyncedTypes() {
    return data.keys.toList();
  }

  ISyncMetadata getTypeMetadata(String type) {
    final metadata = operationMetadata.getTypeMetadata(type);
    if (metadata != null) {
      return metadata;
    }
    throw Exception(
        'Metadata of each synced type should be specified, please check how you build SyncPayload');
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
      final items =
          list.map((item) => typeFromJson.call(item)).toList() as List<T>;
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

    data.forEach((key, value) {
      Map<String, dynamic> Function(T) typeToJson =
          configuration.getTypeForToJsonFunction(key);
      List<Map<String, dynamic>> itemsTypeJson =
          value.map((item) => typeToJson(item)).toList();
      jsonDataMap[key] = itemsTypeJson;
    });
    return {
      'operationMetadata': this.operationMetadata.toJson(),
      'data': jsonDataMap,
    };
  }
}
