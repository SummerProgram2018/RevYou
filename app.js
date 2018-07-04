let express = require('express');
let path = require('path');
let lessMiddleware = require('less-middleware');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let bodyParser = require('body-parser');
let app = express();

let index = require('./routes/index');
let user = require('./routes/user');
let review = require('./routes/review');
let query = require('./routes/query');
  
app.use(lessMiddleware(__dirname + '/public', [{
    render: {
        compress: true
    }
}]));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/user', user);
app.use('/review', review);
app.use('/query', query);

app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;