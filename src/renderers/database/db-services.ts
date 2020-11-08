import {Connection} from 'typeorm';
import { Settings } from './db-settings';
import { Account } from '../../assets/models/account.entity';
import { Apikey } from '../../assets/models/apikey.entity';

export class DatabaseService {

    constructor() {
        Settings.initialize();
    }

// For Accounts CRUD
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

        const accountRepo = connection.getRepository(Account);

        let accountToUpdate = await accountRepo.findOne(account.id);
        
        accountToUpdate.name = account.name;
        accountToUpdate.in_use = account.in_use;

        await accountRepo.save(accountToUpdate);

        return this.getAccounts(connection);
    }

    async deleteAccount(connection: Connection, account: Account){

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

// For API Keys CRUD
    async getApikeys(connection: Connection){

        const apikeyRepo = connection.getRepository(Apikey);
        return await apikeyRepo.find();
    }

    async addApikey(connection: Connection, apikey: Apikey){

        const apikeyRepo = connection.getRepository(Apikey);

        const apikey_result = await apikeyRepo.create(apikey);
        await apikeyRepo.save(apikey_result);
        
        return this.getApikeys(connection);
    }
}
