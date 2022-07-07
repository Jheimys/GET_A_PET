const User = require('../models/User')

module.exports = class UserController {
    static async register(req, res){
        const {name, email, password, confirmpassword} = req.body

        if(!name){
            res.status(422).json({message: 'O nome é obrigatório'})
            return
        }

        if(!email){
            res.status(422).json({message: 'O email é obrigatório'})
            return
        }

        if(!password){
            res.status(422).json({message: 'A senha é obrigatório'})
            return
        }

        if(!confirmpassword){
            res.status(422).json({message: 'A confirmação da senha é obrigatório'})
            return
        }

        if(password !== confirmpassword){
            res
            .status(422)
            .json({message: 'As senhas precisam ser iguais!'})
            return
        }

        const userExists = await User.findOne({ email: email })

        if(userExists) {
            res
            .status(422)
            .json({message: 'Por favor utilize outro e-mail!'})
        }
        return
    }
}