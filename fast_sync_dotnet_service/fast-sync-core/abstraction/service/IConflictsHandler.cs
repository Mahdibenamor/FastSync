namespace fast_sync_core.abstraction.data
{
    public interface IConflictsHandler
    {
        Task<T> ResolveConflicts<T>(ISyncableObject<ISyncMetadata> oblObject, ISyncableObject<ISyncMetadata> newObject) where T: ISyncableObject<ISyncMetadata>;
        ConflictsResolutionStrategyEnum GetConflictsResolutionStrategy();
    }
}
