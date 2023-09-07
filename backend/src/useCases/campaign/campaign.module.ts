import { CreateModule } from "@expressots/core";
import { CreateController } from "./create/create.controller";
import { FindController } from "./find/find.controller";
import { FindAllController } from "./find-all/find-all.controller";

const CampaignModule = CreateModule([CreateController, FindController, FindAllController]);

export { CampaignModule };
