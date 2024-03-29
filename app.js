import "./dotenv.js";
import connect from "./db/connect.js";
import ErrorHandler from "./errorHandlers/ErrorHandler.js"; 
import NotFound from "./errorHandlers/NotFound.js"; 
import ipRecords from "./access-records/ipRecords.js";
import Auth from "./middleware/Auth.js";
import AuthAdmin from "./middleware/AuthAdmin.js";

// SECURITY PACKAGES 
import cors from "cors";
import mongo_sanitize from "express-mongo-sanitize"; 
import helmet from "helmet";
// ------------------ 


const PORT = process.env.PORT || 3000; 
const CRON_INTERVAL = 3600000;
import express from "express";
const app = express();

// ROUTERS 
import AdminRouter from './routes/AdminRouter.js'; 
import DoctorRouter from './routes/DoctorRouter.js'; 
import AuthRouter from "./routes/AuthRouter.js";  
import PublicRouter from "./routes/PublicRouter.js"; 
//--------
app.use(express.json());
app.use(cors({
    origin: "*"
})); 
app.use(mongo_sanitize());
app.use(helmet());  
app.disable('x-powered-by');

const start = async () => {
    try{
        await connect(process.env.MONGO_URL);
        app.listen(PORT, () => {
            console.log('server is running'); 
        });  
        const cleanUp = () => {
            ipRecords.clear(); 
        }
        setInterval(cleanUp, CRON_INTERVAL);
    }catch(err){
        console.log(err)
    }
}
start(); 

app.get('/', (req, res) => {
    return res.status(200).send("<h1>Server is live!</h1>")
})
app.use("/api/v1/admin", AuthAdmin, AdminRouter);
app.use("/api/v1/auth", AuthRouter); 
app.use("/api/v1/doctor", Auth, DoctorRouter); 
app.use('/api/v1/public', Auth, PublicRouter);
app.use(ErrorHandler); 
app.use(NotFound);


