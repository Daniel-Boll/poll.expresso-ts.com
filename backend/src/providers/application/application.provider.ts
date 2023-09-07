import { Application, Environments, log, LogLevel } from "@expressots/core";
import { provide } from "inversify-binding-decorators";

@provide(ApplicationProvider)
class ApplicationProvider extends Application {
  protected configureServices(): void {
    Environments.checkAll();
  }

  protected serverShutdown(): void {
    log(LogLevel.Info, "Server is shutting down", "logger-provider");
    super.serverShutdown();
  }
}

export { ApplicationProvider };
