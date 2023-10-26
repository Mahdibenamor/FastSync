import 'package:fast_sync_client/fast_sync_client.dart';
import 'package:fast_sync_floor_dao/fast_sync_floor_dao.dart';
import 'package:sqflite/sqflite.dart';

class SyncalbeObjectDataSource<T extends SyncableItemModel>
    implements ISyncableDataSource {
  final SqfliteSyncConfiguration configuration =
      FastSync.getSyncConfiguration<SqfliteSyncConfiguration>();
  final String tableName;

  SyncalbeObjectDataSource({required this.tableName});

  @override
  Future add(entity) async {
    Database db = await getLocalDataBase();
    return await db.insert(tableName, entity);
  }

  @override
  Future<List> addMany(List entities) async {
    Database db = await getLocalDataBase();
    final batch = db.batch();
    for (var object in entities) {
      batch.insert(tableName, object);
    }
    await batch.commit();
    return entities;
  }

  @override
  Future<int> count() async {
    Database db = await getLocalDataBase();
    int? count = Sqflite.firstIntValue(
        await db.rawQuery('SELECT COUNT(*) FROM $tableName'));

    return count ?? 0;
  }

  @override
  Future<void> dispose() async {
    Database db = await getLocalDataBase();
    await db.close();
  }

  @override
  Future<List> fetchMany(ISyncMetadata syncMetadata) {
    // TODO: implement fetchMany
    throw UnimplementedError();
  }

  @override
  Future findById(String id) async {
    Database db = await getLocalDataBase();
    List<Map<String, dynamic>> results = await db.query(
      tableName,
      where: 'id = ?',
      whereArgs: [id],
      limit: 1,
    );
    if (results.isNotEmpty) {
      return results.first;
    }
    return null;
  }

  @override
  Future<List> getAll() async {
    Database db = await getLocalDataBase();
    final results = await db.query(tableName);
    return results;
  }

  @override
  Future<List> query(query) async {
    Database db = await getLocalDataBase();
    final results = await db.query(tableName, where: query);
    return results;
  }

  @override
  Future update(query, entity) async {
    Database db = await getLocalDataBase();
    final int updatedRows = await db.update(
      tableName,
      entity,
      where: query,
    );

    if (updatedRows > 0) {
      return entity;
    } else {
      return null;
    }
  }

  @override
  Future<List> updateMany(List entities) async {
    Database db = await getLocalDataBase();
    final batch = db.batch();

    for (final entity in entities) {
      batch.update(
        tableName,
        entity,
        where: 'id = ?',
        whereArgs: [entity['id']],
      );
    }
    final results = await batch.commit(noResult: true);
    return results;
  }

  Future<Database> getLocalDataBase() {
    return configuration.database;
  }
}
