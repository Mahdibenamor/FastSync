namespace fast_sync_core.abstraction.data
{
    using IWithMetaData = ISyncableObject<ISyncMetadata>;

    public interface IConflictsHandler
    {
        Task<T> ResolveConflicts<T>(T serverObject, T clientObject) where T : IWithMetaData;
        ConflictsResolutionStrategyEnum GetConflictsResolutionStrategy();
    }
}
