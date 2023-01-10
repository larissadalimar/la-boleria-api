import { connectionDB } from "../database/db.js";

async function createClient(client){

    return await connectionDB.query(`INSERT INTO clients (name, address, phone) VALUES ($1, $2, $3);`, [client.name, client.address, client.phone]);

}

async function verifyClient(clientId){

    try {
        
        const clientExists = await connectionDB.query("SELECT * FROM clients id=$1;", [clientId]);

        return (clientExists.rowCount > 0);

    } catch (error) {
        console.log(error);
    }
}

const clientRepository = {
    createClient,
    verifyClient
}

export default clientRepository;