import User from "../models/userModel.js";
import Account from "../models/accountModel.js";
import Transaction from "../models/transactionModel.js";

const deactivateUser = async (id) => {
    const account = await Account.countDocuments({
        userID: id,
        balance: { $gte: 0 }
    })
    if (account > 0) {
        const error = new Error("User who has accounts with positive balance cannot be deactivated");
        error.statusCode = 400;
        throw error;

    }

    const user = await User.findByIdAndUpdate(id,
        { active: false },
        { new: true }

    );

    return user

}

const activeUser = async (id) => {
    const user = await User.findByIdAndUpdate(id,
        { active: true },
        { new: true }
    );
    return user
}

const listActiveUsers = async (active) => {
    const activeUsers = await User.find({ active: true })
    return activeUsers
}

const listDeactiveUsers = async (desactive) => {
    const deactiveUsers = await User.find({ active: false })
    return deactiveUsers
}

const deactivateAccount = async (id) => {
    const acccount = await Account.findById(id);
    if(!acccount){
        const error = new Error("Account doesnt exists");
        error.statusCode = 404;
        throw error;
    }

    if(acccount.balance !== 0){
        const error = new Error("Account still have balance");
        error.statusCode = 400;
        throw error;
    }

    const account = await Account.findByIdAndUpdate(id,
        { active: false },
        { new: true }

    );

    return account

}

const activeAccount = async (id) => {
    const account = await Account.findByIdAndUpdate(id,
        { active: true },
        { new: true }
    );
    return account
}

const listActiveAccounts = async (active) => {
    const activeAccounts = await Account.find({ active: true })
    return activeAccounts
}

const listDeactiveAccounts = async (desactive) => {
    const deactiveAccounts = await Account.find({ active: false })
    return deactiveAccounts
}

const blockAccount = async (id) => {
    const acccount = await Account.findById(id);
    if(acccount.blocked === true){
        const error = new Error("Account has already blocked");
        error.statusCode = 400;
        throw error;
    }
    const account = await Account.findByIdAndUpdate(id,
        { blocked: true },
        { new: true }
    );

    if (!account) {
        const error = new Error("Account doesnt exists");
        error.statusCode = 404;
        throw error;
    }

   


    return account
}

const unlockAccount = async (id) => {
    const acccount = await Account.findById(id);
    if(acccount.blocked === false){
        const error = new Error("Account has already been unlocked");
        error.statusCode = 400;
        throw error;
    }
    const account = await Account.findByIdAndUpdate(id,
        { blocked: false },
        { new: true }
    );
    if(!account){
        const error = new Error("Account doesnt exists");
        error.statusCode = 404;
        throw error;
    }
    return account
}



const refundTransaction = async (id) => {
    const transaction = await Transaction.findById(id);

    const account = await Account.findById(transaction.accountID);

    // fazer o if pro tipo da transação que nao podem dai coloca um else nas que podem pra ficar massa

    //colocar o if tbm que ela nao pode estar cancelada




    if (transaction.type === "deposito") {
        account.balance = account.balance - transaction.value;
        transaction.status = "canceled"
        await account.save();
        await transaction.save();

        return account;

    }

    if (transaction.type === "saque") {
        account.balance = account.balance + transaction.value;
        transaction.status = "canceled"
        await account.save();
        await transaction.save();

        return account;
    }


    if (transaction.type === "taxa") {
        account.balance = account.balance + 25;
        transaction.status = "canceled"
        await account.save();
        await transaction.save();

        return account;

    }

}

const generalReport = async () => {
    const countUsers = await User.countDocuments();
    const countActiveUsers = await User.countDocuments({ active: true })
    const countDesactiveUsers = await User.countDocuments({ active: false })
    const countAccounts = await Account.countDocuments();
    const countActiveAccounts = await Account.countDocuments({ active: true })
    const countDesactiveAccounts = await Account.countDocuments({ active: false })
    const countBlockedAccounts = await Account.countDocuments({ blocked: true })
    const countTransactions = await Transaction.countDocuments();
    const totalBalanceInBank = await Account.aggregate([
        {
            $group: {
                _id: null,
                totalBalanceInBank: { $sum: "$balance" }
            }
        }
    ]);

    return {
        countUsers,
        countActiveUsers,
        countDesactiveUsers,
        countAccounts,
        countActiveAccounts,
        countDesactiveAccounts,
        countBlockedAccounts,
        countTransactions,
        totalBalanceInBank

    }



}

const financialReport = async () => {


    const totalDeposit = await Transaction.aggregate([
        {

            $match: {
                type: "deposito",
                status: "completed"
            }
        },

        {
            $group: {
                _id: null,
                totalDeposit: { $sum: "$value" }
            }
        }

    ])

    const totalWithdraw = await Transaction.aggregate([{
        $match: {
            type: "saque",
            status: "completed"
        }
    },


    {
        $group: {
            _id: null,
            totalWithdraw: { $sum: "$value" }
        }
    }


    ])

    const totalTransfer = await Transaction.aggregate([{
        $match: {
            type: "tranferencia",
            status: "completed"
        }
    },


    {
        $group: {
            _id: null,
            totalTranfer: { $sum: "$value" }
        }
    }


    ])

    const totalTax = await Transaction.aggregate([{
        $match: {
            type: "taxa",
            status: "completed"
        }
    },

    {
        $group: {
            _id: null,
            totalTax: { $sum: "$value" }
        }
    }



    ])

    const totalRefund = await Transaction.aggregate([{
        $match: {
            status: "canceled"

        }
    },

    {
        $group: {
            _id: null,
            totalRefund: { $sum: "$value" }
        }
    }

    ])
    return {
        totalDeposit,
        totalWithdraw,
        totalTransfer,
        totalTax,
        totalRefund,

    }
}




const accountsWithNegativeBalance = async () => {


    const negativeBalance = await Account.find({ balance: { $lte: Number(0) } })

    return negativeBalance


}

const mostBalance = async (limit) => {
    const balance = await Account.find({ balance: { $lte: Number(limit) } })
        .sort({ balance: -1 })




    return balance

}







export default {
    deactivateUser,
    activeUser,
    listActiveUsers,
    listDeactiveUsers,
    deactivateAccount,
    activeAccount,
    listActiveAccounts,
    listDeactiveAccounts,
    blockAccount,
    unlockAccount,
    refundTransaction,
    generalReport,
    financialReport,
    accountsWithNegativeBalance,
    mostBalance,


}

