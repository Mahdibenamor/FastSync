import Container, { Constructable, Service } from "typedi";
import { SyncVersionManager } from "./sync_version_manager";
import { isNullOrUndefined } from "../utils/utils";
import { ISyncableObject } from "../../abstraction/metadata/ISyncable_object";
import { IConflictsHandler } from "../../abstraction/service/IConflicts_handler";
import { ISyncConfiguration } from "../../abstraction/service/ISync_config";
import { setObjectConflictsHandler, setObjectRepository } from "../utils/injection";
import { ISyncableRepository } from "../../abstraction/data/ISyncable_Repository";
import { SyncMetadataDataSource } from "../../../mongoose-dao/data/sync_metadata_datasource";


export class SyncConfiguration implements ISyncConfiguration {


    classTypeMap: { [key: string]: any } = {};
    public get syncVersionManager(): SyncVersionManager {
        try{
            let manager =  Container.get(SyncVersionManager);
            if(!isNullOrUndefined(manager)){
                return manager
            }
        }
        catch(e){
            throw Error("Please init the SyncVersionManager, using initSyncVersionManager")
        }
    }

    constructor(){
        this.init();
    }
    
    private init(){
        let syncVersionManager = new SyncVersionManager(new SyncMetadataDataSource());
        Container.set(SyncVersionManager, syncVersionManager)
    }
    
    
    public async SetSyncalbeObject<T extends ISyncableObject>(entityType: Constructable<T>, repository: ISyncableRepository<T>, conflictsHandler?: IConflictsHandler){
       await this.syncVersionManager.initObjectMetadata(entityType.name);
       this.setConstructableType(entityType);
       setObjectConflictsHandler(entityType,conflictsHandler);
       setObjectRepository(entityType, repository);
    }

    public getConstructableType(type: string){
        if(!isNullOrUndefined(this.classTypeMap[type])){
            return this.classTypeMap[type];
        }
        throw Error(type+" is not configured well, please check the configuration")
    }

    private setConstructableType<T>(entityType: Constructable<T>){
        this.classTypeMap[entityType.name] == entityType;
    }
}
