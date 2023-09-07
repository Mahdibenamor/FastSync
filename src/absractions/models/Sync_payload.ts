import { ISyncableObject } from "../metadata/ISyncable_object";
import { SyncOperationMetada } from "./Sync_operation_metadata";

export class SyncPayload<T extends ISyncableObject> {
    operationMetaData: SyncOperationMetada = new SyncOperationMetada();
    data: Record<string, T[]> = {};
    
    pushObjects(type: string, entities: T[]) {
        if (!(type in this.data)) {
            this.data[type] = [];
          }
          this.data[type].push(...entities);
    }

    
}