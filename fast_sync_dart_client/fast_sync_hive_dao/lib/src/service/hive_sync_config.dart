import 'package:fast_sync_client/fast_sync_client.dart';
import 'package:fast_sync_hive_dao/fast_sync_hive_dao.dart';
import 'package:hive/hive.dart';

class HiveSyncConfiguration extends SyncConfiguration {
  HiveSyncConfiguration() : super();

  @override
  Future<void> init() async {
    super.init();
    Hive.registerAdapter(MetaDataAdapter());
    setTypeForFromJsonFunction(
        Constants.syncMetadataModelName, SyncMetadataModel.fromJson);
    setTypeForToJsonFunction(
        Constants.syncMetadataModelName, SyncMetadataModel.toJson);
  }
}
