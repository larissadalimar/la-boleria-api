import clientRepository from "../repositories/client.repository.js";


export async function create(req, res){

    const client = req.body;

    try {
        
       await  clientRepository.createClient(client);

       res.sendStatus(201);

    } catch (error) {
        
        res.status(500).send(error.message);
    }
}