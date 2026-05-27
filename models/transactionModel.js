import mongoose from "mongoose"

const TransactionSchema = new mongoose.Schema(
    {

        type: {
            type: String,
            required: true,
            trim: true,
            enum: ["deposito", "saque", "tranferencia", "estorno", "taxa"],  
        },


        accountID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "accountModel",
            required: true,
            trim: true,


        },

        targetAccountID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "accountModel",
            trim: true,
        },


        value: {
            type: Number,
            required: true,
            trim: true,
            default: 0


        },

        balance: {
            type: Number,
            trim: true,


        },

        description: {
            type: String,
            trim: true,
        },

        status: {
            type: String,
            required: true,
            trim: true,
            enum: ["completed", "canceled", "failed"],
            default:"completed",

  
        },

        date: {
            type: Date,
            default: Date.now,
            required: true,
            trim: true,
        },

    },

    {
        collection: "transactionModel"
    }

);

export default mongoose.model("Transaction", TransactionSchema)







