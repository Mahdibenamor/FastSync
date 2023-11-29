import 'package:fast_sync_client/fast_sync_client.dart';

class SyncalbeRepository<T extends ISyncableObject>
    implements ISyncableRepository<T> {
  final ISyncableDataSource<T> dataSource;

  SyncalbeRepository({required this.dataSource});

  @override
  Future<T> add(T entity) async {
    entity.metadata.syncOperation = SyncOperationEnum.add.code;
    entity.dirty = true;
    return await dataSource.add(entity);
  }

  @override
  Future<List<T>> addMany(List<T> entities, ISyncMetadata metadata) async {
    List<T> entitiesToSave = [];
    for (var entity in entities) {
      entity.metadata.syncOperation = SyncOperationEnum.add.code;
      entity.dirty = true;
      entitiesToSave.add(entity);
    }
    return await dataSource.addMany(entitiesToSave);
  }

  @override
  Future<int> count() async {
    return await dataSource.count();
  }

  @override
  void dispose() async {
    return await dataSource.dispose();
  }

  @override
  Future<T?> findById(String id) async {
    var item = await dataSource.findById(id);
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
    List<T> items = await dataSource.getAll();
    return items.where(_undoRemovedEntities).toList();
  }

  @override
  Future<List<T>> query(bool Function(T) query) async {
    return await dataSource.query(query);
  }

  @override
  Future<List<T>> removeMany(List<T> entities, ISyncMetadata metadata) async {
    List<T> entitiesToSave = [];
    for (var entity in entities) {
      entity.deleted = true;
      entity.metadata.syncOperation = SyncOperationEnum.delete.code;
      entity.dirty = true;
      entitiesToSave.add(entity);
    }
    return await this.dataSource.deleteMany(entitiesToSave);
  }

  @override
  Future<T> update(String id, T entity) async {
    entity.metadata.syncOperation = SyncOperationEnum.update.code;
    entity.dirty = true;
    return await dataSource.update(id, entity);
  }

  @override
  Future<List<T>> updateMany(List<T> entities, ISyncMetadata metadata) async {
    List<T> entitiesToSave = [];
    for (var entity in entities) {
      entity.metadata.syncOperation = SyncOperationEnum.update.code;
      entity.dirty = true;
      entitiesToSave.add(entity);
    }
    return await dataSource.updateMany(entitiesToSave);
  }

  @override
  Future<List> undirtyList(List entities) async {
    List entitiesToSave = [];
    for (var entity in entities) {
      entity.dirty = false;
      entitiesToSave.add(entity);
    }
    return await dataSource.syncUpdate(entitiesToSave);
  }

  @override
  Future<List<T>> processSyncResultForType(
      List<T> entities, ISyncMetadata metadata) {
    // TODO: implement processSyncResultForType
    throw UnimplementedError();
  }

  bool _undoRemovedEntities(T entity) {
    return !entity.deleted;
  }
}
