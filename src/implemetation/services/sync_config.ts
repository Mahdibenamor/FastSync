import Container, { Constructable, Service } from "typedi";
import { ISyncConfiguration } from "../../absractions/services/ISync_config";
import { SyncVersionManager } from "./sync_service";
import { isNullOrUndefined } from "../../core/utils";
import { ISyncalbeDataSource } from "../../absractions/data/ISyncable_data_source";
import { Constants } from "../../absractions/constants";
import { SyncalbeRepository } from "../data/syncable_object_repository";
import { ISyncableObject } from "../../absractions/metadata/ISyncable_object";
import { ISyncableRepository } from "../../absractions/data/ISyncable_Repository";

@Service({global: true})
export class SyncConfiguration implements ISyncConfiguration {

    classTypeMap: { [key: string]: any } = {};
    private syncService  =  Container.get(SyncVersionManager);

    constructor(){}
    
    public async SetSyncalbeObject<T extends ISyncableObject>(entityType: Constructable<T>, dataSource: ISyncalbeDataSource<T>){
       await this.syncService.initObjectMetaData(entityType);
       this.setConstructableType(entityType);
       this.setObjectDataSource(entityType, dataSource)
    }

    public getConstructableType(type: string){
        if(!isNullOrUndefined(this.classTypeMap[type])){
            return this.classTypeMap[type];
        }
        throw Error(type+" is not configured well, please check the configuration")
    }
    
    private setObjectDataSource<T extends ISyncableObject>(entityType: Constructable<T>, dataSource: ISyncalbeDataSource<T>){
        if(!isNullOrUndefined(dataSource)){
            Container.set(entityType.name +  Constants.dataSourceName, dataSource)
            this.setObjectRepository(entityType, dataSource);
        }
        else {     
            throw Error("datasource of the " +entityType+" is not configured well, please check the configuration")
        }
    }

    private setConstructableType<T>(entityType: Constructable<T>){
        this.classTypeMap[entityType.name] == entityType;
    }

    private setObjectRepository<T extends ISyncableObject>(entityType: Constructable<T>, dataSource: ISyncalbeDataSource<T>){
        let repo = new SyncalbeRepository(dataSource, entityType) 
        if(!isNullOrUndefined(repo)){
            Container.set(entityType.name +  Constants.repositoryName, repo)
        }
        else {     
            throw Error("repository of the " +entityType+" is not configured well, please check the configuration")
        }

    }

    private getObjectDataSource(type: string){
        let datasource = Container.get(type +  Constants.dataSourceName);
        if(!isNullOrUndefined(datasource)){
            return datasource;
        }
        else {     
            throw Error("datasource of the " +type+" is not configured well, please check the configuration")
        }
    }

    public getObjectRepository<T>(type: string): ISyncableRepository<T>{
        let repository = Container.get(type +  Constants.repositoryName);
        if(!isNullOrUndefined(repository)){
            return repository as ISyncableRepository<T>;
        }
        else {     
            throw Error("datasource of the " +type+" is not configured well, please check the configuration")
        }
    }
}