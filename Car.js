export default class Car {
  constructor(number, driverAge) {
    this.number = number;
    this.driverAge = driverAge;
  }
  get number() {
    return this._number;
  }
  set number(number) {
    this._number = number;
  }
  get driverAge() {
    return this._driverAge;
  }
  set driverAge(driverAge) {
    this._driverAge = driverAge;
  }
}
