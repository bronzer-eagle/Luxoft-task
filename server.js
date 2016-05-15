var express = require('express');
var app = express();
var port = process.argv[2] || 8000;
var path = require('path');
var myBase = require('nano')('http://localhost:5984');
var base;

checkTable();

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
    console.log('Get request!');
    console.log('===============================');
    checkTable();
    base.list({include_docs: true}, function (err, data) {
        if (!data) {
            res.send();
            return false;
        }
        console.log('we send it: ');
        console.dir(data.rows);
        res.send(data.rows);
    });
});

app.post('/addData', function (req, res) {
    checkTable();
    baseMethods.insert(base, req.body);
    res.send();
});

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});

function checkTable() {
    myBase.db.list(function (err, body) {
        if (!('table' in body)) {
            myBase.db.create('table');
            base = myBase.db.use('table');
        }
    });
}

