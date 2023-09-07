import {
  CampaignOption,
  ICampaignOptionEntity,
} from "@entities/campaign-option.entity";
import { Campaign, ICampaignEntity } from "@entities/campaign.entity";
import { SqliteProvider } from "@providers/database/sqlite/sqlite.provider";
import { IBaseRepository } from "@repositories/base-repository.interface";
import { inject } from "inversify";
import { provide } from "inversify-binding-decorators";
import { CampaignOptionRepository } from "./options.repository";

@provide(CampaignRepository)
export class CampaignRepository
  implements IBaseRepository<ICampaignEntity, Campaign>
{
  constructor(
    @inject(SqliteProvider) private db: SqliteProvider,
    private readonly campaignOptionRepository: CampaignOptionRepository,
  ) {}

  create(
    item: Omit<ICampaignEntity, "id"> & {
      options: Omit<ICampaignOptionEntity, "id" | "campaign_id" | "votes">[];
    },
  ): Campaign | null {
    const db = this.db.getDatabase();

    const insertCampaign = db.prepare(
      "INSERT INTO campaign (id, name) VALUES (?, ?)",
    );

    const createCampaignWithOptions = db.transaction(
      (campaignData, optionsData) => {
        const campaign = new Campaign(campaignData);
        insertCampaign.run(campaign.getId(), campaign.getName());

        for (const optionData of optionsData) {
          this.campaignOptionRepository.create({
            ...optionData,
            campaign_id: campaign.getId(),
          });
        }

        return campaign;
      },
    );

    try {
      const campaign = createCampaignWithOptions(item, item.options);
      return campaign;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  update(item: ICampaignEntity): Campaign | null {
    const campaign = new Campaign(item);

    const result = this.db
      .getDatabase()
      .prepare("UPDATE campaign SET name = ? WHERE id = ?")
      .run(campaign.getName(), campaign.getId());

    if (result.changes === 0) return null;

    return campaign;
  }

  delete(id: string): boolean {
    const result = this.db
      .getDatabase()
      .prepare("DELETE FROM campaign WHERE id = ?")
      .run(id);

    return result.changes > 0;
  }

  find(id: string): Campaign | null {
    const result = <ICampaignEntity>(
      this.db
        .getDatabase()
        .prepare("SELECT * FROM campaign WHERE id = ?")
        .get(id)
    );

    if (!result) return null;

    return new Campaign(result);
  }

  findAll(): Campaign[] {
    const result = <
      Array<
        ICampaignEntity & {
          option_id: string;
          option_name: string;
          option_votes: number;
          id: string;
        }
      >
    >this.db
      .getDatabase()
      .prepare(
        `
  SELECT 
    campaign.*, 
    campaign_option.name AS option_name, 
    campaign_option.votes AS option_votes
  FROM campaign
  LEFT JOIN campaign_option ON campaign_option.campaign_id = campaign.id;`,
      )
      .all();

    const campaigns: { [key: string]: Campaign } = {};

    result.forEach((row) => {
      if (!campaigns[row.id]) {
        campaigns[row.id] = new Campaign({
          id: row.id,
          name: row.name,
        });
      }

      if (row.option_id) {
        // Assuming Campaign has an addOption() method
        campaigns[row.id].addOption(
          new CampaignOption({
            id: row.option_id,
            name: row.option_name,
            votes: row.option_votes,
            campaign_id: row.id,
          }),
        );
      }
    });

    return Object.values(campaigns);
  }
}
