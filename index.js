const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// importing user model
const userModel = require('./models/userModel')

const app = express()

// for chunk by chunk functionality
app.use(express.json())

// database connection 
mongoose.connect('mongodb://localhost:27017/Nutricheck')
.then(()=>{
    console.log('db connection okay')
})
.catch((err)=>{
    console.log(err)
})
// End point for registration 
app.post('/register',(req,res)=>{
    let user = req.body;

    // encrypting passwords
        bcrypt.genSalt(10,(err,salt)=>{
            if(!err)
            {
                bcrypt.hash(user.password,salt,async (err,hpass)=>{
                    if(!err)
                    {
                        user.password = hpass
                        
                        try
                        {
                            // adding  new collection of user with encrypted password into db 
                            let doc = await userModel.create(user)
                            res.status(201).send({message:'user registration successful'})
                        }

                        catch
                        {
                                console.log(err)
                                res.status(500).send({message:'problem registering'})
                        }


                    }
                })
            }
        })
        
})

// end point for login
app.post('/login',async (req,res)=>{

    let validUser = req.body;
    try
    {
        // find user with this email in the db
        const user = await userModel.findOne({email:validUser.email})
        if(user!==null)
        {
            bcrypt.compare(validUser.password,user.password,(err,success)=>{
                if(success==true)
                {
                    // generate token after successful login
                    jwt.sign({email:validUser.email},'tokenKey',(err,token)=>{
                        if(!err)
                        {
                            res.send({message:'login success',token:token})
                        }

                        else
                        {
                            res.send({message:'error generating token'})
                        }
                    })
                    
                }

                else
                {
                    res.status(403).send({message:'incorrect password'})
                }

            })
        }

        else
        {
            res.status(404).send({message:'user not found'})
        }
    }

    catch(err)
    {
        console.log(err)
        res.status(500).send({message:'some problem'})
    }
    



})




app.listen(8000,()=>{
    console.log('server running')
})
