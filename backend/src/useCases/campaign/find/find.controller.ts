import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpGet,
  requestParam,
  response,
} from "inversify-express-utils";
import { Response } from "express";
import { FindUseCase } from "./find.usecase";
import { IFindResponseDTO } from "./find.dto";

@controller("/campaign")
class FindController extends BaseController {
  constructor(private findUseCase: FindUseCase) {
    super("find-controller");
  }

  @httpGet("/:id")
  execute(
    @response() res: Response,
    @requestParam("id") id: string,
  ): IFindResponseDTO {
    return this.callUseCase(
      this.findUseCase.execute({ id }),
      res,
      StatusCode.OK,
    );
  }
}

export { FindController };
