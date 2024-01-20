// utils/mongodb.ts
import { MongoClient, Db, MongoClientOptions } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options: MongoClientOptions = {};

let client: MongoClient | undefined;
let connection: Db | undefined;

async function connect() {
    if (!client && uri) {
        client = new MongoClient(uri, options);
        await client.connect();
        connection = client.db();
    }
    return client!;
}

async function disconnect() {
    if (client) {
        await client.close();
        client = undefined;
        connection = undefined;
    }
}

export { connect, disconnect };
