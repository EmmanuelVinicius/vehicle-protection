import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Document } from "./Document";
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

  @OneToMany(() => Document, document => document.accident)
  @JoinTable()
  documents: Document[];

  @ManyToMany(() => User, document => document.accidents)
  @JoinTable()
  users: User[];

  @ManyToMany(() => Vehicle, document => document.accidents,)
  @JoinTable()
  vehicles: Vehicle[];
}