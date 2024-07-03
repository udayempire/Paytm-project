const express = require('express');
const zod = require('zod')
const {User}  =require("../db");
const { JWT_Secret } = require('../config');
const router = express.Router();
// const mongoose =require("mongoose")
const jwt = require("jsonwebtoken")
const authMiddleWare = require("../middleware")

const signupSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})

router.post("/signup",async (req,res)=>{
    const body = req.body;
    const {success} = signupSchema.safeParse(body);
    if (!success){
        return res.json({
            message:"Email Already in Use/ Incorrect Inputs Make Sure  username doesnt have Capital Letters and Password has more than 6 Characters"
        })
    };
    const existingUser = await User.findOne({
        username: req.body.username
    });
    if(existingUser){
        return res.status(411).json({
            message:"Email Already in Use/ Incorrect Inputs"
        })
    };
    const user = await User.create({
        username:req.body.username,
        password:req.body.password,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
    });
    const userId = user._id;
    const token =jwt.sign({userId},JWT_Secret)
    res.json({
        message:"User added Successfully",
        token: token
    });
})

module.exports = router;