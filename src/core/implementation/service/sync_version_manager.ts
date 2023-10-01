import { SyncalbeMetadataRepository } from "../data/sync_metadata_repository";
import { ISyncVersionManager } from "../../abstraction/service/ISync_version_manager";
import { SyncMetadata } from "../metadata/syncable_metadata";
import { ISyncalbeDataSource } from "../../abstraction/data/ISyncable_data_source";
import { isNullOrUndefined } from "../utils/utils";

export class SyncVersionManager implements ISyncVersionManager {

    private syncMetadataRepository: SyncalbeMetadataRepository<SyncMetadata>;
    constructor(private syncMetadataDataSource : ISyncalbeDataSource<SyncMetadata>){
        this.syncMetadataRepository = new SyncalbeMetadataRepository(this.syncMetadataDataSource)
    }


    public async getLastSyncVersion(entityType: string, selector: string): Promise<number> {
        let syncMetadataList = await this.syncMetadataRepository.query({type :entityType, selector: selector});
        if(syncMetadataList && syncMetadataList.length != 0){
            return syncMetadataList[0].version;
        }
        else{
            let syncMetadata = await this.initObjectMetadata(entityType,selector)
            return syncMetadata.version
        }
    }

    public async incrementSyncVersion(entityType: string, selector: string): Promise<number> {
        let syncMetadataList = await this.syncMetadataRepository.query({type :entityType,selector: selector});
        let syncMetadata : SyncMetadata;
        if(syncMetadataList && syncMetadataList.length != 0){
            syncMetadata = syncMetadataList[0];
        }
        else{
             syncMetadata = await this.initObjectMetadata(entityType,selector)
        }
        syncMetadata.version ++;
        syncMetadata = await this.syncMetadataRepository.update({_id: syncMetadata._id},syncMetadata);
        return syncMetadata.version;
    }

    private async initObjectMetadata(entityType: string, selector: string): Promise<SyncMetadata>{
        let syncMetadataList = await this.syncMetadataRepository.query({type :entityType, selector: selector});
        if(isNullOrUndefined(syncMetadataList) || syncMetadataList.length == 0){
            let syncMetadata = new SyncMetadata(entityType, 0, selector);
            syncMetadata.timestamp = new Date().getTime();
            return await this.syncMetadataRepository.add(syncMetadata);        
        }
    }
} 