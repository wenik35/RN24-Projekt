import { MongoClient } from 'mongodb';

var url = "mongodb://localhost:27017/";
const dbClient = new MongoClient(url);
const db = dbClient.db('rene24').collection("data");

db.deleteMany({}).then(() => dbClient.close());

