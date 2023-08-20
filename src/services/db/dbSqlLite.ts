// import sqlite3, {RunResult} from 'sqlite3';
// import {Idb} from './db';
//
//
//
// export class SQLiteDb implements Idb {
//     private readonly db: sqlite3.Database;
//      constructor(dbName: string) {
//         this.db = new sqlite3.Database(dbName);
//     }
//
//
//     async tableExists(tableName: string): Promise<boolean> {
//         const result =  this.db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name=?`, [tableName]);
//         return !!result;
//     }
//
//     async createTable(query: string): Promise<void> {
//          this.db.run(query);
//     }
//
//     async select<T>(query: string, params?: any[]): Promise<T[]> {
//
//         return new Promise((resolve, reject) => {
//             this.db?.all(query, params, (err, rows) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(rows as T[]);
//                 }
//             });
//         });
//     }
//
//
//     async insert(query: string, params?: any[]): Promise<number> {
//         return new Promise((resolve, reject) => {
//             this.db.run(query, params, function (this: RunResult, err: Error) {
//                 if (err) reject(err);
//                 else resolve(this.lastID);
//             });
//         });
//     }
//
//     async update(query: string, params?: any[]): Promise<number> {
//         return new Promise((resolve, reject) => {
//             this.db.run(query, params, function (this: RunResult, err: Error) {
//                 if (err) reject(err);
//                 else resolve(this.changes);
//             });
//         });
//     }
//
//     async delete(query: string, params?: any[]): Promise<number> {
//         return new Promise((resolve, reject) => {
//             this.db.run(query, params, function (this: RunResult, err: Error) {
//                 if (err) reject(err);
//                 else resolve(this.changes);
//             });
//         });
//      }
// }
export {};