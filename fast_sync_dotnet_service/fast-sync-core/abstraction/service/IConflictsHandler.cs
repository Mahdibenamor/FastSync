namespace fast_sync_core.abstraction.data
{
    using IWithMetaData = ISyncableObject<ISyncMetadata>;

    public interface IConflictsHandler
    {
        Task<T> ResolveConflicts<T>(IWithMetaData oblObject, IWithMetaData newObject) where T: IWithMetaData;
        ConflictsResolutionStrategyEnum GetConflictsResolutionStrategy();
    }
}
