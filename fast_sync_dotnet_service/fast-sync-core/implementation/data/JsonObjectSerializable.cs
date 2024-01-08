using System.Text.Json;

namespace fast_sync_core.implementation.data
{
    public class JsonObjectSerializable<T>
        where T : SyncableObject
    {
        public JsonObjectSerializable() { }
        public List<T> GetTypedObjects(List<object> objects)
        {
            List<T> data = new List<T>();
            foreach (var obj in objects)
            {
                T? instanceCreated = GetTypedObject(obj) ;
                if (instanceCreated != null)
                {
                    data.Add(instanceCreated);
                }
            }
            return data;
        }

        public T? GetTypedObject(object obj)
        {
            JsonElement jsonElement = (JsonElement)obj;
            JsonSerializerOptions options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };
            T? instanceCreated = null;
            if (jsonElement.ValueKind != JsonValueKind.Undefined)
            {
                Type elementType = FastSync.getObjectType(typeof(T).Name);
                instanceCreated = JsonSerializer.Deserialize(jsonElement.GetRawText(), elementType, options) as T;
            }
            return instanceCreated;
        }
        
    }
}
