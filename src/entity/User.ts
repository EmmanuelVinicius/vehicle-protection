import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToMany, JoinTable, OneToOne } from "typeorm";
import { Accident } from "./Accident";
import { Account } from "./Account";
import { Document } from "./Document";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @OneToOne(() => Account)
  @JoinColumn()
  account: Account;

  @OneToMany(() => Document, document => document.user)
  @JoinColumn()
  document: Document;

  @ManyToMany(() => Accident)
  @JoinTable()
  accident: Accident
}
