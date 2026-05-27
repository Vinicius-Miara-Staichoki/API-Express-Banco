import adminServices from "../services/adminServices.js"

const deactivateUser = async (req, res, next) => {
    try {
        const user = await adminServices.deactivateUser(req.params.id)


        res.json({ user })
    } catch (error) {
        next(error);
    }

}

const activeUser = async (req, res, next) => {
    try {
        const user = await adminServices.activeUser(req.params.id)
        res.json({ user })
    } catch (error) {
        next(error);
    }
}

const listActiveUsers = async (req, res, next) => {
    try {
        const activeUsers = await adminServices.listActiveUsers()
        res.json({ activeUsers })
    } catch (error) {
        next(error)
    }
}

const listDeactiveUsers = async (req, res, next) => {
    try {
        const deactiveUsers = await adminServices.listDeactiveUsers();
        res.json({ deactiveUsers })
    } catch (error) {
        next(error);
    }
}

const deactivateAccount = async (req, res, next) => {
    try {
        const account = await adminServices.deactivateAccount(req.params.id)


        res.json({ account })
    } catch (error) {
        next(error);
    }

}

const activeAccount = async (req, res, next) => {
    try {
        const account = await adminServices.activeAccount(req.params.id)
        res.json({ account })
    } catch (error) {
        next(error);
    }
}

const listActiveAccounts = async (req, res, next) => {
    try {
        const activeAccounts = await adminServices.listActiveAccounts()
        res.json({ activeAccounts })
    } catch (error) {
        next(error)
    }
}

const listDeactiveAccounts = async (req, res, next) => {
    try {
        const deactiveAccounts = await adminServices.listDeactiveAccounts();
        res.json({ deactiveAccounts })
    } catch (error) {
        next(error);
    }
}

const blockAccount = async (req, res, next) => {
    try {
        const account = await adminServices.blockAccount(req.params.id)
        res.json({ account })
    } catch (error) {
        next(error);
    }
}

const unlockAccount = async (req, res, next) => {
    try {
        const account = await adminServices.unlockAccount(req.params.id)
        res.json({ account })
    } catch (error) {
        next(error);
    }
}


const refundTransaction = async (req, res, next) => {
    try {
        const transaction = await adminServices.refundTransaction(req.params.id);
        res.json({ transaction })

    } catch (error) {
        next(error);
    }

}

const generalReport = async (req, res, next) => {
    try {
        const report = await adminServices.generalReport();
        res.json({ report })
    } catch (error) {
        next(error);
    }
}

const financialReport = async (req, res, next) => {
    try {
        const report = await adminServices.financialReport();
        res.json({ report })
    } catch (error) {
        next(error);
    }

}

const accountsWithNegativeBalance = async (req, res, next) => {
    try {
        const negativeBalance = await adminServices.accountsWithNegativeBalance();
        res.json({ negativeBalance })
    } catch (error) {
        next(error);
    }
}

const mostBalance = async (req, res, next) => {
    try {
        const balance = await adminServices.mostBalance(req.params.limit);
        res.json({ balance })
    } catch (error) {
        next(error);
    }
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

