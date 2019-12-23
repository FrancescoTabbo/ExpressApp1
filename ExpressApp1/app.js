'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.get('/', function (req, res) {
    
});

app.post('/login', function (req, res) {
    console.log("uno");
    console.log(req.body);
    var conn = mysql.createConnection({
        host: "remotemysql.com",
        user: "W1Y2U1WmcR",
        password: "r9SaoTN3hk",
        database: "W1Y2U1WmcR"
    });
    var nickname = req.body.nickname;
    var password = req.body.password;

    conn.connect(function (err) {
        console.log("due");
        if (err) throw err;
        console.log("Connected!");
        conn.query("select * from users where nome = '" + nickname + "' AND password = '" + password + "'",
            function (errr, result, fields) {
            //[nickname], "AND password = ?", [password], function (errr, result, fields) {
            if (errr) throw errr;
            console.log("tre");
            console.log(req.body);
            console.log(req.query);
            if (result.length != 0) {
                res.send({ message: "OK", ID: result });

            } else {
                res.send({ message: "errore!" });
            }
        });
    });
});

app.post('/register', function(req, res){
    console.log("uno");
    console.log(req.body);
    var conn = mysql.createConnection({
        host: "remotemysql.com",
        user: "W1Y2U1WmcR",
        password: "r9SaoTN3hk",
        database: "W1Y2U1WmcR"
    });
    var nickname = req.body.nickname;
    var password = req.body.password;
    var nome =req.body.name;
    var cognome =req.body.cognome;
    var email =req.body.email;
    var indirizzo =req.body.indirizzo;
    var telefono =req.body.telefono;

    conn.connect(function(err) {
        console.log("due");
        if (err) throw err;
        console.log("Connected!");
        conn.query("INSERT INTO User(nome,password) VALUES( '" + nome +"','" + password + "')"  ,function(errr,result, fields){
            if (errr) throw errr;
            console.log("tre");
            console.log(req.body);
            console.log(req.query);
            if(result.length != 0){
                res.send({message: "OK", ID: result});

            }else{
                res.send({message: "errore!"});
            }
        });
    });
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});




app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
