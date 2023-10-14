import 'package:fast_sync_client/fast_sync_client.dart';

class SyncalbeObjectDataSource implements ISyncableDataSource {
  @override
  Future add(entity) {
    // TODO: implement addMany
    throw UnimplementedError();
  }

  @override
  Future<List> addMany(List entities) {
    // TODO: implement addMany
    throw UnimplementedError();
  }

  @override
  Future<int> count() {
    // TODO: implement count
    throw UnimplementedError();
  }

  @override
  void dispose() {
    // TODO: implement dispose
  }

  @override
  Future<List> fetchMany(ISyncMetadata syncMetadata) {
    // TODO: implement fetchMany
    throw UnimplementedError();
  }

  @override
  Future findById(String id) {
    // TODO: implement findById
    throw UnimplementedError();
  }

  @override
  Future<List> getAll() {
    // TODO: implement getAll
    throw UnimplementedError();
  }

  @override
  Future<List> query(query) {
    // TODO: implement query
    throw UnimplementedError();
  }

  @override
  Future update(query, entity) {
    // TODO: implement update
    throw UnimplementedError();
  }

  @override
  Future<List> updateMany(List entities) {
    // TODO: implement updateMany
    throw UnimplementedError();
  }
}
