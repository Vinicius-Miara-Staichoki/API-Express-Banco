import express from "express"
import accountControllers from "../controllers/accountController.js"
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";


const router = express.Router();

router.post("/", authMiddleware, adminMiddleware, accountControllers.createAccount);
router.get("/", authMiddleware, adminMiddleware, accountControllers.listAccounts);


// especificas  

router.get("/number/:accountNumber", authMiddleware, adminMiddleware, accountControllers.getAccountByNumber);








// especiais (id)
router.get("/balance", authMiddleware, accountControllers.getBalanceAccount);
router.get(":id/balance", authMiddleware, adminMiddleware, accountControllers.getBalanceAccount);

router.get("/:id", authMiddleware, adminMiddleware, accountControllers.getAccountByID);





export default router; 
