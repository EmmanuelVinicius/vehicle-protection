import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

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
}