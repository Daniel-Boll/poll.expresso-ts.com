import { provide } from "inversify-binding-decorators";
import { BaseEntity } from "./base.entity";

export interface ICampaignOptionEntity {
  name: string;
  votes: number;
  campaign_id: string;
}

@provide(CampaignOption)
export class CampaignOption extends BaseEntity {
  private name: ICampaignOptionEntity["name"];
  private votes: ICampaignOptionEntity["votes"];
  private campaign_id: ICampaignOptionEntity["campaign_id"];

  constructor(props: Omit<ICampaignOptionEntity, "id">);
  constructor(props: Omit<ICampaignOptionEntity, "id" | "votes">);
  constructor(props: ICampaignOptionEntity & { id: string });
  constructor(name: string, votes: number, campaign_id: string, id?: string);
  constructor(
    propsOrName: any,
    votes?: number,
    campaign_id?: string,
    id?: string,
  ) {
    if (typeof propsOrName === "object") {
      super({ id: propsOrName.id });
      this.name = propsOrName.name;
      this.votes = propsOrName?.votes ?? 0;
      this.campaign_id = propsOrName.campaign_id;
    } else {
      super({ id });
      this.name = propsOrName;
      this.votes = votes ?? 0; // Default to 0 if not provided
      this.campaign_id = campaign_id!;
    }
  }

  public getName(): ICampaignOptionEntity["name"] {
    return this.name;
  }

  public getVotes(): ICampaignOptionEntity["votes"] {
    return this.votes;
  }

  public getCampaignId(): ICampaignOptionEntity["campaign_id"] {
    return this.campaign_id;
  }
}
