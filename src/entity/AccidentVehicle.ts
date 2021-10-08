import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { Accident } from "./Accident";
import { Vehicle } from "./Vehicle";

@Entity()
export class AccidentVehicle {
  @Column()
  accidentId: number;

  @OneToOne(() => Accident)
  @JoinColumn()
  accident: Accident;

  @Column()
  vehicleId: string;

  @OneToOne(() => Vehicle)
  @JoinColumn()
  vehicle: Vehicle;
}