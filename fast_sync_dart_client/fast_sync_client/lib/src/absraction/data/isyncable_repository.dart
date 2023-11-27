import 'package:fast_sync_client/src/absraction/data/base_repository.dart';
import 'package:fast_sync_client/src/absraction/metadata/isync_metadata.dart';

abstract class ISyncableRepository<T> extends IBaseRepository<T> {
  Future<List<T>> updateMany(List<T> entities, ISyncMetadata metadata);
  Future<List<T>> addMany(List<T> entities, ISyncMetadata metadata);
  Future<List<T>> removeMany(List<T> entities, ISyncMetadata metadata);
  Future<List<T>> undirtyList(List<T> entities);
  Future<List<T>> processSyncResultForType(
      List<T> entities, ISyncMetadata metadata);
}
