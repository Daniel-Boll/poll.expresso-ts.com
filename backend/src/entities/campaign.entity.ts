import { provide } from "inversify-binding-decorators";
import { BaseEntity } from "./base.entity";
import { CampaignOption } from "./campaign-option.entity"; // Import the CampaignOption entity

export interface ICampaignEntity {
  name: string;
}

@provide(Campaign)
export class Campaign extends BaseEntity {
  private name: ICampaignEntity["name"];
  private options!: CampaignOption[]; // Add options array to store CampaignOption entities

  constructor(props: Omit<ICampaignEntity, "id">);
  constructor(props: ICampaignEntity & { id: string });
  constructor(name: string, id?: string);
  constructor(propsOrName: any, id?: string) {
    if (typeof propsOrName === "object") {
      super({ id: propsOrName.id });
      this.name = propsOrName.name;
    } else {
      super(id);
      this.name = propsOrName;
    }

    this.options = [];
  }

  public getName(): ICampaignEntity["name"] {
    return this.name;
  }

  public addOption(option: CampaignOption): void {
    this.options.push(option);
  }

  public getOptions(): CampaignOption[] {
    return this.options;
  }
}
