import 'package:fast_sync_client/fast_sync_client.dart';
import 'package:fast_sync_hive_dao/fast_sync_hive_dao.dart';
import 'package:hive/hive.dart';

class HiveSyncConfiguration extends SyncConfiguration {
  HiveSyncConfiguration() : super();

  @override
  Future<void> init() async {
    Hive.registerAdapter(MetaDataAdapter());
  }
}
