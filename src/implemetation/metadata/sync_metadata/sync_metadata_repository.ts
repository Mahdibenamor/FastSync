import Container, { Service } from "typedi";
import { SyncMetaData } from "./sync_metadata";
import { SyncMetaDataDataSource } from "./sync_metadata_datasource";
import { SyncalbeRepository } from "../../data/syncable_repository";

@Service()
export class SyncMetaDataRepository extends SyncalbeRepository<SyncMetaData> {
    private syncMetaDataDataSource: SyncMetaDataDataSource = Container.get(SyncMetaDataDataSource);
    constructor() {super(Container.get(SyncMetaDataDataSource));
  }
}