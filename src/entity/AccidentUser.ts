import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { Accident } from "./Accident";
import { User } from "./User";

@Entity()
export class AccidentUser {
  @PrimaryColumn()
  accidentId: number;

  @OneToOne(() => Accident)
  @JoinColumn()
  accident: Accident;
  
  @PrimaryColumn()
  userId: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
  
}