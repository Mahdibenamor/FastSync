import { ISyncMetadata } from "./isync_metadata";
import { IWithId } from "./iwith_id";

export interface ISyncableObject extends IWithId {
  id: string;
  metadata: ISyncMetadata;
  deleted: boolean;
  metadataId: string;
  dirty: boolean;
  getVersion(): number;
  setVersion(version: number): number;
}
