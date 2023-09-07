import { AppContainer } from "@expressots/core";
import { ApplicationModule } from "@useCases/application.module";
import { CampaignModule } from "@useCases/campaign/campaign.module";

const appContainer = new AppContainer();

const container = appContainer.create([ApplicationModule, CampaignModule]);

export { container };
