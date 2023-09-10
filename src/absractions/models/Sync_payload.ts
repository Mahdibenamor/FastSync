import { isNullOrUndefined } from "../../core/utils";
import { ISyncableObject } from "../metadata/ISyncable_object";
import { SyncOperationMetada } from "./Sync_operation_metadata";

export class SyncPayload<T extends ISyncableObject> {
    private operationMetaData: SyncOperationMetada = new SyncOperationMetada();
    private data: Record<string, T[]> = {};
    
    public pushObjects(type: string, entities: T[]) {
        if (!(type in this.data)) {
            this.data[type] = [];
        }
        this.data[type].push(...entities);
    }

    public getObjectsForType(type: string){
        if(this.data.hasOwnProperty(type) && !isNullOrUndefined(this.data[type])){
            return this.data[type];
        }
        else{
            return [];
        }
    }

    public getSynckedTypes(): string[]{
        return Object.keys(this.data);
    }
}