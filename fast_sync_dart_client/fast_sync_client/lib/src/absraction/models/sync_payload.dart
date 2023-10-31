import 'package:fast_sync_client/fast_sync_client.dart';
import 'package:fast_sync_client/src/absraction/models/sync_operation_metadata.dart';

class SyncPayload {
  Map<String, List<dynamic>> data;
  SyncOperationMetadata operationMetadata;

  SyncPayload(
      {Map<String, List<dynamic>>? data,
      SyncOperationMetadata? operationMetadata})
      : data = data ?? {},
        operationMetadata = operationMetadata ?? SyncOperationMetadata();

  Future<void> pushObjects<T extends ISyncableObject>(
      String type, List<T> entities, String syncZone) async {}

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
}
