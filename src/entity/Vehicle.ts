import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
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
  
  @OneToOne(() => Document)
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
}