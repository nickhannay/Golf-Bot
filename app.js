const cors = require('cors')
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const session = require('express-session')
const fs = require('fs')
const redis = require('redis')
const RedisStore = require('connect-redis').default

const indexRouter = require('./src/routes/index');
const dashboardRouter = require('./src/routes/dashboard');
const reserveRouter = require('./src/routes/reserve');
const cookieParser = require('cookie-parser');const { hostname } = require('os');


const app = express();

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const redisClient = redis.createClient({
    password: 'FLE7YmHfK4pdT5H768VKCr012Sti8ynI',
    socket: {
        port:  11358,
        host: 'redis-11358.c289.us-west-1-2.ec2.cloud.redislabs.com' 
    }
})

redisClient.connect().catch(console.error)

const redisStore = new RedisStore({
    client: redisClient,
    prefix: "Golf-Bot",
    ttl: 3600
})

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
app.use((req, res ,next) => {
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
