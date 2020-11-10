import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Account } from './account.entity';

@Entity()
export class Project {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Account, account => account.apikeys, { onDelete: 'CASCADE',eager: true })
    @JoinColumn({ name: "account_id" })
    account: Account;
}
