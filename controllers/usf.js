const Usf = require('../schemas/usf')
const User = require('../schemas/user')

const create = (req, res) => {
    let usf = new Usf(req.body)
    usf.save().then(usf => {
        res.status(201).send(usf)
    }).catch(err => {
        res.status(400).send({error: err})
    })
}

const list = (req, res) => {
    Usf.find((err, usfs) => {
        if (err) {
            return res.status(400).send({error: err})
        } else {
            return res.status(200).send(usfs)
        }
    })
}

const update = (req, res) => {
    Usf.findById(req.params.id, (error, usf) => {
        if (error) {
            return res.status(400).send({error: error})
        } else {
            usf.name = req.body.name
            usf.state = req.body.state
            usf.city = req.body.city
            usf.cnes = req.body.cnes
            usf.phone = req.body.phone
            usf.save().then(newUsf => {
                return res.status(200).send(newUsf)
            }).catch(err => {
                return res.status(400).send({error: err})
            })
        }
    })
}

const drop = (req, res) => {
    Usf.findByIdAndDelete(req.params.id, req.body, (err, result) => {
        if (err) {
            return res.status(400).send({error: err})
        } else {
            return res.status(200).send("USF deletada com sucesso.")
        }
    })
}

const getData = async (req, res) => {
    try {
        let usf = await Usf.findOne({
            cnes: req.params.id
        })
    
        let doctorFind = await User.findOne({
            usf_id: req.params.id,
            user_type: 1
        })
    
        let doctor = {
            name: doctorFind.name,
            crm: doctorFind.code
        }
    
        return res.status(200).send({usf: usf, doctor: doctor})
    } catch (error) {
        console.log(error)
        return res.status(400).send({error: error})
    }
}

module.exports = {
    create,
    list,
    update,
    drop,
    getData
}