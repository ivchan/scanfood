import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, Index } from 'typeorm';

@Entity('td_tasklist')
export class Tasklist {
    @PrimaryColumn({
      name: 'key',
      type: 'uuid'
    })
    key: string;

    @Index('idx_tasklist_org')
    @Column({
      name: 'org_key',
      type: 'uuid',
    })
    organization: string;

    @Column({
        name: 'tasklist_name',
        type: 'varchar',
        length: 100,
    })
    tasklistName: string;

    @Column({
      name: 'color',
      type: 'varchar',
      length: 10,
    })
    color: string;

    @Column({
        name: 'is_active',
        default: true
    })
    isActive: boolean;
}