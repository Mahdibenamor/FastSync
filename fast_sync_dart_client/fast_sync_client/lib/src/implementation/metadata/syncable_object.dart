import 'package:fast_sync_client/fast_sync_client.dart';

class SyncableObject implements ISyncableObject {
  @override
  String id;

  @override
  final ISyncMetadata metadata;

  @override
  bool deleted;

  @override
  bool dirty = false;

  @override
  late String metadataId;

  SyncableObject(
      {required this.id, required this.metadata, required this.deleted});

  @override
  num? getVersion() {
    return metadata.version;
  }
}
