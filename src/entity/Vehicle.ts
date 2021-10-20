import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Accident } from "./Accident";
import { User } from "./User";

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  licensePlate: string;
  
  @Column('varchar')
  model: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('boolean', { default: true })
  active: boolean = true;

  @ManyToMany(() => Accident, accident => accident.vehicles)
  @JoinTable()
  accidents: Accident

  @OneToOne(() => User,
  { nullable: false, cascade: true, onDelete: "CASCADE" })
  @JoinColumn()
  user: User;
}