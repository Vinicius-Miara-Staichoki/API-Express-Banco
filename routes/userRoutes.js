import express from "express";
import userController from "../controllers/userController.js"
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";




const router = express.Router();

router.get("/me", authMiddleware, userController.getMe);
router.put("/me", authMiddleware, userController.updateMe);

router.get("/", authMiddleware, adminMiddleware, userController.listUsers);








router.post("/", authMiddleware, adminMiddleware, userController.createUser);




// especificas
router.get("/cpf/:cpf", authMiddleware, adminMiddleware, userController.getUserByCPF);
router.get("/email/:email", authMiddleware, adminMiddleware, userController.getUserByEmail);


// especiais(possuem ID)
router.get("/:id/getUserByID", authMiddleware, adminMiddleware, userController.getUserByID);
router.get("/:id/accounts", authMiddleware, adminMiddleware, userController.getAccountsByUser);
router.put("/updateUser", authMiddleware, userController.updateUser);
router.delete("/:id", authMiddleware, adminMiddleware, userController.deletUser);






export default router;