const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const sequelize = require('./database/db')
const models = require('./model/indexModels.js')
const postRouter = require('./routes/postRoutes')
const SERVER_PORT = process.env.NODE_ENV == 'development'?  process.env.DEV_SERVER_PORT : process.env.PROD_SERVER_PORT



const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/v1/post', postRouter)

app.use('', (err, req, res, next) => {
    if (err) {
        res.json({ err })
    }
})

sequelize.sync({ logging: false }).then(res => {
    console.log("Database conectado com sucesso");
    app.listen(SERVER_PORT, () => {
        console.log("App executando com banco de dados na porta:", SERVER_PORT);
    })
})