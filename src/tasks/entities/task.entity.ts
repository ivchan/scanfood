import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, Index } from 'typeorm';

@Entity('td_task')
export class Task {
    @PrimaryColumn({
      name: 'key',
      type: 'uuid'
    })
    key: string;

    @Index('idx_tasklist')
    @Column({
      name: 'tasklist_key',
      type: 'uuid',
    })
    tasklist: string;

    @Column({
        name: 'task_name',
        type: 'varchar',
        length: 100,
    })
    taskName: string;

    @Column({
        name: 'is_active',
        default: true
    })
    isActive: boolean;
}