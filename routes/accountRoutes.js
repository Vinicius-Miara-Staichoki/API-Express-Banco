import express from "express"
import accountControllers from "../controllers/accountController.js"

const router = express.Router();

router.post("/",accountControllers.createAccount);
router.get("/",accountControllers.listAccounts);
 
  
// especificas

router.get("/number/:accountNumber", accountControllers.getAccountByNumber);






  

// especiais (id)
router.get("/:id/balance",accountControllers.getBalanceAccount);

router.get("/:id",accountControllers.getAccountByID);




 
export default router; 
