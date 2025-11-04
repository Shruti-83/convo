import express from 'express'
import path from 'path'
import { ENV } from './lib/env.js';
import { connectDB } from './lib/db.js';
import cors from "cors"
import {serve} from "inngest/express"
import { inngest,functions } from './lib/inngest.js';

const app = express();

const __dirname = path.resolve();

//middlewares
app.use(express.json());
//credentials:true meaning? server allows a browser to include cookies in request
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}))
app.use("/api/inngest",serve({client:inngest,functions}))

app.get('/health', (req, res) => {
    res.status(200).json({ msg: "API is up and running" })
})

app.get('/books', (req, res) => {
    res.status(200).json({ msg: "This is books endpoint" })
})

//make ready for deployment
if (ENV.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
    })
}



const startServer = async () => {
    try {
        await connectDB();
        app.listen(ENV.PORT, () => {
            console.log("server running on...", ENV.PORT)
        })

    }catch(error){
        console.error("Error starting the server",error)
    }
}

startServer()