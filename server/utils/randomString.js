function randomStringGenerator(size){
   
        
        let consonantNum =  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let strLen2 = consonantNum.length;
        let str2 = "";
        for(let i = 0 ;i<size;i++){
            str2 += consonantNum[Math.floor(Math.random()*strLen2)];
        }
        return str2;
    }


export { randomStringGenerator}