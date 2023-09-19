import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class User {
  
  @PrimaryColumn({ name: 'uuid' })
  uuid!: string;

  @Column({ name: 'user_name' })
  userName!: string;

  @Column()
  password!: string;

  @Column({ name: 'created_at' })
  createdAt!: Date;

  @Column({ name: 'is_temporary' })
  isTemporary!: boolean;
}
