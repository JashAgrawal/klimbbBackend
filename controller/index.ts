import { NextFunction, Request, Response } from "express";
import NewBlockchain from "../utils/newBlockchain";
import { addressSchema, tranaction } from "../utils/helpers/helper";

class WalletController {
    blockchain: NewBlockchain;
    constructor(){
        this.blockchain = new NewBlockchain();
    }
    async getBalance(req:Request,res:Response){
       const address = req.params.address;
       const {error,value} = addressSchema.validate(address)
       if (error) throw error;
       const response = await this.blockchain.getBalance(address)
       res.status(200).json({succes:true,address,balance:response})
    }
    async addTransaction(req:Request,res:Response){
        const {fromAddress,toAddress,amount} = req.body;
        const {error,value} = tranaction.validate(req.body)
       if (error) throw error;
       console.log(value)
        await this.blockchain.addTransaction(fromAddress,toAddress,amount);
        res.status(200).json({succes:true,message:"Transaction Successfull"})
    }
    async getTransactions(req:Request,res:Response){
        const address = req.params.address;
        const {error,value} = addressSchema.validate(address)
       if (error) throw error;
       const response = await this.blockchain.getTransactions(address)
       res.status(200).json({succes:true,tranactions:response})
    }
}
export default new WalletController();