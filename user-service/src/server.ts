import "reflect-metadata";
import dotenv from "dotenv"
dotenv.config()
import express, { Application, NextFunction, Request, Response } from "express"
import './database/connection'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { userRoutes } from "./routes/userRoutes";
import { WebRequestError } from "./utils/errors";
import { StatusCodes } from "http-status-codes";
import { genderRoutes } from "./routes/genderRoutes";
import { profileRoutes } from "./routes/profileRoutes";
import * as helmet from "helmet"; // Security
import { inviteRoutes } from "./routes/inviteRoutes";


const SERVER_PORT = process.env.NODE_ENV == 'production' ? process.env.PROD_SERVER_PORT : process.env.DEV_SERVER_PORT


const app: Application = express()
// O "cors" habilita que a API possa ser chamada de um host fora do localhost ou de ip diferente
app.use(cors())

app.use(cookieParser());
app.use(helmet())

// Interpreta o body da requisição
app.use(express.json())

app.use('/v1', userRoutes)
app.use('/v1/gender', genderRoutes)
app.use('/v1/profile', profileRoutes)
app.use('/v1/invite', inviteRoutes)

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

app.listen(SERVER_PORT, () => {

    console.log(
        "Rodando em modo", process.env.NODE_ENV,
        '\n\rServidor iniciado com sucesso 🚀',
        `\n\rNa porta: ${SERVER_PORT}`
    )
})