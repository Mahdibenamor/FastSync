class Constants {
  static final String dataSourceName = "DataSource";
  static final String repositoryName = "Repository";
  static final String conflictsHandlerName = "ConflictsHandler";
  static final String syncZoneRestriction = "SyncZoneConfiguration";
  static final String globalSyncZoneRestriction = "Global";
  static final String metadataTableName = "SyncMetadataTable";
  static final String syncDataBaseName = "'sync.db'";
  static final String toJsonName = "'toJson'";
  static final String fromJsonName = "'FromJson'";
  static final String syncMetadataModelName = "'SyncMetadataModel'";
  static final String syncManagerName = "'ISyncManager'";
  static final String httpManagerName = "'IhttpManager'";
  static final String syncVersionManagerName = "'SyncVersionManager'";
  static final String createDataBaseCommand = "'CreateDataBaseCommand'";
  static final String emptyString = "";
}

typedef ToJsonFunction = Map<String, dynamic> Function(dynamic value);
