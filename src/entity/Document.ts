import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";

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
  
  @ManyToOne(() => User, user => user.documents)
  @JoinColumn()
  user: User;
}