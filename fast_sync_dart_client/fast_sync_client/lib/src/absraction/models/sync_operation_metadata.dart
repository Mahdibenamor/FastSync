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

  Map<String, dynamic> toJson() {
    SyncConfiguration configuration = FastSync.getSyncConfiguration();
    Function syncMetadataToJson =
        configuration.getTypeForToJsonFunction(Constants.syncMetadataModelName);

    Map<String, dynamic> jsonMap = {
      'metadata': metadata
          .map((key, value) => MapEntry(key, syncMetadataToJson.call(value))),
    };
    return jsonMap;
  }

  factory SyncOperationMetadata.fromJson(Map<String, dynamic> json) {
    var metadataJson = json['metadata'] as Map<String, dynamic>?;

    if (metadataJson == null) {
      throw FormatException("Invalid JSON. 'metadata' field is missing.");
    }
    SyncConfiguration configuration = FastSync.getSyncConfiguration();
    Function syncMetadataFromJson = configuration
        .getTypeForFromJsonFunction(Constants.syncMetadataModelName);
    var syncOperationMetadata = SyncOperationMetadata();
    metadataJson.forEach((key, value) {
      var type = key;
      var metadataJson = value as Map<String, dynamic>;
      var metadata = syncMetadataFromJson.call(metadataJson);
      syncOperationMetadata.setMetadata(type, metadata);
    });
    return syncOperationMetadata;
  }
}
