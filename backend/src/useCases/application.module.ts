import { CreateModule } from "@expressots/core";
import { ApplicationController } from "./application/application.controller";

const ApplicationModule = CreateModule([ApplicationController]);

export { ApplicationModule };
