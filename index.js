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





app.listen(8000,()=>{
    console.log('server running')
})
