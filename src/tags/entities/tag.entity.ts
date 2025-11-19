import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, Index } from 'typeorm';

@Entity('td_tag')
export class Tag {
    @PrimaryColumn({
      name: 'key',
      type: 'uuid'
    })
    key: string;

    @Index('idx_tag_org')
    @Column({
      name: 'org_key',
      type: 'uuid',
    })
    organization: string;

    @Column({
        name: 'tag_name',
        type: 'varchar',
        length: 100,
    })
    tagName: string;

    @Column({
        name: 'is_active',
        default: true
    })
    isActive: boolean;
}