import 'package:fast_sync_client/fast_sync_client.dart';
import 'package:fast_sync_client/src/absraction/models/sync_operation_metadata.dart';
import 'package:fast_sync_client/src/absraction/models/sync_payload.dart';

class SyncManager implements ISyncManager {
  @override
  Future<SyncPayload> processPull(SyncOperationMetadata metadata) {
    // TODO: implement processPush
    throw UnimplementedError();
  }

  @override
  void processPush(payload) {
    // TODO: implement processPush
    throw UnimplementedError();
  }

  @override
  processSync(metadata) {
    // TODO: implement processSync
    throw UnimplementedError();
  }
}
