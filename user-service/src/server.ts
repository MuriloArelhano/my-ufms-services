import "reflect-metadata";
import dotenv from "dotenv"
dotenv.config()
import express, { Application, NextFunction, Request, Response } from "express";
import './database/connection'
import cors from 'cors'
import { userRoutes } from "./routes/userRoutes";
import { WebRequestError } from "./utils/errors";
import { StatusCodes } from "http-status-codes";
import { genderRoutes } from "./routes/genderRoutes";

const { DEV_SERVER_PORT } = process.env

const app: Application = express()
// O "cors" habilita que a API possa ser chamada de um host fora do localhost ou de ip diferente
app.use(cors())
// Interpreta o body da requisição
app.use(express.json())

app.use('/v1', userRoutes)
app.use('/v1/gender', genderRoutes)

app.use('', (err: any, req: Request, res: Response, next: NextFunction) => {

    if (err instanceof WebRequestError) {
        return res.status(err.webStatusCode).json({
            type: err.name,
            msg: err.message
        })
    } else {
        return res.status(StatusCodes.BAD_REQUEST).json({
            msg: err.message
        })
    }
})

app.listen(DEV_SERVER_PORT, () => {
    console.log('Servidor iniciado com sucesso 🚀')
})