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
import { SyncManager } from "../implemetation/services/sync_manager";
import { SyncOperationMetadata } from "../absractions/models/Sync_operation_metadata";

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
    @Body() input: SyncPayload
  ) {
    try{
     await this.syncManager.processPush(input)
      return this.success(res, {"result":"push was done with success"});
    }
    catch(err){
      return this.error(res,err);
    }
  }

  @Post("/pull")
  async pullUserObjects(
    @Req() req,
    @Res() res,
    @Body() metadata: SyncOperationMetadata
  ) {
    try{
      let result = await this.syncManager.processPull(metadata)
      return this.success(res, result);
    }
    catch(err){
      return this.error(res,err);
    }
  }
}
