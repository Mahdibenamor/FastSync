abstract class ISyncableDataSource<T> {
  Future<List<T>> addMany(List<T> entities);
  Future<T> add(T entity);
  Future<void> hardDelete();
  Future<List<T>> updateMany(List<T> entities);
  Future<List> syncUpdate(List entities);
  Future<T> update(String id, T entity);
  Future<List<T>> getAll();
  Future<T?> findById(String id);
  Future<List<T>> findByIds(List<String> ids);
  Future<int> count();
  Future<void> dispose();
}
