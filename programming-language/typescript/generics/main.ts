function shortenArray<T>(data: Array<T>, amountToShorten: number): Array<T> {
  return data.splice(amountToShorten, data.length);
}

interface MeetingResource {
  name: string;
  capacity: number;
  hasProjector: boolean;
  tablesIncluded: number;
}

interface LibraryCollection<T> {
  _items: T[];
  addItemCatalog(newItem: T): void;
  removeItemCatalog(oldItem: T): void;
}

class Shelf<T> implements LibraryCollection<T> {
  _items: T[] = [];
  addItemCatalog(newItem: T): void {
    console.log(newItem);
  }

  removeItemCatalog(oldItem: T): void {
    console.log(oldItem);
  }
}

interface DataStructure<T> {
  push(newItem: T): void;
  pop(): T;
}

class Stack<T> implements DataStructure<T> {
  items: Array<T> = [];

  push(newItem: T): void {
    this.items.push(newItem);
  }

  pop(): T {
    return this.items.pop();
  }

  peek(): T {
    return this.items[this.items.length - 1];
  }
}

class Reservation<T> {
  reservationDate: Date;
  organizereName: string;
  resource: T;

  requestResource(requestResource: T, requester: string) {
    this.resource = requestResource;
    this.organizereName = requester;
  }
}
