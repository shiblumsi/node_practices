const express = require("express")
const dotenv = require("dotenv")
const userRoute = require('./routes/userRoute')
const postRoute = require('./routes/posrRoute')
const morgan = require("morgan")

const app2 = express()
app2.use(morgan('dev'))
dotenv.config({ path: "./config.env" });
app2.use(express.json())

app2.use('/api/v1/user',userRoute)
app2.use('/api/v1/post',postRoute)

app2.listen(8000,()=>{
    console.log(`surver running on http://localhost:8000`);
    
})