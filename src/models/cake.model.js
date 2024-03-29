import Joi from 'joi';

export const cakeSchema = Joi.object({
    name: Joi.string().min(2).required(),
    price: Joi.number().positive(),
    description: Joi.string().min(0),
    image: Joi.string().uri().required()
});