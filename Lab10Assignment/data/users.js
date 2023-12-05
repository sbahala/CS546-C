//import mongo collections, bcrypt and implement the following data functions
import {users as userCollection} from '../config/mongoCollections.js';
import bcrypt from 'bcryptjs';
import validator from "validator";
import { ObjectId } from "mongodb";
const users = await userCollection();
const saltRounds = 16;
const nameRegex = /^[A-Za-z]+$/;
const prefixPattern = /^([a-zA-Z0-9]+([_\.-]?[a-zA-Z0-9]+)*)$/
const domainPattern = /^([a-zA-Z0-9-]+)+(\.[a-zA-Z]{2,})+$/
const UpperCase = /[A-Z]/;
const number = /[0-9]/;
const specialChar = /[^A-Za-z0-9]/;

const validateString = async (name, min,max,errMsg) =>{
  if(!name || typeof(name)!=='string'|| name.trim().length === 0){
    throw{code:400,error: errMsg.empty};
  }
  if(name.length<min || name.length>max || !nameRegex.test(name.trim())){//check for the name with space condition
    throw{code:400,error: errMsg.invalid};  
  }
  return name.trim();
}

const validateEmail = async(emailAddress) =>{
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

const checkIfExistsForRegister = async(emailAddress,password)=>{
  if(!emailAddress ||!password){
    throw{code:400,error:`Fields  emailAddress or password needs to have valid values`};
  }
}
export const registerUser = async (
  firstName,
  lastName,
  emailAddress,
  password,
  role
) => {
  const firstNameErr = {empty:'First Name cannot be Empty', invalid:'Given First name is invalid'};
  const lastNameErr = {empty:'Last Name cannot be Empty', invalid:'Given Last name is invalid'};
  if(!firstName && !lastName && !emailAddress && !password && !role){
    throw{code:400,error:'All field values must be supplied'};

  }
  if(!firstName || !lastName || !emailAddress || !password || !role){
    throw{code:400,error:'All field values must be supplied'};

  }
  firstName = await validateString(firstName,2,25,firstNameErr);
  lastName = await validateString(lastName,2,25,lastNameErr);
  await checkIfExistsForRegister(emailAddress,password);
  emailAddress = await validateEmail(emailAddress);
  password = await validatePassword(password);
  if(!['admin','user'].includes(role.toLowerCase())){
    throw{code:400,error:'Role must be either "admin" or "user"'};
  }
  const userDetails = await userCollection();
  let existingUser = await userDetails.findOne({emailAddress:emailAddress});
  if(existingUser){
    throw{code:400,error:'User with the email address already exists'};
  }
  let hashedPassword = await bcrypt.hash(password,saltRounds);
  let newUser = {
    _id:new ObjectId(),
    firstName,
    lastName,
    emailAddress,
    password:hashedPassword,
    role:role.toLowerCase()
  };
  let insertedUser = await userDetails.insertOne(newUser);
  if(insertedUser.insertedCount === 0){
    throw{code:400,error:'Unable to register User'};
  }
  return{insertedUser: true};

};

export const loginUser = async (emailAddress, password) => {
  if(!emailAddress && !password){
    throw{code:400,error:'All field values must be supplied'};
  }
  if(!emailAddress || !password){
    throw{code:400,error:'All field values must be supplied'};
  }
  await checkIfExistsForLogin (emailAddress,password);
  emailAddress = await validateEmail(emailAddress);
  password= await validatePassword(password);
  const userData = await userCollection();//sbahala@stevens.edu
  //console.log(emailAddress);
  //console.log(userData);
  let userRecord = await userData.findOne({emailAddress:emailAddress});
  if(!userRecord){
    //console.log("no data found");
    throw{code:400,error:'Either the email address or password is invalid'};
  }
  //console.log(password)
  //console.log(userRecord.password)

  let matchPwd = await bcrypt.compare(password,userRecord.password);
  if(!matchPwd){
    throw{code:400,error:'Either the email address or password is invalid'};
  }
  return{
    firstName:userRecord.firstName,
    lastName:userRecord.lastName,
    emailAddress:userRecord.emailAddress,
    role:userRecord.role
  };
};
