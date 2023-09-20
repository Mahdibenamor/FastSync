import Container from "typedi";
import { isNullOrUndefined } from "../../core/utils";
import { SyncMetaData } from "../../implemetation/metadata/sync_metadata";
import { ISyncableObject } from "../metadata/ISyncable_object";
import { SyncOperationMetada } from "./Sync_operation_metadata";
import { SyncVersionManager } from "../../implemetation/services/sync_service";

export class SyncPayload {
    private operationMetaData: SyncOperationMetada = new SyncOperationMetada();
    private data: Record<string, any[]> = {};
    private syncVersionManager: SyncVersionManager = Container.get(SyncVersionManager);

    constructor() {}

    
    public async pushObjects<T extends ISyncableObject>(type: string, entities: T[]) {
        if (!(type in this.data)) {
            this.data[type] = [];
        }
        this.data[type].push(...entities);
        let globalSyncVersion = await this.buildTypeMetaData(type)
        this.operationMetaData.setMetaData(type, globalSyncVersion)
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

    private async buildTypeMetaData(type: string): Promise<SyncMetaData> {
        let globalSyncVersion = await this.syncVersionManager.getLastGlobalSyncVersion(type)
        return new SyncMetaData(type, globalSyncVersion);
    }
}