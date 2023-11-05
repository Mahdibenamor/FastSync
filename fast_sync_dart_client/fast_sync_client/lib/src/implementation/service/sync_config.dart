import 'package:fast_sync_client/fast_sync_client.dart';
import 'package:fast_sync_client/src/absraction/service/isync_config.dart';
import 'package:get_it/get_it.dart';

class SyncConfiguration implements ISyncConfiguration {
  final GetIt _container = GetIt.instance;
  List<String> syncableTypes = [];
  SyncConfiguration() {
    init();
  }

  void init() {
    setSyncManager(SyncManager());
  }

  @override
  void setSyncableObject<T extends ISyncableObject>(
      String entityType, ISyncableRepository<T> repository,
      [SyncZoneRestrictionEnum? syncZoneRestriction,
      IConflictsHandler? conflictsHandler]) {
    syncableTypes.add(entityType);
    setSyncZoneTypeConfiguration(entityType, syncZoneRestriction);
    setObjectConflictsHandler(entityType, conflictsHandler);
    setObjectRepository(entityType, repository);
  }

  @override
  void setObjectRepository<T extends ISyncableObject>(
      String entityType, ISyncableRepository<T> repository) {
    if (repository != null) {
      _container.registerSingleton(repository,
          instanceName: entityType + Constants.repositoryName);
    } else {
      throw Exception(
          'Repository of the $entityType is not configured well, please check the configuration');
    }
  }

  @override
  void setObjectConflictsHandler(
      String entityType, IConflictsHandler? conflictsHandler) {
    if (conflictsHandler != null) {
      _container.registerSingleton(conflictsHandler,
          instanceName: entityType + Constants.conflictsHandlerName);
    } else {
      throw Exception(
          'ConflictsHandler of the $entityType is not configured well, please check the configuration');
    }
  }

  @override
  IConflictsHandler getObjectConflictsHandler(String type) {
    IConflictsHandler conflictsHandler =
        _container(instanceName: type + Constants.conflictsHandlerName);
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
        _container(instanceName: type + Constants.syncZoneRestriction);
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
        _container(instanceName: type + Constants.repositoryName);
    if (repository != null) {
      return repository;
    } else {
      throw Exception(
          'Repository of the $type is not configured well, please check the configuration');
    }
  }

  @override
  ISyncManager getSyncManager() {
    ISyncManager syncManager = _container<ISyncManager>();
    if (syncManager != null) {
      return syncManager;
    } else {
      throw Exception(
          'Sync manager should not be null, be check your sync configuration class');
    }
  }

  void setSyncManager(ISyncManager syncManager) {
    if (syncManager != null) {
      _container.registerSingleton<ISyncManager>(syncManager);
    } else {
      throw Exception(
          'Sync manager should not be null, be check your sync configuration class');
    }
  }
}
