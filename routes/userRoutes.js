import express from "express";
import userController from "../controllers/userController.js"
 import authController from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
  

const router = express.Router();

 router.get("/me",authMiddleware,userController.getMe);
router.put("/me",authMiddleware,userController.updateMe);

router.get("/",authMiddleware,adminMiddleware,userController.listUsers);








router.post("/",userController.createUser);




// especificas
router.get("/cpf/:cpf",userController.getUserByCPF);
router.get("/email/:email",userController.getUserByEmail);


// especiais(possuem ID)
router.get("/:id",authMiddleware,adminMiddleware,userController.getUserByID);
router.get("/:id/accounts",userController.getAccountsByUser);
router.put("/updateUser",authMiddleware,userController.updateUser);
router.delete("/:id",userController.deletUser);






export default router;