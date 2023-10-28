import 'package:fast_sync_client/fast_sync_client.dart';
import 'package:fast_sync_hive_dao/fast_sync_hive_dao.dart';
import 'package:path/path.dart';
import 'package:sqflite/sqflite.dart';

class HiveSyncConfiguration extends SyncConfiguration {
  Database? _database;
  final List<String> createDBs;

  HiveSyncConfiguration({required this.createDBs}) : super();

  @override
  Future<void> init() async {
    await _initDB(Constants.syncDataBaseName);
  }

  Future<Database> get database async {
    if (_database != null) return _database!;

    _database = await _initDB(Constants.syncDataBaseName);
    return _database!;
  }

  Future<Database> _initDB(String filePath) async {
    final dbPath = await getDatabasesPath();
    final path = join(dbPath, filePath);
    return await openDatabase(path, version: 1, onCreate: _createDB);
  }

  Future _createDB(Database db, int version,
      [String? additionalColumnsSql]) async {
    await _createSyncMetadaTable(db: db);
    for (var schema in createDBs) {
      await db.execute(schema);
    }
  }

  Future _createSyncMetadaTable({required Database db}) async {
    db.execute(SyncMetadataModel.createSchema());
  }
}
