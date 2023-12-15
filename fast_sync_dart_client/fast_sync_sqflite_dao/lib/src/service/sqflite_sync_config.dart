import 'package:fast_sync_client/fast_sync_client.dart';
import 'package:fast_sync_sqflite_dao/fast_sync_sqflite_dao.dart';
import 'package:sqflite/sqflite.dart';

class SQfliteSyncConfiguration extends SyncConfiguration {
  final Database db;
  SQfliteSyncConfiguration({required this.db}) : super();

  @override
  Future<void> init() async {
    super.init();
    await _createMetaDataTable();
    setSyncVersionManager(
        SyncVersionManager(syncMetadataDataSource: SyncMetadataDataSource()));
    setTypeForFromJsonFunction(
        Constants.syncMetadataModelName, SyncMetadataModel.fromJson);
    setTypeForToJsonFunction(
        Constants.syncMetadataModelName, SyncMetadataModel.intoJson);
  }

  Future<void> _createMetaDataTable() async {
    await db.execute(SyncMetadataModel.createTableCommand());
  }

  Future<void> setCreationTypeCommand<T>({required String command}) async {
    namedInstances[T.toString() + Constants.createDataBaseCommand] = command;
    await db.execute(command);
  }

  String getCreationTypeCommand({required String type}) {
    String command = namedInstances[type + Constants.createDataBaseCommand];
    return command;
  }

  Future<void> createDataBaseForType({required String type}) async {
    String command = getCreationTypeCommand(type: type);
    await db.execute(command);
  }
}
