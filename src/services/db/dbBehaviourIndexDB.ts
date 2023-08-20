import {Idb} from "./db";
import Dexie from "dexie";


export class DbBehaviourIndexDB implements Idb {
    private readonly db: Dexie;
    constructor(dbname:string) {
        this.db = new Dexie(dbname);
    }
    async init(table: string,keys:string): Promise<void> {
        if (!this.db) throw new Error("Database not initialized");
        //if (await this.tableExists(table)) return;
        let schema: {[p:string]:string} = {};
        schema[table] = keys;

        this.db.version(1).stores({
            ...schema
        });
    }
    async tableExists(tableName: string): Promise<boolean> {
        if (!this.db) throw new Error("Database not initialized");
        console.log('tableExists',this.db);
        return this.db.table(tableName) !== undefined;
    }


    async createTable(table: string, keys:string): Promise<void> {
        console.log('createTable',table,keys);
        this.db.version(1).stores({
            favorites: keys
        });
    }

    async select<T>(tableName: string): Promise<T[]> {
       return  this.db.table(tableName).where("id").above(0).toArray();
    }

    async insert<T>(tableName: string, value: T): Promise<number> {
        this.db.table(tableName).add(value);
        return 1;
    }

    async update(tableName: string, value: any): Promise<number> {
        this.db.table(tableName).put(value);
        return 1;
    }

    async delete(tableName: string, id: number): Promise<number> {
        this.db.table(tableName).delete(id);
        return 1;
    }
}
