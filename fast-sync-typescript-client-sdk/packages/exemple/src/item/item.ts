import { SyncableObject } from "fast-sync-client";

export class Item extends SyncableObject {
  public name: string;
  public description: string;
  constructor() {
    super();
  }
}
