const express = require('express')
require ('dotenv').config()
const cors = require('cors')

const dbConfig = require('./database/dbConfig');



const app = express()

dbConfig()

app.use( express.json() )
app.use(cors())

app.use('/api/movie',require('./routers/movieRouter'))
app.use('/api/auth',require('./routers/userRouter'))



app.listen(process.env.PORT , () => {
    console.log(process.env.PORT);
})