import express from "express"
import transactionController from "../controllers/transactionController.js"

const router = express.Router();




router.get("/",transactionController.listTransactions);
router.get("/:type",transactionController.listTransactionByType);

// especificas
router.get("/value/:min/:max",transactionController.getTransactionByValue);
router.get("/year/:year",transactionController.getTransactionsByYear);



 // id
router.post("/:id/deposit",transactionController.createDeposit);
router.post("/:id/withdraw",transactionController.createWithdraw);
router.post("/:id/monthly-fee",transactionController.monthlyFee);
router.post("/:id/:targetId/transfer",transactionController.createTransfer);


router.get("/:id/id",transactionController.getTransactionById);


router.get("/:id/statement",transactionController.listTransactionsByAccount);                  




          
 
export default router;