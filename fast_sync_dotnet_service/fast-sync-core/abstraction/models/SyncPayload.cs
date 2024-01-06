using fast_sync_core.implementation.data;
using fast_sync_core.implementation.metadata;
using System.Collections.Generic;
using System.Linq;

namespace fast_sync_core.abstraction.data
{
    using WithMetaData = SyncableObject<SyncMetadata>;
    using IWithMetaData = ISyncableObject<ISyncMetadata>;

    public class SyncPayload
    {
        public Dictionary<string, List<object>> Data { get; set; }
        public SyncOperationMetadata OperationMetadata { get; set; }

        public SyncPayload()
        {
            Data = new Dictionary<string, List<object>>();
            OperationMetadata = new SyncOperationMetadata();
        }

        public static SyncPayload Create(SyncPayload syncPayload)
        {
            var payload = new SyncPayload
            {
                Data = new Dictionary<string, List<object>>(syncPayload.Data),
                OperationMetadata = SyncOperationMetadata.Create(syncPayload.OperationMetadata)
            };
            return payload;
        }

        public  void PushObjects<T>(string type, List<T> entities, string syncZone) where T : IWithMetaData
        {
            if (entities.Count > 0)
            {
                if (!Data.ContainsKey(type))
                {
                    Data[type] = new List<object>();
                }
                Data[type].AddRange(entities.Cast<WithMetaData>());
                var globalSyncVersion =  BuildTypeMetadata<T>(type, syncZone);
                OperationMetadata.SetMetadata(type, globalSyncVersion);
            }
        }

        public List<object> GetObjectsForType(string type)
        {
            //List<T> data = new List<T>();
            //foreach (WithMetaData obj in Data[type])
            //{
            //    T Iobj = obj as IWithMetaData;
            //    data.Add(Iobj);

            //}
            //return data;
            List<object> data = Data[type];
            return data;
            //return Data.ContainsKey(type) ? Data[type] as List<T> : new List<T>();

        }   

        public List<string> GetSyncedTypes()
        {
            return Data.Keys.ToList();
        }

        public ISyncMetadata GetTypeMetadata(string type)
        {
            var metadata = OperationMetadata.GetTypeMetadata(type);
            if (metadata != null)
            {
                return metadata;
            }
            throw new InvalidOperationException("Metadata of each synced type should be specified, please check how you build SyncPayload");
        }

        private SyncMetadata BuildTypeMetadata<T>(string type, string syncZone) where T : IWithMetaData
        {
            List<object> objects = GetObjectsForType(type);
            List<WithMetaData> castedObjects = new List<WithMetaData>();
            foreach (var obj in objects)
            {
                castedObjects.Add((WithMetaData)obj);
            }
            var newVersion = castedObjects.Max(obj => obj.Metadata.Version);
            SyncMetadata syncMetadata = new SyncMetadata();
            syncMetadata.Id = type;
            syncMetadata.SyncZone = syncZone;
            syncMetadata.Version = newVersion;
            syncMetadata.Type = type;
            return syncMetadata;
        }
    }
}
