import 'package:fast_sync_client/fast_sync_client.dart';

class SyncalbeRepository<T extends ISyncableObject>
    implements ISyncableRepository<T> {
  final ISyncableDataSource<T> dataSource;

  ISyncableDataSource<ISyncMetadata> get syncMetadataDataSource {
    return FastSync.getSyncVersionManager().syncMetadataDataSource;
  }

  SyncalbeRepository({required this.dataSource});

  @override
  Future<T> add(T entity) async {
    entity.metadata.syncOperation = SyncOperationEnum.add.code;
    entity.metadata.type = T.toString();
    entity.metadata.syncZone = FastSync.getTypeSyncZone(T.toString());
    entity = _dirtyObject(entity);
    return await dataSource.add(entity);
  }

  @override
  Future<List<T>> addMany(List<T> entities, ISyncMetadata metadata) async {
    List<T> entitiesToSave = [];
    for (var entity in entities) {
      entity.metadata.syncOperation = SyncOperationEnum.add.code;
      entity.metadata.type = T.toString();
      entity.metadata.syncZone = FastSync.getTypeSyncZone(T.toString());
      entity = _dirtyObject(entity);
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
      entity.metadata.type = T.toString();
      entity = _dirtyObject(entity);
      entitiesToSave.add(entity);
    }
    return await this.dataSource.deleteMany(entitiesToSave);
  }

  @override
  Future<T> update(T entity) async {
    entity.metadata.syncOperation = SyncOperationEnum.update.code;
    entity.metadata.type = T.toString();
    entity = _dirtyObject(entity);
    return await dataSource.update(entity.id, entity);
  }

  @override
  Future<List<T>> updateMany(List<T> entities, ISyncMetadata metadata) async {
    List<T> entitiesToSave = [];
    for (var entity in entities) {
      entity.metadata.syncOperation = SyncOperationEnum.update.code;
      entity.metadata.type = T.toString();
      entity = _dirtyObject(entity);
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
  Future<void> hardDelete() async {
    SyncVersionManager versionManager = FastSync.getSyncVersionManager();
    await dataSource.hardDelete();
    await versionManager.resetTypeSyncVersion(T.toString());
  }

  bool _undoRemovedEntities(T entity) {
    return !entity.deleted;
  }

  T _dirtyObject(T object) {
    if (!object.dirty) {
      object.dirty = true;
      object.metadata.version++;
    }
    return object;
  }
}
