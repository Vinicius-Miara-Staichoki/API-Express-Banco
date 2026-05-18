import transactionServices from "../services/transactionServices.js"

const createDeposit = async (req, res, next) => {
    try {
        const transaction = await transactionServices.createDeposit(
            req.params.id,
            req.body,


        )

        res.status(201).json(transaction);
    } catch (error) {
        next(error);
    }
}

const createWithdraw = async (req, res, next) => {
    try {
        const transaction = await transactionServices.createWithdraw(
            req.params.id,
            req.body,

        )

        res.status(201).json(transaction);
    } catch (error) {
        next(error);
    }
}

const createTransfer = async (req, res, next) => {
    try {
        const transaction = await transactionServices.createTransfer(
            req.params.id,
            req.params.targetId,
            req.body,
            req.body,
        )

        res.status(201).json(transaction);

    } catch (error) {
        next(error);
    }

}

const listTransactionsByAccount = async (req, res, next) => {
    try {
        const list = await transactionServices.listTransactionsByAccount(
            req.params.id,
        )
        res.json({ list });


    } catch (error) {
        next(error);
    }

}

const listTransactions = async (req, res, next) => {
    try {
        const list = await transactionServices.listTransactions();

        res.json({ list });
    } catch (error) {
        next(error);
    }

}

const getTransactionById = async (req, res, next) => {
    try {
        const transaction = await transactionServices.getTransactionById(req.params.id);
        res.json({ transaction });
    } catch (error) {
        next(error);
    }

}

const listTransactionByType = async (req, res, next) => {
    try {
        const transactions = await transactionServices.listTransactionByType(req.params.type);
        res.json({ transactions });
    } catch (error) {
        next(error);
    }

}

const getTransactionByValue = async (req, res, next) => {
    try {
        const transaction = await transactionServices.getTransactionByValue({ value: { $gte: Number(req.params.min), $lte: Number(req.params.max) } })

        res.json({ transaction });
    } catch (error) {
        next(error);
    }

}

const getTransactionsByYear = async (req, res, next) => {
    try {
        const year = await transactionServices.getTransactionsByYear(req.params.year)
        res.json({ year })

    } catch (error) {
        next(error);
    }
}

const monthlyFee = async (req, res, next) => {
    try {
        const account = await transactionServices.monthlyFee(req.params.id);
        res.json({ account })
    } catch (error) {
        next(error);
    }

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

