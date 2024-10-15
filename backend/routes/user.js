const express = require('express');
const zod = require('zod')
const { User, Account } = require("../db");
const  JWT_Secret  = process.env.JWT_SECRET;
const router = express.Router();
const jwt = require("jsonwebtoken")
const authMiddleWare = require("../middleware")


//zod are for end userInputs! like req.body etc
const signupBody = zod.object({
    emailAddress: zod.string().email(),
    username: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})

router.post("/signup", async (req, res) => {
    const body = req.body;
    const { success } = signupBody.safeParse(body);
    if (!success) {
        return res.status(403).json({
            message: "Email Already in Use/ Incorrect Inputs Make Sure  username doesnt have Capital Letters and Password has more than 6 Characters"
        })
    };
    const existingUser = await User.findOne({
        username: req.body.username
    });
    if (existingUser) {
        return res.status(411).json({
            message: "Email Already in Use/ Incorrect Inputs"
        })
    };
    const user = await User.create({
        emailAddress: req.body.emailAddress,
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });
    const userId = user._id;
    const username = user.username

    await Account.create({
        userId,
        username,
        balance: 1 + Math.random() * 10000
    })
    const token = jwt.sign({ userId, username }, JWT_Secret)
    res.json({
        message: "User added Successfully",
        token: token
    });
    // creating User Account

});
// creating Signin route
const signinBody = zod.object({
    username: zod.string(),
    password: zod.string()
});

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(403).json({
            message: "Wrong Values input"
        })
    }
    const existingUser = await User.findOne({
        username: req.body.username,
        password: req.body.password,
    })
    if (!existingUser) {
        return res.status(403).json({
            message: "User Doesnt Exist Please Signup First!"
        })
    }
    const userId = existingUser._id
    const username = existingUser.username
    const token = jwt.sign({ userId, username }, JWT_Secret)
    res.send({
        message: "Login Successfull Congrats",
        token: token
    })
})
//Update User 
const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/", authMiddleWare, async (req, res) => {
    const { success,data } = updateBody.safeParse(req.body);
    if (!success) {
        return res.status(403).json({
            message: "Wrong Input Values"
        });
    }
    const updateData={}
    if(data.password){
        updateData.password=data.password
    }
    if(data.firstName){
        updateData.firstName=data.firstName
    }
    if(data.lastName){
        updateData.lastName=data.lastName
    }
    try {
        await User.updateOne({ username: req.username }, {$set: updateData})
        res.json({
            message: "User Updated Successfully"
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
});
router.get("/currentUser",authMiddleWare, async (req,res)=>{
    const user = await User.findOne({
        username: req.username
    })
    res.json({
    firstName:user.firstName,
    lastName:user.lastName,
    username:user.username
    })
})
router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";
    const users = await User.find({
        $or: [{
            firstName: {
                '$regex': filter
            }
        }, {
            lastName: {
                '$regex': filter
            }
        },{
            username: {
                '$regex': filter
            }
        }
        ]
    })
    res.json({
        user: users.map(user => ({
            emailAddress: user.emailAddress,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    });
})
module.exports = router;