import { ISyncableObject } from "../metadata/ISyncable_object";
import { SyncOperationMetadata } from "./Sync_operation_metadata";
import { isNullOrUndefined } from "../../implementation/utils/utils";
import { SyncMetadata } from "../../implementation/metadata/syncable_metadata";
import { FastSync } from "../../implementation/fast_sync";
import { ISyncVersionManager } from "../service/ISync_version_manager";

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
        let syncVersionManager: ISyncVersionManager = FastSync.getInstance().getSyncVersionManager();
        let globalSyncVersion = await syncVersionManager.getLastGlobalSyncVersion(type)
        return new SyncMetadata(type, globalSyncVersion);
    }
}