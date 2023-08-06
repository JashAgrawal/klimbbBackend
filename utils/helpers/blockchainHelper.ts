import Block, { IBlock } from "../../models/block"
import Transaction from "../../models/transaction"
import { createHash } from "crypto"
const createTransction = (fromAddress:string,toAddress:string,amount:number)=>{
    const transaction = new Transaction({
        fromAddress,
        toAddress,
        amount
    })
    return transaction
}
const createBlock = async (fromAddress:string,toAddress:string,amount:number):Promise<IBlock>=>{
    const nonce =Math.round(Math.random() * 999999999);
    const transaction = createTransction(fromAddress,toAddress,amount);
    const latestBlock = await Block.findOne({}).sort({createdAt:-1}).exec();
    console.log(latestBlock?.hash || '#');
    const hash:string = createHash('sha256')
    .update(JSON.stringify({transaction,nonce, prevHash:latestBlock?.hash || '#'}))
    .digest('hex')
    const block = new Block({
        prevHash : latestBlock?.hash || '#',
        transaction,
        hash,
    })
    await block.save()
    return block
}
const fetchBlockchain = async ():Promise<IBlock[]>=>{
    const blockchain = await Block.find({})
    return blockchain
}
const fetchRelatedTransactions =async(address:string):Promise<IBlock[]>=>{
    const transactions = await Block.find({$or:[{'transaction.fromAddress':address},{'transaction.toAddress':address}]}).select({'transaction':1,_id:0})
    return transactions
}


export {createBlock,fetchBlockchain,fetchRelatedTransactions}