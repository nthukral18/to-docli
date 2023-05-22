import fs from "fs/promises"
import readLineSync from "readline-sync"
import chalk from "chalk"
import { setTimeout } from "timers/promises"
import { loading } from "../utils/loading.js"
import { createTodo } from "./createTodo.js"
import { editTodo } from "./editTodo.js"
import { getTodo } from "./getTodo.js"
async function loggedIn(){
    try {

        console.clear()
        console.log(chalk.green("*************************************************"));
        console.log("\t\t user todo \t\t");
        console.log(chalk.green("*************************************************"));
        const options = [
            "Exit The Program", 'create a TODO', 'Get all todo', 'edit a todo'
        ]
        options.forEach((ele, i) => console.log(`Enter ${i} To ${ele} `))
        console.log(chalk.green("*************************************************"));
        const option = readLineSync.questionInt("Enter your option from the above menu : ")
        if (option < 0 || option >= options.length) {
            let spinner = loading("Invalid Option.Please Try Again. Redirecting to menu ....")
            await setTimeout(5000)
            spinner.stop("clean")
            return loggedIn()
        } else {
            switch (option) {
                case 0:
                    console.log("Exiting , Bye")
                    return;
                case 1:
                    await createTodo(email);
                    
                    break;
                case 2:
                    await getTodo();
                    //await loginUser();
                    break;
                case 3:
                    await editTodo(email);
                    break;
            }
            var willContinue = readLineSync.question("Do you want to Continue? (Y/N) : ");
            if (willContinue == 'y' || willContinue == 'Y' || willContinue == "yes" || willContinue == "Yes") {
                let spinner = loading("Redirecting to menu ....")
                await setTimeout(2000)
                spinner.stop()
                return loggedIn(email)
            } else {
                console.log(chalk.bgGreenBright("Thank you for Using our application , See You Again!"))
            }
        }
    } catch (error) {
        console.log(error);
    }
}
export {loggedIn}