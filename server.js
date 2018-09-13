const express = require('express');

const app = express();

//  enable CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const data = require('./src/movie.json');

app.get('/api/data', (req,res) => {
    res.send(data);
})

const port = 5000;
app.listen(port);