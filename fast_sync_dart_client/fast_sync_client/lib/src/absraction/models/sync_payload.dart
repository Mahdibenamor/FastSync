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

//  factory SyncPayload.fromJson(Map<String, dynamic> json) {
//     final dataMap = json['data'] as Map<String, dynamic>;
//     final operationMetadata = SyncOperationMetadata.fromJson(json['operationMetadata']);

//     // Deserialize the data map
//     final data = <String, List<T>>{};
//     dataMap.forEach((key, value) {
//       final list = (value as List).cast<Map<String, dynamic>>();
//       final items = list.map((item) => SyncableObject.fromJson(item)).toList();
//       data[key] = items;
//     });

//     return SyncPayload(
//       data: data,
//       operationMetadata: operationMetadata,
//     );
//   }

  // Map<String, dynamic> toJson(SyncMetadataModel instance) => <String, dynamic>{
  //       'id': instance.id,
  //       'syncZone': instance.syncZone,
  //       'type': instance.type,
  //       'version': instance.version,
  //       'timestamp': instance.timestamp,
  //       'syncOperation': instance.syncOperation,
  //     };
}
