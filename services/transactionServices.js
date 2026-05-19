import transactionController from "../controllers/transactionController.js";
import Account from "../models/accountModel.js";
import Transaction from "../models/transactionModel.js"

const createDeposit = async (id, data) => {
    const account = await Account.findById(id)

    if (!account) {
        const error = new Error("Account not exists");
        error.statusCode = 404;
        throw error;
    }

    if (account.active === false) {
        const error = new Error("account deactivated cannot deposit");
        error.statusCode = 400;
        throw error;
    }

    if (account.blocked === true) {
        const error = new Error("Blocked account cannot deposit");
        error.statusCode = 400;
        throw error;
    }


    const { value, description } = data

    if (value <= 0) {
        const error = new Error("the deposit amount must be greater than 0");
        error.statusCode = 400;
        throw error;
    }


    account.balance += Number(value);
    await account.save();

    return await Transaction.create({
        type: "deposito",
        accountID: id,
        value: Number(value),
        balance: account.balance,
        description
    })
}

const createWithdraw = async (id, data) => {
    const account = await Account.findById(id);

    if (!account) {
        const error = new Error("Account not exists");
        error.statusCode = 404;
        throw error;
    }
    if (account.active === false) {
        const error = new Error("account deactivated cannot withdraw");
        error.statusCode = 400;
        throw error;
    }
    if (account.blocked === true) {
        const error = new Error("Blocked account cannot withdraw");
        error.statusCode = 400;
        throw error;
    }

    const { value, description } = data;

    if (value <= 0) {
        const error = new Error("the withdraw amount must be greater than 0");
        error.statusCode = 400;
        throw error;
    }

    if (account.type === "corrente") {
        if (value > account.balance + account.limit) {
            const error = new Error("The withdraw exceeded the limit");
            throw error;
        }

    }

    if (account.type === "poupança") {
        if (value > account.balance) {
            const error = new Error("The withdraw exceeded the limit");
            throw error;
        }
    }

    account.balance -= Number(value);
    await account.save();

    return await Transaction.create({
        type: "saque",
        accountID: id,
        value: Number(value),
        balance: account.balance,
        description
    })
}

const createTransfer = async (id, targetId, data, targetData) => {
    const account = await Account.findById(id);

    if (!account) {
        const error = new Error("Account not exists");
        error.statusCode = 404;
        throw error;
    }
    if (account.active === false) {
        const error = new Error("account deactivated cannot transfer");
        error.statusCode = 400;
        throw error;
    }
    if (account.blocked === true) {
        const error = new Error("Blocked account cannot transfer");
        error.statusCode = 400;
        throw error;
    }
    const { value, description } = data;

    if (value <= 0) {
        const error = new Error("the transfer amount must be greater than 0 ");
        error.statusCode = 400;
        throw error;
    }


    const targetAccount = await Account.findById(targetId);
    if (!targetAccount) {
        const error = new Error("Account not exists");
        error.statusCode = 404;
        throw error;
    }

    if (targetAccount.active === false) {
        const error = new Error("account deactivated cannot transfer");
        error.statusCode = 400;
        throw error;
    }

    if (targetAccount.blocked === true) {
        const error = new Error("Blocked account cannot transfer");
        error.statusCode = 400;
        throw error;
    }

    if (id === targetId) {
        const error = new Error("Cannot transfer to same account");
        error.statusCode = 400;
        throw error;
    }

    if (account.type === "corrente") {
        if (account.balance + account.limit < value) {
            const error = new Error("Dont have enough balance ");
            error.statusCode = 400;
            throw error;
        }
    }

    if (account.type === "poupança") {
        if (account.balance < value) {
            const error = new Error("Dont have enough balance ");
            error.statusCode = 400;
            throw error;
        }
    }

    account.balance -= Number(value);
    await account.save();

    targetAccount.balance += Number(value);
    await targetAccount.save();

    return await Transaction.create({
        type: "tranferencia",
        accountID: id,
        targetAccountID: targetId,
        value: Number(value),
        enum: ["deposito", "saque", "tranferencia", "estorno", "taxa"]

    })

}

const listTransactionsByAccount = async (accountId) => {
    const account = await Account.findById(accountId);
    const transactionSend = (await Transaction.find({ accountID: accountId })).sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    const transactionsReceived = (await Transaction.find({ targetAccountID: accountId })).sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    if (!account) {
        const error = new Error("Account doesnt exists");
        error.statusCode = 404;
        throw error;
    }


    return {  
        transactionSend,
        transactionsReceived


    }


}





const listTransactions = async () => {
    return (await Transaction.find()).sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    )
}   

const getTransactionById = async (id) => {
    const transaction = await Transaction.findById(id);

    if (!transaction) {
        const error = new Error("Transaction doesnt exists");
        error.statusCode = 404;
        throw error;
    }

    return transaction;
}

const listTransactionByType = async (type) => {
    const transactions = await Transaction.find({ type: type });

    if (!transactions) {
        const error = new Error("Doesnt exists");
        error.statusCode = 404;
        throw error;
    }
    return transactions;

}

const getTransactionByValue = async (min, max) => {
    const transactions = await Transaction.find(min, max);
    return transactions;
};

const getTransactionsByYear = async (year) => {
    if (year === String) {
        const error = new Error("year invalid");
        error.statusCode = 400;
        throw error;
    }
    const startDate = new Date(year, 0, 1, 0, 0, 0);
    const endDate = new Date(year, 11, 31, 23, 59, 59);


    return Transaction.find({
        date: {
            $gte: startDate,
            $lte: endDate
        }

    });

}

const monthlyFee = async (id) => {
    const account = await Account.findById(id)

    if (!account) {
        const error = new Error(" Account doesnt exists");
        error.statusCode = 404;
        throw error;
    }

    if(account.active === false){
        const error = new Error (" Account has been desativated");
        error.statusCode = 400;
        throw error;
    }

    if(account.blocked === true){
        const error = new Error("Account blocked");
        error.statusCode = 400;
        throw error;
    }

    if(account.balance + account.limit < 25){
        const error = new Error("Account doesnt have enough balance");
        error.statusCode = 400;
        throw error;
    }




    account.balance -= 25;
    await account.save();

    return await Transaction.create({
        type: "taxa",
        accountID: id,
        value: Number(25),
        balance: account.balance,

    })
}















export default {
    createDeposit,
    createWithdraw,
    createTransfer,
    listTransactionsByAccount,
    listTransactions,
    getTransactionById,
    listTransactionByType,
    getTransactionByValue,
    getTransactionsByYear,
    monthlyFee,






}


