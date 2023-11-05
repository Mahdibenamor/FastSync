import 'package:fast_sync_client/src/absraction/metadata/iwith_id.dart';
import 'package:fast_sync_client/src/absraction/models/sync_zone_restriction.dart';

abstract class ISyncMetadata extends IWithId {
  String? syncZone;
  final String type;
  num? version;
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

  String? getSyncZone();
  void computeSyncZone(SyncZoneRestrictionEnum syncZoneRestrictionType);
}
