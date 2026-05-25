

const adminMiddleware = (req, res, next) => {  // so usa async quando for usar await

    if (req.user.role !== "admin") {
        return res.status(403).json({
            error: "Acesso negado"
        });
  
    }
    next();

}

export default adminMiddleware  