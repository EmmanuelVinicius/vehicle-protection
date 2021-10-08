import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @OneToOne(() => User)
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
}