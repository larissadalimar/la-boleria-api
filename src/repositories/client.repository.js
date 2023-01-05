import { connectionDB } from "../database/db.js";

async function createClient(client){

    return await connectionDB.query(`INSERT INTO clients (name, address, phone) VALUES ($1, $2, $3);`, [client.name, client.address, client.phone]);

}

const clientRepository = {
    createClient
}

export default clientRepository;