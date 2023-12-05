import 'package:fast_sync_client/fast_sync_client.dart';

abstract class ISyncConfiguration {
  void setSyncableObject<T extends ISyncableObject>(String entityType,
      Function fromJson, Function toJson, ISyncableRepository<T> repository);
  void setObjectRepository<T extends ISyncableObject>(
      String entityType, ISyncableRepository<T> repository);
  ISyncableRepository<T> getObjectRepository<T extends ISyncableObject>(
      String type);
  ISyncManager getSyncManager();
  IhttpManager getHttpManager();
  void setHttpManager(IhttpManager httpManager);
  void setSyncVersionManager(SyncVersionManager syncVersionManager);
  SyncVersionManager getSyncVersionManager();
}
