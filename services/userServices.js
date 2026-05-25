import User from "../models/userModel.js";
import Account from "../models/accountModel.js";




const updateMe = async (userId, data) => {

    delete data.role; // se vier o role não vai pro usuario; 
    delete data.active;
    delete data.password;
  
    if (data.email) {
        const emailExists = await User.findOne({
            email: data.email,
            _id: { $ne: userId }  // ne = not equal (emailExist sem contar a minha conta);
        });

        if (emailExists) {
            throw new Error("Já existe um usuário com esse email");


        }
    }

    const user = await User.findByIdAndUpdate(userId, data, {
        new: true,
        runValidators: true
    }
    )

    if (!user) {
        throw new Error("Usuário não encontrado")
    }

    return user;

}



const createUser = async (dataUser) => {
    const { name, cpf, email, number, age } = dataUser
    return User.create({ name, cpf, email, number, age })
}

const listUsers = async (list) => {
    return User.find();
}

const getUserByID = async (UserID) => {
    const getUser = await User.findById(UserID)

    if (!getUser) {
        const error = new Error("User not find");
        error.statusCode = 404;
        throw error;


    }
    return getUser;
}

const updateUser = async (UserID, data) => {
    const userUpdate = await User.findByIdAndUpdate(UserID, data,
        {
            new: true,
            runValidators: true
        }
    );

    const user = await User.findById(UserID)
    if (!user) {
        const error = new Error("User doesnt exist");
        error.statusCode = 404;
        throw error;
    }



    return userUpdate;

}

const deleteUser = async (UserID) => {
    const user = await User.findById(UserID)
    const accounts = await Account.countDocuments({
        userID: UserID,
        active: true
    })




    if (!user) {
        const error = new Error("User doesnt exist");
        error.statusCode = 404;
        throw error;
    }

    if (accounts !== 0) {
        const error = new Error("User have active accounts");
        throw error;
    }





    const deletUser = await User.findByIdAndDelete(UserID)
    return deletUser;


}

const getUserByCPF = async (userCPF) => {

    const userByCPF = await User.findOne({ cpf: userCPF })
    if (!userByCPF) {
        const error = new Error("User with this cpf doesnt exist");
        error.statusCode = 404;
        throw error;
    }
    return userByCPF;
}

const getUserByEmail = async (userEmail) => {
    const userByEmail = await User.findOne({ email: userEmail })
    if (!userByEmail) {
        const error = new Error("User with this email doesnt exist");
        error.statusCode = 404;
        throw error;
    }
    return userByEmail;
}

const getAccountsByUser = async (userID) => {
    const user = await User.findById(userID);
    const accounts = await Account.find({ userID: userID });

    if (!user) {
        const error = new Error("User doesnt exist")
        error.statusCode = 404;
        throw error;
    }





    return accounts;


}





export default {
    createUser,
    listUsers,
    getUserByID,
    updateUser,
    deleteUser,
    getUserByCPF,
    getUserByEmail,
    getAccountsByUser,
    updateMe,




}

