import { BaseEntity } from "@entities/base.entity";

interface IBaseRepository<T, U extends BaseEntity> {
  create(item: Partial<T>): U | null;
  update(item: T): U | null;
  delete(id: string): boolean;
  find(id: string): U | null;
  findAll(): U[];
}

export { IBaseRepository };
