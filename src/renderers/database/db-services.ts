import {Connection} from 'typeorm';
import { Settings } from './db-settings';
import { Account } from '../../assets/models/account.entity';

export class DatabaseService {

    constructor() {
        Settings.initialize();
    }

    async getAccounts(connection: Connection){

        const accountRepo = connection.getRepository(Account);
        return await accountRepo.find();
    }

    async getAccountById(connection: Connection, account_id: number){

        const accountRepo = connection.getRepository(Account);
        return await accountRepo.findByIds([account_id])
    }

    async addAccount(connection: Connection, account: Account){

        const accountRepo = connection.getRepository(Account);

        const account_result = await accountRepo.create(account);
        await accountRepo.save(account_result);
        
        return this.getAccounts(connection);
    }

    async updateAccount(connection: Connection, account: Account){
<<<<<<< HEAD
        const accountRepo = connection.getRepository(Account);

        let accountToUpdate = await accountRepo.findOne(account.id);
        
        accountToUpdate.name = account.name;
        accountToUpdate.in_use = account.in_use;

        return await accountRepo.save(accountToUpdate);
    }

    async deleteAccount(connection: Connection, account: Account){
=======
>>>>>>> jasper

        const accountRepo = connection.getRepository(Account);

        let accountToUpdate = await accountRepo.findOne(account.id);
        
        accountToUpdate.name = account.name;
        accountToUpdate.in_use = account.in_use;

        await accountRepo.save(accountToUpdate);

        return this.getAccounts(connection);
    }

    async deleteAccountById(connection: Connection, account_id: number){

        const accountRepo = connection.getRepository(Account);

        const account_result = await accountRepo.findOne(account_id);

        await accountRepo.remove(account_result);
        
        return this.getAccounts(connection);
    }
}
