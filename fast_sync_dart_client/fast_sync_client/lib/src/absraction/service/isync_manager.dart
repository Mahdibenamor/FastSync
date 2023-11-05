import 'package:fast_sync_client/src/absraction/models/sync_operation_metadata.dart';
import 'package:fast_sync_client/src/absraction/models/sync_payload.dart';

abstract class ISyncManager {
  Future<SyncPayload> push();
  Future<SyncPayload> processPull(SyncOperationMetadata metadata);
  SyncPayload processSync(SyncOperationMetadata metadata);
}
