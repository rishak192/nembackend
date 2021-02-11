const express = require('express')
const router = express.Router()
const Users = require('../Models/user')
const jwt = require('jsonwebtoken')
const { ObjectId } = require('mongodb')

router.post('/addDetails', async (req, res) => {
    var user = new Users(req.body.Details)
    user.save().then(result => {
        const token = jwt.sign({ id: result._id }, process.env.SECRET)
        res.json({ "mes": result, "id": token })
    })

})

router.post('/getDetails', async (req, res) => {
    var sent=false
    const items=["username","mobile","email","address"]
    try {
        const verified = jwt.verify(req.body.idtoken, process.env.SECRET)
        Users.find({ _id: ObjectId(verified.id) }).then(result => {
            for (var item in items) {
                if (result[0][items[item]] !== "") {
                    sent=true
                    res.json({ "mes": result ,"som":"sdata"})
                    return
                }
            }
            if(!sent){
                res.json({ "mes": "NoData" })
            }
        })
    } catch (e) {
        
    }
})

router.post('/update/:field', async (req, res) => {
    var field = req.params.field
    const verified = jwt.verify(req.body.idtoken, process.env.SECRET)

    await Users.updateOne({ _id: ObjectId(verified.id) },
        { $set: { [field]: "" } }).then(result => {
        })
})

module.exports = router
