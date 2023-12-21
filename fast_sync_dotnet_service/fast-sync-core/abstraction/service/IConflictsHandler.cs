namespace fast_sync_core.abstraction.data
{
    public interface IConflictsHandler
    {
        void ResolveConflicts(ISyncableObject oblObject, ISyncableObject newObject);
        ConflictsResolutionStrategyEnum GetConflictsResolutionStrategy();
    }
}
