
interface Vehicle {
  move: (distance: number) => void;
}

class Car implements Vehicle {
  move = (distance: number) => {
    // Move car…
  };

  turnSteeringWheel = (direction: string) => {
    // Turn wheel…
  };
}

class VehicleController {
  vehicle: Vehicle;
  constructor(vehicle: Vehicle) {
    this.vehicle = vehicle;
  }
}

const myCar = new Car();
const vehicleController = new VehicleController(myCar);

const { vehicle } = vehicleController;
myCar.turnSteeringWheel('left');

const isCar = (variableToCheck: any): variableToCheck is Car =>
  (variableToCheck as Car).turnSteeringWheel !== undefined;