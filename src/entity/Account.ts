import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
  
  @Column()
  username: string;

  @Column()
  password: string;
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  active: boolean;
}
