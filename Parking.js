export default class Parking {
  constructor(totalSlots) {
    this.totalSlots = totalSlots;
    this.slotDetails = {};
    this.closestParking = 1;
  }
  get totalSlots() {
    return this._totalSlots;
  }
  set totalSlots(totalSlots) {
    this._totalSlots = totalSlots;
  }
  park(car) {
    // closest parking farther than available slots
    if (this.closestParking > this.totalSlots) {
      return `Parking is full`;
    }
    this.slotDetails[this.closestParking] = car;
    let result = `Car with vehicle registration number "${car.number})}" has been parked at slot number ${this.closestParking}`;
    // update closest parking
    for (let i = this.closestParking; i < this.totalSlots + 1; i++) {
      if (!this.slotDetails[i]) {
        this.closestParking = i;
        break;
      }
    }
    return result;
  }
  leave(slot) {
    if (!this.slotDetails[slot]) {
      return `No Car parked at this slot`;
    }
    let result = `Slot number ${slot} vacated, the car with vehicle registration number "${this.slotDetails[slot].number}" left the space, the driver of the car was of age ${this.slotDetails[slot].driverAge}`;

    this.slotDetails[slot] = null;

    // update closest parking if car left from closer slot
    this.closestParking =
      this.closestParking > slot ? slot : this.closestParking;
    return result;
  }
}
