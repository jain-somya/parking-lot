import fs from "fs";
import readline from "readline";
import Car from "./Car.js";
import Parking from "./Parking.js";

const inputFile = "input.txt";
const outputFile = "output.txt";

async function processInputFile() {
  const fileStream = fs.createReadStream(inputFile);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  let parkingLot;
  for await (const line of rl) {
    // parsing commands from input file
    let commandLine = line.split(" ");
    let input1 = commandLine[1];
    let input2 = commandLine[0] === "Park" && commandLine[3];
    let command = commandLine[0];
    let result;

    if (command === "Create_parking_lot") {
      parkingLot = new Parking(input1);
      result = `Created parking of ${parkingLot.totalSlots} slots`;
    } else if (command === "Park") {
      result = parkingLot.park(new Car(input1, input2));
    } else if (command === "Leave") {
      result = parkingLot.leave(input1);
    } else if (command === "Slot_numbers_for_driver_of_age") {
      result = getSlotsWithDriverAge(parkingLot, input1);
    } else if (command === "Slot_number_for_car_with_number") {
      result = getSlotWithCarNumber(parkingLot, input1);
    } else if (command === "Vehicle_registration_number_for_driver_of_age") {
      result = getNumberWithDriverAge(input1);
    } else {
      result = ` ${command}: command not found!`;
    }
    fs.appendFile(outputFile, `\n${result}`, () => {});
  }
}

function getSlotsWithDriverAge(parkingLot, age) {
  let slots = [];
  for (let i in parkingLot.slotDetails) {
    if (
      parkingLot.slotDetails[i] &&
      parkingLot.slotDetails[i].driverAge === age
    ) {
      slots.push(i);
    }
  }
  if (slots.length) {
    return `${slots.join(",")}`;
  } else {
    return `No cars parked by ${age} year old driver`;
  }
}
function getNumberWithDriverAge(parkingLot, age) {
  let numbers = [];
  for (let i in parkingLot.slotDetails) {
    if (
      parkingLot.slotDetails[i] &&
      parkingLot.slotDetails[i].driverAge === age
    ) {
      numbers.push(parkingLot.slotDetails[i].number);
    }
  }
  if (numbers.length) {
    return `"${numbers.join('","')}"`;
  } else {
    return `\nNo cars parked by ${age} year old driver`;
  }
}
function getSlotWithCarNumber(parkingLot, number) {
  for (let i in parkingLot.slotDetails) {
    if (parkingLot.slotDetails[i].number === number) {
      return i;
    }
  }
  return `No car parked with the number ${number}`;
}

processInputFile();
