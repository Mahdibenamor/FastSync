import { Constructable, Service } from "typedi";
import { ISyncVersionManager } from "../../absractions/services/ISync_version_manager";
import { SyncMetaData } from "../metadata/sync_metadata";
import { SyncalbeMetaDataRepository } from "../data/sync_metadata_repository";
import { SyncMetaDataDataSource } from "../data/sync_metadata_datasource";
import { isNullOrUndefined } from "../../core/utils";

@Service()
export class SyncVersionManager implements ISyncVersionManager {

    private syncMetaDataRepository = new SyncalbeMetaDataRepository(new SyncMetaDataDataSource())

    public async getLastGlobalSyncVersion(entityType: string): Promise<number> {
        let syncMetaDataList = await this.syncMetaDataRepository.query({type :entityType});
        if(syncMetaDataList && syncMetaDataList.length != 0){
            return syncMetaDataList[0].version;
        }
        return 0;
    }

    public async incrementGlobalSyncVersion(entityType: string): Promise<number> {
        let syncMetaDataList = await this.syncMetaDataRepository.query({type :entityType});
        let syncMetaData : SyncMetaData;
        syncMetaData = syncMetaDataList[0];
        syncMetaData.version ++;
        syncMetaData = await this.syncMetaDataRepository.update({_id: syncMetaData._id},syncMetaData);
        return syncMetaData.version;
    }

    public async initObjectMetaData(entityType: string){
        let syncMetaDataList = await this.syncMetaDataRepository.query({type :entityType});
        if(isNullOrUndefined(syncMetaDataList) || syncMetaDataList.length == 0){
            let syncMetaData = new SyncMetaData(entityType, 0,new Date());
            await this.syncMetaDataRepository.add(syncMetaData);        
        }
    }
} 