import fs from "fs/promises"
import readLineSync from "readline-sync"
import chalk from "chalk"

async function userRegister() {
    try {
        console.clear()
        console.log(`
   ====================================\n
   \tUser Register\n 
   ====================================`);
        let username = readLineSync.question("Enter your Name : ");
        while(!username){
            username = readLineSync.question("Please enter the username : ");
        }
        let email = readLineSync.questionEMail("Enter your Email : ");

        let password = readLineSync.question("Enter your password : ", {hideEchoBack : true})

        let confirmPassword = readLineSync.question("Enter your password : ", {hideEchoBack : true});
        while(password !== confirmPassword){
            console.log("pass dont match");
            password = readLineSync.question(" please re-Enter your password : ", {hideEchoBack : true});
            confirmPassword = readLineSync.question("confirm your pass",{hideEchoBack : true})
        }

        let phone = readLineSync.question("Enter your number : ");
        let address = readLineSync.question("Enter your address : ");

        let data = await fs.readFile("data.json");
         
        data = JSON.parse(data);
        let emailFound = data.find(ele => ele.email == email)
          if(emailFound){
            throw "user already exists"
          }

          let userData = {
            username,
            email,
            password,
            phone,
            address
          }
          data.push(userData);

          await fs.writeFile("data.json",JSON.stringify(data))
    } catch (error) {
        console.log(error);
    }
}

export {userRegister}