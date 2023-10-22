import { Entity, PrimaryColumn, Column } from "typeorm";
import { RehabilitationCondition } from "../../../types/rehabilitationCondition";

@Entity()
export class RehabilitationResult {
  
  @PrimaryColumn({ name: 'uuid' })
  uuid!: string;

  @Column({ name: 'created_at'})
  createdAt!: Date;

  @Column({ name: 'user_uuid'})
  userUuid!: string;

  @Column({ name: 'rehabilitation_condition', type: 'varchar' })
  rehabilitationCondition!: RehabilitationCondition

  @Column({ name: 'rehabilitation_started_at' })
  rehabilitationStartedAt!: Date;

  @Column({ name: 'rehabilitation_finished_at' })
  rehabilitationFinishedAt!: Date;

  @Column({ name: 'reaching_times' })
  reachingTimes!: number;

  @Column({ name: 'sharpened_knife_before' })
  sharpenedKnifeBefeore!: number;

  @Column({ name: 'sharpened_knife_after' })
  sharpenedKnifeAfter!: number;

}
