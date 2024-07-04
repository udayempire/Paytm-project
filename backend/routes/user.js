const express = require('express');
const zod = require('zod')
const {User ,Account}  =require("../db");
const { JWT_Secret } = require('../config');
const router = express.Router();
const jwt = require("jsonwebtoken")
const authMiddleWare = require("../middleware")

//zod are for end userInputs! like req.body etc
const signupBody = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})

router.post("/signup",async (req,res)=>{
    const body = req.body;
    const {success} = signupBody.safeParse(body);
    if (!success){
        return res.status(403).json({
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

    await Account.create({
        userId,
        balance: 1+ Math.random()*10000
    })
    const token =jwt.sign({userId},JWT_Secret)
    res.json({
        message:"User added Successfully",
        token: token
    });
    // creatung User Account
    
});
const updateBody = zod.object({
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional(),
})

router.put("/", authMiddleWare, async (req,res)=>{
    const {success}= updateBody.safeParse(req.body);
    console.log(req.body)
    if(!success){
        return res.status(403).json({
            message:"Wrong Input Values"
        });
    }
    try{
        await User.updateOne({_id: req.userId},req.body)
        res.json({
            message:"User Updated Successfully"
        })  
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
});

router.get("/bulk",authMiddleWare, async (req,res)=>{
    const filter =req.query.filter || "";
    const users = await User.find({
        $or:[{
            firstName:{
                '$regex': filter
            },
            lastName: {
                '$regex': filter
            }
        }]
    })
    res.json({
        user: users.map(user =>({
            user: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        })) 
    });
})
module.exports = router;