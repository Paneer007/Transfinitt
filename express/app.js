require('dotenv').config()
const express = require('express');
const app = express();
app.use(express.json())
app.set('view engine','ejs');
app.use(express.static("public"));
const bodyParser = require("body-parser");
const userDataRouter = require('./controller/userData')
const stateRouter = require('./controller/stateRouter')
app.use(bodyParser.urlencoded({extended:true}));
app.use('/api/userdata',userDataRouter)
app.use('/api/state',stateRouter)
// app.get('/',(req,res)=>{
//     res.render('post');
// })
 
// app.post('/',(req,res)=>{
//     let person= '';
//     //from the postman
//     if(req.query.name){
//         person = {
//             ...req.query ,
//             epicID: undefined,
//         }
//     }
//     //if from the get req
//     if(req.body.name){
//         person = {
//             ...req.body,
//             epicID: undefined,
//         }
//     }

//     console.log(person)

//     res.send('done posting');
// }) 
//export funciton from login from sanjai
//input from 
//epic id list and state name to flask for state
module.exports = app
