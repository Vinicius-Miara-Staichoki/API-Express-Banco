import mongoose from "mongoose"

const AccountSchema = new mongoose.Schema(

    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            trim: true, 
        },
  
        accountNumber: {
            type: Number,
            required: true,
            unique: true,
            trim: true,
            
      

        },

        agency: {
            type: Number,
            required: true,
            trim: true,

        },

        type: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,   
            enum: ["corrente", "poupança"] 
        },

        balance: {
            type: Number,
            required: true,
            trim: true, 
            default: 0
        },
  
        limit: {
            type: Number,
            trim: true,
            default: 0  
        },

        active: {
            type: Boolean,
            required: true,  
            trim: true,
            default: true,

        },

        blocked: {
            type: Boolean,
            required: true,
            trim: true,
            default: false, 

        },

        creationDate: {
            type: Date,
            required: true,
            trim: true,
            default: Date.now,


        },
        updatedDate: {
            type: Date,
            trim: true,

        },

    },
    {

        collection: "accountModel",
    }


);

export default mongoose.model("Account", AccountSchema);









