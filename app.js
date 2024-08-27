const express = require("express")
const morgan = require("morgan")

const personRoute = require('./routes/personRoute')
const tourRoute = require('./routes/tourRoute')


const app = express()

//1. MIDDLEWARES
app.use(morgan('dev'))

app.use(express.json())

app.use((req, res, next)=>{
    req.requestTime = new Date().toISOString()
    next()
})


//2. routes
app.use('/api/v1/person', personRoute)
app.use('/api/v1/tour', tourRoute)

module.exports = app