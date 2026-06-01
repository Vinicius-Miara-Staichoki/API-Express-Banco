import express from "express";
import adminController from "../controllers/adminController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();
// users
router.patch("/users/:id/deactivate",authMiddleware,adminMiddleware,adminController.deactivateUser);
router.patch("/users/:id/activate",authMiddleware,adminMiddleware,adminController.activeUser);


router.get("/users/active",authMiddleware,adminMiddleware,adminController.listActiveUsers);
router.get("/users/desactive",authMiddleware,adminMiddleware,adminController.listDeactiveUsers);


// accounts  

router.patch("/accounts/:id/deactivate",authMiddleware,adminMiddleware,adminController.deactivateAccount);
router.patch("/accounts/:id/active",authMiddleware,adminMiddleware,adminController.activeAccount);

router.patch("/accounts/:id/block",authMiddleware,adminMiddleware,adminController.blockAccount);
router.patch("/accounts/:id/unlock",authMiddleware,adminMiddleware,adminController.unlockAccount);

router.get("/accounts/active",authMiddleware,adminMiddleware,adminController.listActiveAccounts);
router.get("/accounts/desactive",authMiddleware,adminMiddleware,adminController.listDeactiveAccounts);

router.get("/reports/general",authMiddleware,adminMiddleware,adminController.generalReport);
router.get("/reports/financial",authMiddleware,adminMiddleware,adminController.financialReport);

router.get("/accounts/negative-balance",authMiddleware,adminMiddleware,adminController.accountsWithNegativeBalance);

router.get("/accounts/top-balances/:limit",authMiddleware,adminMiddleware,adminController.mostBalance);


// transactions

router.post("/transactions/:id/refund",authMiddleware,adminMiddleware,adminController.refundTransaction);  







export default router;