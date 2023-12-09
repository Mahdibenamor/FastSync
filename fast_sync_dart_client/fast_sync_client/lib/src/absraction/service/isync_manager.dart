import 'package:fast_sync_client/src/absraction/models/sync_payload.dart';

abstract class ISyncManager {
  Future<SyncPayload> push();
  Future<SyncPayload> pull();
  Future<SyncPayload> sync();
  Future<SyncPayload> hardReset({List<Type>? types});
}
