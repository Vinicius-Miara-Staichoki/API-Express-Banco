import User from "../models/userModel.js";
import Account from "../models/accountModel.js";




const createAccount = async (data) => {
    const { userID, accountNumber, agency, type, balance, limit, updatedDate } = data;
    const user = await User.findById(userID);

    if (!user) {
        const error = new Error("User not exist");
        error.statusCode = 404;
        throw error;
    }

    if (user.active === "false") {
        const error = new Error("Deactivated users cannot create an account");
        error.statusCode = 400;
        throw error;

    }



    return Account.create({ userID, accountNumber: numberAccount, agency, type, balance, limit, updatedDate });




}


const listAccounts = async (data) => {
    return Account.find();
}

const getAccountByID = async (accountID) => {

    const accountByID = Account.findById(accountID);
    return accountByID;

}


const getAccountByNumber = async (accountNumber) => {

    const accountByNumber = Account.findOne({ accountNumber })
    return accountByNumber;


}

const getBalanceAccount = async (id) => {

    const accountBalance = await Account.findById(id);

    return accountBalance;
}











export default {
    createAccount,
    listAccounts,
    getAccountByID,
    getAccountByNumber,
    getBalanceAccount,



}


