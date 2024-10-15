require('dotenv').config();
const express = require("express");
const mainRouter = require("./routes/index")
const app = express();
const cors = require("cors")
const PORT = 3000;

app.use(cors());
app.use(express.json()); //body-parser to support json files
app.use("/api/v1",mainRouter );

app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`)
})

