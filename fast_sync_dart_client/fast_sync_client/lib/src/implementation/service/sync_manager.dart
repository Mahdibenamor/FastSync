import 'package:fast_sync_client/fast_sync_client.dart';
import 'package:fast_sync_client/src/absraction/models/sync_operation_metadata.dart';
import 'package:fast_sync_client/src/absraction/models/sync_payload.dart';

class SyncManager implements ISyncManager {
  @override
  Future<SyncPayload> push() async {
    List<String> syncableTypes = FastSync.getSyncableTypes();
    SyncPayload payload = SyncPayload();
    for (String type in syncableTypes) {
      ISyncableRepository<ISyncableObject> repository =
          FastSync.getObjectRepository(type);
      List<ISyncableObject> dirtyObjects =
          await repository.query(_filterDirtyObjects);

      payload.pushObjects(type, dirtyObjects);
    }
    return payload;
  }

  @override
  Future<SyncPayload> processPull(SyncOperationMetadata metadata) {
    throw UnimplementedError();
  }

  @override
  processSync(metadata) {
    // TODO: implement processSync
    throw UnimplementedError();
  }

  bool _filterDirtyObjects(ISyncableObject object) {
    return object.dirty;
  }
}
