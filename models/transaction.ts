import mongoose from "mongoose";
export interface ITransaction {
  fromAddress: string,
    toAddress : string,
    amount : number
}
const transactionSchema = new mongoose.Schema<ITransaction>(
  {
    fromAddress: {type:String,required:true},
    toAddress : {type:String,required:true},
    amount : {type:Number,required:true}
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction
export {transactionSchema}