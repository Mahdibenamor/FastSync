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

  Future<void> setSyncableObject<T extends ISyncableObject>(
      String entityType, ISyncableRepository<T> repository,
      {IConflictsHandler? conflictsHandler,
      SyncZoneRestrictionEnum syncZoneRestriction =
          SyncZoneRestrictionEnum.global}) async {
    final syncConfiguration = _instance!._syncConfiguration!;
    syncConfiguration.setSyncableObject(
        entityType, repository, syncZoneRestriction, conflictsHandler);
    setSyncConfiguration(syncConfiguration);
  }

  IConflictsHandler getObjectConflictsHandler(String type) {
    return _instance!._syncConfiguration!.getObjectConflictsHandler(type);
  }

  ISyncableRepository<T> getObjectRepository<T extends ISyncableObject>(
      String type) {
    return _instance!._syncConfiguration!.getObjectRepository(type);
  }

  SyncZoneRestrictionEnum getSyncZoneConfiguration(String type) {
    return _instance!._syncConfiguration!.getSyncZoneConfiguration(type);
  }

  ISyncManager getSyncManager() {
    return _instance!._syncConfiguration!.getSyncManager();
  }
}
