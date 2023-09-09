import { Constructable } from "typedi";

export interface ISyncConfiguration<T>{
    SetSyncalbeObject(entityType: Constructable<T>);
}