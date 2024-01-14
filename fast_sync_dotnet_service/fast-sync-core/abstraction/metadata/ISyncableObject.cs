namespace fast_sync_core.abstraction.data
{
    public interface ISyncableObject<T> : IWithId
        where T : ISyncMetadata
    {
        T Metadata { get; set; }
        bool Deleted { get; set; }
        int GetVersion();
        int SetVersion(int version);
    }
}
