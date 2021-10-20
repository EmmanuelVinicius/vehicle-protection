import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Accident } from "./Accident";
import { Document } from "./Document";
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

  @ManyToMany(() => Accident, accident => accident.vehicles, { nullable: false, cascade: true, onDelete: "CASCADE" })
  @JoinTable()
  accidents: Accident

  @OneToMany(() => Document, document => document.vehicle)
  @JoinColumn()
  documents: Document[];

  @OneToOne(() => User, { nullable: false, cascade: true, onDelete: "CASCADE" })
  @JoinColumn()
  user: User;
}