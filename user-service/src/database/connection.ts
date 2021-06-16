import { log } from "console";
import { createConnection } from "typeorm";

createConnection().then(resp => { log('Banco de dados conectado com sucesso') }).catch(err => { log(err) })