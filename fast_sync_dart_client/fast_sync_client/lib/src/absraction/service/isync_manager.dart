import 'package:fast_sync_client/src/absraction/models/sync_operation_metadata.dart';
import 'package:fast_sync_client/src/absraction/models/sync_payload.dart';

abstract class ISyncManager {
  Future<SyncPayload> push(SyncZoneTypeConfiguration syncZoneConfigurationl);
  Future<SyncPayload> processPull(SyncOperationMetadata metadata);
  SyncPayload processSync(SyncOperationMetadata metadata);
}

class SyncZoneTypeConfiguration {
  final Map<String, String> _typesSyncZones = {};
  SyncZoneTypeConfiguration();

  pushTypeSyncZone(String type, String syncZone) {
    _typesSyncZones[type] = syncZone;
  }

  String getTypeSyncZone(String type) {
    String? syncZone = _typesSyncZones[type];
    if (syncZone == null) {
      throw Exception(
          'SyncZone for type $type is not configured well, please check the configuration before using syncManager');
    }
    return syncZone;
  }
}
