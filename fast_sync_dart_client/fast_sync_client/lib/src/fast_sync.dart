import 'package:fast_sync_client/fast_sync_client.dart';

class FastSync<V extends SyncConfiguration> {
  static FastSync? _instance;
  V? _syncConfiguration;

  FastSync._();

  static FastSync getInstance<V extends SyncConfiguration>(
      [V? syncConfiguration]) {
    _instance ??= FastSync._();
    if (_instance?._syncConfiguration == null && syncConfiguration != null) {
      FastSync.setSyncConfiguration(syncConfiguration);
    }
    return _instance!;
  }

  static void setSyncConfiguration<V extends SyncConfiguration>(
      V syncConfiguration) {
    _instance ??= FastSync._();
    _instance!._syncConfiguration = syncConfiguration;
  }

  static getSyncConfiguration<V extends SyncConfiguration>() {
    return _instance!._syncConfiguration!;
  }

  static getSyncableTypes() {
    return _instance!._syncConfiguration!.syncableTypes;
  }

  static void setSyncableObject<T extends ISyncableObject>(
      {required Function fromJson,
      required Function toJson,
      required ISyncableRepository<T> repository,
      IConflictsHandler? conflictsHandler,
      SyncZoneRestrictionEnum syncZoneRestriction =
          SyncZoneRestrictionEnum.global}) {
    final syncConfiguration = _instance!._syncConfiguration!;
    syncConfiguration.setSyncableObject(T.runtimeType.toString(), fromJson,
        toJson, repository, syncZoneRestriction, conflictsHandler);
    setSyncConfiguration(syncConfiguration);
  }

  static IConflictsHandler getObjectConflictsHandler(String type) {
    return _instance!._syncConfiguration!.getObjectConflictsHandler(type);
  }

  static ISyncableRepository<T> getObjectRepository<T extends ISyncableObject>(
      String type) {
    return _instance!._syncConfiguration!.getObjectRepository(type);
  }

  static SyncZoneRestrictionEnum getSyncZoneConfiguration(String type) {
    return _instance!._syncConfiguration!.getSyncZoneConfiguration(type);
  }

  static ISyncManager getSyncManager() {
    return _instance!._syncConfiguration!.getSyncManager();
  }

  static void setHttpManager(IhttpManager httpManager) {
    _instance!._syncConfiguration!.setHttpManager(httpManager);
  }

  static IhttpManager getHttpManager() {
    return _instance!._syncConfiguration!.getHttpManager();
  }
}
