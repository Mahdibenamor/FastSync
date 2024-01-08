using fast_sync_core.implementation.data;
namespace fast_sync_core.abstraction.data
{

    public interface IConflictsHandler
    {
        Task<T> ResolveConflicts<T>(T serverObject, T clientObject) where T : SyncableObject;
        ConflictsResolutionStrategyEnum GetConflictsResolutionStrategy();
    }
}
