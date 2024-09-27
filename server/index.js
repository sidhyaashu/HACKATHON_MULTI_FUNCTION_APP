import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import ss_take from "./route/ssR.js"
import data_gen from "./route/dataR.js"
import dotenv from "dotenv"


dotenv.config()
const app = express();
app.use(cors());
app.use(json());
app.use(morgan("tiny"));


app.use('/api/gen-data',data_gen) 
app.use('/api/take-ss',ss_take);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
