import 'package:fast_sync_client/src/absraction/metadata/isyncalbe_object.dart';
import 'package:fast_sync_client/src/absraction/service/conflicts_resolution_strategie.dart';
import 'package:fast_sync_client/src/absraction/service/iconflicts_handler.dart';

class ConflictsHandler implements IConflictsHandler {
  ConflictsResolutionStrategyEnum resolutionStrategy;
  Function? conflictsResolutionFunction;

  ConflictsHandler({
    this.resolutionStrategy = ConflictsResolutionStrategyEnum.lastWriterWins,
    this.conflictsResolutionFunction,
  }) {
    if (resolutionStrategy == ConflictsResolutionStrategyEnum.predefinedRules &&
        conflictsResolutionFunction == null) {
      throw Exception(
          "conflictsResolutionFunction is required when you put ConflictsResolutionStrategyEnum.PredefinedRules");
    }
  }

  @override
  ConflictsResolutionStrategyEnum getConflictsResolutionStrategy() {
    return resolutionStrategy;
  }

  @override
  Future<ISyncableObject> resolveConflicts(
      ISyncableObject oblObject, ISyncableObject newObject) async {
    if (resolutionStrategy == ConflictsResolutionStrategyEnum.lastWriterWins) {
      return newObject;
    }

    if (resolutionStrategy ==
        ConflictsResolutionStrategyEnum.timestampOrdering) {
      return oblObject.metadata.timestamp > newObject.metadata.timestamp
          ? oblObject
          : newObject;
    }

    if (resolutionStrategy == ConflictsResolutionStrategyEnum.predefinedRules) {
      if (conflictsResolutionFunction == null) {
        throw Exception(
            "conflictsResolutionFunction is required when you put ConflictsResolutionStrategyEnum.PredefinedRules");
      }

      final resolvedObject =
          await conflictsResolutionFunction?.call(oblObject, newObject);
      resolvedObject.metadata = newObject.metadata;
      return resolvedObject;
    }

    throw Exception("Unsupported resolution strategy");
  }
}
