import 'package:fast_sync_client/src/absraction/models/sync_operation_metadata.dart';
import 'package:fast_sync_client/src/absraction/models/sync_payload.dart';

abstract class IhttpManager {
  Future<dynamic> push(SyncPayload payload);
  Future<SyncPayload> pull(SyncOperationMetadata metadata);
  SyncPayload sync(SyncOperationMetadata metadata);
}
