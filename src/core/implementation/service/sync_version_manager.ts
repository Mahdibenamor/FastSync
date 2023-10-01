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


    public async getLastSyncVersion(entityType: string, syncZone: string): Promise<number> {
        let syncMetadataList = await this.syncMetadataRepository.query({type :entityType, syncZone: syncZone});
        if(syncMetadataList && syncMetadataList.length != 0){
            return syncMetadataList[0].version;
        }
        else{
            let syncMetadata = await this.initObjectMetadata(entityType,syncZone)
            return syncMetadata.version
        }
    }

    public async incrementSyncVersion(entityType: string, syncZone: string): Promise<number> {
        let syncMetadataList = await this.syncMetadataRepository.query({type :entityType,syncZone: syncZone});
        let syncMetadata : SyncMetadata;
        if(syncMetadataList && syncMetadataList.length != 0){
            syncMetadata = syncMetadataList[0];
        }
        else{
             syncMetadata = await this.initObjectMetadata(entityType,syncZone)
        }
        syncMetadata.version ++;
        syncMetadata = await this.syncMetadataRepository.update({_id: syncMetadata._id},syncMetadata);
        return syncMetadata.version;
    }

    private async initObjectMetadata(entityType: string, syncZone: string): Promise<SyncMetadata>{
        let syncMetadataList = await this.syncMetadataRepository.query({type :entityType, syncZone: syncZone});
        if(isNullOrUndefined(syncMetadataList) || syncMetadataList.length == 0){
            let syncMetadata = new SyncMetadata(entityType, 0, syncZone);
            syncMetadata.timestamp = new Date().getTime();
            return await this.syncMetadataRepository.add(syncMetadata);        
        }
    }
} 