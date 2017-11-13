var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var path = require('path');
var models = require('./models');

module.exports = app;

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
var env = nunjucks.configure('views', { noCache: true });
//require('./filters')(env);

app.use(morgan('dev')); //logging middleware
app.use(express.static(path.join(__dirname, './public'))); //serving up static files (e.g. css files)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/wiki', require('./routes/wiki'));
// app.use('/user', require('./routes/user'));


app.get('/', function (req, res) {
    res.render('index');
 });


// models.User.sync({force: true})
// .then(function () {
//     return models.Page.sync({force: true})
// })
// .then(function () {
//     // make sure to replace the name below with your express app
//     app.listen(3000, function () {
//         console.log('Server is listening on port 3000!');
//     });
// })
// .catch(console.error);

// make sure you are exporting your db from your models file
models.db.sync({force: false})
.then(function () {
    // make sure to replace the name below with your express app
    app.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error);
