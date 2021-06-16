import { log } from "console";
import { createConnection } from "typeorm";

createConnection().then(connection => {
    log('Banco de dados conectado com sucesso')
}).catch(err => { log(err) })
