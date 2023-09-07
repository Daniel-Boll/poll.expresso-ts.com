import { IEntity } from "@entities/base.entity";
import { ICampaignEntity } from "@entities/campaign.entity";

interface IFindRequestDTO extends Pick<IEntity, "id"> {}

interface IFindResponseDTO extends ICampaignEntity {}

export { IFindRequestDTO, IFindResponseDTO };
