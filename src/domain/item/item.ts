import { Schema } from "mongoose";


export class Item {
  public _id: string;
  public createdAt: Date;

  constructor(
  ) {
    this.createdAt = new Date();
  }
}

export const itemSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  createdAt: {
    type: Date,
  },
});


class Sync<T> {
  private data: { [key: string]: T[] } = {};

  constructor(...listTypes: (new () => T)[]) {
    listTypes.forEach((listType) => {
      this.data[listType.name] = [];
    });
  }

  addElement(listType: new () => T, element: T) {
    if (!this.data[listType.name]) {
      this.data[listType.name] = [];
    }
    this.data[listType.name].push(element);
  }

  sync() {
    // Perform synchronization logic using this.data
    console.log('Syncing:', this.data);
  }
}

class Invoice {
  // Invoice properties and methods
}

class Mission {
  // Mission properties and methods
}



const syncInstance = new Sync<Invoice | Mission >(Invoice, Mission);

const invoice1 = new Invoice();
const mission1 = new Mission();

syncInstance.addElement(Invoice, invoice1);
syncInstance.addElement(Mission, mission1);

syncInstance.sync();