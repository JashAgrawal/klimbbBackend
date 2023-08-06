import express  from "express";
import Wallet  from "../controller/index"
import tryCatch from "../utils/helpers/helper";
const router = express.Router();

router.get('/balance/:address',tryCatch(Wallet.getBalance.bind(Wallet)))
router.get('/transactions/:address',tryCatch(Wallet.getTransactions.bind(Wallet)))
router.post('/addTrasaction',tryCatch(Wallet.addTransaction.bind(Wallet)))

export default router;
