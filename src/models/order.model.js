import Joi from "joi";

export const orderSchema = Joi.object({
 quantity: Joi.number().min(1).max(4).required(),
 totalPrice: Joi.number().positive().required()
});