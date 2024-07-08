const express = require("express");
const router = express.Router()
const authMiddleWare = require("../middleware")
const {Account} = require("../db")
const {mongoose} =require("mongoose")

router.get("/balance",authMiddleWare,async (req,res)=>{
    const account = await Account.findOne({
        username:req.username, //fetched using authMiddleware
    })
    res.json({
        Balance: account.balance
    })
});

router.post("/transfer",authMiddleWare,async (req,res)=>{
    const session = await mongoose.startSession();

    session.startTransaction();
    const {amount,to} = req.body;

    //Fetch The toaccount within the transaction
    const account = await Account.findOne({username: req.username}).session(session)


    if(!account || account.balance<amount){
        await session.abortTransaction();
        return res.status(403).json({
            message: "Insufficent Balance"
        })
    };
    const toAccount = await Account.findOne({username: to}).session(session)


    if(!toAccount){
        await session.abortTransaction();
        return res.status(403).json({
            message: "Invalid Account"
        })
    };
    // Perform the Transfer
    await Account.updateOne({username: req.username}, {$inc:{balance: -amount}}).session(session)
    await Account.updateOne({username: to}, {$inc:{balance:amount}}).session(session) // "to" we get from req.body which is defined above here.

    await session.commitTransaction();
    res.json({
        message:"Transaction Successful"
    });
})

module.exports = router