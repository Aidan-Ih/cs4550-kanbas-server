import express from 'express'
import Hello from "./hello.js"
import Lab5 from "./lab5.js";
import cors from "cors";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js"
import session from 'express-session';
import "dotenv/config";
const app = express();
import mongoose from "mongoose";
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING
mongoose.connect(CONNECTION_STRING);
import UserRoutes from "./users/routes.js";
app.use(
    cors({
        credentials: true,
        origin: process.env.FRONTEND_URL
    })
); 
const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
    };
} 
app.use(session(sessionOptions));


app.use(express.json());
ModuleRoutes(app)
Lab5(app);
Hello(app);
CourseRoutes(app);
UserRoutes(app);
app.listen(process.env.PORT || 4000);