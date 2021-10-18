import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { Accident } from "./Accident";
import { Vehicle } from "./Vehicle";

@Entity()
export class AccidentVehicle {
  @PrimaryColumn()
  accidentId: number;

  @OneToOne(() => Accident)
  @JoinColumn()
  accident: Accident;

  @PrimaryColumn()
  vehicleId: string;

  @OneToOne(() => Vehicle)
  @JoinColumn()
  vehicle: Vehicle;
}