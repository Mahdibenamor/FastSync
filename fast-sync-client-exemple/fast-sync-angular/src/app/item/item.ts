import { SyncableObject } from 'fast-sync-client';

export class Item extends SyncableObject {
  constructor(public name: string = '', public description: string = '') {
    super();
  }
}
