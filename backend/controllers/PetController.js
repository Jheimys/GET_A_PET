const Pet = require('../models/Pet')

module.exports = class Petcontroller {

    //create a pet
    static async create(req, res) {
        res.json({message: 'Deu certo!'})
    }
}