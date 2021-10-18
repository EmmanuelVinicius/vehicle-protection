import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import { Document } from "./Document";
import { User } from "./User";
import { Vehicle } from "./Vehicle";

@Entity()
export class Accident {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;
  
  @Column()
  locale: string;
  
  @Column()
  timestamp: string;
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  active: boolean;

  @ManyToMany(() => Document)
  @JoinTable()
  document: Document;

  @ManyToMany(() => User)
  @JoinTable()
  user: User;

  @ManyToMany(() => Vehicle)
  @JoinTable()
  vehicle: Vehicle;
}