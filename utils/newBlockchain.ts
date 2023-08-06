import {createBlock, fetchBlockchain, fetchRelatedTransactions} from './helpers/blockchainHelper'
import { IBlock } from '../models/block';
class NewBlockchain {
    public chain: IBlock[];
  
    constructor() {
      this.chain = [];
      this.createGenesisBlock()
    }
  
    /**
     * Create the initial block for the blockchain.
     */
    private async createGenesisBlock() {
    await this.fetchlatestBlockchain()
      if(this.chain.length ==0){
        await createBlock('#','#',0)
      }
      this.chain = await fetchBlockchain();
    }
    private async fetchlatestBlockchain() {
        this.chain = await fetchBlockchain();
      }
  
    /**
     * Add a new transaction to the blockchain. The transaction is placed in a new block.
     */
    public async addTransaction(fromAddress:string,toAddress:string,amount:number) {
        await createBlock(fromAddress,toAddress,amount)
        return true
    }
    public async getTransactions(address:string){
      return await fetchRelatedTransactions(address)
    }
    /**
     * Get the balance of an address by aggregating the amounts in the related transactions.
     */
     public async getBalance(address: string) {
      await this.fetchlatestBlockchain()
      let balance = 0;
      for (const block of this.chain) {
        const { fromAddress, toAddress, amount } = block.transaction;
        if (fromAddress === address) {
          balance -= amount;
        }
        if (toAddress === address) {
          balance += amount;
        }
      }
      return balance;
    }
  }

export default NewBlockchain