import Container, { Service } from "typedi";
import { ISyncableObject } from "../../absractions/metadata/ISyncable_object";
import { SyncPayload } from "../../absractions/models/Sync_payload";
import { ISyncManager } from "../../absractions/services/ISync_manager";
import { SyncService } from "./sync_service";

@Service()
export class SyncManager<T extends ISyncableObject> implements ISyncManager<T> {

    private SyncService: SyncService =Container.get(SyncService);

    processPush(payload: SyncPayload<T>){
        let objectTypes = payload.getSynckedTypes()
        for(const type of objectTypes){
            let objects =  payload.getObjectsForType(type);
            for(const object of objects){
                console.log(object);
            }
        }
    }
    
    processPull(payload: SyncPayload<T>): SyncPayload<T>{
        throw new Error()
    }

    processSync(payload: SyncPayload<T>): SyncPayload<T>{
        throw new Error()
    }
}