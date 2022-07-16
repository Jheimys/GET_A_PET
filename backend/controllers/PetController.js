const Pet = require('../models/Pet')

//helpers
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class Petcontroller {

    //create a pet
    static async create(req, res) {
        const { name, age, weight, color } = req.body

        const images = req.files               // As imagens vem por files e não pelo body.

        const available = true

        //images upload

        //validations
        if(!name) {
            res.status(422).json({message: 'O nome é obrigatório!'})
            return
        }

        if(!age) {
            res.status(422).json({message: 'A idade é obrigatório!'})
            return
        }

        if(!weight) {
            res.status(422).json({message: 'O peso é obrigatório!'})
            return
        }

        if(!color) {
            res.status(422).json({message: 'A cor é obrigatório!'})
            return
        }

        // As images vem como array.
        // console.log(images) --> Está chegando um array vazio
        if(images.length === 0 ) {
            res.status(422).json({message: 'A imagem é obrigatória!'})
            return
        }


        //get pet owner
        const token = getToken(req)
        const user = await getUserByToken(token)

        console.log(user)

        //create a pet
        const pet = new Pet({
            name,
            age,
            weight,
            color,
            available,
            images: [],
            user: {
                _id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone
            }
        })

        images.map((image) => {
            pet.images.push(image.filename)
        })

        try {

            const newPet = await pet.save()
            res.status(201).json({
                message: 'Pet cadastrado com sucesso!',
                newPet,
            })
            
        } catch (error) {
            res.status(500).json({message: error})
        }
    }

    //viewing the pets
    static async getAll(req, res) {

        //O método sort('-createdAt') ordena do mais recente p/ o mais antigo.
        // O createdAt está no BD por que definir no models timestamps: true.
        const pets = await Pet.find().sort('-createdAt')

        res.status(200).json({
            pets: pets,
        })
    }
}