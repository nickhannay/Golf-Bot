const cors = require('cors')
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const session = require('express-session')
const fs = require('fs')
const redisStore = require('./src/bin/redis-config')

const indexRouter = require('./src/routes/index');
const dashboardRouter = require('./src/routes/dashboard');
const reserveRouter = require('./src/routes/reserve');
const cookieParser = require('cookie-parser');



const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));


app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());




const key = fs.readFileSync(path.join(__dirname, 'src', 'bin', 'certs', 'localhost+2.pem'))
app.use(session({
    resave: false,
    secret: key.toString(),
    saveUninitialized: true,
    store: redisStore,
    cookie: {
        secure: true,
        sameSite: 'none'
    }
}))

app.use(cookieParser())


app.use('/', indexRouter);
app.use((req, res , next) => {
    if (req.session && req.session.token){
        return next()
    }
    else{
        res.redirect('/')
    }
})




// Protected Routes
app.use('/dashboard', dashboardRouter);
app.use('/reserve', reserveRouter)







module.exports = app;
