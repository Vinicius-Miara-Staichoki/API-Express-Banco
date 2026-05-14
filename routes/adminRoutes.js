import express from "express"
import adminController from "../controllers/adminController.js"

const router = express.Router();
// users
router.patch("/users/:id/deactivate",adminController.deactivateUser);
router.patch("/users/:id/activate",adminController.activeUser);


router.get("/users/active",adminController.listActiveUsers);
router.get("/users/desactive",adminController.listDeactiveUsers);


// accounts

router.patch("/accounts/:id/deactivate",adminController.deactivateAccount);
router.patch("/accounts/:id/active",adminController.activeAccount);

router.patch("/accounts/:id/block",adminController.blockAccount);
router.patch("/accounts/:id/unlock",adminController.unlockAccount);

router.get("/accounts/active",adminController.listActiveAccounts);
router.get("/accounts/desactive",adminController.listDeactiveAccounts);

router.get("/reports/general",adminController.generalReport);
router.get("/reports/financial",adminController.financialReport);

router.get("/accounts/negative-balance",adminController.accountsWithNegativeBalance);

router.get("/accounts/top-balances/:limit",adminController.mostBalance);


// transactions

router.post("/transactions/:id/refund",adminController.refundTransaction);  







export default router;