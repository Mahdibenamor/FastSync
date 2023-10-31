abstract class IBaseRepository<T> {
  Future<T> add(T entity);
  Future<T> update(String id, T entity);
  Future<T?> findById(String id);
  Future<List<T>> getAll();
  Future<List<T>> query(dynamic filter);
  Future<int> count();
  void dispose();
}
