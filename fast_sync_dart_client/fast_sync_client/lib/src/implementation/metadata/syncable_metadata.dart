import 'package:fast_sync_client/src/absraction/constants.dart';
import 'package:fast_sync_client/src/absraction/metadata/isync_metadata.dart';
import 'package:fast_sync_client/src/absraction/models/sync_zone_restriction.dart';

class SyncMetadata implements ISyncMetadata {
  @override
  String id;

  @override
  String? syncZone;

  @override
  final String type;

  @override
  num version;

  @override
  num timestamp;

  @override
  int? syncOperation;

  SyncMetadata(
      {required this.id,
      required this.version,
      required this.timestamp,
      required this.type});

  @override
  String? getSyncZone() {
    return syncZone;
  }

  @override
  String computeSyncZone(SyncZoneRestrictionEnum syncZoneRestrictionType) {
    if (syncZoneRestrictionType == SyncZoneRestrictionEnum.restricted) {
      return syncZone!;
    } else {
      return Constants.globalSyncZoneRestriction;
    }
  }
}
