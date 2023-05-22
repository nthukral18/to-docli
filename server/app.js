import express from "express"
import userRouter from "./controllers/users/index.js"
import todoRouter from "./controllers/todos/index.js"

const app = express();
const port = 5000;
app.use(express.json());


app.get("/",(req,res)=>{
    res.send("todo server root route");
})

app.use("/api/user",userRouter)
app.use("/api/todos",todoRouter)
app.listen(5000 , ()=>{
    console.log("server is started at ",port)
})