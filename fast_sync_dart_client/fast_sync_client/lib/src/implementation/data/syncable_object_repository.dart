import 'package:fast_sync_client/fast_sync_client.dart';

class SyncalbeRepository<T extends ISyncableObject>
    implements ISyncableRepository<T> {
  final ISyncableDataSource<T> dataSource;

  SyncalbeRepository({required this.dataSource});

  @override
  Future<T> add(T entity) async {
    return await dataSource.add(entity);
  }

  @override
  Future<List<T>> addMany(List<T> entities, ISyncMetadata metadata) async {
    return await dataSource.addMany(entities);
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
  Future<List<T>> fetchMany(ISyncMetadata metadata) async {
    return await dataSource.fetchMany(metadata);
  }

  @override
  Future<T> findById(String id) async {
    return await dataSource.findById(id);
  }

  @override
  Future<List<T>> getAll() async {
    return await dataSource.getAll();
  }

  @override
  Future<List<T>> query(filter) async {
    return await dataSource.query(filter);
  }

  @override
  Future<List<T>> removeMany(List<T> entities, ISyncMetadata metadata) async {
    throw Exception();
  }

  @override
  Future<T> update(String id, T entity) async {
    return await dataSource.update(id, entity);
  }

  @override
  Future<List<T>> updateMany(List<T> entities, ISyncMetadata metadata) async {
    return await dataSource.updateMany(entities);
  }
}
