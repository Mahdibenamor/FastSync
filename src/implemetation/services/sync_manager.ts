import { Inject, Service } from "typedi";
import { SyncPayload } from "../../absractions/models/Sync_payload";
import { ISyncManager } from "../../absractions/services/ISync_manager";
import { SyncVersionManager } from "./sync_service";
import { SyncConfiguration } from "./sync_config";
import { SyncOperationEnum } from "../../absractions/metadata/ISync_operation";
import { SyncOperationMetadata } from "../../absractions/models/Sync_operation_metadata";
import { ISyncableObject } from "../../absractions/metadata/ISyncable_object";


@Service()
export class SyncManager implements ISyncManager {
    
    constructor(@Inject() private readonly synConfig: SyncConfiguration) {}
 
    
    async processPush(payload: SyncPayload){
        let objectTypes = payload.getSynckedTypes()
        for(const type of objectTypes){
            let objects =  payload.getObjectsForType(type);
            let newObjects = objects.filter(obj => obj?.metadata?.syncOperation == SyncOperationEnum.add)
            let updatedObjects = objects.filter(obj => obj?.metadata?.syncOperation == SyncOperationEnum.update)
            let deletedObjects = objects.filter(obj => obj?.metadata?.syncOperation == SyncOperationEnum.delete)
            let objectRepository = this.synConfig.getObjectRepository(type);
            if(newObjects.length > 0)
                await objectRepository.addMany(newObjects);
            if(updatedObjects.length > 0)
                await objectRepository.updateMany(updatedObjects);
            if(deletedObjects.length > 0)
                await objectRepository.removeMany(deletedObjects);
        }
    }
    
    async processPull(metadata: SyncOperationMetadata): Promise<SyncPayload> {
        let syncPayload : SyncPayload = new SyncPayload();
        let requestedTypes = metadata.getSynckedTypes();
        for(const type of requestedTypes){
            let objectRepository = this.synConfig.getObjectRepository(type);
            let objects = await objectRepository.fetchMany(metadata.getTypeMetadata(type)) as ISyncableObject[]
            await syncPayload.pushObjects(type, objects);
        }
        return syncPayload;
    }

    processSync(metadata: SyncOperationMetadata): SyncPayload{
        throw new Error()
    }
}