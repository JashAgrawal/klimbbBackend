import mongoose, { Date } from "mongoose";
import  { ITransaction, transactionSchema } from "./transaction";
export interface IBlock {
  prevHash: string,
  transaction: ITransaction ,
  hash : string,
}
const blockSchema = new mongoose.Schema<IBlock>(
  {
    prevHash: {type:String,required:true},
    transaction: {type:transactionSchema,required:true},
    hash : {type:String,required:true}
  },
  { timestamps: true }
);
const Block = mongoose.model("Block", blockSchema);

export default Block