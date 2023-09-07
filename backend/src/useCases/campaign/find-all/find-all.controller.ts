import { BaseController, StatusCode } from "@expressots/core";
import { controller, httpGet, response } from "inversify-express-utils";
import { Response } from "express";
import { FindAllUseCase } from "./find-all.usecase";
import { IFindAllResponseDTO } from "./find-all.dto";

@controller("/campaign")
class FindAllController extends BaseController {
  constructor(private findAllUseCase: FindAllUseCase) {
    super("find-all-controller");
  }

  @httpGet("")
  execute(@response() res: Response): IFindAllResponseDTO {
    return this.callUseCase(this.findAllUseCase.execute(), res, StatusCode.OK);
  }
}

export { FindAllController };
