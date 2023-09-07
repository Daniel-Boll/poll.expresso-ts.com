import { randomUUID } from "node:crypto";

export interface IEntity {
  id: string;
}

export class BaseEntity {
  private id: IEntity["id"];

  constructor(props?: { id?: IEntity["id"] });
  constructor(id?: IEntity["id"]);
  constructor(propsOrId?: any) {
    if (typeof propsOrId === "object") {
      this.id = propsOrId?.id ?? randomUUID();
    } else {
      this.id = propsOrId ?? randomUUID();
    }
  }

  public getId(): IEntity["id"] {
    return this.id;
  }

  public toJson<T = Record<string, any>>(): T {
    const jsonObj = {};

    // Iterate over all own properties of the object
    for (const [key, value] of Object.entries(this)) {
      // if the attribute itself is an instance of BaseEntity, call its toJson method
      if (value instanceof BaseEntity) {
        jsonObj[key] = value.toJson();
        continue;
      }

      jsonObj[key] = value;
    }

    return <T>jsonObj;
  }
}
