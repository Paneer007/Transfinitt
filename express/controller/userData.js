const userDataRouter = require('express').Router()
const {GetVoterByDetails,GetVoterByEPIC} = require('../services/VoterDetails')


userDataRouter.post('/login',async(req,res)=>{
    const data = req.body
    console.log(data)
    const resultData = await GetVoterByDetails(data)
    console.log(resultData)
    return res.status(200).send(resultData)
})
userDataRouter.post('/login/user',async(req,res)=>{
    const data = req.body
    const resultData = await GetVoterByEPIC(data)
    console.log(resultData)
    return res.status(200).send(resultData)
})
module.exports = userDataRouter

