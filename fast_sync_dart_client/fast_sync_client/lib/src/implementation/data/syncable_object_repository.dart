import 'package:fast_sync_client/fast_sync_client.dart';

class SyncalbeRepository<T extends ISyncableObject>
    implements ISyncableRepository<T> {
  final ISyncableDataSource<T> dataSource;

  ISyncableDataSource<ISyncMetadata> get syncMetadataDataSource {
    return FastSync.getsyncMetadataDataSource();
  }

  SyncalbeRepository({required this.dataSource});

  @override
  Future<T> add(T entity) async {
    entity.metadata.syncOperation = SyncOperationEnum.add.code;
    entity.metadata.type = T.toString();
    entity.metadata.syncZone = FastSync.getTypeSyncZone(T.toString());
    entity = _dirtyObject(entity);
    entity = _linkMetadataId(entity, entity.metadata);
    await syncMetadataDataSource.add(entity.metadata);
    return await dataSource.add(entity);
  }

  @override
  Future<List<T>> addMany(List<T> entities, ISyncMetadata metadata) async {
    List<T> entitiesToSave = [];
    List<ISyncMetadata> metadataTosave = [];
    for (var entity in entities) {
      entity.metadata.syncOperation = SyncOperationEnum.add.code;
      entity.metadata.type = T.toString();
      entity.metadata.syncZone = FastSync.getTypeSyncZone(T.toString());
      entity = _dirtyObject(entity);
      entity = _linkMetadataId(entity, entity.metadata);
      entitiesToSave.add(entity);
      metadataTosave.add(entity.metadata);
    }
    await syncMetadataDataSource.addMany(metadataTosave);
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
    String metadataId = item?.metadataId as String;
    var metadata = await syncMetadataDataSource.findById(metadataId);
    if (item != null && metadata != null) {
      if (item.deleted) {
        return null;
      }
      item.metadata = metadata;
      return item;
    } else {
      return null;
    }
  }

  @override
  Future<List<T>> getAll() async {
    List<T> items = await dataSource.getAll();
    List<T> itemsToReturn = [];
    items = items.where(_undoRemovedEntities).toList();
    List<String> metadataIds = items.map((m) => m.metadataId).toList();
    List<ISyncMetadata> metadatas =
        await this.syncMetadataDataSource.findByIds(metadataIds);
    var metadataDict = createDict(metadatas);
    for (var entity in items) {
      entity.metadata = (metadataDict[entity.metadataId]) as ISyncMetadata;
      itemsToReturn.add(entity);
    }
    return itemsToReturn;
  }

  @override
  Future<List<T>> query(bool Function(T) query) async {
    List<T> items = await this.getAll();
    List<T> filteredItems = items.where(query).toList();
    return filteredItems;
  }

  @override
  Future<List<T>> removeMany(List<T> entities, ISyncMetadata metadata) async {
    List<T> entitiesToSave = [];
    List<ISyncMetadata> metadataTosave = [];
    for (var entity in entities) {
      entity.deleted = true;
      entity.metadata.syncOperation = SyncOperationEnum.delete.code;
      entity.metadata.type = T.toString();
      entity = _dirtyObject(entity);
      entity = _linkMetadataId(entity, entity.metadata);
      entitiesToSave.add(entity);
      metadataTosave.add(entity.metadata);
    }
    await syncMetadataDataSource.updateMany(metadataTosave);
    return await this.dataSource.updateMany(entitiesToSave);
  }

  @override
  Future<T> update(T entity) async {
    entity.metadata.syncOperation = SyncOperationEnum.update.code;
    entity.metadata.type = T.toString();
    entity = _dirtyObject(entity);
    entity = _linkMetadataId(entity, entity.metadata);
    await syncMetadataDataSource.update(entity.metadata.id, entity.metadata);
    return await dataSource.update(entity.id, entity);
  }

  @override
  Future<List<T>> updateMany(List<T> entities, ISyncMetadata metadata) async {
    List<T> entitiesToSave = [];
    List<ISyncMetadata> metadataTosave = [];

    for (var entity in entities) {
      entity.metadata.syncOperation = SyncOperationEnum.update.code;
      entity.metadata.type = T.toString();
      entity = _dirtyObject(entity);
      entity = _linkMetadataId(entity, entity.metadata);
      entitiesToSave.add(entity);
      metadataTosave.add(entity.metadata);
    }
    await syncMetadataDataSource.updateMany(metadataTosave);
    return await dataSource.updateMany(entitiesToSave);
  }

  @override
  Future<List> undirtyList(List entities) async {
    List entitiesToSave = [];
    List<ISyncMetadata> metadataTosave = [];
    for (var entity in entities) {
      entity.dirty = false;
      entity = _linkMetadataId(entity, entity.metadata);
      entitiesToSave.add(entity);
      metadataTosave.add(entity.metadata);
    }
    await dataSource.syncUpdate(entitiesToSave);
    await syncMetadataDataSource.syncUpdate(metadataTosave);
    return entitiesToSave;
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

  T _linkMetadataId(T object, ISyncMetadata metadata) {
    object.metadataId = metadata.id;
    return object;
  }
}
