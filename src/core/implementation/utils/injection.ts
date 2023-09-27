import Container, { Constructable } from "typedi"
import { isNullOrUndefined } from "./utils"
import { ISyncableRepository } from "../../abstraction/data/ISyncable_Repository"
import { Constants } from "../../abstraction/constants"
import { IConflictsHandler } from "../../abstraction/service/IConflicts_handler"
import { ISyncableObject } from "../../abstraction/metadata/ISyncable_object"

export function setObjectRepository<T extends ISyncableObject>(entityType: Constructable<T>, repository: ISyncableRepository<T>){
    if(!isNullOrUndefined(repository)){
        Container.set(entityType.name +  Constants.repositoryName, repository)
    }
    else {     
        throw Error("repository of the " +entityType+" is not configured well, please check the configuration")
    }
}


export function setObjectConflictsHandler<T extends ISyncableObject>(entityType: Constructable<T>,  conflictsHandler: IConflictsHandler){
    if(!isNullOrUndefined(conflictsHandler)){
        Container.set(entityType.name +  Constants.conflictsHandlerName, conflictsHandler)
    }
    else {     
        throw Error("conflictsHandler of the " +entityType+" is not configured well, please check the configuration")
    }
}


export function getObjectConflictsHandler(type:string): IConflictsHandler{
    let conflictsHandler  = Container.get(type +  Constants.conflictsHandlerName);
    if(!isNullOrUndefined(conflictsHandler)){
        return conflictsHandler as IConflictsHandler;
    }
    else {     
        throw Error("conflictsHandler of the " +type+" is not configured well, please check the configuration")
    }
}

export function getObjectRepository<T>(type: string): ISyncableRepository<T>{
    let repository = Container.get(type +  Constants.repositoryName);
    if(!isNullOrUndefined(repository)){
        return repository as ISyncableRepository<T>;
    }
    else {     
        throw Error("datasource of the " +type+" is not configured well, please check the configuration")
    }
}