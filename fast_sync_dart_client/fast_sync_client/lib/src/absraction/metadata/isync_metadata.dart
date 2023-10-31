import 'package:fast_sync_client/src/absraction/metadata/iwith_id.dart';
import 'package:fast_sync_client/src/absraction/models/sync_zone_restriction.dart';

abstract class ISyncMetadata extends IWithId {
  final String syncZone;
  final String type;
  final num version;
  final num timestamp;
  final int syncOperation;

  const ISyncMetadata(
      {required String id,
      required this.syncZone,
      required this.type,
      required this.version,
      required this.timestamp,
      required this.syncOperation})
      : super(id: id);

  String getSyncZone();
  void computeSyncZone(SyncZoneRestrictionEnum syncZoneRestrictionType);
}
