import 'package:fast_sync_client/src/absraction/models/sync_operation_metadata.dart';
import 'package:fast_sync_client/src/absraction/models/sync_payload.dart';

abstract class IhttpManager {
  Future<bool> push(SyncPayload payload);
  Future<SyncPayload> pull(SyncOperationMetadata metadata);
}
