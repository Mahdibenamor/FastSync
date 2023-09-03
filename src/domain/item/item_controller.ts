import "reflect-metadata";
import { Container } from "typedi";
import {
  Get,
  JsonController,
  QueryParam,
  Req,
  Res,
} from "routing-controllers";
import { ItemService } from "./item_service";
import { BaseController } from "../../core/base_controller";

@JsonController()
export class ItemController extends BaseController {
  private itemService: ItemService =
    Container.get(ItemService);

  constructor() {
    super();
  }

  @Get("/notification/markSeen")
  async getUserNotificationFromParser(
    @Req() req,
    @Res() res,
    @QueryParam("sub") sub: string
  ): Promise<void> {
   
  }

  @Get("/notification/count")
  async getNotificationCount(
    @Req() req,
    @Res() res,
    @QueryParam("sub") sub: string
  ): Promise<void> {
    
  }
}
