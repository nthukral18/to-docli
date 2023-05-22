import express from "express"
import fs from "fs/promises"
import { authMiddleware } from "../../middleware/auth/verifyToken.js";
import { randomStringGenerator } from "../../utils/randomString.js";

const router = express.Router();
router.post("/add", authMiddleware, async (req, res) => {
    try {
        //console.log(req.payload)
        let { payload } = req;
        let { toDoName } = req.body;

        let fileData = await fs.readFile("data.json");
        fileData = JSON.parse(fileData);

        let userFound = fileData.find(ele => ele.email == payload.email)
        if (!userFound) {
            return res.status(404).json({ error: "user not found" })
        }
        let toDoData = {
            toDoName: toDoName,
            isCompleted: false,
            todo_id: randomStringGenerator(12)
        }


        userFound.todo.push(toDoData);
        await fs.writeFile("data.json", JSON.stringify(fileData));

        res.status(200).json({ success: " add task route is up" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal error" })
    }
})

router.patch("/edit/:todo_id", authMiddleware, async (req, res) => {
    try {
        let { payload } = req;
        let { todo_id } = req.params;
        let {toDoName,isCompleted} = req.body;
        let fileData = await fs.readFile("data.json");
        fileData = JSON.parse(fileData);
        let userFound = fileData.find(ele => ele.email == payload.email)
        if (!userFound) {
            return res.status(404).json({ error: "user not found" })

        }




        let taskFound = userFound.todo.find(ele => ele.todo_id == todo_id)
        if (!taskFound) {
            return res.status(404).json({ error: "todo not found" })

        }
        taskFound.toDoName = toDoName;
        taskFound.isCompleted = isCompleted;
        await fs.writeFile("data.json", JSON.stringify(fileData));
        res.status(200).json({ success: " edit task route is up" })
        
        
        

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal error" })
    }
})

router.delete("/delete/:todo_id",authMiddleware, async(req,res)=>{
    try {
       
        let {payload} = req;
        let { todo_id } = req.params;

        let fileData = await fs.readFile("data.json");
        fileData = JSON.parse(fileData);

        let userFound = fileData.find(ele => ele.email == payload.email)
        if (!userFound) {
            return res.status(404).json({ error: "user not found" })
        }

        let taskFound = userFound.todo.findIndex(ele => ele.todo_id == todo_id)
        if (!taskFound) {
            return res.status(404).json({ error: "todo not found" })
 
        }
        userFound.todo.splice(taskFound,1);
        await fs.writeFile("data.json", JSON.stringify(fileData));
        res.status(200).json({ success: " delete task route is up" })
        

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal error" })
    }
})


export default router