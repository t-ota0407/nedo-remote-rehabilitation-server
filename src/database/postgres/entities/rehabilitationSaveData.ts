import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class RehabilitationSaveData {
  
  @PrimaryColumn({ name: 'uuid' })
  uuid!: string;

  @Column({ name: 'user_uuid'})
  userUuid!: string;

  @Column({ name: 'sharpened_knife'})
  sharpenedKnife!: number;

  @Column({ name: 'created_at' })
  createdAt!: Date;

}
