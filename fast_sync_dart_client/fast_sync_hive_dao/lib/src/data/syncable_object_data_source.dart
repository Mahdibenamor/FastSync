import 'package:fast_sync_client/fast_sync_client.dart';
import 'package:fast_sync_hive_dao/fast_sync_hive_dao.dart';
import 'package:sqflite/sqflite.dart';

class SyncalbeObjectDataSource<T extends SyncableItemModel>
    implements ISyncableDataSource<T> {
  final HiveSyncConfiguration configuration =
      FastSync.getSyncConfiguration<HiveSyncConfiguration>();
  final String tableName;
  final Function fromJson;

  SyncalbeObjectDataSource({required this.tableName, required this.fromJson});

  @override
  Future<T> add(T entity) async {
    Database db = await getLocalDataBase();
    await db.insert(tableName, entity.toJson());
    return entity;
  }

  @override
  Future<List<T>> addMany(List<T> entities) async {
    Database db = await getLocalDataBase();
    final batch = db.batch();
    for (var object in entities) {
      batch.insert(tableName, object.toJson());
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
  Future<List<T>> fetchMany(ISyncMetadata syncMetadata) {
    // TODO: implement fetchMany
    throw UnimplementedError();
  }

  @override
  Future<T?> findById(String id) async {
    Database db = await getLocalDataBase();
    List<Map<String, dynamic>> results = await db.query(
      tableName,
      where: 'id = ?',
      whereArgs: [id],
      limit: 1,
    );
    if (results.isNotEmpty) {
      return fromJson(results.first);
    }
    return null;
  }

  @override
  Future<List<T>> getAll() async {
    Database db = await getLocalDataBase();
    final results = await db.query(tableName);
    List<T> objects = _objectsCreator(results);
    return objects;
  }

  @override
  Future<List<T>> query(query) async {
    Database db = await getLocalDataBase();
    final results = await db.query(tableName, where: query);
    List<T> objects = _objectsCreator(results);

    return objects;
  }

  @override
  Future<T> update(query, entity) async {
    Database db = await getLocalDataBase();
    await db.update(
      tableName,
      entity.toJson(),
      where: query,
    );

    return entity;
  }

  @override
  Future<List<T>> updateMany(List<T> entities) async {
    Database db = await getLocalDataBase();
    final batch = db.batch();

    for (final entity in entities) {
      batch.update(
        tableName,
        entity.toJson(),
        where: 'id = ?',
        whereArgs: [entity.id],
      );
    }
    await batch.commit(noResult: true);
    return entities;
  }

  List<T> _objectsCreator(List jsonObjects) {
    List<T> objects =
        List<T>.from(jsonObjects.map((itemsJson) => fromJson(itemsJson)));
    return objects;
  }

  Future<Database> getLocalDataBase() {
    return configuration.database;
  }
}
