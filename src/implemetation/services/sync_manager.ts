import { Inject, Service } from "typedi";
import { ISyncableObject } from "../../absractions/metadata/ISyncable_object";
import { SyncPayload } from "../../absractions/models/Sync_payload";
import { ISyncManager } from "../../absractions/services/ISync_manager";
import { SyncVersionManager } from "./sync_service";
import { Item } from "../../exemple/item";
import { SyncConfiguration } from "./sync_config";
import { SyncOperationEnum } from "../../absractions/metadata/ISync_operation";


@Service()
export class SyncManager<T extends ISyncableObject> implements ISyncManager<T> {
    
    constructor(@Inject() private readonly syncVersionManager: SyncVersionManager, @Inject() private readonly synConfig: SyncConfiguration) {}
 
    
    async processPush(payload: SyncPayload<T>){
        let version = await this.syncVersionManager.getLastGlobalSyncVersion(Item)
        let objectTypes = payload.getSynckedTypes()
        for(const type of objectTypes){
            let objects =  payload.getObjectsForType(type);
            let newObjects = objects.filter(obj => obj.syncOperation == SyncOperationEnum.add)
            let updatedObjects = objects.filter(obj => obj.syncOperation == SyncOperationEnum.update)
            let deletedObjects = objects.filter(obj => obj.syncOperation == SyncOperationEnum.delete)
            let objectRepository = this.synConfig.getObjectRepository(type);
            if(newObjects.length > 0)
                objectRepository.addMany(newObjects);
            if(updatedObjects.length > 0)
                objectRepository.updateMany(updatedObjects);
            if(deletedObjects.length > 0)
                objectRepository.removeMany(deletedObjects);
        }
    }
    
    processPull(payload: SyncPayload<T>): SyncPayload<T>{
        throw new Error()
    }

    processSync(payload: SyncPayload<T>): SyncPayload<T>{
        throw new Error()
    }
}