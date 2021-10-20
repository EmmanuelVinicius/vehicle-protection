import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "./User";
import { Vehicle } from "./Vehicle";

@Entity()
export class Accident {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column('varchar')
  description: string;
  
  @Column('varchar')
  locale: string;
  
  @Column('timestamp')
  timestamp: Date;
  
  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;
  
  @Column('boolean', { default: true })
  active: boolean = true;
  
  @ManyToMany(() => User, document => document.accidents)
  @JoinTable()
  users: User[];
  
  @ManyToMany(() => Vehicle, document => document.accidents,
  { nullable: false, cascade: true, onDelete: "CASCADE" })
  @JoinTable()
  vehicles: Vehicle[];
}