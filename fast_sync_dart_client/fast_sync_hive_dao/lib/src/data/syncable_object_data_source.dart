import 'package:fast_sync_client/fast_sync_client.dart';
import 'package:fast_sync_hive_dao/fast_sync_hive_dao.dart';
import 'package:hive/hive.dart';

class SyncalbeObjectDataSource<T extends SyncableItemModel>
    implements ISyncableDataSource<T> {
  Box<T>? _boxInstance;

  SyncalbeObjectDataSource();

  @override
  Future<T> add(T entity) async {
    final Box<T> box = await boxInstance;
    entity.metadata.syncOperation = SyncOperationEnum.add.code;
    entity.dirty = true;
    await box.add(entity);
    return entity;
  }

  @override
  Future<List<T>> addMany(List<T> entities) async {
    Map<String, T> entitiesMap = {};
    for (var entity in entities) {
      entity.metadata.syncOperation = SyncOperationEnum.add.code;
      entity.dirty = true;
      entitiesMap[entity.id] = entity;
    }
    final Box<T> box = await boxInstance;
    await box.putAll(entitiesMap);
    return entities;
  }

  @override
  Future<T> delete(T entity) async {
    final Box<T> box = await boxInstance;
    entity.deleted = true;
    entity.metadata.syncOperation = SyncOperationEnum.delete.code;
    entity.dirty = true;
    await box.add(entity);
    return entity;
  }

  @override
  Future<List<T>> deleteMany(List<T> entities) async {
    Map<String, T> entitiesMap = {};
    for (var entity in entities) {
      entity.deleted = true;
      entity.metadata.syncOperation = SyncOperationEnum.delete.code;
      entity.dirty = true;
      entitiesMap[entity.id] = entity;
    }
    final Box<T> box = await boxInstance;
    await box.putAll(entitiesMap);
    return entities;
  }

  @override
  Future<T> update(String query, T entity) async {
    entity.metadata.syncOperation = SyncOperationEnum.update.code;
    entity.dirty = true;
    final Box<T> box = await boxInstance;
    await box.put(query, entity);
    return entity;
  }

  @override
  Future<List<T>> updateMany(List<T> entities) async {
    Map<String, T> entitiesMap = {};
    for (var entity in entities) {
      entity.metadata.syncOperation = SyncOperationEnum.update.code;
      entity.dirty = true;
      entitiesMap[entity.id] = entity;
    }

    final Box<T> box = await boxInstance;
    await box.putAll(entitiesMap);
    return entities;
  }

  @override
  Future<List<T>> syncUpdate(List<T> entities) async {
    Map<String, T> entitiesMap = {};
    for (var entity in entities) {
      entity.dirty = false;
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
    var item = box.get(id);
    if (item != null) {
      if (item.deleted) {
        return null;
      }
      return item;
    } else {
      return null;
    }
  }

  @override
  Future<List<T>> getAll() async {
    final Box<T> box = await boxInstance;
    return box.toMap().values.where(_undoRemovedEntities).toList();
  }

  @override
  Future<List<T>> query(bool Function(T) query) async {
    final Box<T> box = await boxInstance;
    return box.toMap().values.where(query).toList();
  }

  bool _undoRemovedEntities(T entity) {
    return !entity.deleted;
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
