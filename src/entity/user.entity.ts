import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

@Entity('user')
export class User {
    @PrimaryColumn()
    key: string;

    @Column({
        type: 'varchar',
        length: 200,
    })
    userName: string;

    @Column({
        type: 'varchar',
        length: 200,
    })
    emailAddress: string;
}