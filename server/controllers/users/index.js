import express from "express"
import fs from "fs/promises"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { userRegisterValidation,userLoginValidation,errorMiddleWare } from "../../middleware/validations/index.js"

const router = express.Router();
router.post("/register", userRegisterValidation(),errorMiddleWare, async (req , res)=>{
    try {
       let {username,email,password,confirmPassword,phone,address} = req.body;
       let fileData = await fs.readFile("data.json");
       fileData = JSON.parse(fileData);
       let emailFound = fileData.find(ele=> ele.email == email);
       if(emailFound){
        return res.status(400).json({error : "user already exists"})
       }
       password = await bcrypt.hash(password ,12)

       let userData = {username,email,password,phone,address, todo : [] }
       fileData.push(userData);
       await fs.writeFile("data.json",JSON.stringify(fileData));
        res.status(200).json({success: "register is done."})
    } catch (error) {
        console.log(error);
    }
})

router.post("/login" , userLoginValidation(),errorMiddleWare ,async (req , res)=>{
    try {
        let {email,password} = req.body;
        let fileData = await fs.readFile("data.json");
        fileData = JSON.parse(fileData);
        let emailFound = fileData.find(ele=> ele.email == email);

        if(!emailFound){
            return res.status(404).json({error : "user not found"})
        }
        let bool = await  bcrypt.compare(password, emailFound.password);
        if(!bool){
            return res.status(401).json({error : "password not correct"});
        }

       const payload = {email : emailFound.email ,username : emailFound.username}
        const privateKey = "nav123";
        const token = jwt.sign(payload , privateKey , {expiresIn : "1d"});
        res.status(200).json({success : " login done",token});
    
        
            }
            catch(error){
        console.log(error);
                    res.status(500).json({error : "internal server error"});
    }
})
export default router