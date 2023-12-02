import 'package:fast_sync_client/fast_sync_client.dart';

class SyncVersionManager {
  final ISyncableDataSource<ISyncMetadata> syncMetadataDataSource;
  SyncVersionManager({required this.syncMetadataDataSource});

  Future<ISyncMetadata> getTypeSyncMetadata(String type) async {
    ISyncMetadata? metadata = await syncMetadataDataSource.findById(type);
    if (metadata == null) {
      Map<String, dynamic> typeMetadataJson = {
        "syncZone": FastSync.getTypeSyncZone(type),
        "type": type,
        'id': type,
        'version': 0,
        'timestamp': DateTime.now().secondsSinceEpoch,
        'syncOperation': 999,
      };
      metadata =
          await syncMetadataDataSource.add(buildMetadata(typeMetadataJson));
    }
    return metadata;
  }

  Future<ISyncMetadata> updateTypeSyncVersion(
      ISyncMetadata syncMetadata) async {
    syncMetadata.id = syncMetadata.type;
    syncMetadata =
        await syncMetadataDataSource.update(syncMetadata.id, syncMetadata);
    return syncMetadata;
  }

  Future<void> initTypeSyncMetaData(String type) async {
    await getTypeSyncMetadata(type);
  }

  Future<void> resetTypeSyncVersion(String type) async {
    await syncMetadataDataSource.hardDelete();
    await initTypeSyncMetaData(type);
  }
}
