// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import validator from "validator";
import { ObjectId } from "mongodb";
import {Router} from 'express';
const router = Router();
import events from '../data/events.js';
import attendees from '../data/attendees.js';

const prefixPattern = /^([a-zA-Z0-9]+([_\.-]?[a-zA-Z0-9]+)*)$/
const domainPattern = /^([a-zA-Z0-9-]+)+(\.[a-zA-Z]{2,})+$/
const nameregex = /^[a-zA-Z\s'-\u00C0-\u017F]+$/
const invaliregex = /[\d~`!@#$%^&*()_+={}[\]|\\:;"<>,.?]/
const eventcheckId = async(id) =>{
  //id = await checkID(id);
  let eventExists = await events.get(id);
  if(!eventExists){
    return res.status(404).json(`No such event with the id:  ${id}`);  
  }
  return id;
}

const attendeecheckId = async(id) =>{
  //id = await checkID(id);
  let attendeesExists = await attendees.getAttendee(id);
  if(!attendeesExists){
    return res.status(404).json(`No such attendeesExists with the id:  ${id}`);  
  }
  return id;
}
const checkString = async (strVal, varName) =>{
  if (!strVal) throw `Error: You must supply a ${varName}!`;
  if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
  strVal = strVal.trim();
  if (strVal.length === 0)
    throw `Error: ${varName} cannot be an empty string or string with just spaces`;
  if (!isNaN(strVal))
    throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
  return strVal;
}
const checkValidString = async(name,type)=>{
  if(type === 'first' && name.split(' ').length>1){
    throw `Error -- First name provided: ${name} cannot have more than one value`;
  }
  if(type === 'last' && name.split(' ').length>1){
    throw `Error -- Last name provided: ${name} cannot have more than one value`;
  }
  if(!nameregex.test(name) || invaliregex.test(name)){
    throw `Name provided :${name} contains invalid characters`;
  }
  return name;

}
const checkAttendee = async(firstName, lastName, emailAddress) =>{
  if(!firstName ||!lastName || !emailAddress){
    throw `All fields need to have valid values`;
  }
  firstName = firstName.trim();
  lastName = lastName.trim();
  firstName = await checkString(firstName, 'First name');
  firstName = await checkValidString(firstName,'first');
  lastName = await checkString(lastName, 'Last name');
  lastName = await checkValidString(lastName,'last');
  // what if middle name exists - 
  //check for a valid name logic - done 
  const checkValidEmail = emailAddress => validator.isEmail(emailAddress);
  const checkValidEmailPrefixAndDomain = emailAddress =>{
    let [prefix,domain]=emailAddress.split("@");
    return prefixPattern.test(prefix) && domainPattern.test(domain);  
  }
  if(!checkValidEmail(emailAddress.trim())){
    throw`Error -- Given email: ${emailAddress} is not in a valid email address format`;
  }
  if(!checkValidEmailPrefixAndDomain(emailAddress.trim())){
    throw`Error -- Given email: ${emailAddress} doesn't have a valid prefix or domain`;
  }
}

const checkID = async(id)=>{
    if (!id) throw `Error: You must provide an id`;
    if (typeof id !== 'string') throw `Error:id must be a string`;
    id = id.trim();
    if (id.length === 0)
      throw `Error: id cannot be an empty string or just spaces`;
    if (!ObjectId.isValid(id)) throw `Error: invalid object ID`;
    return id;
}
router
  .route('/:eventId')
  .get(async (req, res) => {
    //code here for GET
    try{
      req.params.eventId = await checkID(req.params.eventId);
    }catch(e){
      return res.status(400).json(e);
    }
    try{
      req.params.eventId = await eventcheckId(req.params.eventId);
    }catch(e){
      return res.status(404).json(e);
    }
    try{
      //req.params.eventId = await eventcheckId(req.params.eventId);
      const getAllEventbyId = await attendees.getAllAttendees(req.params.eventId);
      return res.json(getAllEventbyId);
    }catch(e){
      return res.status(404).json(e);
    }
  })
  .post(async (req, res) => {
    //code here for POST
    //checking valid eventid
    try{
      req.params.eventId = await checkID(req.params.eventId);
      //const attendeesData = req.body;
      //const{_id} = attendeesData;
      //await checkID(_id);
    }catch(e){
      return res.status(400).json(e);
    }
    //check if event id exists
    try{
      let eventcheckId = await events.get(req.params.eventId);
      if(!eventcheckId){
        throw 'No such events exists with the given id to add attendees';
      }
      /*const attendeesData = req.body;
      const{_id} = attendeesData;
      let passedEventid = await events.get(_id);
      if(!passedEventid){
        throw 'No such events exists with the given id to add attendees';
      }*/
    }catch(e){
      return res.status(404).json(e);
    }
    try{
      const attendeesData = req.body;
      const{firstName,lastName,emailAddress} = attendeesData;
      //check for json body 
      const bodyKeys = Object.keys(req.body);
      const reqKeys = ['firstName','lastName','emailAddress'];
      const hasKeys = reqKeys.every(key=>bodyKeys.includes(key));
      const hasNoExtraKeys = bodyKeys.every(key =>reqKeys.includes(key));
      if(!hasKeys || !hasNoExtraKeys){
        throw `Error -- Json Body doesn't match the expected Schema`;
      }
      //
      await checkAttendee(firstName, lastName, emailAddress);//make sure to modify the check Attendee and rework
    }catch(e){
      return res.status(400).json(e);
    }
    try{
      const attendeesData = req.body;
      const{firstName,lastName,emailAddress} = attendeesData;
      const createAttendee = await attendees.createAttendee(req.params.eventId,firstName,lastName,emailAddress);
      return res.json(createAttendee);
    }catch(e){
      return res.status(400).json(e);
    }
    /*try{
      req.params.eventId = await eventcheckId(req.params.eventId);
      const attendeesData = req.body;
      const{firstName,lastName,emailAddress} = attendeesData;
      await checkAttendee(firstName, lastName, emailAddress);//make sure to modify the check Attendee and rework 
      const createAttendee = await attendees.createAttendee(req.params.eventId,firstName,lastName,emailAddress);
      return res.json(createAttendee);
    }catch(e){
      console.log(e);
      return res.status(400).json(e);
    }*/
  });

router
  .route('/attendee/:attendeeId')
  .get(async (req, res) => {
    //code here for GET
    //check if valid attendee id
    try{
      req.params.attendeeId = await checkID(req.params.attendeeId);
    }catch(e){
      return res.status(400).json(e);
    }
    //below code handles is not attendee found and throws it 
    try{
      req.params.attendeeId = await checkID(req.params.attendeeId);
      const getAttendee = await attendees.getAttendee(req.params.attendeeId);
      return res.json(getAttendee);
    }catch(e){
      return res.status(404).json(e);
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    //check for a valid attendee id
    try{
      req.params.attendeeId = await checkID(req.params.attendeeId);
    }catch(e){
      return res.status(400).json(e);
    }
    //check if the given attendee exists
    try{
      req.params.attendeeId = await attendeecheckId(req.params.attendeeId);
    }catch(e){
      return res.status(404).json(e);
    }
    //checks if  attendee id found or not and also checks for other errors
    try{
      req.params.attendeeId = await checkID(req.params.attendeeId);
      const getDeleteAttendee = await attendees.removeAttendee(req.params.attendeeId);
      return res.json(getDeleteAttendee);
    }catch(e){
      return res.status(404).json(e);     
    }
  });

  export default router;
