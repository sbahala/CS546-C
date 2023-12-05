//import express, express router as shown in lecture code
import { ObjectId } from "mongodb";
import {Router} from 'express';
const router = Router();
import validator from "validator";
import { registerUser, loginUser} from "../data/users.js";
const nameRegex = /^[A-Za-z]+$/;
const prefixPattern = /^([a-zA-Z0-9]+([_\.-]?[a-zA-Z0-9]+)*)$/
const domainPattern = /^([a-zA-Z0-9-]+)+(\.[a-zA-Z]{2,})+$/
const UpperCase = /[A-Z]/;
const number = /[0-9]/;
const specialChar = /[^A-Za-z0-9]/;

const validateString = async (name, min,max,errMsg) =>{
  if(!name || typeof(name)!=='string'||name.trim().length === 0){
    throw{code:400,error: errMsg.empty};
  }
  if(name.length<min || name.length>max || !nameRegex.test(name.trim())){//check for the name with space condition
    throw{code:400,error: errMsg.invalid};  
  }
  return name.trim();
}

const validateEmail = async(emailAddress) =>{
  //console.log(emailAddress);
  emailAddress = emailAddress.trim().toLowerCase();
  if(!validator.isEmail(emailAddress)){
    throw{code:400,error:`Given email: ${emailAddress} is not in a valid email address format`}; 

  }
  let [prefix,domain]=emailAddress.split("@");
  if(!prefixPattern.test(prefix) || !domainPattern.test(domain)) {
    throw{code:400,error:`Given email: ${emailAddress} doesn't have a valid prefix or domain`}; 
  }
  return emailAddress;
}

const validatePassword = async (password)=>{
  //console.log(password);
  if(typeof(password)!=='string' || password.includes(' ') || password.length<8){
    throw{code:400,error:`Password must be valid String with no spaces and should be at least 8 characters long`}; 
  }
  if(!UpperCase.test(password) || !number.test(password) || !specialChar.test(password)){
    throw{code:400,error:`Password must contain at least one upperCase character, one number and one special character`}; 
  }
  return password;

}
const checkIfExistsForLogin = async(emailAddressInput,passwordInput)=>{
  if(!emailAddressInput && !passwordInput){
    throw{code:400,error:`Password must be provided`};
  }
  if(!emailAddressInput ){
    throw{code:400,error:`Email Address must be provided`};
  }
  if(!passwordInput){
    throw{code:400,error:`Password must be provided`};
  }
}

const checkIfExistsForRegister = async(firstNameInput,lastNameInput,emailAddressInput,passwordInput,confirmPasswordInput,roleInput)=>{
  if(!firstNameInput ||!lastNameInput || !emailAddressInput || !passwordInput || !confirmPasswordInput || !roleInput){
    throw{code:400,error:`All fields need to have valid values`};
  }
}
router.route('/').get(async (req, res) => {
  //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
  return res.json({error: 'YOU SHOULD NOT BE HERE!'});
});

/*router
.route('/')
.get(async (req, res) => {
  if (req.session.user){
    if(req.session.user.role === 'admin'){
      console.log("In admin");
      res.redirect('/admin');
    }else{
      console.log("In protected");
      res.redirect('/protected');
    }
  }else{
    console.log("In login");
    res.redirect('/login');
  }
});*/

