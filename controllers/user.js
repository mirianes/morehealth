const User = require('../schemas/user')
const { secretKey } = require('../config/config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const create = (req, res) => {
    let newPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = newPassword
    let user = new User(req.body)
    user.save().then(user => {
        user.password = undefined
        let token = jwt.sign({ email: user.email }, secretKey, { expiresIn: 3600 }) // Trocar pra 43200 = 12hs
        return res.status(201).send({user: user, auth: true, token: token})
    }).catch(err => {
        return res.status(400).send({error: err})
    })
}

const list = (req, res) => {
    User.find((err, users) => {
        if (err) {
            return res.status(400).send({error: err})
        } else {
            users.forEach(user => {
                user.password = undefined
            })
            return res.status(200).send(users)
        }
    })
}

const update = (req, res) => {
    User.findById(req.params.id, (error, user) => {
        if (error) {
            return res.status(400).send({error: error})
        } else {
            user.name = req.body.name
            user.code = req.body.code
            user.phone = req.body.phone
            user.save().then(newUser => {
                user.password = undefined
                return res.status(200).send(newUser)
            }).catch(err => {
                return res.status(400).send({error: err})
            })
        }
    })
}

const changePassword = (req, res) => {
    User.findById(req.params.id, (error, user) => {
        if (error) {
            return res.status(400).send({error: error})
        } else {
            let passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
            if (!passwordIsValid) return res.status(401).send({auth: false})
            let newPassword = bcrypt.hashSync(req.body.newPassword, 10)
            user.password = newPassword
            user.save().then(newUser => {
                newUser.password = undefined
                return res.status(200).send({auth: true})
            }).catch(err => {
                return res.status(400).send({error: err})
            })
        }
    })
}

const drop = (req, res) => {
    User.findByIdAndDelete(req.params.id, req.body, (err, result) => {
        if (err) {
            return res.status(400).send({error: err})
        } else {
            return res.status(200).send("Usuário deletado com sucesso.")
        }
    })
}

const login = async (req, res) => {
    try {
        let user = await User.findOne({
            email: req.body.email
        })
    
        if (user) {
            let passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
            if (!passwordIsValid) return res.status(401).send({ auth: false, token: null })
            user.password = undefined
            let token = jwt.sign({ email: user.email }, secretKey, { expiresIn: 3600 }) // Trocar pra 43200 = 12hs
            return res.status(200).send({user: user, auth: true, token: token})
        } else {
            return res.status(400).send({error: 'Usuário não encontrado.'})
        }
    } catch (error) {
        return res.status(400).send({error: error})
        
    }
}

module.exports = {
    create,
    list,
    update,
    changePassword,
    drop,
    login
}