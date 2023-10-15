import 'package:fast_sync_client/fast_sync_client.dart';
import 'package:path/path.dart';
import 'package:sqflite/sqflite.dart';

class SqfliteSyncConfiguration extends SyncConfiguration {
  Database? _database;

  SqfliteSyncConfiguration() : super();
  @override
  void init() {
    super.init();
  }

  Future<Database> get database async {
    if (_database != null) return _database!;

    _database = await _initDB('notes.db');
    return _database!;
  }

  Future<Database> _initDB(String filePath) async {
    final dbPath = await getDatabasesPath();
    final path = join(dbPath, filePath);
    return await openDatabase(path, version: 1, onCreate: _createDB);
  }

  Future _createDB(Database db, int version) async {
    await db.execute('''
create table ${AppConst.tableName} ( 
  ${AppConst.id} integer primary key autoincrement, 
  ${AppConst.title} text not null,
   ${AppConst.describtion} text not null,
  ${AppConst.isImportant} boolean not null)
''');
  }
}

class AppConst {
  static const String isImportant = 'isImportant';
  static const String id = 'id';
  static const String title = 'title';
  static const String describtion = 'describtion';
  static const String tableName = 'todoTable';
}
