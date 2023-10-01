import { ISyncableObject } from "../metadata/ISyncable_object";
import { SyncOperationMetadata } from "./Sync_operation_metadata";
import { isNullOrUndefined } from "../../implementation/utils/utils";
import { SyncMetadata } from "../../implementation/metadata/syncable_metadata";
import { ISyncMetadata } from "../metadata/ISync_metadata";

export class SyncPayload {
   

    constructor(public data: Record<string, any[]> = {}, public operationMetadata: SyncOperationMetadata = new SyncOperationMetadata()) {}

    static create(syncPayload:SyncPayload){
        let payload =  new SyncPayload()
        payload.data = syncPayload.data;
        payload.operationMetadata = SyncOperationMetadata.create(syncPayload.operationMetadata);
        return payload;
    }
    
    public async pushObjects<T extends ISyncableObject>(type: string, entities: T[], selector: string) {
        if (!(type in this.data)) {
            this.data[type] = [];
        }
        this.data[type].push(...entities);
        let globalSyncVersion = await this.buildTypeMetadata(type, selector)
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

    public getTypeMetadata(type:string): ISyncMetadata{
        let metadata = this.operationMetadata.getTypeMetadata(type)
        if(!isNullOrUndefined(metadata)){
            return metadata;
        }
        throw new Error("metadata of each syncked type should specified, please check how you build SyncPayload")
    }

    private async buildTypeMetadata(type: string, selector: string): Promise<SyncMetadata> {
    
        let objects = this.getObjectsForType(type);
        const newVersion = Math.max(...objects.map(obj => obj.metadata.version));
        return new SyncMetadata(type, newVersion, selector);
    }
}