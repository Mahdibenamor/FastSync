import 'package:fast_sync_client/fast_sync_client.dart';

abstract class ISyncableObject extends IWithId {
  ISyncMetadata metadata;
  bool deleted;
  bool dirty = false;
  String metadataId = Constants.emptyString;

  ISyncableObject(
      {required String id, required this.metadata, required this.deleted})
      : super(id: id);

  num? getVersion() {
    return metadata.version;
  }
}
