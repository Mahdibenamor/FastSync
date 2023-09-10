import { Constructable, Service } from "typedi";
import { ISyncService } from "../../absractions/services/ISync_service";
import { SyncMetaData } from "../metadata/sync_metadata";
import { SyncalbeMetaDataRepository } from "../data/sync_metadata_repository";
import { SyncMetaDataDataSource } from "../data/sync_metadata_datasource";
import { isNullOrUndefined } from "../../core/utils";

@Service()
export class SyncService implements ISyncService {

    private syncMetaDataRepository = new SyncalbeMetaDataRepository(new SyncMetaDataDataSource())

    public async getLastGlobalSyncVersion<T>(entityType: Constructable<T>): Promise<number> {
        let syncMetaDataList = await this.syncMetaDataRepository.query({type :entityType.name});
        if(syncMetaDataList && syncMetaDataList.length != 0){
            return syncMetaDataList[0].version;
        }
        return 0;
    }

    public async incrementGlobalSyncVersion<T>(entityType: Constructable<T>): Promise<number> {
        let syncMetaDataList = await this.syncMetaDataRepository.query({type :entityType.name});
        let syncMetaData : SyncMetaData;
        syncMetaData = syncMetaDataList[0];
        syncMetaData.version ++;
        syncMetaData = await this.syncMetaDataRepository.update({_id: syncMetaData._id},syncMetaData);
        return syncMetaData.version;
    }

    public async initObjectMetaData<T>(entityType: Constructable<T>){
        let syncMetaDataList = await this.syncMetaDataRepository.query({type :entityType.name});
        if(isNullOrUndefined(syncMetaDataList) || syncMetaDataList.length == 0){
            let syncMetaData = new SyncMetaData(entityType.name, 0,new Date());
            await this.syncMetaDataRepository.add(syncMetaData);        
        }
    }
} 