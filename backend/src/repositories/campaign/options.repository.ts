import {
  CampaignOption,
  ICampaignOptionEntity,
} from "@entities/campaign-option.entity";
import { SqliteProvider } from "@providers/database/sqlite/sqlite.provider";
import { IBaseRepository } from "@repositories/base-repository.interface";
import { inject } from "inversify";
import { provide } from "inversify-binding-decorators";

@provide(CampaignOptionRepository)
export class CampaignOptionRepository
  implements IBaseRepository<ICampaignOptionEntity, CampaignOption>
{
  constructor(@inject(SqliteProvider) private db: SqliteProvider) {}

  create(
    item: Omit<ICampaignOptionEntity, "id" | "votes">,
  ): CampaignOption | null {
    const option = new CampaignOption(item);

    const result = this.db
      .getDatabase()
      .prepare(
        "INSERT INTO campaign_option (id, name, votes, campaign_id) VALUES (?, ?, ?, ?)",
      )
      .run(
        option.getId(),
        option.getName(),
        option.getVotes(),
        option.getCampaignId(),
      );

    if (result.changes === 0) return null;

    return option;
  }

  update(item: ICampaignOptionEntity): CampaignOption | null {
    const option = new CampaignOption(item);

    const result = this.db
      .getDatabase()
      .prepare("UPDATE campaign_option SET name = ?, votes = ? WHERE id = ?")
      .run(option.getName(), option.getVotes(), option.getId());

    if (result.changes === 0) return null;

    return option;
  }

  delete(id: string): boolean {
    const result = this.db
      .getDatabase()
      .prepare("DELETE FROM campaign_option WHERE id = ?")
      .run(id);

    return result.changes > 0;
  }

  find(id: string): CampaignOption | null {
    const result = <ICampaignOptionEntity>(
      this.db
        .getDatabase()
        .prepare("SELECT * FROM campaign_option WHERE id = ?")
        .get(id)
    );

    if (!result) return null;

    return new CampaignOption(result);
  }

  findAll(): CampaignOption[] {
    const result = <ICampaignOptionEntity[]>(
      this.db.getDatabase().prepare("SELECT * FROM campaign_option").all()
    );

    return result.map((option) => new CampaignOption(option));
  }
}
