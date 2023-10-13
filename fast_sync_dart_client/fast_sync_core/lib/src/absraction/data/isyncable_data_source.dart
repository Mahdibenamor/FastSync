import 'package:fast_sync_client/src/absraction/metadata/isync_metadata.dart';

abstract class ISyncableDataSource<T> {
  Future<T> add(T entity);
  Future<T> update(dynamic query, T entity);
  Future<T> findById(String id);
  Future<List<T>> getAll();
  Future<List<T>> query(dynamic query);
  Future<int> count();
  Future<List<T>> updateMany(List<T> entities);
  Future<List<T>> addMany(List<T> entities);
  Future<List<T>> fetchMany(ISyncMetadata syncMetadata);
  void dispose();
}
