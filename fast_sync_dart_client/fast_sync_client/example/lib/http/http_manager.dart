import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:fast_sync_client/fast_sync_client.dart';

class HttpManager implements IhttpManager {
  final dio = Dio();
  HttpManager();

  @override
  Future<SyncPayload> pull(SyncOperationMetadata metadata) async {
    // Response response = await dio
    //     .post('https://localhost:3000/express/pull', data: metadata);

    return SyncPayload();
  }

  @override
  Future<void> push(SyncPayload payload) async {
    var payloadJson = payload.toJson();
    print(payloadJson);
    print(json.encode(payloadJson));
    Response response = await dio.post(
        'http://192.168.178.24:3000/express/push',
        data: json.encode(payloadJson));
    var test = 1 + 1;
  }

  @override
  Future<SyncPayload> sync(SyncOperationMetadata metadata) async {
    return SyncPayload();
  }
}
