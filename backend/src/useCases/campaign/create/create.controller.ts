import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpPost,
  requestBody,
  response,
} from "inversify-express-utils";
import { Response } from "express";
import { CreateUseCase } from "./create.usecase";
import { ICreateRequestDTO, ICreateResponseDTO } from "./create.dto";

// NOTE: do not apply /campaign automatically when creating a service
@controller("/campaign")
class CreateController extends BaseController {
  constructor(private createUseCase: CreateUseCase) {
    super("create-controller");
  }

  @httpPost("/")
  execute(
    @response() res: Response,
    @requestBody() body: ICreateRequestDTO,
  ): ICreateResponseDTO {
    return this.callUseCase(
      this.createUseCase.execute(body),
      res,
      StatusCode.OK,
    );
  }
}

export { CreateController };
