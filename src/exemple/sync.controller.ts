import "reflect-metadata";
import { Container } from "typedi";
import {
    Body,
  Get,
  JsonController,
  Post,
  QueryParam,
  Req,
  Res,
} from "routing-controllers";
import { BaseController } from "../core/base_controller";
import { SyncPayload } from "../absractions/models/Sync_payload";
import { SyncableObject } from "../implemetation/metadata/syncalbe_object";
import { SyncManager } from "../implemetation/services/sync_manager";

@JsonController()
export class SyncController extends BaseController {
  private syncManager = Container.get(SyncManager);

  constructor() {
    super();
  }

  @Post("/push")
  async pushUserObjects(
    @Req() req,
    @Res() res,
    @Body() input: SyncPayload<SyncableObject>
  ) {
    try{
     await this.syncManager.processPush(input)
      return this.success(res, {"result":"push was done with success"});
    }
    catch(err){
      return this.error(res,err);
    }
    }
}
