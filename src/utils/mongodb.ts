// utils/mongodb.ts
import { MongoClient, Db, MongoClientOptions } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options: MongoClientOptions = {};

let client: MongoClient | undefined;
let connection: Db | undefined;

async function connect() {
    try {
       if(!client && uri) {
        client = new MongoClient(uri, options);
        await client.connect();
        connection = client.db();
       } 
    } catch (error) {
        console.error('Error during MongoDB connection:', error);
        throw error;
    }
    return connection!;
}

async function disconnect() {
    try {
        if (client) {
            await client.close();
            client = undefined;
            connection = undefined;
        } 
    } catch (error) {
        console.error('Error during MongoDB disconnection:', error);
        throw error;
    }
}

export { connect, disconnect };
