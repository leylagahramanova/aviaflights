import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const express = require("express");
const axios = require("axios");
import session from "express-session";
import dotenv from "dotenv";
import SequelizeStore from "connect-session-sequelize";
import db from "./config/Database.js";
import UserRoute from "./routes/UserRoute.js";
import MaintenanceRoute from "./routes/MaintenanceRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
dotenv.config()
const cors = require('cors');
const corsOptions ={origin:'http://localhost:3000', 
    credentials:true,     
    optionSuccessStatus:200
}
const app = express();
app.use(cors(corsOptions));
const sessionStore=SequelizeStore(session.Store);
const store=new sessionStore({
    db:db
});
app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true, 
    store:store,
    cookie: {
        secure: 'auto'  
    }
}));
app.use(function(req,res,next){
    res.header(
        "Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept",
        "Access-Control-Allow-Methods", "GET, POST, PUT, DELETE",
        "Access-Control-Allow-Origin", "*"
    );
    next();
});
app.use(express.json());  
app.use(UserRoute);
app.use(MaintenanceRoute);
app.use(AuthRoute);  

const http = require('http'); const server = http.createServer(app);
app.listen(process.env.APP_PORT, (req, res)=> {
    console.log('Server up and running...');
});
