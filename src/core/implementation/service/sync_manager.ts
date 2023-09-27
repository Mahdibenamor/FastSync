import { Service } from "typedi";
import { SyncOperationMetadata } from "../../abstraction/models/Sync_operation_metadata";
import { SyncPayload } from "../../abstraction/models/Sync_payload";
import { SyncOperationEnum } from "../../abstraction/metadata/ISync_operation";
import { ISyncManager } from "../../abstraction/service/ISync_manager";
import { ISyncableObject } from "../../abstraction/metadata/ISyncable_object";
import { getObjectRepository } from "../utils/injection";


@Service()
export class SyncManager implements ISyncManager {
     
    async processPush(payload: SyncPayload){
        let objectTypes = payload.getSynckedTypes()
        for(const type of objectTypes){
            let objects =  payload.getObjectsForType(type);
            let newObjects = objects.filter(obj => obj?.metadata?.syncOperation == SyncOperationEnum.add)
            let updatedObjects = objects.filter(obj => obj?.metadata?.syncOperation == SyncOperationEnum.update)
            let deletedObjects = objects.filter(obj => obj?.metadata?.syncOperation == SyncOperationEnum.delete)
            let objectRepository = getObjectRepository(type);
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
            let objectRepository = getObjectRepository(type);
            let objects = await objectRepository.fetchMany(metadata.getTypeMetadata(type)) as ISyncableObject[]
            await syncPayload.pushObjects(type, objects);
        }
        return syncPayload;
    }

    processSync(metadata: SyncOperationMetadata): SyncPayload{
        throw new Error()
    }
}