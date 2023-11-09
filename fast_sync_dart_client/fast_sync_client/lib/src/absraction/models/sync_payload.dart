import 'package:fast_sync_client/fast_sync_client.dart';
import 'package:uuid/uuid.dart';

class SyncPayload<T extends ISyncableObject> {
  Map<String, List<T>> data;
  SyncOperationMetadata operationMetadata;

  SyncPayload(
      {Map<String, List<T>>? data, SyncOperationMetadata? operationMetadata})
      : data = data ?? {},
        operationMetadata = operationMetadata ?? SyncOperationMetadata();

  void pushObjects(String type, List<T> entities) {
    operationMetadata.setMetadata(
        type,
        SyncMetadata(
            id: Uuid().v4(),
            timestamp: DateTime.now().secondsSinceEpoch,
            type: type));
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
    final operationMetadata = configuration
        .getTypeForFromJsonFunction("SyncMetadataModel")
        .call(json['operationMetadata']);

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

  Map<String, dynamic> toJson() => <String, dynamic>{
        'operationMetadata': this.operationMetadata,
        'data': this.data,
      };
}
