import { Service } from "typedi";
import { Repository } from "../core/implementation/repository";
import { Item } from "./item";
import { ItemDataSource } from "./item_data_source";

@Service()
export class ItemRepository extends Repository<Item, ItemDataSource> {
  constructor() {
    super(ItemDataSource);
  }
}
