enum ConflictsResolutionStrategyEnum {
  lastWriterWins(0),
  timestampOrdering(1),
  predefinedRules(2);

  const ConflictsResolutionStrategyEnum(this.code);
  final int code;
}
