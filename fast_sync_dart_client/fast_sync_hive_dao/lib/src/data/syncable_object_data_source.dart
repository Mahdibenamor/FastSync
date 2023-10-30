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
    await box.add(entity);
    return entity;
  }

  @override
  Future<List<T>> addMany(List<T> entities) async {
    final Box<T> box = await boxInstance;
    await box.addAll(entities);
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
  Future<void> dispose() async {
    final Box<T> box = await boxInstance;
    await box.close();
  }

  @override
  Future<List<T>> fetchMany(ISyncMetadata syncMetadata) {
    throw Exception("");
  }

  @override
  Future<T?> findById(String id) async {
    final Box<T> box = await boxInstance;
    var item = box.get(id);
    return item;
  }

  @override
  Future<List<T>> getAll() async {
    final Box<T> box = await boxInstance;
    return box.toMap().values.toList();
  }

  @override
  Future<List<T>> query(query) async {
    if (query is! bool Function(T)) {
      throw ArgumentError('query must be of type bool Function(T)');
    }
    final Box<T> box = await boxInstance;
    box.toMap().values.where(query);
    return box.toMap().values.where(query).toList();
  }

  @override
  Future<T> update(String query, T entity) async {
    final Box<T> box = await boxInstance;
    await box.put(query, entity);
    return entity;
  }

  @override
  Future<List<T>> updateMany(List<T> entities) async {
    Map<String, T> entitiesMap = {
      for (var entity in entities) entity.id: entity
    };
    final Box<T> box = await boxInstance;
    await box.putAll(entitiesMap);
    return entities;
  }

  Future<void> _init() async {
    // HiveSyncConfiguration instance =
    //     FastSync.getSyncConfiguration<HiveSyncConfiguration>();
    _boxInstance = await Hive.openBox(T.toString());
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
