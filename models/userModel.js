import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(

    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        cpf: {
            type: Number,
            required: true,
            trim: true,
            unique: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,

        },

        number: {
            type: Number,
            required: true,
            trim: true,
        },

        age: {
            type: Number,
            min: 18,
            required: true,
            trim: true,

        },

        active: {
            type: String,

            trim: true,
            default: true,
        },

        date: {
            type: Date,
            default: Date.now,


        },  
        
// autenticação 
        password: {
            type: String,
            required: true,
            select: false,
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        }
    },


    {
        collection: "userModel",

    }

);

export default mongoose.model("User", UserSchema);


