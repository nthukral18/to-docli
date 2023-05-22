import {body,validationResult} from "express-validator"

function userRegisterValidation(){
    return[
        body("username","username cannot be empty").notEmpty().isLength({min :2}),
        body("email","email is invalid").isEmail(),
        body("phone","not valid").isMobilePhone(),
        body("address","address cant be empty").notEmpty().isLength({min : 5 , max :49}),
        body("password","cant be empty").notEmpty().isLength({min : 8}),
        body("confirmPassword").custom((value , {req})=>{
            if(value !== req.body.password){
            throw new Error("password is not matching")
        }
        return true})
    ]
}
function userLoginValidation(){
    return[
        body("email","email not valid").isEmail(),
        body("password","password is required").notEmpty()
    ]
}
function errorMiddleWare(req,res,next){
    const err = validationResult(req);
    if(!err.isEmpty()){
        return res.status(400).json({errors : err.array()})
    }
    return next()
}

export { userRegisterValidation,errorMiddleWare,userLoginValidation}