import 'package:dio/dio.dart';
import 'package:fast_sync_client/fast_sync_client.dart';
import 'package:fast_sync_client/src/absraction/models/sync_operation_metadata.dart';
import 'package:fast_sync_client/src/absraction/models/sync_payload.dart';

class HttpManager implements IhttpManager {
  final dio = Dio();
  HttpManager();

  @override
  Future<SyncPayload> pull(SyncOperationMetadata metadata) async {
    Response response = await dio
        .post('https://fast-sync.onrender.com/express/pull', data: metadata);

    return SyncPayload();
  }

  @override
  Future<void> push(SyncPayload payload) async {}

  @override
  Future<SyncPayload> sync(SyncOperationMetadata metadata) async {
    return SyncPayload();
  }
}
