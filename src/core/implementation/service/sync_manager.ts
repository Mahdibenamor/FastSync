import { Service } from "typedi";
import { SyncOperationMetadata } from "../../abstraction/models/Sync_operation_metadata";
import { SyncPayload } from "../../abstraction/models/Sync_payload";
import { SyncOperationEnum } from "../../abstraction/metadata/ISync_operation";
import { ISyncManager } from "../../abstraction/service/ISync_manager";
import { FastSync } from "../fast_sync";

@Service()
export class SyncManager implements ISyncManager {
     
    async processPush(payload: SyncPayload){
        payload = SyncPayload.create(payload);
        let objectTypes = payload.getSynckedTypes()
        for(const type of objectTypes){
            let objects =  payload.getObjectsForType(type);
            let newObjects = objects.filter(obj => obj?.metadata?.syncOperation == SyncOperationEnum.add)
            let updatedObjects = objects.filter(obj => obj?.metadata?.syncOperation == SyncOperationEnum.update)
            let deletedObjects = objects.filter(obj => obj?.metadata?.syncOperation == SyncOperationEnum.delete)
            let objectRepository = FastSync.getInstance().getObjectRepository(type);
            if(newObjects.length > 0)
                await objectRepository.addMany(newObjects, payload.getTypeMetadata(type));
            if(updatedObjects.length > 0)
                await objectRepository.updateMany(updatedObjects, payload.getTypeMetadata(type));
            if(deletedObjects.length > 0)
                await objectRepository.removeMany(deletedObjects, payload.getTypeMetadata(type));
        }
    }
    
    async processPull(metadata: SyncOperationMetadata): Promise<SyncPayload> {
        metadata = SyncOperationMetadata.create(metadata)
        let syncPayload : SyncPayload = new SyncPayload();
        let requestedTypes = metadata.getSynckedTypes();
        for(const type of requestedTypes){
            let objectRepository = FastSync.getInstance().getObjectRepository(type); 
            let typeMetadata = metadata.getTypeMetadata(type);
            let objects = await objectRepository.fetchMany(metadata.getTypeMetadata(type));
            await syncPayload.pushObjects(type, objects, typeMetadata.getSelector());
        }
        return syncPayload;
    }

    processSync(metadata: SyncOperationMetadata): SyncPayload{
        throw new Error()
    }
}