import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

@Entity('user')
export class User {
    @PrimaryColumn({
      type: 'uuid'
    })
    id: string;

    @Column({
        type: 'varchar',
        length: 100,
    })
    userName: string;

    @Column({
        type: 'varchar',
        length: 200,
    })
    emailAddress: string;

    @Column({
        default: true
    })
    isActive: boolean;
}