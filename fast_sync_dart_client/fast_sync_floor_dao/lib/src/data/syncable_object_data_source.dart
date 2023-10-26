import 'package:fast_sync_client/fast_sync_client.dart';
import 'package:fast_sync_floor_dao/fast_sync_floor_dao.dart';
import 'package:sqflite/sqflite.dart';

class SyncalbeObjectDataSource implements ISyncableDataSource {
  final SqfliteSyncConfiguration configuration =
      FastSync.getSyncConfiguration<SqfliteSyncConfiguration>();
  final String tableName;

  SyncalbeObjectDataSource({required this.tableName});

  @override
  Future add(entity) async {
    Database db = await getLocalDataBase();
    return await db.insert(tableName, entity.fromJson());
  }

  @override
  Future<List> addMany(List entities) {
    // TODO: implement addMany
    throw UnimplementedError();
  }

  @override
  Future<int> count() {
    // TODO: implement count
    throw UnimplementedError();
  }

  @override
  void dispose() {
    // TODO: implement dispose
  }

  @override
  Future<List> fetchMany(ISyncMetadata syncMetadata) {
    // TODO: implement fetchMany
    throw UnimplementedError();
  }

  @override
  Future findById(String id) {
    // TODO: implement findById
    throw UnimplementedError();
  }

  @override
  Future<List> getAll() {
    // TODO: implement getAll
    throw UnimplementedError();
  }

  @override
  Future<List> query(query) {
    // TODO: implement query
    throw UnimplementedError();
  }

  @override
  Future update(query, entity) {
    // TODO: implement update
    throw UnimplementedError();
  }

  @override
  Future<List> updateMany(List entities) {
    // TODO: implement updateMany
    throw UnimplementedError();
  }

  Future<Database> getLocalDataBase() {
    return configuration.database;
  }
}
