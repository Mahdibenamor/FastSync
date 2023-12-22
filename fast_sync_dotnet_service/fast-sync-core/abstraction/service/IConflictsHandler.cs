namespace fast_sync_core.abstraction.data
{
    public interface IConflictsHandler
    {
        Task<T> ResolveConflicts<T>(ISyncableObject oblObject, ISyncableObject newObject) where T: ISyncableObject;
        ConflictsResolutionStrategyEnum GetConflictsResolutionStrategy();
    }
}
