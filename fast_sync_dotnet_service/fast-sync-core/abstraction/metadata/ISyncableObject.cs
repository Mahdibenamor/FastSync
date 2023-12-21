namespace fast_sync_core.abstraction.data
{
    public interface ISyncableObject : IWithId
    {
        ISyncMetadata Metadata { get; set; }
        bool Deleted { get; set; }
        int GetVersion();
        void SetVersion(int version);
    }
}
