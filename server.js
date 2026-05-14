import express from "express"
import dotenv from "dotenv"
import ConnectDB from "./config/db.js"
import userRoutes from "./routes/userRoutes.js";
import accountRoutes from "./routes/accountRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js"



dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.get("/", async (req, res) => {
    res.json({ message: "connected with server" });

});

app.use("/users",userRoutes)
app.use("/accounts",accountRoutes)
app.use("/admin",adminRoutes)
app.use("/transactions",transactionRoutes)



const startServer = async () => {

    try {
        await ConnectDB();

        app.listen(PORT, () => {
            console.log(`O servidor está rodando na porta ${PORT}`)



        })
    }catch(error){
        console.log("Erro ao iniciar o servidor: ",error.message)
    }

}

startServer();


