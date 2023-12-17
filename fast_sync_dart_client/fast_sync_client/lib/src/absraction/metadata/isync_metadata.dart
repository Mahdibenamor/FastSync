import 'package:fast_sync_client/fast_sync_client.dart';

abstract class ISyncMetadata extends IWithId {
  String? syncZone;
  String type;
  num version;
  num timestamp;
  int? syncOperation;

  ISyncMetadata(
      {required String id,
      required this.syncZone,
      required this.type,
      required this.version,
      required this.timestamp,
      required this.syncOperation})
      : super(id: id);

  String? getSyncZone() {
    return syncZone;
  }

  Map<String, dynamic> toJson();

  String computeSyncZone(SyncZoneRestrictionEnum syncZoneRestrictionType) {
    if (syncZoneRestrictionType == SyncZoneRestrictionEnum.restricted) {
      return syncZone!;
    } else {
      return Constants.globalSyncZoneRestriction;
    }
  }
}
