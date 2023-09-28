import { SyncVersionManager } from "./sync_version_manager";
import { isNullOrUndefined } from "../utils/utils";
import { ISyncableObject } from "../../abstraction/metadata/ISyncable_object";
import { IConflictsHandler } from "../../abstraction/service/IConflicts_handler";
import { ISyncConfiguration } from "../../abstraction/service/ISync_config";
import { setObjectConflictsHandler, setObjectRepository } from "../utils/injection";
import { ISyncableRepository } from "../../abstraction/data/ISyncable_Repository";


export class SyncConfiguration implements ISyncConfiguration {


    classTypeMap: { [key: string]: any } = {};

    private _syncVersionManager: SyncVersionManager

    protected set syncVersionManager(manager: SyncVersionManager) {
        this._syncVersionManager = manager;
      }

    public get syncVersionManager(): SyncVersionManager {
        try{
            if(!isNullOrUndefined(this._syncVersionManager)){
                return this._syncVersionManager
            }
        }
        catch(e){
            throw Error("Please init the SyncVersionManager, FastSync.getInstance(configuration)")
        }
    }

    constructor(){
        this.init();
    }
    
    protected init(){}
    
    
    public async SetSyncalbeObject<T extends ISyncableObject>(entityType: string, repository: ISyncableRepository<T>, conflictsHandler?: IConflictsHandler){
       await this.syncVersionManager.initObjectMetadata(entityType);
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

    private setConstructableType<T>(entityType: string){
        this.classTypeMap[entityType] == entityType;
    }
}
