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
      Function fromJson, Function toJson, ISyncableRepository<T> repository,
      [SyncZoneRestrictionEnum? syncZoneRestriction]) {
    syncableTypes.add(entityType);
    setSyncZoneTypeConfiguration(entityType, syncZoneRestriction);
    setObjectRepository(entityType, repository);
    setTypeForFromJsonFunction(entityType, fromJson);
    setTypeForToJsonFunction(entityType, toJson);
  }

  @override
  void setObjectRepository<T extends ISyncableObject>(
      String entityType, ISyncableRepository<T> repository) {
    if (repository != null) {
      namedInstances[entityType + Constants.repositoryName] = repository;
    } else {
      throw Exception(
          'Repository of the $entityType is not configured well, please check the configuration');
    }
  }

  void setSyncZoneTypeConfiguration(
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
    if (syncZoneRestriction != null) {
      return syncZoneRestriction;
    } else {
      throw Exception('SyncZoneRestriction of the $type is not be undefined');
    }
  }

  @override
  ISyncableRepository<T> getObjectRepository<T extends ISyncableObject>(
      String type) {
    ISyncableRepository<T> repository =
        namedInstances[type + Constants.repositoryName];
    if (repository != null) {
      return repository;
    } else {
      throw Exception(
          'Repository of the $type is not configured well, please check the configuration');
    }
  }

  @override
  ISyncManager getSyncManager() {
    ISyncManager syncManager = namedInstances[Constants.syncManagerName];
    if (syncManager != null) {
      return syncManager;
    } else {
      throw Exception(
          'Sync manager should not be null, be check your sync configuration class');
    }
  }

  void setSyncManager(ISyncManager syncManager) {
    if (syncManager != null) {
      namedInstances[Constants.syncManagerName] = syncManager;
    } else {
      throw Exception(
          'Sync manager should not be null, be check your sync configuration class');
    }
  }

  @override
  void setHttpManager(IhttpManager httpManager) {
    namedInstances[Constants.httpManagerName] = httpManager;
  }

  @override
  IhttpManager getHttpManager() {
    IhttpManager httpManager = namedInstances[Constants.httpManagerName];
    if (httpManager != null) {
      return httpManager;
    } else {
      throw Exception(
          'httpManager should not be null, be check your sync configuration class');
    }
  }

  void setTypeForToJsonFunction(String type, Function toJson) {
    namedInstances[type + Constants.toJsonName] = toJson;
  }

  void setTypeForFromJsonFunction(String type, Function fromJson) {
    namedInstances[type + Constants.fromJsonName] = fromJson;
  }

  Function getTypeForToJsonFunction<T>(String type) {
    Function toJson = namedInstances[type + Constants.toJsonName];
    if (toJson != null) {
      return toJson;
    } else {
      throw Exception(
          'toJson of type: $type should not be null, be check your sync configuration class');
    }
  }

  Function getTypeForFromJsonFunction(String type) {
    Function fromJson = namedInstances[type + Constants.fromJsonName];
    if (fromJson != null) {
      return fromJson;
    } else {
      throw Exception(
          'fromJson of type: $type should not be null, be check your sync configuration class');
    }
  }

  @override
  SyncVersionManager getSyncVersionManager() {
    SyncVersionManager syncVersionManager =
        namedInstances[Constants.syncVersionManagerName];
    if (syncVersionManager != null) {
      return syncVersionManager;
    } else {
      throw Exception(
          'syncVersionManager should not be null, be check your sync configuration class');
    }
  }

  @override
  void setSyncVersionManager(SyncVersionManager syncVersionManager) {
    namedInstances[Constants.syncVersionManagerName] = syncVersionManager;
  }

  setTypeSyncZone(String type, String syncZone) {
    _typesSyncZones[type] = syncZone;
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
