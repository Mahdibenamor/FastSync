import 'package:fast_sync_client/src/absraction/metadata/isyncalbe_object.dart';
import 'package:fast_sync_client/src/absraction/service/conflicts_resolution_strategie.dart';

abstract class IConflictsHandler {
  void resolveConflicts(ISyncableObject oldObject, ISyncableObject newObject);
  ConflictsResolutionStrategyEnum getConflictsResolutionStrategy();
}
