using fast_sync_core.abstraction;
using fast_sync_core.abstraction.data;

namespace fast_sync_core.implementation
{
    using IWithMetaData = ISyncableObject<ISyncMetadata>;

    public class ConflictsHandler : IConflictsHandler
    {
        private readonly ConflictsResolutionStrategyEnum _resolutionStrategy;
        private readonly Func<IWithMetaData, IWithMetaData, Task<IWithMetaData>> _conflictsResolutionFunction;

        public ConflictsHandler(
            ConflictsResolutionStrategyEnum resolutionStrategy = ConflictsResolutionStrategyEnum.LastWriterWins, 
            Func<IWithMetaData, IWithMetaData, Task<IWithMetaData>> conflictsResolutionFunction = null
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

        public async Task<T> ResolveConflicts<T>(T serverObject, T clientObject) where T : IWithMetaData
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
                    IWithMetaData resolvedObject = await _conflictsResolutionFunction.Invoke(serverObject, clientObject);
                    resolvedObject.Metadata = clientObject.Metadata;
                    return (T)resolvedObject;
                } 
                return clientObject;
            }

            return clientObject;
        }
    }
}
