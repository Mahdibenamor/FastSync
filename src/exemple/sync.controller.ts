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
import { BaseController } from "./base_controller";
import { SyncManager } from "../core/implementation/service/sync_manager";
import { SyncOperationMetadata } from "../core/abstraction/models/Sync_operation_metadata";
import { SyncPayload } from "../core/abstraction/models/Sync_payload";

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
