import { ICampaignOptionEntity } from "@entities/campaign-option.entity";
import { ICampaignEntity } from "@entities/campaign.entity";

interface ICreateRequestDTO extends Omit<ICampaignEntity, "id"> {
  options: Omit<ICampaignOptionEntity, "id" | "campaign_id" | "votes">[];
}

interface ICreateResponseDTO extends ICampaignEntity {
  options: ICampaignOptionEntity[];
}

export { ICreateRequestDTO, ICreateResponseDTO };
