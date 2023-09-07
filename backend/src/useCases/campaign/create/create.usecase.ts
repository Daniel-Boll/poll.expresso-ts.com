import { log, LogLevel, Report, StatusCode } from "@expressots/core";
import { CampaignRepository } from "@repositories/campaign/campaign.repository";
import { provide } from "inversify-binding-decorators";
import { ICreateRequestDTO, ICreateResponseDTO } from "./create.dto";

@provide(CreateUseCase)
class CreateUseCase {
  constructor(private readonly campaignRepository: CampaignRepository) {}

  execute(campaign: ICreateRequestDTO): ICreateResponseDTO | undefined {
    try {
      return this.campaignRepository
        .create(campaign)
        ?.toJson<ICreateResponseDTO>();
    } catch (error: any) {
      if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
        // NOTE: Ugly error message
        Report.Error(
          "Campaign already exists",
          StatusCode.Conflict,
          "create-campaign.usecase.ts",
        );
      }
    }
  }
}

export { CreateUseCase };
