import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/userModel.js"
import Account from "../models/accountModel.js"

const register = async (data) => {
    const { name, cpf, email, number, age, password, role } = data;

    if (!name || !cpf || !email || !number || !age || !password) {
        throw new Error("Name, cpf , email, number, age and password are necessary");
    }


    const userExistEmail = await User.findOne({ email })

    if (userExistEmail) {
        throw new Error("User with this email has allready been created");
    }

    const userExistsCpf = await User.findOne({ cpf })

    if (userExistsCpf) {
        throw new Error("User with this cpf has allready been created");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        cpf,
        email,
        number,
        age,
        password: hashedPassword,
        role: role || "user",
        active: true,
    });

    return {
        _id: user._id,
        name: user.name,
        cpf: user.cpf,
        email: user.email,
        number: user.number,
        age: user.age,
        role: user.role,
        active: user.active,

    };

}

const login = async (data) => {
    const { email, password} = data;
  
    if (!email || !password) {
      const error = new Error("Email e senha são obrigatórios");
      error.statusCode = 400;
      throw error;
    }
  
    const user = await User.findOne({ email }).select("+password");
  
    if (!user) {
      const error = new Error("Email ou senha inválidos");
      error.statusCode = 401;
      throw error;
    }
  
    if (!user.active) {
      const error = new Error("Usuário inativo. Entre em contato com a administração");
      error.statusCode = 403;
      throw error;
    }
  
    const passwordIsCorrect = await bcrypt.compare(password, user.password);
  
    if (!passwordIsCorrect) {
      const error = new Error("Email ou senha inválidos");
      error.statusCode = 401;
      throw error;
    }
  
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1d",
      }
    );

    
  
    return {
      user: {
        _id: user._id,
        nome: user.nome,
        email: user.email,
        telefone: user.telefone,
        role: user.role,
        ativo: user.ativo,
      },
      token,
  

    };
  };





export default {
    register,
    login,
}
