import 'package:fast_sync_client/fast_sync_client.dart';

class SyncManager implements ISyncManager {
  @override
  Future<SyncPayload> push() async {
    IhttpManager httpManager = FastSync.getHttpManager();

    SyncPayload payload = await _buildPayload();
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
  Future<SyncPayload> pull() async {
    IhttpManager httpManager = FastSync.getHttpManager();
    SyncOperationMetadata operationMetadata = SyncOperationMetadata();
    List<String> syncableTypes = FastSync.getSyncableTypes();
    for (String type in syncableTypes) {
      SyncVersionManager syncVersionManager = FastSync.getSyncVersionManager();
      ISyncMetadata typeLocalMetadata =
          await syncVersionManager.getTypeSyncMetadata(type);
      operationMetadata.setMetadata(type, typeLocalMetadata);
    }

    SyncPayload payload = await httpManager.pull(operationMetadata);
    await _undirtyList(payload);
    await _processPayloadMetadata(payload);
    return payload;
  }

  @override
  Future<SyncPayload<ISyncableObject>> hardReset({List<Type>? types}) async {
    List<String> syncableTypes = [];
    if (types != null && types.isNotEmpty) {
      for (Type type in types) {
        syncableTypes.add(type.toString());
      }
    } else {
      syncableTypes = FastSync.getSyncableTypes();
    }
    for (String type in syncableTypes) {
      ISyncableRepository<ISyncableObject> repository =
          FastSync.getObjectRepository(type: type);
      await repository.hardDelete();
    }
    return await pull();
  }

  bool _filterDirtyObjects(ISyncableObject object) {
    return object.dirty;
  }

  Future<SyncPayload> _buildPayload() async {
    List<String> syncableTypes = FastSync.getSyncableTypes();
    SyncPayload payload = SyncPayload();
    for (String type in syncableTypes) {
      ISyncableRepository<ISyncableObject> repository =
          FastSync.getObjectRepository(type: type);
      List<ISyncableObject> dirtyObjects =
          await repository.query(_filterDirtyObjects);
      payload.pushObjects(type, dirtyObjects);
    }
    return payload;
  }

  Future<void> _undirtyList(SyncPayload payload) async {
    List<String> syncableTypes = payload.getSyncedTypes();
    for (String type in syncableTypes) {
      ISyncableRepository<ISyncableObject> repository =
          FastSync.getObjectRepository(type: type);
      List<ISyncableObject> pushedItems = payload.getObjectsForType(type);
      await repository.undirtyList(pushedItems);
    }
  }

  Future<void> _processPayloadMetadata(SyncPayload payload) async {
    List<String> syncableTypes = payload.getSyncedTypes();
    SyncVersionManager syncVersionManager = FastSync.getSyncVersionManager();
    for (String type in syncableTypes) {
      ISyncMetadata metadata = payload.getTypeMetadata(type);
      await syncVersionManager.updateTypeSyncVersion(metadata);
    }
  }
}
