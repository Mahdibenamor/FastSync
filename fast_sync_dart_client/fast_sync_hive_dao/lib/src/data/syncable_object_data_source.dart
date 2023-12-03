import 'package:fast_sync_client/fast_sync_client.dart';
import 'package:hive/hive.dart';

class SyncalbeObjectDataSource<T extends IWithId>
    implements ISyncableDataSource<T> {
  Box<T>? _boxInstance;

  SyncalbeObjectDataSource();

  @override
  Future<T> add(T entity) async {
    final Box<T> box = await boxInstance;
    await box.put(entity.id, entity);
    return entity;
  }

  @override
  Future<List<T>> addMany(List<T> entities) async {
    Map<String, T> entitiesMap = {};
    for (var entity in entities) {
      entitiesMap[entity.id] = entity;
    }
    final Box<T> box = await boxInstance;
    await box.putAll(entitiesMap);
    return entities;
  }

  @override
  Future<List<T>> deleteMany(List<T> entities) async {
    Map<String, T> entitiesMap = {};
    for (var entity in entities) {
      entitiesMap[entity.id] = entity;
    }
    final Box<T> box = await boxInstance;
    await box.putAll(entitiesMap);
    return entities;
  }

  @override
  Future<T> update(String id, T entity) async {
    final Box<T> box = await boxInstance;
    await box.put(id, entity);
    return entity;
  }

  @override
  Future<List<T>> updateMany(List<T> entities) async {
    Map<String, T> entitiesMap = {};
    for (var entity in entities) {
      entitiesMap[entity.id] = entity;
    }

    final Box<T> box = await boxInstance;
    await box.putAll(entitiesMap);
    return entities;
  }

  @override
  Future<void> hardDelete() async {
    final Box<T> box = await boxInstance;
    await box.clear();
  }

  @override
  Future<List> syncUpdate(List entities) async {
    Map<String, T> entitiesMap = {};
    for (var entity in entities) {
      entitiesMap[entity.id] = entity;
    }
    final Box<T> box = await boxInstance;
    await box.putAll(entitiesMap);
    return entities;
  }

  @override
  Future<int> count() async {
    final Box<T> box = await boxInstance;
    int count = 0;
    try {
      count = await box.toMap().values.length;
    } catch (err) {
      count = 0;
    }
    return count;
  }

  @override
  Future<T?> findById(String id) async {
    final Box<T> box = await boxInstance;
    return box.get(id);
  }

  @override
  Future<List<T>> getAll() async {
    final Box<T> box = await boxInstance;
    return box.toMap().values.toList();
  }

  @override
  Future<List<T>> query(bool Function(T) query) async {
    final Box<T> box = await boxInstance;
    return box.toMap().values.where(query).toList();
  }

  Future<void> _init() async {
    _boxInstance = await Hive.openBox(T.toString());
  }

  @override
  Future<void> dispose() async {
    final Box<T> box = await boxInstance;
    await box.close();
  }

  Future<Box<T>> _openBox() async {
    if (_boxInstance == null) {
      await _init();
      return _boxInstance!;
    }
    if (!_boxInstance!.isOpen) {
      await _init();
      return _boxInstance!;
    }
    return _boxInstance!;
  }

  Future<Box<T>> get boxInstance async {
    return await _openBox();
  }

  Future<List<String>> get keys async {
    final Box<T> box = await boxInstance;
    final List<String> result = box.keys.map((k) => k.toString()).toList();
    return result;
  }
}
