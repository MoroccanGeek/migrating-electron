import {Connection} from 'typeorm';
import { Settings } from './db-settings';
import { Account } from '../../assets/models/account.entity';
import { Apikey } from '../../assets/models/apikey.entity';
import { Project } from '../../assets/models/project.entity';

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
        return await accountRepo.findOne(account_id);
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

        accountToUpdate = account;

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

    async accountExists(connection: Connection) {
        const accountRepo = connection.getRepository(Account);
        return await accountRepo.findOne();
    }

    async updateAccountStatusById(connection: Connection, account_id: number){
        const accountRepo = connection.getRepository(Account);

        let accountToUpdate = await accountRepo.findOne(account_id);

        if(accountToUpdate.in_use == '1'){
            accountToUpdate.in_use = '0';
        }
        else{
            let accountToDeactivate = await accountRepo.findOne({in_use: '1'});

            if(accountToDeactivate){
                accountToDeactivate.in_use = '0';
                await accountRepo.save(accountToDeactivate);
            }
            
            accountToUpdate.in_use = '1';
        }
        
        await accountRepo.save(accountToUpdate);

        return true;
    }

// For API Keys CRUD
    async getApikeys(connection: Connection){

        const apikeyRepo = connection.getRepository(Apikey);
        return await apikeyRepo.find();
    }

    async getApikeyById(connection: Connection, apikey_id: number){
        const apikeyRepo = connection.getRepository(Apikey);
        return await apikeyRepo.findByIds([apikey_id], { relations: ["account"] });
    }

    async addApikey(connection: Connection, apikey: Apikey){

        const apikeyRepo = connection.getRepository(Apikey);

        const apikey_result = await apikeyRepo.create(apikey);
        await apikeyRepo.save(apikey_result);
        
        return this.getApikeys(connection);
    }

    async updateApikey(connection: Connection, apikey: Apikey){

        const apikeyRepo = connection.getRepository(Apikey);

        let apikeyToUpdate = await apikeyRepo.findOne(apikey.id);

        apikeyToUpdate.key = apikey.key;
        apikeyToUpdate.secret_key = apikey.secret_key;
        apikeyToUpdate.access_token = apikey.access_token;
        apikeyToUpdate.access_secret = apikey.access_secret;
        apikeyToUpdate.bearer_token = apikey.bearer_token;
        apikeyToUpdate.account = apikey.account;
        apikeyToUpdate.project = apikey.project;
        
        await apikeyRepo.save(apikeyToUpdate);

        return this.getApikeys(connection);
    }

    async deleteApikeyById(connection: Connection, apikey_id: number){
        const apikeyRepo = connection.getRepository(Apikey);
        const apikeyToDelete = await apikeyRepo.findOne(apikey_id);
        await apikeyRepo.remove(apikeyToDelete);
        return this.getApikeys(connection);
    }

// For Projects CRUD
    async getProjects(connection: Connection) {
        const projectRepo = connection.getRepository(Project);
        return await projectRepo.find();
    }

    async getProjectsByAccountId(connection: Connection, accountId: number) {
        // Get Account By Id
        let theAccount: Account = await this.getAccountById(connection, accountId);

        const projectRepo = connection.getRepository(Project);

        return await projectRepo.find({account: theAccount});
    }

    async getProjectById(connection: Connection, project_id: number) {
        const projectRepo = connection.getRepository(Project);
        return await projectRepo.findOne(project_id,  { relations: ["account"] });
    }

    async addProject(connection: Connection, project: Project) {
        const projectRepo = connection.getRepository(Project);

        const project_result = await projectRepo.create(project);
        await projectRepo.save(project_result);
        
        return this.getProjects(connection);
    }
    
    async updateProject(connection: Connection, project: Project) {
        const projectRepo = connection.getRepository(Project);

        let projectToUpdate = await projectRepo.findOne(project.id);

        projectToUpdate.name = project.name;
        
        await projectRepo.save(projectToUpdate);

        return this.getProjects(connection);
    }

    async deleteProjectById(connection: Connection, project_id: number) {
        const projectRepo = connection.getRepository(Project);
        const projectToDelete = await projectRepo.findOne(project_id);
        await projectRepo.remove(projectToDelete);
        return this.getProjects(connection);
    }
}
