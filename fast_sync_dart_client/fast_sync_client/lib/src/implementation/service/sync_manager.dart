import 'package:fast_sync_client/fast_sync_client.dart';

class SyncManager implements ISyncManager {
  IhttpManager httpManager = FastSync.getHttpManager();

  @override
  Future<SyncPayload> push(
      SyncZoneTypeConfiguration syncZoneConfiguration) async {
    SyncPayload payload = await _buildPayload(syncZoneConfiguration);
    bool isSucced = false;

    if (payload.hasData) {
      isSucced = await httpManager.push(payload);
    }
    if (isSucced) {
      await _undirtyList(payload);
    }
    return payload;
  }

  @override
  Future<SyncPayload> processPull(SyncOperationMetadata metadata) async {
    bool payload = await httpManager.pull(metadata);
    return SyncPayload();
  }

  @override
  processSync(metadata) {
    // TODO: implement processSync
    throw UnimplementedError();
  }

  bool _filterDirtyObjects(ISyncableObject object) {
    return object.dirty;
  }

  Future<SyncPayload> _buildPayload(
      SyncZoneTypeConfiguration syncZoneConfiguration) async {
    List<String> syncableTypes = FastSync.getSyncableTypes();
    SyncPayload payload = SyncPayload();
    for (String type in syncableTypes) {
      ISyncableRepository<ISyncableObject> repository =
          FastSync.getObjectRepository(type);
      List<ISyncableObject> dirtyObjects =
          await repository.query(_filterDirtyObjects);
      payload.pushObjects(
          type, dirtyObjects, syncZoneConfiguration.getTypeSyncZone(type));
    }
    return payload;
  }

  Future<void> _undirtyList(SyncPayload payload) async {
    List<String> syncableTypes = payload.getSyncedTypes();
    for (String type in syncableTypes) {
      ISyncableRepository<ISyncableObject> repository =
          FastSync.getObjectRepository(type);
      List<ISyncableObject> pushedItems = payload.getObjectsForType(type);
      await repository.undirtyList(pushedItems);
    }
  }
}
