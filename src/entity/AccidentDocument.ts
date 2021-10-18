import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { Accident } from "./Accident";
import { Document } from "./Document";

@Entity()
export class AccidentDocument {
  @PrimaryColumn()
  accidentId: number;

  @OneToOne(() => Accident)
  @JoinColumn()
  accident: Accident;

  @PrimaryColumn()
  documentId: string;

  @OneToOne(() => Document)
  @JoinColumn()
  document: Document;
}