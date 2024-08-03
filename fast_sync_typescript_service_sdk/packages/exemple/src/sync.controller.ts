import { Body, JsonController, Post, Req, Res } from "routing-controllers";
import { BaseController } from "./utils/base_controller";
import { SyncOperationMetadata } from "fast-sync-core";
import { SyncPayload, FastSync } from "fast-sync-core";

@JsonController()
export class SyncController extends BaseController {
  private syncManager = FastSync.getInstance().getSyncManager();

  constructor() {
    super();
  }

  @Post("/push")
  async pushUserObjects(@Req() req, @Res() res, @Body() input: SyncPayload) {
    try {
      await this.syncManager.processPush(input);
      return this.success(res, { result: "push was done with success" });
    } catch (err) {
      return this.error(res, err);
    }
  }

  @Post("/pull")
  async pullUserObjects(
    @Req() req,
    @Res() res,
    @Body() metadata: SyncOperationMetadata
  ) {
    try {
      let result = await this.syncManager.processPull(metadata);
      return this.success(res, result);
    } catch (err) {
      return this.error(res, err);
    }
  }
}
