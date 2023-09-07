import { provideSingleton } from "@expressots/core";

@provideSingleton(ApplicationUseCase)
class ApplicationUseCase {
  execute() {
    return "OK";
  }
}

export { ApplicationUseCase };
