import 'package:dio/dio.dart';
import 'package:fast_sync_client/fast_sync_client.dart';

class HttpManager implements IhttpManager {
  final dio = Dio();
  HttpManager();

  @override
  Future<SyncPayload> pull(SyncOperationMetadata metadata) async {
    // Response response = await dio
    //     .post('https://fast-sync.onrender.com/express/pull', data: metadata);

    return SyncPayload();
  }

  @override
  Future<void> push(SyncPayload payload) async {
    var json = payload.toJson();
    print(json);
  }

  @override
  Future<SyncPayload> sync(SyncOperationMetadata metadata) async {
    return SyncPayload();
  }
}
