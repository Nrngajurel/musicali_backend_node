require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");

app.use(express.json());

app.use("/", userRouter);
app.listen(process.env.APP_PORT,()=>{
    console.log("running on the server port "+process.env.APP_PORT);
});
