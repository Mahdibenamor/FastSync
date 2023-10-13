import 'package:fast_sync_client/src/absraction/metadata/isync_metadata.dart';
import 'package:fast_sync_client/src/absraction/metadata/isync_operation.dart';
import 'package:fast_sync_client/src/absraction/metadata/isyncalbe_object.dart';

class SyncableObject implements ISyncableObject {
  @override
  final String id;

  @override
  final ISyncMetadata metadata;

  @override
  final bool deleted;

  final SyncOperationEnum syncOperation;

  SyncableObject(
      {required this.id,
      required this.metadata,
      required this.deleted,
      required this.syncOperation});

  @override
  num getVersion() {
    return metadata.version;
  }
}
