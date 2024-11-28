//server.js

const express = require('express');
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

// route for handling requests from the Angular client
app.get('/api/message', (req, res) => {
    res.json({ message: 
            'Hello GEEKS FOR GEEKS Folks from the Express server!' });
});

app.get('/api/data/:amount:offset', (req, res) => {
    //TODO: return data, access params with req.params.[name]
})

app.post('/api/data', (req, res) => {
    //TODO: save data, access with req.body
})

// serve angular app
app.get('', function (req, res) {
    res.status(200).sendFile(`/`, {root: app_folder});
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});