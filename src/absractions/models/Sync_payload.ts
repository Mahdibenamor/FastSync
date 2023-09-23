import Container from "typedi";
import { isNullOrUndefined } from "../../core/utils";
import { SyncMetadata } from "../../implemetation/metadata/sync_metadata";
import { ISyncableObject } from "../metadata/ISyncable_object";
import { SyncOperationMetadata } from "./Sync_operation_metadata";
import { SyncVersionManager } from "../../implemetation/services/sync_service";

export class SyncPayload {
    private operationMetadata: SyncOperationMetadata = new SyncOperationMetadata();
    private data: Record<string, any[]> = {};

    constructor() {}

    
    public async pushObjects<T extends ISyncableObject>(type: string, entities: T[]) {
        if (!(type in this.data)) {
            this.data[type] = [];
        }
        this.data[type].push(...entities);
        let globalSyncVersion = await this.buildTypeMetadata(type)
        this.operationMetadata.setMetadata(type, globalSyncVersion)
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

    private async buildTypeMetadata(type: string): Promise<SyncMetadata> {
        let syncVersionManager: SyncVersionManager = Container.get(SyncVersionManager);
        let globalSyncVersion = await syncVersionManager.getLastGlobalSyncVersion(type)
        return new SyncMetadata(type, globalSyncVersion);
    }
}