export class CheckAccount {
  private _balance = 0;

  constructor(public title: string) {}

  get balance() {
    return this._balance;
  }

  set balance(val: number) {
    this._balance = val;
  }

  deposite(amount: number) {
    this._balance += amount;
  }

  withdraw(amount: number) {
    this._balance -=amount;
  }
}
