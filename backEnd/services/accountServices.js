import User from "../models/userModel.js";
import Account from "../models/accountModel.js";







const createAccount = async (data) => {


  
    const { userID, agency, type, balance, limit, updatedDate } = data;

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

    if (type === "poupança" && limit > 0) {
        const error = new Error("Poupança limit need to be 0");
        error.statusCode = 400;
        throw error;
    }

    const lastAccount = await Account.findOne().sort({ accountNumber: -1 });
    const numberAccount = lastAccount ? lastAccount.accountNumber + 1 : 1;







    return Account.create({ userID, accountNumber: numberAccount, agency, type, balance, limit, updatedDate });




}  



const listAccounts = async (data) => {
    const active = await Account.find({ active: true });
    const desactive = await Account.find({ active: false });

    const unlock = await Account.find({ blocked: false });
    const blocked = await Account.find({ blocked: true });

    return {
        active,
        desactive,
        unlock,
        blocked
    }


}

const getAccountByID = async (accountID) => {

    const account = Account.findById(accountID);

    if (!account) {
        const error = new Error("Account doesnt exists");
        error.statusCode = 404;
        throw error;
    }

    return account;

}


const getAccountByNumber = async (accountNumber) => {

    const accountByNumber = Account.findOne({ accountNumber })

    if (!accountByNumber) {
        const error = new Error("Account doesnt exist");
        error.statusCode = 404;
        throw error;
    }
    return accountByNumber;


}

const getBalanceAccount = async (id) => {

    const accountBalance = await Account.findById(id);

    if (!accountBalance) {
        const error = new Error("Account doesnt exists");
        error.statusCode = 404;
        throw error;
    }



    return accountBalance;
}











export default {
    createAccount,
    listAccounts,
    getAccountByID,
    getAccountByNumber,
    getBalanceAccount,



}


