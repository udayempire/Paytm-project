const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/paytm")
.then(()=>{console.log("Connected to MongoDb Successfully")})
.catch(()=>{console.log("Failed Connecting to MongoDb")})


const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength:3,
        maxLength:30
    },
    password: {
        type: String,
        required: true,
        minLength:6,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxlength:50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
})

const accountSchema = mongoose.Schema({
    userId: {
        type:mongoose.Schema.ObjectId, //Reference to User Model
        ref: "User",
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

const User = mongoose.model('User',userSchema);
const Amount = mongoose.model("Amount",accountSchema)

module.exports= {User,Amount}