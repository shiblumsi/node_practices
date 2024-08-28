const express = require("express")
const dotenv = require("dotenv")
const userRoute = require('./routes/userRoute')
const postRoute = require('./routes/posrRoute')
const authRoute = require('./routes/authRoute')
const morgan = require("morgan")
const AppError = require("./utils/appError")
const globalErrorHandler = require("./controller/errorController")

const app2 = express()
app2.use(morgan('dev'))
dotenv.config({ path: "./config.env" });
app2.use(express.json())

app2.use('/api/v1/user',userRoute)
app2.use('/api/v1/post',postRoute)
app2.use('/api/v1/auth', authRoute)

app2.all('*', (req, res, next)=>{
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
})

app2.use(globalErrorHandler)

app2.listen(8000,()=>{
    console.log(`surver running on http://localhost:8000`);
    
})