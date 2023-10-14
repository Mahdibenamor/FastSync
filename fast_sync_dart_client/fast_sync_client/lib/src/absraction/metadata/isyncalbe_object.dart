import 'package:fast_sync_client/src/absraction/metadata/isync_metadata.dart';
import 'package:fast_sync_client/src/absraction/metadata/iwith_id.dart';

abstract class ISyncableObject extends IWithId {
  final ISyncMetadata metadata;
  final bool deleted;

  const ISyncableObject(
      {required String id, required this.metadata, required this.deleted})
      : super(id: id);

  num getVersion();
}
