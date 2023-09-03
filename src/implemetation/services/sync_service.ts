import Container, { Service } from "typedi";
import { ISyncService } from "../../absractions/services/ISync_service";
import { SyncMetaDataRepository } from "../metadata/sync_metadata/sync_metadata_repository";
import { SyncMetaData } from "../metadata/sync_metadata/sync_metadata";

@Service()
export class SyncService implements ISyncService {
    private syncMetaDataRepository: SyncMetaDataRepository = Container.get(SyncMetaDataRepository);

    async getLastSyncVersion(type: string): Promise<number> {
        let syncMetaDataList = await this.syncMetaDataRepository.query({type :type});
        if(syncMetaDataList && syncMetaDataList.length != 0){
            return syncMetaDataList[0].version;
        }
        else{
            let syncMetaData = new SyncMetaData();
            syncMetaData.changeTime = new Date(); 
            syncMetaData.version = 0; 
            syncMetaData.type = type;
            await this.syncMetaDataRepository.add(syncMetaData);
            return 0;
        }
    }
    async incrementSyncVersion(type: string): Promise<number> {
        let syncMetaDataList = await this.syncMetaDataRepository.query({type :type});
        let syncMetaData : SyncMetaData;
        if(syncMetaDataList && syncMetaDataList.length != 0){
            syncMetaData = syncMetaDataList[0];
        }
        else{
            syncMetaData.changeTime = new Date(); 
            syncMetaData.version = 0; 
            syncMetaData.type = type;
            await this.syncMetaDataRepository.add(syncMetaData);
        }
        syncMetaData.version ++;
        syncMetaData = await this.syncMetaDataRepository.update({_id: syncMetaData._id},syncMetaData);
        return syncMetaData.version;
    }
} 