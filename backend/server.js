import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';



// {
//     credentials:true,
//     // origin:process.env.FRONTEND_URL
// }


dotenv.config();
const app =express();
// app.use(cors());
app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "DELETE", "UPDATE", "PUT"],
      credentials: true,
    })
  );
app.use(express.json());

//api endpoints

app.use("/api/food",foodRouter)
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
app.use("/images",express.static("uploads"))



const PORT= process.env.PORT||5000

app.get("/",(request,response)=>{
    ///server to client
    response.json({
        message : "Server is running " + PORT
    })
})

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("server is running in port ",PORT)
    })
})





