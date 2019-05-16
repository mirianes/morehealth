const User = require('../schemas/user')
const bcrypt = require('bcrypt')

const create = (req, res) => {
    let newPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = newPassword
    let user = new User(req.body)
    user.save().then(user => {
        user.password = undefined
        return res.status(201).send(user)
    }).catch(err => {
        return res.status(400).send(err)
    })
}

const list = (req, res) => {
    User.find((err, users) => {
        if (err) {
            return res.status(400).send(err)
        } else {
            return res.status(200).send(users)
        }
    })
}

const update = (req, res) => {
    User.findById(req.params.id, (error, user) => {
        if (error) {
            return res.status(400).send(error)
        } else {
            let newPassword = bcrypt.hashSync(req.body.password, 10)
            user.name = req.body.name
            user.code = req.body.code
            user.phone = req.body.phone
            user.email = req.body.email
            user.username = req.body.username
            user.password = newPassword
            user.user_type = req.body.user_type
            user.usf_id = req.body.usf_id
            user.save().then(newUser => {
                user.password = undefined
                return res.status(200).send(newUser)
            }).catch(err => {
                return res.status(400).send(err)
            })
        }
    })
}

const drop = (req, res) => {
    User.findByIdAndDelete(req.params.id, req.body, (error, result) => {
        if (error) {
            return res.status(400).send(error)
        } else {
            return res.status(200).send("Usuário deletado com sucesso.")
        }
    })
}

module.exports = {
    create,
    list,
    update,
    drop
}