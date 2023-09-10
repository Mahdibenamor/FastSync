import Container, { Constructable, Service } from "typedi";
import { ISyncConfiguration } from "../../absractions/services/ISync_config";
import { SyncService } from "./sync_service";

@Service()
export class SyncConfiguration<T> implements ISyncConfiguration<T> {

    private syncService  =  Container.get(SyncService);

    constructor(){}
    
    public async SetSyncalbeObject(entityType: Constructable<T>){
       await this.syncService.initObjectMetaData(entityType)
    }
}