var express = require('express');
var app = express();
const cors = require('cors')
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use(cors());

// config for your database
var config = {
    user: '',
    password: '',
    server: '',
    database: ''
};

var sql = require("mssql");

app.get('/api/getAllTable', function (req, res) {

    // connect to your database
    sql.connect(config, function (err) {

        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

        // query to the database and get the records
        request.query("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES ORDER BY LEN(TABLE_NAME )", function (err, recordset) {

            if (err) console.log(err);

            // send records as a response
            res.send(recordset.recordset);

        });
    });
});

app.get('/api/getAllColumn', function (req, res) {

    // connect to your database
    sql.connect(config, function (err) {

        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

        // query to the database and get the records
        request.query("SELECT COLUMN_NAME AS name FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '" + req.query.table + "'", function (err, recordset) {

            if (err) console.log(err);

            // send records as a response
            res.send(recordset.recordset);

        });
    });
});

app.post('/api/runQuery', (req, res) => {

    sql.connect(config, function (err) {

        if (err) console.log(err);

        var request = new sql.Request();
        request.input('query', sql.NVarChar(sql.MAX), req.body.query);
        request.execute('sp_Run', function (err, recordsets, returnValue) {
            // ... error checks
            if (err) console.log(err);

            res.send(recordsets.recordsets);
        });
    });

});

var server = app.listen(5000, function () {
    console.log('Server is running on port 5000..');
});