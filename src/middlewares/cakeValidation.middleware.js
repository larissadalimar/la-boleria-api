import { cakeSchema } from "../models/cake.model.js";
import cakeRepository from "../repositories/cake.repository.js";

export default async function cakeValidation(req, res, next){

    const cake = req.body;
    
    const validation = cakeSchema.validate(cake, {abortEarly: false});

    if(validation.error){
        return res.status(400).send(
            validation.error.details.map(e => e.message)
        )
    }

    try {
        
        const cakeExists = await cakeRepository.verifyCakeByName(cake.name);

        if(cakeExists) return res.status(409).send("Esse bolo já existe na loja");

    } catch (error) {
        return res.status(500).send(error.message);
    }

    next();
}