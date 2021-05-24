import "reflect-metadata";
import dotenv from "dotenv"
dotenv.config()
import express, { Application } from "express";
import './database/connection'
import cors from 'cors'
import { userRoutes } from "./routes/userRoutes";

const { DEV_SERVER_PORT } = process.env

const app: Application = express()
// O "cors" habilita que a API possa ser chamada de um host fora do localhost ou de ip diferente
app.use(cors())
// Interpreta o bosy da requisição
app.use(express.json())

app.use('/v1', userRoutes)

app.use('', (err, req, res, next) => {
    res.send('Tem nada aqui não doido')
})

app.listen(DEV_SERVER_PORT, () => {
    console.log('Servidor iniciado com sucesso 🚀')
})