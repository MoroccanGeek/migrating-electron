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

    async addAccount(connection: Connection, account: Account){

        const accountRepo = connection.getRepository(Account);

        const account_result = await accountRepo.create(account);
        await accountRepo.save(account_result);
        
        return this.getAccounts(connection);
    }

    async deleteAccount(connection: Connection, account: Account){

        const accountRepo = connection.getRepository(Account);

        const account_result = await accountRepo.create(account);
        await accountRepo.remove(account_result);
        
        return this.getAccounts(connection);
    }
}
