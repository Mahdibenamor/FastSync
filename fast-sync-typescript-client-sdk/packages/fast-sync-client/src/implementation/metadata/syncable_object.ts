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

  static create<T extends SyncableObject>(object: T, target?: T): T {
    target.id = object.id;
    target.metadata = SyncMetadata.create(object.metadata);
    target.deleted = object.deleted;
    target.syncOperation = object.syncOperation;
    target.metadataId = object.metadataId;
    target.dirty = object.dirty;
    return target;
  }

  getVersion() {
    return this.metadata.version;
  }

  setVersion(version: number): number {
    return (this.metadata.version = version);
  }
}
