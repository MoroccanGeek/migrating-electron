import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { Apikey } from './apikey.entity';

@Entity()
export class Account
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    in_use: string;

    @OneToMany(() => Apikey, apikey => apikey.account)
    apikeys: Apikey[];
}