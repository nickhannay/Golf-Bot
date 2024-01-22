const cors = require('cors')
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const session = require('express-session')


const indexRouter = require('./src/routes/index');
const dashboardRouter = require('./src/routes/dashboard');

const app = express();

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(session({
    resave: false,
    secret: 'test',
    saveUninitialized: true
}))



// Routes
app.use('/', indexRouter);
app.use('/dashboard', dashboardRouter);

app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;
