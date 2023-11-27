import 'dart:async';
import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:fast_sync_client/fast_sync_client.dart';

class HttpManager implements IhttpManager {
  final dio = Dio();
  HttpManager();

  @override
  Future<bool> pull(SyncOperationMetadata metadata) async {
    // Response response = await dio
    //     .post('https://localhost:3000/express/pull', data: metadata);
    return true;
  }

  @override
  Future<bool> push(SyncPayload payload) async {
    Response response = await dio.post(
        'http://192.168.178.24:3000/express/push',
        data: json.encode(payload.toJson()));
    if (response.data["success"] == true) {
      return true;
    }
    return false;
  }

  @override
  Future<SyncPayload> sync(SyncOperationMetadata metadata) async {
    return SyncPayload();
  }
}
