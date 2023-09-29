import { SyncalbeMetadataRepository } from "../data/sync_metadata_repository";
import { isNullOrUndefined } from "../utils/utils";
import { ISyncVersionManager } from "../../abstraction/service/ISync_version_manager";
import { SyncMetadata } from "../metadata/syncable_metadata";
import { ISyncalbeDataSource } from "../../abstraction/data/ISyncable_data_source";

export class SyncVersionManager implements ISyncVersionManager {

    private syncMetadataRepository: SyncalbeMetadataRepository<SyncMetadata>;
    constructor(private syncMetadataDataSource : ISyncalbeDataSource<SyncMetadata>){
        this.syncMetadataRepository = new SyncalbeMetadataRepository(this.syncMetadataDataSource)
    }


    public async getLastGlobalSyncVersion(entityType: string): Promise<number> {
        let syncMetadataList = await this.syncMetadataRepository.query({type :entityType});
        if(syncMetadataList && syncMetadataList.length != 0){
            return syncMetadataList[0].version;
        }
        return 0;
    }

    public async incrementGlobalSyncVersion(entityType: string): Promise<number> {
        let syncMetadataList = await this.syncMetadataRepository.query({type :entityType});
        let syncMetadata : SyncMetadata;
        syncMetadata = syncMetadataList[0];
        syncMetadata.version ++;
        syncMetadata = await this.syncMetadataRepository.update({_id: syncMetadata._id},syncMetadata);
        return syncMetadata.version;
    }

    public async initObjectMetadata(entityType: string){
        let syncMetadataList = await this.syncMetadataRepository.query({type :entityType});
        if(isNullOrUndefined(syncMetadataList) || syncMetadataList.length == 0){
            let syncMetadata = new SyncMetadata(entityType, 0);
            syncMetadata.timestamp = new Date().getTime();
            await this.syncMetadataRepository.add(syncMetadata);        
        }
    }
} 