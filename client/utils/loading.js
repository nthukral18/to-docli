import {Spinner} from "cli-spinner";
function loading(msg){
    var spinner = new Spinner(msg);
    spinner.setSpinnerString("|/-\\");
    spinner.start();
    return spinner;
} 
export {loading};