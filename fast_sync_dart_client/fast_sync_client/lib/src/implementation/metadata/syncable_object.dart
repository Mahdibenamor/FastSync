import 'package:fast_sync_client/fast_sync_client.dart';

class SyncableObject implements ISyncableObject {
  @override
  final String id;

  @override
  final SyncMetadata metadata;

  @override
  final bool deleted;

  final SyncOperationEnum syncOperation;

  const SyncableObject(
      {required this.id,
      required this.metadata,
      required this.deleted,
      required this.syncOperation});

  @override
  num getVersion() {
    return metadata.version;
  }
}
