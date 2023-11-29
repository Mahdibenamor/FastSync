import 'package:fast_sync_client/fast_sync_client.dart';

extension DateTimeExtensions on DateTime {
  int get secondsSinceEpoch => millisecondsSinceEpoch * 1000;
}

dynamic buildMetadata(typeMetadataJson) {
  SyncConfiguration configuration = FastSync.getSyncConfiguration();
  Function syncMetadataFromJson =
      configuration.getTypeForFromJsonFunction(Constants.syncMetadataModelName);
  var metadata = syncMetadataFromJson.call(typeMetadataJson);
  return metadata;
}
