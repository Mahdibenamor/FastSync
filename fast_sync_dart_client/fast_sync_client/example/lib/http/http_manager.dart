import 'dart:async';
import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:fast_sync_client/fast_sync_client.dart';

class HttpManager implements IhttpManager {
  final dio = Dio();
  HttpManager();

  @override
  Future<SyncPayload> pull(SyncOperationMetadata metadata) async {
    Response response = await dio.post(
        'http://192.168.178.24:3000/express/pull',
        data: json.encode(metadata.toJson()));
    if (response.data["success"] == true) {
      return SyncPayload.fromJson(response.data["data"]);
    }
    return throw Exception('pull failed');
  }

  @override
  Future<bool> push(SyncPayload payload) async {
    Response response = await dio.post(
        'http://192.168.178.24:3000/express/push',
        data: json.encode(payload.toJson()));
    if (response.data["success"] == true) {
      return true;
    }
    return throw Exception('push failed');
  }

  @override
  Future<SyncPayload> sync(SyncOperationMetadata metadata) async {
    return SyncPayload();
  }
}
