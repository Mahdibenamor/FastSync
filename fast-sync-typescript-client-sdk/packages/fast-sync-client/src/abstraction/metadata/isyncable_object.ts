import { ISyncMetadata } from "./ISync_metadata";
import { IWithId } from "./Iwith_id";

export interface ISyncableObject extends IWithId {
  id: string;
  metadata: ISyncMetadata;
  deleted: boolean;
  metadataId: string;
  dirty: boolean;
  getVersion(): number;
  setVersion(version: number): number;
}
