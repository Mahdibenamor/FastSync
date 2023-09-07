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

@JsonController()
export class SyncController extends BaseController {
//   private itemService: ItemService =
//     Container.get(ItemService);

  constructor() {
    super();
  }

  @Post("/push")
  async pushUserObjects(
    @Req() req,
    @Res() res,
    @Body() input: SyncPayload<SyncableObject>
  ): Promise<void> {


   
  }

}
