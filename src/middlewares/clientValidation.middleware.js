import { clientSchema } from "../models/client.model.js";

export default function clientValidation(req, res, next){

    const client = req.body;
    
    const validation = clientSchema.validate(client, { abortEarly: false });

    if(validation.error){
        return res.status(400).send(
            validation.error.details.map(e => e.message)
        )
    }

    next();
}