import 'package:fast_sync_client/fast_sync_client.dart';

abstract class ISyncConfiguration {
  void setSyncableObject<T extends ISyncableObject>(String entityType,
      Function fromJson, Function toJson, ISyncableRepository<T> repository,
      [SyncZoneRestrictionEnum? syncZoneRestriction,
      IConflictsHandler? conflictsHandler]);
  void setObjectRepository<T extends ISyncableObject>(
      String entityType, ISyncableRepository<T> repository);
  void setObjectConflictsHandler(
      String entityType, IConflictsHandler conflictsHandler);
  IConflictsHandler getObjectConflictsHandler(String type);
  ISyncableRepository<T> getObjectRepository<T extends ISyncableObject>(
      String type);
  ISyncManager getSyncManager();
  IhttpManager getHttpManager();
  void setHttpManager(IhttpManager httpManager);
  void setSyncVersionManager(SyncVersionManager syncVersionManager);
  SyncVersionManager getSyncVersionManager();
}
