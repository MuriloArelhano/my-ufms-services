const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const sequelize = require('./database/db')
const dotenv = require('dotenv')

const postRouter = require('./routes/postRoutes')
dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())
app.use(cookieParser())

app.use('', (req, res) => { res.send('toma no meu cu') })
app.use('/post', postRouter)

app.use('', (err, req, res, next) => {
    if (err) {
        res.json({ err })
    }
})

const SERVER_PORT = process.env.DEV_SERVER_PORT
sequelize.authenticate().then(res => {
    console.log("Database conectado com sucesso");
    app.listen(SERVER_PORT, () => {
        console.log("App executando com banco de dados na porta:", SERVER_PORT);
    })
})