import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { Accident } from "./Accident";
import { Document } from "./Document";

@Entity()
export class AccidentDocument {
  @Column()
  accidentId: number;

  @OneToOne(() => Accident)
  @JoinColumn()
  accident: Accident;

  @Column()
  documentId: string;

  @OneToOne(() => Document)
  @JoinColumn()
  document: Document;
}