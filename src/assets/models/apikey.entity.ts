import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

    @Column()
    account_id: number;
}
