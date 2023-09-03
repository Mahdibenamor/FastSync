import  { Service } from "typedi";
import { Item,  itemSchema } from "./item";
import { LocalDataSource } from "../core/implementation/local_data_source";

@Service()
export class ItemDataSource extends LocalDataSource<Item> {
 
  constructor() {
    super(itemSchema, Item.name);
  }

}
