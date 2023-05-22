import fs from "fs/promises"
import readLineSync from "readline-sync"
import chalk from "chalk"

async function getTodo(){
    try {

        console.clear()
        console.log(chalk.green("*************************************************"));
        console.log("\t\t get all  todo \t\t");
        console.log(chalk.green("*************************************************"));
    let fileData = await fs.readFile("data.json");
    fileData = JSON.parse(data);

}
    catch(err){
        console.log(err);
    }
}
export {getTodo}