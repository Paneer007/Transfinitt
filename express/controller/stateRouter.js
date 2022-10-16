const stateRouter = require('express').Router()
const grandStateScript = require('../services/StateScript')
const numbaVictim ={
    "stateData": "Telangana",
    "ACData": "Lal Bahadur Nagar - 49",
    "PCData": "Malkajgiri",
    "NameData": "Venkat Sai Abhinav Varma Dandu",
    "EpicData": "ZTS7113020",
    "PartNumber": 257,
    "SerialNumber": 758,
    "PollingNumber": "Nagarjuna Talent School - 257",
    "ACNumber": 49
  }
stateRouter.post('/',async(req,res)=>{
    const data = req.body
    let state = data["stateData"]
    switch(state){
        case "Delhi":
            grandStateScript.DelhiScript(data["ACNumber"],data["PartNumber"]);
            break;
        case "Kerala":
            grandStateScript.KeralaScript(data["ACNumber"],data["PartNumber"]);
            break;
        case "Goa":
            grandStateScript.GoaScript(data["ACNumber"],data["PartNumber"]);
            break;
        case "Karnataka":
            grandStateScript.KarnatakaScript(data["ACNumber"],data["PartNumber"]);
            break;
        case "Manipur":
            grandStateScript.ManipurScript(data["ACNumber"],data["PartNumber"]);
            break;
        case "Nagaland":
            grandStateScript.NagalandScript(data["ACNumber"],data["PartNumber"]);
            break;
        case "Sikkim":
            grandStateScript.SikkimScript(data["ACNumber"],data["PartNumber"]);
            break;
        case "Tamil Nadu":
            grandStateScript.TamilNaduScript(data["ACNumber"],data["PartNumber"]);
            break;
        case "Meghalaya":
            grandStateScript.MeghalayaScript(data["ACNumber"],data["PartNumber"]);
            break;
    }
        res.status(200).send({"message":"all clear"})
})
module.exports = stateRouter