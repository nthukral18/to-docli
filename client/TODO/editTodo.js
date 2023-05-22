import fs from "fs/promises"
import readLineSync from "readline-sync"
import chalk from "chalk"
import { randomStringGenerator } from "../utils/randomString.js"
import { read } from "fs"
async function editTodo(email){
    try {

        console.clear()
        console.log(chalk.green("*************************************************"));
        console.log("\t\t edit  todo \t\t");
        console.log(chalk.green("*************************************************"));
    let fileData = await fs.readFile("data.json");
    fileData = JSON.parse(data);
  let userFound = fileData.find(ele => ele.email == email)
  if(!userFound){
    throw ("user not found")

  }

  let toDoId = readLineSync.question("pls enter todo id")

  let taskFound = userFound.todo.find(ele=>ele.taskID == toDoId);
  if(!taskFound){
    console.log("task was not found")
    return
  }
  let option = readLineSync.questionInt("enter 1 to change name","enter 2 to change status of task")
if(option == 1){
    let newTaskName = readLineSync.question("please enter new name")
    taskFound.toDoName = newTaskName;
} 
else if(option == 2){
let newStatus = readLineSync.question("enter y/yes for completed task");
if (newStatus == 'y' || newStatus == 'Y' || newStatus == "yes" || newStatus == "Yes"){
    taskFound.isCompleted = true;
}
}
else{
    console.log("not found");
    return
}


await fs.writeFile("data.json",JSON.stringify(fileData));
console.log("task edited successfully")
}
        catch(err){
            console.log(err);
        } 
    }

    export {editTodo}