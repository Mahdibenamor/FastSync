import 'package:fast_sync_client/fast_sync_client.dart';

class SyncOperationMetadata {
  Map<String, ISyncMetadata> metadata = {};

  SyncOperationMetadata();

  void setMetadata(String type, ISyncMetadata metadata) {
    this.metadata[type] = metadata;
  }

  ISyncMetadata getTypeMetadata(String type) {
    if (metadata.containsKey(type) && metadata[type] != null) {
      return metadata[type]!;
    }
    throw Exception(
        'Metadata of each synced type should be specified, please check how you build SyncOperationMetadata');
  }

  List<String> getSyncedTypes() {
    return metadata.keys.toList();
  }
}
