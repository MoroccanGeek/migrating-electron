import { Apikey } from './apikey.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Account } from './account.entity';

@Entity()
export class Project {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Account, account => account.apikeys, { onDelete: 'CASCADE',eager: true, nullable: false })
    @JoinColumn({ name: "account_id" })
    account: Account;

    @OneToMany(() => Apikey, apikey => apikey.project)
    apikeys: Apikey[];
}
