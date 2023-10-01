import { SyncVersionManager } from "./sync_version_manager";
import { isNullOrUndefined } from "../utils/utils";
import { ISyncableObject } from "../../abstraction/metadata/ISyncable_object";
import { IConflictsHandler } from "../../abstraction/service/IConflicts_handler";
import { ISyncConfiguration } from "../../abstraction/service/ISync_config";
import { ISyncableRepository } from "../../abstraction/data/ISyncable_Repository";
import Container from "typedi";
import { Constants } from "../../abstraction/constants";
import { SyncZoneConfiguration, SyncZoneRestrictionEnum } from "../../abstraction/models/Sync_zone_configuration";


export class SyncConfiguration implements ISyncConfiguration {

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
    
    protected init(){
    }
    
    
    public async setSyncalbeObject<T extends ISyncableObject>(entityType: string, repository: ISyncableRepository<T>, syncZoneConfiguration?: SyncZoneConfiguration, conflictsHandler?: IConflictsHandler){
       this.setSyncZoneConfiguration(entityType, syncZoneConfiguration)
       this.setObjectConflictsHandler(entityType,conflictsHandler);
       this.setObjectRepository(entityType, repository);
    }

    public setObjectRepository<T extends ISyncableObject>(entityType: string, repository: ISyncableRepository<T>){
        if(!isNullOrUndefined(repository)){
            Container.set(entityType +  Constants.repositoryName, repository)
        }
        else {     
            throw Error("repository of the " +entityType+" is not configured well, please check the configuration")
        }
    }
    
    
    public setObjectConflictsHandler(entityType: string,  conflictsHandler: IConflictsHandler){
        if(!isNullOrUndefined(conflictsHandler)){
            Container.set(entityType +  Constants.conflictsHandlerName, conflictsHandler)
        }
        else {     
            throw Error("conflictsHandler of the " +entityType+" is not configured well, please check the configuration")
        }
    }
    
    
    public getObjectConflictsHandler(type:string): IConflictsHandler{
        let conflictsHandler  = Container.get(type +  Constants.conflictsHandlerName);
        if(!isNullOrUndefined(conflictsHandler)){
             return conflictsHandler as IConflictsHandler;
        }
        else {     
            throw Error("conflictsHandler of the " +type+" is not configured well, please check the configuration")
        }
    }

    public setSyncZoneConfiguration(entityType: string,  syncZoneConfiguration: SyncZoneConfiguration){
        if(!isNullOrUndefined(syncZoneConfiguration)){
            Container.set(entityType +  Constants.syncZoneAttribute, syncZoneConfiguration)
        }
        else {  
            syncZoneConfiguration =  new SyncZoneConfiguration(SyncZoneRestrictionEnum.global, Constants.globalSyncZoneAttribute)
            Container.set(entityType +  Constants.syncZoneAttribute, syncZoneConfiguration)
        }
    }
    
    
    public getSyncZoneConfiguration(type:string): IConflictsHandler{
        let conflictsHandler  = Container.get(type +  Constants.conflictsHandlerName);
        if(!isNullOrUndefined(conflictsHandler)){
             return conflictsHandler as IConflictsHandler;
        }
        else {     
            throw Error("conflictsHandler of the " +type+" is not configured well, please check the configuration")
        }
    }
    
    public getObjectRepository<T extends ISyncableObject>(type: string): ISyncableRepository<T>{
        let repository = Container.get(type +  Constants.repositoryName);
        if(!isNullOrUndefined(repository)){
            return repository as ISyncableRepository<T>;;
        }
        else {     
            throw Error("repository of the " +type+" is not configured well, please check the configuration")
        }
    }
}
