abstract class ISyncableDataSource<T> {
  Future<List<T>> addMany(List<T> entities);
  Future<T> add(T entity);
  Future<List<T>> deleteMany(List<T> entities);
  Future<List<T>> updateMany(List<T> entities);
  Future<List> syncUpdate(List entities);
  Future<T> update(String id, T entity);
  Future<List<T>> getAll();
  Future<T?> findById(String id);
  Future<List<T>> query(bool Function(T) query);
  Future<int> count();
  Future<void> dispose();
}