router
  .route('/register')
  .get(async (req, res) => {
    //code here for GET
    //console.log("In Register");
    if(!req.session.register){
      return res.render('register',{title:"register",isRegisterPage:true});
    }
    if(req.session.user){
      return res.redirect(req.session.user.role === 'admin'?'/admin':'/protected');
    }
    return res.render('register',{title:"Register",isRegisterPage:true});   
  })
  .post(async (req, res) => {
    //code here for POST
    let registerDetails = req.body;
    let{firstNameInput,
      lastNameInput,
      emailAddressInput,
      passwordInput,confirmPasswordInput,
      roleInput} = registerDetails;
      try{
        await checkIfExistsForRegister(firstNameInput,lastNameInput,emailAddressInput,passwordInput,confirmPasswordInput,roleInput);
        if(passwordInput!==confirmPasswordInput){
          return res.status(400).render('register',{error:"Passwords doesn't match",title:"Register",isRegisterPage:true});
        }
        const firstNameErr = {empty:'First Name cannot be Empty', invalid:'Given First name is invalid'};
        const lastNameErr = {empty:'Last Name cannot be Empty', invalid:'Given Last name is invalid'};
        firstNameInput = await validateString(firstNameInput,2,25,firstNameErr);
        lastNameInput = await validateString(lastNameInput,2,25,lastNameErr);
        const emailAddress = await validateEmail(emailAddressInput);//check for case-insensitive
        const password = await validatePassword(passwordInput);
        const confirmPwd = await validatePassword(confirmPasswordInput);
        //await validateString(firstName,lastName,emailAddress,password,role);
        if(password!==confirmPwd){
          throw{code:400,error:`Password and Confirm password don't match`};
        }
        if(!['admin','user'].includes(roleInput.toLowerCase())){
          throw{code:400,error:'Role must be either "admin" or "user"'};
        }
        const result = await registerUser(firstNameInput,lastNameInput,emailAddress,password,roleInput);
        if(result.insertedUser){
          return res.redirect('/login');
        }else{
          return res.status(500).render('register',{error:`Internal Server Error`,title:"Register",isRegisterPage:true});
          //return res.redirect(`/error?code=500&error=Internal Server Error`); can be used for error page
        }
      }catch(e){
        console.log(e);
        return res.status(400).render('register',{error:e.error,title:"Register",isRegisterPage:true});
      }
  });



router
  .route('/login')
  .get(async (req, res) => {
    //code here for GET
    //console.log("In Login2");
    if(req.session.user){
      return res.redirect(req.session.user.role === 'admin'?'/admin':'/protected');
    }
    return res.render('login',{title:"login",isLoginPage:true});
  })
  .post(async (req, res) => {
    //code here for POST
   // console.log(req.body);
    const{emailAddressInput,passwordInput} = req.body;
    try{
      await checkIfExistsForLogin (emailAddressInput,passwordInput);
      const emailAddress = await validateEmail(emailAddressInput);
      //console.log("after to email");
      const passwordGiven= await validatePassword(passwordInput);
      //console.log("going to login");
      const loginDetails = await loginUser(emailAddress, passwordGiven);
      //console.log("out to login");
      if(!loginDetails){
        return res.status(400).render('login',{error:'Either the email address or password is invalid',title:"login"});
      }
      req.session.user= loginDetails;
      return res.redirect(req.session.user.role === 'admin'?'/admin':'/protected');

    }catch(e){
      //console.log("ji");
      //console.log(e);
      return res.status(400).render('login',{error:e.error,title:"login",isLoginPage:true});
    }


  });

router.route('/protected').get(async (req, res) => {
  //code here for GET
  if(!req.session.user){
    return res.redirect('/login');
  }
  const {firstName,lastName,role}=req.session.user;
  const isAdmin = role === "admin";
  return res.render('protected',{title:"Protected",isLoginPage:false,user:req.session.user,firstName:firstName,lastName:lastName,role:role,currentTime:new Date().toUTCString(),isAdmin:isAdmin});
});

router.route('/admin').get(async (req, res) => {
  //code here for GET
  if(!req.session.user || req.session.user.role!== 'admin'){
    return res.redirect('/login');
  }
  const {firstName,lastName}=req.session.user;
  return res.render('admin',{title:"Admin",isLoginPage:false,user:req.session.user,firstName:firstName,lastName:lastName,currentTime:new Date().toUTCString()});
});

router.route('/error').get(async (req, res) => {
  //code here for GET
  const code = req.query.code || 500;
  const description = req.query.error || "An unexpected error occurred.";
  res.status(code).render('error',{
    title:"Error",code:code,description:description,searchPage:false
  });
  //return res.render('error',{title:"error"});
});

router.route('/logout').get(async (req, res) => {
  //code here for GET
  //req.session.destroy();
  //res.redirect('/login');
  req.session.destroy(()=>{
    res.render('logout',{title:"LogoutPage",isLoginPage:false,message:"You have been successfully logged out.", homeLink:"/"});
  });
});


export default router;
