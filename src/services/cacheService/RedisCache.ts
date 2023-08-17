// // RedisCache.ts
//
// import redis from 'redis';
// import {ICacheBehavior} from "./types";
//
// export class RedisCache implements ICacheBehavior{
//     private client: redis.RedisClusterType;
//
//     constructor() {
//         const url = 'redis://127.0.0.1:6379';
//         this.client = redis.createClient({
//             url
//         });
//
//         this.client.on('error', (error:string) => {
//             console.error('Redis error:', error);
//         });
//     }
//
//     async get<T>(key: string): Promise<T | null> {
//         return new Promise((resolve, reject) => {
//             this.client.get(key, (err:string, data:T) => {
//                 if (err) return reject(err);
//                 resolve(data);
//             });
//         });
//     }
//
//     set(key: string, value: string, ttl: number) {
//         this.client.setex(key, ttl, value);
//     }
//
//     del(key: string) {
//         this.client.del(key);
//     }
//
//     clear() {
//         this.client.flushdb((err:any, succeeded:any) => {
//             if (err) {
//                 console.error('Failed to clear cache:', err);
//             }
//             console.log('Cache cleared:', succeeded);
//         });
//     }
// }
//
export {}