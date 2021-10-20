import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Accident } from "./Accident";
import { Account } from "./Account";
import { Document } from "./Document";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column('varchar')
  firstName: string;
  
  @Column('varchar')
  lastName: string;
  
  @Column('int')
  age: number;
  
  @Column('varchar')
  cpf: string;
  
  @Column('boolean', { default: true })
  active: boolean = true;
  
  @OneToOne(() => Account)
  @JoinColumn()
  account: Account;
  
  @OneToMany(() => Document, document => document.user,
  { nullable: false, cascade: true, onDelete: "CASCADE" })
  @JoinColumn()
  documents: Document[];
  
  @ManyToMany(() => Accident, accident => accident.users,
  { nullable: false, cascade: true, onDelete: "CASCADE" })
  @JoinTable()
  accidents: Accident
}
