if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const cookieParser = require('cookie-parser')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const user = require('./routers/user')

const app = express()
const port = process.env.PORT || 9001


//middleware
app.use(cookieParser())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))


//database coonection
mongoose.connect(process.env.DATABASE_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    app.listen(port, ()=>console.log("running on port", port))
});

//routes
app.use('/user', user)

//routes of page 404