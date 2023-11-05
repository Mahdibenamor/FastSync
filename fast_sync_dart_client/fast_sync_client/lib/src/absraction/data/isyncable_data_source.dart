abstract class ISyncableDataSource<T> {
  Future<List<T>> addMany(List<T> entities);
  Future<T> add(T entity);
  Future<List<T>> deleteMany(List<T> entities);
  Future<T> delete(T entity);
  Future<List<T>> updateMany(List<T> entities);
  Future<List<T>> syncUpdate(List<T> entities);
  Future<T> update(String query, T entity);
  Future<List<T>> getAll();
  Future<T?> findById(String id);
  Future<List<T>> query(bool Function(T) query);
  Future<int> count();
  Future<void> dispose();
}
