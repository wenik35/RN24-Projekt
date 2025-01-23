import { MongoClient } from 'mongodb';
import express from "express";

//Setup
var url = "mongodb://localhost:27017/";
const dbClient = new MongoClient(url);
const db = dbClient.db('rene24').collection("data");

const app = express();
const app_folder = "./client/dist/client/browser";

const options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['html', 'js', 'scss', 'css'],
    index: false,
    maxAge: '1y',
    redirect: true,
  }

// handling CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", 
               "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", 
               "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.static(app_folder, options));
app.use(express.json());


//Endpoints
app.get("/api/status", (req, res) => {
    res.status(200).json('Up and running!');
});

app.get('/api/data/:amount?/:offset?', (req, res) => {
    db.find({})
    .toArray()
    .then((result) => {
        let data = result;

        if (req.params.offset){
            data = data.slice(req.params.offset);
        }
        if (req.params.amount != 0){
            data = data.slice(0, req.params.amount);
        }

        if (data.length > 0) {
            res.json(data);
        } else {
            res.status(404).json('No Data available');
        }
    });
})

app.post('/api/data', (req, res) => {
    if (req.body[0] != undefined){
        db.insertMany(req.body);
    } else {
        db.insertOne(req.body);
    }
    res.status(200);
})

// muss so implementiert werden, da express irgendwie keine DELETE requests unterstützt, idk
app.post('/api/delete', (req, res) => {
    db.deleteMany({});
    res.status(200);
})

// serve angular app
app.all('*', function (req, res) {
    res.status(200).sendFile(`/`, {root: app_folder});
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});


//Cleanup
['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
    'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
].forEach(function (signal) {
    process.on(signal, function () {
        dbClient.close();
        console.log("EXIT - MongoDB Client disconnected");
        process.exit(1);
    });
});