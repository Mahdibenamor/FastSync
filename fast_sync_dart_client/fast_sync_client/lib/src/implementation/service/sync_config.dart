import 'package:fast_sync_client/fast_sync_client.dart';

class SyncConfiguration implements ISyncConfiguration {
  List<String> syncableTypes = [];
  Map<String, dynamic> namedInstances = {};
  SyncConfiguration() {
    init();
  }

  void init() {
    setSyncManager(SyncManager());
  }

  @override
  void setSyncableObject<T extends ISyncableObject>(String entityType,
      Function fromJson, Function toJson, ISyncableRepository<T> repository,
      [SyncZoneRestrictionEnum? syncZoneRestriction,
      IConflictsHandler? conflictsHandler]) {
    syncableTypes.add(entityType);
    setSyncZoneTypeConfiguration(entityType, syncZoneRestriction);
    setObjectConflictsHandler(entityType, conflictsHandler);
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

  @override
  void setObjectConflictsHandler(
      String entityType, IConflictsHandler? conflictsHandler) {
    if (conflictsHandler != null) {
      namedInstances[entityType + Constants.conflictsHandlerName] =
          conflictsHandler;
    } else {
      throw Exception(
          'ConflictsHandler of the $entityType is not configured well, please check the configuration');
    }
  }

  @override
  IConflictsHandler getObjectConflictsHandler(String type) {
    IConflictsHandler conflictsHandler =
        namedInstances[type + Constants.conflictsHandlerName];
    if (conflictsHandler != null) {
      return conflictsHandler;
    } else {
      throw Exception(
          'ConflictsHandler of the $type is not configured well, please check the configuration');
    }
  }

  void setSyncZoneTypeConfiguration(
      String entityType, SyncZoneRestrictionEnum? syncZoneRestriction) {
    if (syncZoneRestriction != null) {
      //Container.set(entityType + Constants.syncZoneRestriction, syncZoneRestriction);
    } else {
      throw Exception(
          'SyncZoneRestriction of the $entityType is not be undefined');
    }
  }

  SyncZoneRestrictionEnum getSyncZoneConfiguration(String type) {
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
    ISyncManager syncManager = namedInstances['ISyncManager'];
    if (syncManager != null) {
      return syncManager;
    } else {
      throw Exception(
          'Sync manager should not be null, be check your sync configuration class');
    }
  }

  void setSyncManager(ISyncManager syncManager) {
    if (syncManager != null) {
      namedInstances['ISyncManager'] = syncManager;
    } else {
      throw Exception(
          'Sync manager should not be null, be check your sync configuration class');
    }
  }

  @override
  void setHttpManager(IhttpManager httpManager) {
    namedInstances['IhttpManager'] = httpManager;
  }

  @override
  IhttpManager getHttpManager() {
    IhttpManager httpManager = namedInstances['IhttpManager'];
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

  ToJsonFunction<T> getTypeForToJsonFunction<T>(String type) {
    ToJsonFunction<T> toJson = namedInstances[type + Constants.toJsonName];
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
}
