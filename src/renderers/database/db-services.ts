import {Connection, ConnectionOptions, createConnection} from 'typeorm';
// import {Item} from '../../dist/assets/models/item.schema';
import { Settings } from './db-settings';
import {Item} from '../../assets/models/item.schema';

export class DatabaseService {

    constructor() {
        Settings.initialize();
    }

    async getItems(connection: Connection){

        const itemRepo = connection.getRepository(Item);
        return await itemRepo.find();
    }

    async addItem(connection: Connection, item: Item){

        const itemRepo = connection.getRepository(Item);

        const item_result = await itemRepo.create(item);
        await itemRepo.save(item_result);
        
        return this.getItems(connection);
    }

    async deleteItem(connection: Connection, item: Item){

        const itemRepo = connection.getRepository(Item);

        const item_result = await itemRepo.create(item);
        await itemRepo.remove(item_result);
        
        return this.getItems(connection);
    }
}
