var express = require('express');
var app = express();
var port = process.argv[2] || 8000;
var path = require('path');
var base = require('nano')('http://localhost:5984/table');
var baseMethods = require('./db/index');
var bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'public')));
app.use("/", express.static(__dirname));
app.use(bodyParser.json());

app.set('view engine', 'jade');

app.get('/', function (req, res) {
    res.render('index', {title: 'Luxoft task'});
});

app.post('/data', function (req, res) {
    base.list({include_docs: true}, function (err, data) {
        res.send(data.rows);
    });
});

app.post('/addData', function (req, res) {
    baseMethods.insert(base, req.body);
    res.send();
});



app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});

