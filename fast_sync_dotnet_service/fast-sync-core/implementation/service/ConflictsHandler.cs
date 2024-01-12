using fast_sync_core.abstraction.data;
using fast_sync_core.implementation.data;

namespace fast_sync_core.implementation
{
    public class ConflictsHandler : IConflictsHandler
    {
        private readonly ConflictsResolutionStrategyEnum _resolutionStrategy;
        private readonly Func<SyncableObject, SyncableObject, Task<SyncableObject>>? _conflictsResolutionFunction;

        public ConflictsHandler(
            Func<SyncableObject, SyncableObject, Task<SyncableObject>> conflictsResolutionFunction,
            ConflictsResolutionStrategyEnum resolutionStrategy = ConflictsResolutionStrategyEnum.LastWriterWins 
            )
        {
            _resolutionStrategy = resolutionStrategy;
            _conflictsResolutionFunction = conflictsResolutionFunction;

            if (_resolutionStrategy == ConflictsResolutionStrategyEnum.PredefinedRules && _conflictsResolutionFunction == null)
            {
                throw new ArgumentException("conflictsResolutionFunction is required when you put ConflictsResolutionStrategyEnum.PredefinedRules");
            }
        }

        public ConflictsResolutionStrategyEnum GetConflictsResolutionStrategy()
        {
            return _resolutionStrategy;
        }

        public async Task<T> ResolveConflicts<T>(T serverObject, T clientObject) where T : SyncableObject
        {
            if (_resolutionStrategy == ConflictsResolutionStrategyEnum.LastWriterWins)
            {
                return clientObject;
            }

            if (_resolutionStrategy == ConflictsResolutionStrategyEnum.TimestampOrdering)
            {
                return serverObject.Metadata.Timestamp > clientObject.Metadata.Timestamp ? serverObject : clientObject;
            }

            if (_resolutionStrategy == ConflictsResolutionStrategyEnum.PredefinedRules)
            {
                if(_conflictsResolutionFunction == null)
                {
                    throw new ArgumentNullException("conflictsResolutionFunction is null for the type" + typeof(T).Name); 
                }
                int clientVersion = clientObject.Metadata.Version;
                int serverVersion = serverObject.Metadata.Version;
                if (Math.Abs(clientVersion - serverVersion) != 1 && serverVersion >= clientVersion)
                {
                    SyncableObject resolvedObject = await _conflictsResolutionFunction.Invoke(serverObject, clientObject);
                    resolvedObject.Metadata = clientObject.Metadata;
                    return (T)resolvedObject;
                } 
                return clientObject;
            }

            return clientObject;
        }
    }
}
