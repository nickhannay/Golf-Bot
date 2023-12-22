const cors = require('cors')
const express = require('express');
const path = require('path');

const indexRouter = require('./src/routes/index');
const dashboardRouter = require('./src/routes/dashboard');

const app = express();

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.use('/', indexRouter);
app.use('/dashboard', dashboardRouter);



module.exports = app;
