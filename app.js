require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");
const adminRouter = require("./api/admin/admin.router");
const productRouter = require("./api/product/product.router")

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/product/", productRouter)

app.listen(process.env.APP_PORT,()=>{
    console.log("running on the server port "+process.env.APP_PORT);
});
