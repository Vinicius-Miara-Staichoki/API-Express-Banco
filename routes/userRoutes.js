import express from "express";
import userController from "../controllers/userController.js"

const router = express.Router();






 
router.post("/",userController.createUser);
router.get("/",userController.listUsers);


// especificas
router.get("/cpf/:cpf",userController.getUserByCPF);
router.get("/email/:email",userController.getUserByEmail);


// especiais(possuem ID)
router.get("/:id",userController.getUserByID);
router.get("/:id/accounts",userController.getAccountsByUser);
router.put("/:id",userController.updateUser);
router.delete("/:id",userController.deletUser);






export default router;