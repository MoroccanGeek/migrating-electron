import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Account } from './account.entity';
import { Project } from './project.entity';

@Entity()
export class Apikey
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    key: string;

    @Column()
    secret_key: string;

    @Column()
    access_token: string;

    @Column()
    access_secret: string;

    @Column()
    bearer_token: string;

    @Column()
    in_use: number;

    // This column can not be NULL
    @ManyToOne(() => Account, account => account.apikeys, { onDelete: 'CASCADE',eager: true })
    @JoinColumn({ name: "account_id" })
    account: Account;

    // This column can be NULL, that why we added {nullable: true}
    @ManyToOne(() => Project, project => project.apikeys, { onDelete: 'CASCADE',eager: true, nullable: true })
    @JoinColumn({ name: "project_id" })
    project: Project;

}
