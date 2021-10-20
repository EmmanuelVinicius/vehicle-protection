import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Accident } from "./Accident";
import { User } from "./User";
import { Vehicle } from "./Vehicle";

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  documentType: string;

  @Column('varchar')
  documentFile: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('boolean', { default: true })
  active: boolean = true;

  @ManyToOne(() => Accident, accident => accident.documents, { nullable: false, cascade: true, onDelete: "CASCADE" })
  @JoinTable()
  accident: Accident

  @ManyToOne(() => Vehicle, vehicle => vehicle.documents)
  @JoinColumn()
  vehicle: Vehicle;

  @ManyToOne(() => User, user => user.documents, { nullable: false })
  @JoinColumn()
  user: User;
}