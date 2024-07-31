import { Constants } from "../../abstraction/constants";
import { ISyncMetadata } from "../../abstraction/metadata/isync_metadata";
import { SyncOperationEnum } from "../../abstraction/metadata/isync_operation";
import { ISyncableObject } from "../../abstraction/metadata/isyncable_object";

export class SyncableObject implements ISyncableObject {
  public id: string;
  public metadata: ISyncMetadata;
  public deleted: boolean;
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
