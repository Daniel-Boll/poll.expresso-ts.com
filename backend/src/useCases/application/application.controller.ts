import { BaseController, StatusCode } from "@expressots/core";
import { controller, httpGet, response } from "inversify-express-utils";
import { Response } from "express";
import { ApplicationUseCase } from "./application.usecase";

@controller("/")
class ApplicationController extends BaseController {
  constructor(private readonly applicationUseCase: ApplicationUseCase) {
    super("application-controller");
  }

  @httpGet("healthcheck")
  execute(@response() res: Response) {
    return this.callUseCase(
      this.applicationUseCase.execute(),
      res,
      StatusCode.OK,
    );
  }
}

export { ApplicationController };
