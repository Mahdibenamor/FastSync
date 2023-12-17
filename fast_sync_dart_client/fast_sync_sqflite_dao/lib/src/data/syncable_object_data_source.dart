import 'package:fast_sync_client/fast_sync_client.dart';
import 'package:fast_sync_sqflite_dao/fast_sync_sqflite_dao.dart';
import 'package:sqflite/sqflite.dart';

class SyncalbeObjectDataSource<T extends IWithId>
    implements ISyncableDataSource<T> {
  SyncalbeObjectDataSource();

  Database get _database {
    SQfliteSyncConfiguration configuration = FastSync.getSyncConfiguration();
    return configuration.db;
  }

  Map<String, Object?> _createEntityMap(T entity) {
    SyncConfiguration configuration = FastSync.getSyncConfiguration();
    Function toJson = configuration.getTypeForToJsonFunction(T.toString());
    Map<String, Object?> json = toJson.call(entity);
    json.removeWhere((key, value) => key == "metadata");
    return json;
  }

  T _createEntityFromJson(Map<String, Object?> json) {
    SyncConfiguration configuration = FastSync.getSyncConfiguration();
    Function fromJson = configuration.getTypeForFromJsonFunction(T.toString());
    var entity = fromJson.call(json);
    return entity;
  }

  @override
  Future<T> add(T entity) async {
    await _database.insert(T.toString(), _createEntityMap(entity));
    return entity;
  }

  @override
  Future<List<T>> addMany(List<T> entities) async {
    var batch = _database.batch();
    for (T entity in entities) {
      batch.insert(T.toString(), _createEntityMap(entity));
    }
    await batch.commit(noResult: true);
    return entities;
  }

  @override
  Future<T> update(String id, T entity) async {
    Map<String, dynamic> entityMap = _createEntityMap(entity);
    String id = entityMap['id'];
    await _database.update(
      T.toString(),
      entityMap,
      where: 'id = ?',
      whereArgs: [id],
    );
    return entity;
  }

  @override
  Future<List<T>> updateMany(List<T> entities) async {
    var batch = _database.batch();
    for (T entity in entities) {
      Map<String, dynamic> entityMap = _createEntityMap(entity);
      String sql =
          'INSERT OR REPLACE INTO ${T.toString()} (${entityMap.keys.join(", ")}) VALUES (${List.filled(entityMap.keys.length, '?').join(", ")})';
      List<dynamic> args = entityMap.values.toList();

      batch.rawInsert(sql, args);
    }
    await batch.commit(noResult: true);
    return entities;
  }

  @override
  Future<List> syncUpdate(List entities) async {
    var batch = _database.batch();
    for (T entity in entities) {
      Map<String, dynamic> entityMap = _createEntityMap(entity);
      String sql =
          'INSERT OR REPLACE INTO ${T.toString()} (${entityMap.keys.join(", ")}) VALUES (${List.filled(entityMap.keys.length, '?').join(", ")})';
      List<dynamic> args = entityMap.values.toList();

      batch.rawInsert(sql, args);
    }
    await batch.commit(noResult: true);
    return entities;
  }

  @override
  Future<void> hardDelete() async {
    await _database.execute('DROP TABLE IF EXISTS ${T.toString()}');
    SQfliteSyncConfiguration configuration = FastSync.getSyncConfiguration();
    await configuration.createDataBaseForType(type: T.toString());
  }

  @override
  Future<int> count() async {
    var res = await _database
        .rawQuery('SELECT COUNT(*) FROM ${T.toString()} WHERE deleted = 0');
    int? count = Sqflite.firstIntValue(res);
    return count ?? 0;
  }

  @override
  Future<T?> findById(String id) async {
    List<Map<String, dynamic>> maps = await _database.query(
      T.toString(),
      where: 'id = ?',
      whereArgs: [id],
    );
    if (maps.isNotEmpty) {
      return _createEntityFromJson(maps.first);
    }
    return null;
  }

  @override
  Future<List<T>> findByIds(List<String> ids) async {
    if (ids.isEmpty) {
      return [];
    }
    String placeholders = List.filled(ids.length, '?').join(', ');
    List<Map<String, dynamic>> maps = await _database.query(
      T.toString(),
      where: 'id IN ($placeholders)',
      whereArgs: ids,
    );
    return maps.map((map) => _createEntityFromJson(map)).toList();
  }

  @override
  Future<List<T>> getAll() async {
    List<Map<String, dynamic>> maps = await _database.query(T.toString());
    if (maps.isNotEmpty) {
      return List<T>.from(maps.map((map) => _createEntityFromJson(map)));
    }
    return [];
  }

  @override
  Future<void> dispose() async {
    if (_database.isOpen) {
      _database.close();
    }
  }
}
