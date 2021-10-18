import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Accident } from "./Accident";
import { Document } from "./Document";
import { User } from "./User";

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
  
  @Column()
  documentId: number;
  
  @OneToMany(() => Document, document => document.vehicle)
  @JoinColumn()
  document: Document;
  
  @Column()
  licensePlate: string;
  
  @Column()
  model: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  active: boolean;

  @ManyToMany(() => Accident)
  @JoinTable()
  accident: Accident
}