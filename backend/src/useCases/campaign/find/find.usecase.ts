import { CampaignRepository } from "@repositories/campaign/campaign.repository";
import { provide } from "inversify-binding-decorators";
import { IFindRequestDTO, IFindResponseDTO } from "./find.dto";

@provide(FindUseCase)
class FindUseCase {
  constructor(private readonly campaignRepository: CampaignRepository) {}

  execute({ id }: IFindRequestDTO): IFindResponseDTO | undefined {
    return this.campaignRepository.find(id)?.toJson<IFindResponseDTO>();
  }
}

export { FindUseCase };
