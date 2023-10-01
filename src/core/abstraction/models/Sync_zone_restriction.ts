// export class SyncZoneConfiguration{
//     constructor(private syncZoneRestriction: SyncZoneRestrictionEnum, private syncZoneAttribute: string){
//         if(SyncZoneRestrictionEnum.restricted == this.syncZoneRestriction){
//             if(!isEmptyString(this.syncZoneAttribute)){
//                 throw new Error("syncZoneAttribute should not be null when syncZoneRestriction is SyncZoneRestrictionEnum.restricted, this variable is used to track the objects to be syncked")
//             }
//         }
//     }

//     getSyncZoneAttribute(): string {
//         return this.syncZoneAttribute;
//     }
// }

export enum SyncZoneRestrictionEnum{
    global,
    restricted
}