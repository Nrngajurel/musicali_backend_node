require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");
const adminRouter = require("./api/admin/admin.router");
const productRouter = require("./api/product/product.router");
const deliveryRouter = require("./api/delivery/delivery.router");
const orderRouter = require("./api/order/order.router");
const multer = require('multer');
const bodyparser = require('body-parser');
const { json } = require("express/lib/response");

app.use(express.json());
// body-parser middleware use
app.use(bodyparser.json())
//use express static folder
app.use(express.static("./public"))
app.use(bodyparser.urlencoded({
    extended: true
}));

app.use('/images',express.static("./api/public/images"));

// log all the request of all route
app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    // requrst json
    console.log("request json\n\n", req.body);
    next();
});

app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/product", productRouter);
app.use("/api/delivery", deliveryRouter );
app.use("/api/order", orderRouter);


app.listen(process.env.APP_PORT,()=>{
    console.log("running on the server port "+process.env.APP_PORT);
});
