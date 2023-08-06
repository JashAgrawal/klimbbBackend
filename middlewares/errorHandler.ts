import { NextFunction, Request,Response } from "express";
import AppError from "../utils/error";

const errorHandler = (error:Error,req:Request,res:Response,next:NextFunction) =>{
    console.log(error)
    //Validation Errors
    if(error.name == "ValidationError"){
        return res.status(400).json({type:"ValidationError",message:error.message})
    }
    //Custom Errors
    if(error instanceof AppError){
        return res.status(error.statusCode).json({type:"App Error",message:error.message})
    }
    //All other Errors
    res.status(400).json({type:"Unknown Error",message:error.message})
}

export default errorHandler;