import "reflect-metadata";

import { container } from "app.container";
import { ServerEnvironment } from "@expressots/core";
import { ApplicationProvider } from "@providers/application/application.provider";
import { env } from "env";

async function bootstrap() {
  const app = new ApplicationProvider().create(container);
  app.listen(
    env.application.port,
    ServerEnvironment[env.application.environment],
  );
}

bootstrap();
