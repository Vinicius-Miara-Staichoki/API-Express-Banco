import userService from "../services/userServices.js"

const createUser = async (req, res, next) => {
    try {
        const user = await userService.createUser(req.body)
        res.status(201).json(user);

    } catch (error) {
        next(error);
    }

}

const listUsers = async (req, res, next) => {
    try {
        const listUsers = await userService.listUsers();
        res.json({ listUsers });
    } catch (error) {
        next(error);
    }

}

const getUserByID = async (req, res, next) => {

    try {
        const getUser = await userService.getUserByID(req.params.id);
        res.json({ getUser });
    } catch (error) {
        next(error);
    }
}

const updateUser = async (req, res, next) => {
    try {
        const userUpdate = await userService.updateUser(req.params.id,
            req.body)

        res.json({ userUpdate });
    } catch (error) {

        next(error);
    }

}

const deletUser = async (req, res, next) => {
    try {
        const userDelete = await userService.deleteUser(req.params.id)
        res.json({ userDelete })

    } catch (error) {
        next(error);
    }
}

const getUserByCPF = async (req, res, next) => {
    try {
        const userByCPF = await userService.getUserByCPF(req.params.cpf)
        res.json({ userByCPF })
    } catch (error) {
        next(error);
    }
}

const getUserByEmail = async (req, res, next) => {
    try {
        const userByEmail = await userService.getUserByEmail(req.params.email);
        res.json({ userByEmail })

    } catch (error) {
        next(error);
    }


}

const getAccountsByUser = async (req, res, next) => {
    try{
        const accounts = await userService.getAccountsByUser(req.params.id);
        res.json({accounts});
    }catch(error){
        next(error);
    }

}


export default {

    createUser,
    listUsers,
    getUserByID,
    updateUser,
    deletUser,
    getUserByCPF,
    getUserByEmail,
    getAccountsByUser,



}

