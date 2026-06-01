import express from "express";
import transactionController from "../controllers/transactionController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();


  

router.get("/",authMiddleware,adminMiddleware,transactionController.listTransactions);
router.get("/:type",authMiddleware,adminMiddleware,transactionController.listTransactionByType);

// especificas
router.get("/value/:min/:max",authMiddleware,adminMiddleware,transactionController.getTransactionByValue);
router.get("/year/:year",authMiddleware,adminMiddleware,transactionController.getTransactionsByYear);



 // id
router.post("/:id/deposit",authMiddleware,transactionController.createDeposit);
router.post("/:id/withdraw",authMiddleware,transactionController.createWithdraw);
router.post("/:id/monthly-fee",authMiddleware,adminMiddleware,transactionController.monthlyFee);
router.post("/:id/:targetId/transfer",authMiddleware,transactionController.createTransfer);


router.get("/:id/id",authMiddleware,adminMiddleware,transactionController.getTransactionById);


router.get("/:id/statement",authMiddleware,transactionController.listTransactionsByAccount);                  




          
 
export default router;