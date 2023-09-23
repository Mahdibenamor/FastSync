import { Constructable, Service } from "typedi";
import { ISyncVersionManager } from "../../absractions/services/ISync_version_manager";
import { SyncMetadata } from "../metadata/sync_metadata";
import { SyncalbeMetadataRepository } from "../data/sync_metadata_repository";
import { SyncMetadataDataSource } from "../data/sync_metadata_datasource";
import { isNullOrUndefined } from "../../core/utils";

@Service()
export class SyncVersionManager implements ISyncVersionManager {

    private syncMetadataRepository = new SyncalbeMetadataRepository(new SyncMetadataDataSource())

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