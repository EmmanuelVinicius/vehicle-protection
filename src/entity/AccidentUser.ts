import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { Accident } from "./Accident";
import { User } from "./User";

@Entity()
export class AccidentUser {
  @Column()
  accidentId: number;

  @OneToOne(() => Accident)
  @JoinColumn()
  accident: Accident;
  
  @Column()
  userId: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
  
}