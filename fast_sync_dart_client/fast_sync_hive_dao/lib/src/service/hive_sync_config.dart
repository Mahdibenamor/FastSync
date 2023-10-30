import 'package:fast_sync_client/fast_sync_client.dart';
import 'package:fast_sync_hive_dao/fast_sync_hive_dao.dart';
import 'package:hive/hive.dart';

class HiveSyncConfiguration extends SyncConfiguration {
  //late HiveInterface _hiveInstance;
  HiveSyncConfiguration() : super() {
    //_hiveInstance = hiveInstance;
  }

  //HiveInterface get hiveInstance => _hiveInstance;
  @override
  Future<void> init() async {
    Hive.registerAdapter(MetaDataAdapter());
  }
}
