const express = require("express");
const { connection } = require("./configs/mongoose.connection.js");
const cors = require("cors");
const { userRouter } = require("./routes/user.route.js");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8080;

app.use(cors())
app.use(express.json());
app.use("/user", userRouter);

app.get("/", (req, res)=>{
    res.send("Authentication App");
})

app.listen(PORT, async ()=>{
    console.log(`Server is running at port: ${PORT}`);
    try {
        await connection;
        console.log("Connected to DB");
    } catch (error) {
        console.log("Error while connecting to DB", error);
    }
})