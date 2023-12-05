import 'package:fast_sync_client/fast_sync_client.dart';

class SyncConfiguration implements ISyncConfiguration {
  List<String> syncableTypes = [];
  Map<String, dynamic> namedInstances = {};
  final Map<String, String> _typesSyncZones = {};

  SyncConfiguration() {
    init();
  }

  void init() {
    setSyncManager(SyncManager());
  }

  @override
  void setSyncableObject<T extends ISyncableObject>(String entityType,
      Function fromJson, Function toJson, ISyncableRepository<T> repository) {
    syncableTypes.add(entityType);
    setObjectRepository(entityType, repository);
    setTypeForFromJsonFunction(entityType, fromJson);
    setTypeForToJsonFunction(entityType, toJson);
  }

  @override
  void setObjectRepository<T extends ISyncableObject>(
      String entityType, ISyncableRepository<T> repository) {
    namedInstances[entityType + Constants.repositoryName] = repository;
  }

  void setSyncZoneRestriction(
      String entityType, SyncZoneRestrictionEnum? syncZoneRestriction) {
    if (syncZoneRestriction != null) {
      namedInstances[entityType + Constants.syncZoneRestriction] =
          syncZoneRestriction;
    } else {
      throw Exception(
          'SyncZoneRestriction of the $entityType is not be undefined');
    }
  }

  SyncZoneRestrictionEnum getTypeSyncZoneRestriction(String type) {
    SyncZoneRestrictionEnum syncZoneRestriction =
        namedInstances[type + Constants.syncZoneRestriction];
    return syncZoneRestriction;
  }

  @override
  ISyncableRepository<T> getObjectRepository<T extends ISyncableObject>(
      String type) {
    ISyncableRepository<T> repository =
        namedInstances[type + Constants.repositoryName];
    return repository;
  }

  @override
  ISyncManager getSyncManager() {
    ISyncManager syncManager = namedInstances[Constants.syncManagerName];
    return syncManager;
  }

  void setSyncManager(ISyncManager syncManager) {
    namedInstances[Constants.syncManagerName] = syncManager;
  }

  @override
  void setHttpManager(IhttpManager httpManager) {
    namedInstances[Constants.httpManagerName] = httpManager;
  }

  @override
  IhttpManager getHttpManager() {
    IhttpManager httpManager = namedInstances[Constants.httpManagerName];
    return httpManager;
  }

  void setTypeForToJsonFunction(String type, Function toJson) {
    namedInstances[type + Constants.toJsonName] = toJson;
  }

  void setTypeForFromJsonFunction(String type, Function fromJson) {
    namedInstances[type + Constants.fromJsonName] = fromJson;
  }

  Function getTypeForToJsonFunction<T>(String type) {
    Function toJson = namedInstances[type + Constants.toJsonName];
    return toJson;
  }

  Function getTypeForFromJsonFunction(String type) {
    Function fromJson = namedInstances[type + Constants.fromJsonName];
    return fromJson;
  }

  @override
  SyncVersionManager getSyncVersionManager() {
    SyncVersionManager syncVersionManager =
        namedInstances[Constants.syncVersionManagerName];
    return syncVersionManager;
  }

  @override
  void setSyncVersionManager(SyncVersionManager syncVersionManager) {
    namedInstances[Constants.syncVersionManagerName] = syncVersionManager;
  }

  setTypeSyncZone<T>(String type, SyncZoneRestrictionEnum syncZoneRestriction,
      [String? syncZone]) {
    if (syncZoneRestriction == SyncZoneRestrictionEnum.restricted &&
        syncZone == null) {
      throw Exception(
          "if you put syncZoneRestriction to restricted, you need to provide syncZone");
    }
    if (syncZoneRestriction == SyncZoneRestrictionEnum.global) {
      syncZone = Constants.globalSyncZoneRestriction;
    }
    _typesSyncZones[type] = syncZone!;
  }

  String getTypeSyncZone(String type) {
    String? syncZone = _typesSyncZones[type];
    if (syncZone == null) {
      throw Exception(
          'SyncZone for type $type is not configured well, please check the configuration before using syncManager');
    }
    return syncZone;
  }
}
