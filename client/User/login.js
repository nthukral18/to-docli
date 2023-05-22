import fs from "fs/promises"
import readLineSync from "readline-sync"
import chalk from "chalk"
import { loggedIn } from "../TODO/index.js";

import axios from "axios";



async function loginUser(){
    try {
        console.clear()
        console.log(`
   ====================================\n
   \tUser login\n 
   ====================================`);

   let email = readLineSync.questionEMail("Enter your Email : ");
   if(!email){
    console.log("invalid email");
   }

   let password = readLineSync.question("Enter your password : ",{hideEchoBack : true});
   while(!password){
    console.log("please enter a valid password");
    password = readLineSync.question("re-Enter your password : ",{hideEchoBack : true});
   }

   let data = {email,password}
   let res = await axios.post("http://localhost:5000/api/user/login",data)
    await fs.writeFile("authToken.txt",res.data.token)
//    let data = await fs.readFile("data.json");
         
//    data = JSON.parse(data);
//    let emailFound = data.find(ele => ele.email == email);
   
//    while(emailFound.password !== password){
//     console.log("password dont match");
//     password = readLineSync.question(" please re-Enter your password : ", {hideEchoBack : true});
//    }
//    while(!emailFound){
//     console.log("email dont match");
//     email = readLineSync.questionEMail("Enter your Email : ");
//    }
   
   
    
      await loggedIn(email)
    }
    catch(err){
        console.log(err);
    }
}
export {loginUser};