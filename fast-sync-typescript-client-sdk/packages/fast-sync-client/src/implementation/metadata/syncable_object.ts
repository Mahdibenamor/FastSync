import { Constants } from "../../abstraction/constants";
import { ISyncMetadata } from "../../abstraction/metadata/isync_metadata";
import { SyncOperationEnum } from "../../abstraction/metadata/isync_operation";
import { ISyncableObject } from "../../abstraction/metadata/isyncable_object";
import { SyncMetadata } from "./syncable_metadata";
import { v4 as uuid } from "uuid";

export class SyncableObject implements ISyncableObject {
  public id: string = uuid();
  public metadata: ISyncMetadata = new SyncMetadata(
    Constants.emptyString,
    Constants.maxSyncVersion,
    Constants.emptyString
  );
  public deleted: boolean = false;
  public syncOperation: SyncOperationEnum;
  public metadataId: string = Constants.emptyString;
  public dirty: boolean = false;

  constructor() {}

  getVersion() {
    return this.metadata.version;
  }

  setVersion(version: number): number {
    return (this.metadata.version = version);
  }
}
