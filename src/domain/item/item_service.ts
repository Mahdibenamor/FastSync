import Container, { Service } from "typedi";
import { ItemRepository } from "./item_repository";
@Service()
export class ItemService {
  private itemRepository: ItemRepository = Container.get(
    ItemRepository
  );
  constructor() {}


}
