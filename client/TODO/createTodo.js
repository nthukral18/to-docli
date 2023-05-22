import fs from "fs/promises"
import readLineSync from "readline-sync"
import chalk from "chalk"
import { randomStringGenerator } from "../utils/randomString.js"
async function createTodo(email){
    try {

        console.clear()
        console.log(chalk.green("*************************************************"));
        console.log("\t\t create  todo \t\t");
        console.log(chalk.green("*************************************************"));
//     let fileData = await fs.readFile("data.json");
//     fileData = JSON.parse(data);
//   let userFound = fileData.find(ele => ele.email == email)
//   if(!userFound){
//     throw ("user not found")

//   }
  let toDoName = readLineSync.question("please enter a todo name : ")
while(!toDoName){
    toDoName = readLineSync.question("please enter a valid todo  : ")
} 
let toDoData = {
    toDoName
   
}

let token = await fs.readFile("authToken.txt")
token = token.toString()

let res = await axios.post("http://localhost:5000/api/todos/add",toDoData,{
    headers : {
        "auth-token" : token
    }
})
// userFound.todo.push(toDoData);
// await fs.writeFile("data.json",JSON.stringify(fileData));
console.log("task added successfully")
}
        catch(err){
            console.log(err);
        } 
    }

    export {createTodo}