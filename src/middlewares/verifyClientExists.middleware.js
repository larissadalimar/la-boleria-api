import clientRepository from "../repositories/client.repository.js";

export default async function verifyClientExists(req, res, next){

    const clientId = res.locals.clientId? res.locals.clientId: req.params.id;

    try {
        
        const clientExists = await clientRepository.verifyClient(clientId);

        if(!clientExists) return res.status(404).send("Cliente inexistente");

    } catch (error) {
        
        res.status(500).send(error.message);
    }

    next();
}