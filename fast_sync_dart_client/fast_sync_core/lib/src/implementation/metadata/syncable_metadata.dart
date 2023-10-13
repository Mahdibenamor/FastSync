import 'package:fast_sync_client/src/absraction/constants.dart';
import 'package:fast_sync_client/src/absraction/metadata/isync_metadata.dart';
import 'package:fast_sync_client/src/absraction/metadata/isync_operation.dart';
import 'package:fast_sync_client/src/absraction/models/sync_zone_restriction.dart';

class SyncMetadata implements ISyncMetadata {
  @override
  final String id;

  @override
  final String syncZone;

  @override
  final String type;

  @override
  final num version;

  @override
  final num timestamp;

  @override
  final SyncOperationEnum syncOperation;

  const SyncMetadata(
      {required this.id,
      required this.syncZone,
      required this.type,
      required this.version,
      required this.timestamp,
      required this.syncOperation});

  @override
  String getSyncZone() {
    return syncZone;
  }

  @override
  String computeSyncZone(SyncZoneRestrictionEnum syncZoneRestrictionType) {
    if (syncZoneRestrictionType == SyncZoneRestrictionEnum.restricted) {
      return syncZone;
    } else {
      return Constants.globalSyncZoneRestriction;
    }
  }
}
