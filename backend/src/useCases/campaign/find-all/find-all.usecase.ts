import { CampaignRepository } from "@repositories/campaign/campaign.repository";
import { provide } from "inversify-binding-decorators";
import { IFindAllResponseDTO } from "./find-all.dto";

@provide(FindAllUseCase)
class FindAllUseCase {
  constructor(private readonly campaignRepository: CampaignRepository) {}

  execute(): IFindAllResponseDTO[] {
    return this.campaignRepository.findAll().map((campaign) => {
      return campaign.toJson<IFindAllResponseDTO>();
    });
  }
}

export { FindAllUseCase };
