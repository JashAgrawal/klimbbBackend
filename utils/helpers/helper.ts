import { NextFunction, Request,Response } from "express";
import Joi from "joi";
const tryCatch = (controller:Function)=>async (req:Request,res:Response,next:NextFunction)=>{
try {
    await controller(req,res,next)
} catch (error) {
    return next(error)
}
}
const addressSchema = Joi.string().required().pattern(new RegExp('^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$'))
const tranaction = Joi.object({
    fromAddress:addressSchema,
    toAddress:addressSchema.disallow(Joi.ref('fromAddress')),
    amount:Joi.number().min(10).max(10**6)
})
export {tranaction,addressSchema};
export default tryCatch;