import cakeRepository from "../repositories/cake.repository.js";

export async function create(req, res){

    const cake = req.body;

    try {
        
        await cakeRepository.createCake(cake);

        res.sendStatus(201);

    } catch (error) {
        
        res.status(500).send(error.message);
    }
}