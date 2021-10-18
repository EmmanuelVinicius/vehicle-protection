import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Accident } from "./Accident";
import { User } from "./User";
import { Vehicle } from "./Vehicle";

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  documentType: string;

  @Column()
  documentFile: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  active: boolean;

  @ManyToMany(() => Accident)
  @JoinTable()
  accident: Accident

  @ManyToOne(() => Vehicle)
  @JoinColumn()
  vehicle: Vehicle;
}