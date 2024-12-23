import { MongoClient } from 'mongodb';

var url = "mongodb://localhost:27017/";
const dbClient = new MongoClient(url);
const db = dbClient.db('rene24').collection("data");

db.insertOne({
    timestamp: new Date(),
    value: 12345,
}).then(r => {
    dbClient.close();
});