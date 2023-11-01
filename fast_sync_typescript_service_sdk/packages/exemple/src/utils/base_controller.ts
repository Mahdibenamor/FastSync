import { JsonController, Res, HttpCode } from "routing-controllers";

@JsonController()
export abstract class BaseController {
  @HttpCode(200)
  protected success(@Res() res, data: any) {
    return res.send({ success: true, status: 200, data });
  }

  @HttpCode(201)
  protected created(@Res() res, data: any) {
    return res.send({ success: true, status: 201, data });
  }

  @HttpCode(204)
  protected noContent(@Res() res) {
    return res.send({ success: false, status: 204 });
  }

  @HttpCode(400)
  protected badRequest(@Res() res, error: any) {
    return res.send({ success: false, status: 400, error });
  }

  @HttpCode(401)
  protected unauthorized(@Res() res, error: any) {
    return res.send({ success: false, status: 401, error });
  }

  @HttpCode(404)
  protected notFound(@Res() res, error: any) {
    return res.send({ success: false, status: 404, error });
  }

  @HttpCode(200)
  protected render(@Res() res, viewName: string) {
    return res.render(viewName);
  }
  @HttpCode(500)
  protected error(@Res() res, error: any) {
    return res.send({ success: false, status: 500, error });
  }
}

export enum operationTypeEnum {
  add,
  update,
}
