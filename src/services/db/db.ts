export interface Idb {
    tableExists(tableName: string): Promise<boolean>;
    createTable(tableName: string,schema:string): Promise<void>;
    select<T>(table:string,options?:SelectOptions<T>): Promise<T[]>;
    insert<T>(table:string,data:T): Promise<number>;
    update<T>(tableName:string,data:T): Promise<number>;
    delete(tableName:string,id:number): Promise<number>;

    //init(sqLiteDb: SQLiteDb): void;
}
export type FilterFunction<T> = (item: T) => boolean;
export type SortFunction<T> = (a: T, b: T) => number;  // Similar to Array.sort's comparator

export interface SelectOptions<T> {
    filter?: FilterFunction<T>;
    limit?: number;
    sort?: SortFunction<T>;
}
export class DB implements Idb{
    private _db?: Idb;

    public tableExists(tableName: string): Promise<boolean> {
        return this._db!.tableExists(tableName);
    }
    public createTable(tableName: string, schema: string): Promise<void> {
        return this._db!.createTable(tableName,schema);
    }
    public init(dbBehaviour:Idb): void {
        this._db = dbBehaviour;
    }
    select<T>(table: string, options?: SelectOptions<T>): Promise<T[]> {
        return this._db!.select<T>(table,options);
    }
    insert<T>(table:string,data:T): Promise<number> {
        return this._db!.insert(table,data);
    }
    update<T>(tableName: string, data: T): Promise<number> {
        return this._db!.update<T>(tableName,data);
    }
    delete(table:string,id:number): Promise<number> {
        return this._db!.delete(table,id);
    }
}
export const db = new DB();