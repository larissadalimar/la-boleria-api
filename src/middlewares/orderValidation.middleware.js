import { orderSchema } from "../models/order.model.js";
import cakeRepository from "../repositories/cake.repository.js";

export default async function orderValidation(req, res, next){

    const order = req.body;
    
    const validation = orderSchema.validate(order, {abortEarly: false});

    if(validation.error){
        return res.status(400).send(
            validation.error.details.map(e => e.message)
        )
    }

    try {
        
       const cakeExists = await cakeRepository.verifyCake(order.cakeId);

       if(!cakeExists) return res.status(404).send("Bolo inexistente");

       res.locals.clientId = order.clientId;

       next();

    } catch (error) {
        return res.status(500).send(error.message);
    }

}