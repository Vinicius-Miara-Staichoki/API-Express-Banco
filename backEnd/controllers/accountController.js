import accountServices from "../services/accountServices.js";

const createAccount = async (req, res, next) => {
  try {
    const accounteCreate = await accountServices.createAccount(req.body)
    res.status(201).json(accounteCreate);
  } catch (error) {
    next(error);
  }
}

const listAccounts = async (req, res, next) => {
  try {
    const listAccounts = await accountServices.listAccounts();
    res.json({ listAccounts })
  } catch (error) {
    next(error);
  }
}

const getAccountByID = async (req, res, next) => {
  try {
    const accountByID = await accountServices.getAccountByID(req.params.id);
    res.json({ accountByID })
  } catch (error) {
    next(error)
  }

}

const getAccountByNumber = async (req, res, next) => {
  try {
    const accountByNumber = await accountServices.getAccountByNumber(req.params.accountNumber)

    res.json({ accountByNumber })
  } catch (error) {
    next(error)
  }

}

const getBalanceAccount = async (req, res, next) => {
  try {

    const account = await accountServices.getBalanceAccount(req.params.id);

    res.json({ Balance: account.balance, limit: account.limit, availableBalance: account.balance + account.limit })

  } catch (error) {
    next(error);
  }
}





export default {
  createAccount,
  listAccounts,
  getAccountByID,
  getAccountByNumber,
  getBalanceAccount,




}

