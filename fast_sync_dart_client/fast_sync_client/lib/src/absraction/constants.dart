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
}

typedef ToJsonFunction<T> = Map<String, dynamic> Function(T value);
