// TODO: Export and implement the following functions in ES6 format

import { ObjectId } from "mongodb"
import { events } from "../config/mongoCollections.js"
import validator from "validator"


if(!ObjectId || typeof ObjectId !== 'function'){
  throw `Object ID is undefined or not imported properly`;
}
//import * as helpers from "./helpers.js";
//const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const prefixPattern = /^([a-zA-Z0-9]+([_\.-]?[a-zA-Z0-9]+)*)$/
const domainPattern = /^([a-zA-Z0-9-]+)+(\.[a-zA-Z]{2,})+$/
const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(20\d{2})$/
const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9](AM|PM)$/
const monthNames = [`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`];
const usStates = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA",
"MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];
const checkCreate = async(eventName, 
  eventDescription, 
  eventLocation, 
  contactEmail, 
  maxCapacity, 
  priceOfAdmission, 
  eventDate, 
  startTime, 
  endTime, 
  publicEvent)=>{
    const vallidStringCheck =(val) =>{
      if(typeof(val) !== 'string'){
        throw `Error -- Expected String but the given value :${val} and type of value is :${typeof(val)}`;
      }
      if(val.trim() === ""){
          throw `Error -- strings with only spaces are not valid `;
      }
  }
  //const checkValidEmail = contactEmail => mailRegex.test(contactEmail);
  const checkValidEmail = contactEmail => validator.isEmail(contactEmail);
  const checkValidEmailPrefixAndDomain = contactEmail =>{
    let [prefix,domain]=contactEmail.split("@");
    return prefixPattern.test(prefix) && domainPattern.test(domain);  
  }
  const daysInMonth=(month,year)=>{
    return new Date(year,month,0).getDate();
  }
  const checkValidDate = (eventDate) => {
    if(!dateRegex.test(eventDate)){
      return {isValid:false,error:`Error -- Given date: ${eventDate} is not in valid format or is not a real date.Please provide the date in MM/DD/YYYY`};
    }
    const [month,day,year]=eventDate.split('/').map(Number);
    if(day> daysInMonth(month,year)){
      return {isValid:false,error:`Error -- Please provide real date! as the given date: ${eventDate} is not valid as there are no :${day} days in ${monthNames[month-1]} of year: ${year}`};
    }
    const dateObject = new Date(year, month -1, day);
    if(!(dateObject && dateObject.getMonth()+1 === month && dateObject.getDate() === day && dateObject.getFullYear() === year)){
      return {isValid:false,error:`Error -- Given date :${eventDate} is not a valid date`};
    }
    return {isValid:true,error:null};

    //return dateObject && dateObject.getMonth()+1 === month && dateObject.getDate() === day && dateObject.getFullYear() === year;
  };
  const checkValidStartTime = time => timeRegex.test(time);
  const checkIfPreviousTime = (eventDate,time) =>{
    const [month,day,year] = eventDate.split('/').map(Number);
    const currentDate = new Date();
    const eventStartDAy = new Date(year, month-1,day);
    const eventEndDAy = new Date(year,month-1,day,23,59,59,999);
    if(eventEndDAy<currentDate){
      return true;//if the event day is in past
    }
    else if (eventStartDAy<=currentDate && eventEndDAy>= currentDate){//if the event day is today then check time
    const [givenHr,givenMin] = time.split(':');
    let [hr,min]=[parseInt(givenHr,10),parseInt(givenMin.substring(0,2),10)];
    if(time.includes('PM') && hr !== 12){
      hr +=12;
    }else if (time.includes('AM') && hr === 12){
      hr = 0;
    }
    const dateTime = new Date(year,month-1,day,hr,min,0,0);
    return dateTime <= new Date();

    }
    return false;//If the event day is in future
    

  }
  const timeToMinutes =(time) =>{
    const[hour,mint]=time.split(":");
    const minuteStr = mint.slice(0,2);
    const period = mint.slice(2).toUpperCase();
    const minute = parseInt(minuteStr,10);  
    let passedHrs = parseInt(hour,10);
    if(period === "PM" && passedHrs !== 12) passedHrs += 12;
    if(period === "AM" && passedHrs === 12) passedHrs = 0;

    return passedHrs * 60 + minute;
  };
  const checkValidStartEndTime =(startTime,endTime) =>{
    const startTimeInMinutes = timeToMinutes(startTime);
    const endTimeInMinutes = timeToMinutes(endTime);
    return startTimeInMinutes<endTimeInMinutes;
  };
  const checkEndTimeValidTime = (startTime,endTime) =>{
    const startTimeInMinutes1 = timeToMinutes(startTime);
    const endTimeInMinutes1 = timeToMinutes(endTime);
    if(endTimeInMinutes1<= startTimeInMinutes1){
      return false;
    }
    if(endTimeInMinutes1 - startTimeInMinutes1 <30){
      return false;
    }
    return true;
  };
    //const checkEndTimeValidTime //should handle ////The endTime cannot be earlier than the startTime, if it is, the method should throw.
    //and //The endTime should be at least 30 minutes later than the startTime, if it's not, the method should throw. 
    if(!eventName ||!eventDescription || !eventLocation || !contactEmail || !maxCapacity || maxCapacity === undefined || Number.isNaN(maxCapacity) ||priceOfAdmission === undefined || Number.isNaN(priceOfAdmission) ||!eventDate ||!startTime ||!endTime || publicEvent === undefined || publicEvent === null){
      throw `All fields need to have valid values`;
    }
    [eventName,eventDescription,contactEmail, eventDate, startTime, endTime].forEach(val =>{
      vallidStringCheck(val);
    });
    if(eventName.trim().length<5){
      throw `Error -- Given eventname: ${eventName} cannot be less than 5 characters`;
    }
    if(eventDescription.trim().length<25){
      throw `Error -- Given eventDescription: ${eventDescription} cannot be less than 25 characters`;
    }
    if(!checkValidEmail(contactEmail.trim())){
      throw`Error -- Given email: ${contactEmail} is not in a valid email address format`;
    }
    if(!checkValidEmailPrefixAndDomain(contactEmail.trim())){
      throw`Error -- Given email: ${contactEmail} doesn't have a valid prefix or domain`;
    }
    /*if(!checkValidDate(eventDate.trim())){
      throw `Error -- Given date: ${eventDate} is not a valid.Please provide the correct real date in format MM/DD/YYYY`;
    }*/
    const dateValidationResult = checkValidDate(eventDate.trim());
    if(!dateValidationResult.isValid){
      throw dateValidationResult.error;
    }
    /*if(new Date(eventDate.trim())<= new Date()){
      throw `Error -- Event date must be only future date`;
    }*/
    if(!checkValidStartTime(startTime.trim())){
      throw `Error --  startTime: ${startTime} must be a valid time in 12-hour AM/PM format for example "11:30PM"`;
    }
    if(checkIfPreviousTime(eventDate.trim(),startTime.trim())){
      throw `Error --  Given startTime: ${startTime} for date : ${eventDate.trim()} has already passed`;
    }
    if((startTime.trim()=== endTime.trim())){
      throw `Error -- The startTime: ${startTime} cannot be same as the endTime:${endTime}`;
    }
    //The startTime cannot be later than the endTime, if it is, the method should throw.
    if(!checkValidStartEndTime(startTime.trim(),endTime.trim())){
      throw `Error -- The startTime: ${startTime} cannot be later than the endTime:${endTime}`;
    }
    //The endTime must be a valid time in 12-hour AM/PM format "11:30PM":  If it's not in the expected format or not a valid time, the method should throw.
    if(!checkValidStartTime(endTime.trim())){
      throw `Error --  endTime: ${endTime} must be a valid time in 12-hour AM/PM format for example "11:30PM"`;
    }
     //The endTime should be at least 30 minutes later than the startTime, if it's not, the method should throw. 
    if(!checkEndTimeValidTime(startTime.trim(),endTime.trim())){
      throw `Error -- Given End time: ${endTime} should be at least 30 minutes later than the Start time: ${startTime}`;
    }
    //The endTime cannot be earlier than the startTime, if it is, the method should throw.
    if(!checkEndTimeValidTime(startTime.trim(),endTime.trim())){
      throw `Error --  endTime: ${endTime} cannot be earlier than the startTime ${startTime}`;
    }
    if(typeof(publicEvent)!== 'boolean'){
      throw `Error -- Given publicevent : ${publicEvent} is not of type boolean`;
    }
    //if maxCapacity, priceOfAdmission are not the expected type (numbers), the method should throw.
    if(typeof(maxCapacity) !== 'number'|| maxCapacity<=0 ||!Number.isInteger(maxCapacity)){
      throw `Error -- given maxCapacity :${maxCapacity} is not of type Number`;
    }
    if(typeof(priceOfAdmission)!== 'number'){
      throw `Error -- given Price of Admission: ${priceOfAdmission} is not of type Number`;
    }
    if(priceOfAdmission<0 ){
      throw `Error -- given Price of Admission: ${priceOfAdmission} cannot be negative`;
    }
    if(!Number.isInteger(priceOfAdmission) && !Number.isInteger(priceOfAdmission*100)){
      throw `Error -- given Price of Admission: ${priceOfAdmission} should have atmost 2 decimal places`;
    }
    //If eventLocation is not an object,  the method should throw. 
    if(typeof(eventLocation) !== 'object' || eventLocation=== null || Array.isArray(eventLocation)){
      throw `Error -- Eventlocation provided: ${eventLocation} is not of object type`;
    }
    const {streetAddress,city,state,zip} = eventLocation;
    //If eventLocation.streetAddress, eventLocation.city,  eventLocation.state,  eventLocation.zip  are not supplied, the method should throw.
    if(!streetAddress || !city || !state || !zip){
      throw `Error -- All properties (streetAddress,city,state,zip) of eventlocation must be supplied`;
    }
    //If eventLocation.streetAddress, eventLocation.city, eventLocation.state, eventLocation.zip  are not all valid strings, the method should throw.
    if(typeof(streetAddress)!== 'string'||!streetAddress.trim() || typeof(city)!== 'string'||!city.trim()|| typeof(state)!=='string'|| typeof(zip)!=='string'){
      throw `Error -- Some properties of eventlocation (streetAddress,city,state,zip) is missing or are not string type`;
    }
    //If eventLocation.streetAddress, is less than 3 characters, the method should throw.
    if(streetAddress.trim().length<3){
      throw `Error -- given streetAddress: ${streetAddress.trim()} is less than 3 characters`;
    }
    //If eventLocation.city, is less than 3 characters, the method should throw. 
    if(city.trim().length<3){
      throw `Error -- given city: ${city.trim()} is less than 3 characters`;
    }
    //eventLocation.state, Must be a valid two character state abbreviation "NY", "NJ" etc..
    if(!/^[A-Z]{2}$/.test(state.trim().toUpperCase())){
      throw `Error -- given state: ${state.trim()} is not valid instead it must be a valid two character state abbreviation "NY", "NJ" etc`;  
    }
    if(!usStates.includes(state.trim().toUpperCase())){
      throw `Error -- given state: ${state.trim()} is not a valid state`;
    }
    //If eventLocation.zip, is not a string that contains 5 numbers, the method should throw. (only 5 digit zip but represented as a string, because leading 0's are valid in zip codes, yet JS drops leading 0's)
    if(!/^\d{5}$/.test(zip.trim())){
      throw `Error -- Invalid zip code:${zip}`;
    }

  }
const create = async (
  eventName, 
  eventDescription, 
  eventLocation, 
  contactEmail, 
  maxCapacity, 
  priceOfAdmission, 
  eventDate, 
  startTime, 
  endTime, 
  publicEvent
) => {
  await checkCreate(eventName, eventDescription, eventLocation, contactEmail, maxCapacity, priceOfAdmission, eventDate, startTime, endTime, publicEvent)
  const {streetAddress,city,state,zip} = eventLocation;
  let eventCollection;
  try{
    eventCollection = await events();
  }catch(e){
    throw `Error -- Failed to connect to events due to :${e.message}`;
  }
  let event;
  let newEvent = {
      eventName: eventName.trim(), 
      description: eventDescription.trim(), 
      eventLocation:{
        streetAddress: streetAddress.trim(),
        city: city.trim(),
        state: state.trim().toUpperCase(),
        zip: zip.trim()
      },
      contactEmail: contactEmail.trim(), 
      maxCapacity,
      priceOfAdmission, 
      eventDate: eventDate.trim(), 
      startTime: startTime.trim(), 
      endTime: endTime.trim(), 
      publicEvent
    }

    const eventExists = await eventCollection.findOne({$and:[{eventName:eventName.trim()},{"eventLocation.streetAddress":streetAddress.trim()},{startTime:startTime.trim()}]});
    if(eventExists){
      event = "event Exists already"
      //event._id = event._id.toString();
      throw `Event already exists with the same details`;
    }
    const insertEvent = await eventCollection.insertOne(newEvent);
    if (!insertEvent.acknowledged || !insertEvent.insertedId){
      throw 'Could not add the event';
    }
    const newEventId = insertEvent.insertedId
    event = await eventCollection.findOne({_id: newEventId})
    event._id = event._id.toString();
    return event;
};

const getAll = async (...args) => {
  if(args.length>0){
    throw `Error -- The getAll func doesn't require any arguments`;
  }
  let eventdata;
  try{
    eventdata = await events();
  }catch(e){
    throw `Error -- Failed to connect to events due to :${e.message}`;
  }
  let eventCollectiongetArray;
  try{
    eventCollectiongetArray = await eventdata.find({}).toArray();
  }catch(e){
    throw `Error - Failed to fetch events due to :${e.message}`;
  }
  if(eventCollectiongetArray === null){
    throw `Error --- No event data found`;
  }
  eventCollectiongetArray.forEach(eachdId =>{
    if(!eachdId || !eachdId._id){
      throw `Error - Invalid eventid or it is missing`;
    }
    eachdId._id = eachdId._id.toString();
  });
  return eventCollectiongetArray;

};

const get = async (id) => {
  if(!id){
    throw`Error -- You must provide ID to search for`;
  }
  if(typeof(id.trim())!== 'string'){
    throw `Error -- ID provided is not of String type`;
  }
  if(id.trim().length === 0){
    throw `Error -- ID provided is empty and Id cannot be empty or just spaces`;
  }
  id = id.trim();
  if(!ObjectId.isValid(id)){
    throw `Error --- Invalid Object Id`;
  }
  let eventgetData;
  try{
    eventgetData = await events();
  }catch(e){
    throw `Error -- Failed to connect to events due to :${e.message}`;
  }
  let eventCollectionArray;
  try{
    eventCollectionArray = await eventgetData.findOne({_id:new ObjectId(id)});
  }catch(e){
    throw `Error - Failed to fetch events due to :${e.message}`;
  }
  if(eventCollectionArray === null){
    throw `Error --- No event found with the id :${id}`;
  }
  eventCollectionArray._id = eventCollectionArray._id.toString();

  return eventCollectionArray;

};

const remove = async (id) => {
  if(!id){
    throw`Error -- You must provide ID to search for`;
  }
  if(typeof(id.trim())!== 'string'){
    throw `Error -- ID provided is not of String type`;
  }
  if(id.trim().length === 0){
    throw `Error -- ID provided is empty and Id cannot be empty or just spaces`;
  }
  id = id.trim();
  if(!ObjectId.isValid(id)){
    throw `Error --- Invalid Object Id: ${id}`;
  }
  let eventforRemove;
  try{
    eventforRemove = await events();
  }catch(e){
    throw `Error -- Failed to connect to events due to :${e.message}`;
  }
  const existingEvent = await eventforRemove.findOne({_id: new ObjectId(id)});
  if(!existingEvent){
    throw `Error --- No event found for the given id : ${id}`;
  }
  const deleteEventIdResult = await eventforRemove.findOneAndDelete({_id:new ObjectId(id)});
  if(!deleteEventIdResult){
    throw `Error --- Could not Delete event with id of ${id}`;
  }
  if(deleteEventIdResult === null){
    throw `Error --- Could not Delete event with id of ${id}`;
  }
  return{eventName:deleteEventIdResult.eventName.trim(),deleted:true};
};

const rename = async (id, newEventName) => {
  if(!id){
    throw`Error -- You must provide ID to search for`;
  }
  if(typeof(id.trim())!== 'string'){
    throw `Error -- ID provided is not of String type`;
  }
  if(id.trim().length === 0){
    throw `Error -- ID provided is empty and Id cannot be empty or just spaces`;
  }
  id = id.trim();
  if(!ObjectId.isValid(id)){
    throw `Error --- Invalid Object Id: ${id}`;
  }
  if(!newEventName){
    throw`Error -- You must provide newEventName`;
  }
  if(typeof(newEventName)!== 'string'){
    throw `Error -- newEventName provided:${newEventName} is not of String type`;
  }
  if(newEventName.trim().length === 0){
    throw `Error -- newEventName provided: ${newEventName} is empty and newEventName cannot be empty or just spaces`;
  }
  if(newEventName.trim().length < 5){
    throw `Error -- newEventName provided: ${newEventName} is not valid !! It should be of atleast 5 characters`;
  }
  newEventName=newEventName.trim();
  let eventforRename;
  try{
    eventforRename = await events();
  }catch(e){
    throw `Error -- Failed to connect to events due to :${e.message}`;
  }
  const existingEvent = await eventforRename.findOne({_id: new ObjectId(id)});
  if(!existingEvent){
    throw `Error --- No event found for the given id : ${id}`;
  }
  if(existingEvent.eventName === newEventName){
    throw `Error --- The given new event name :${newEventName} is same as the existing event name for the id: ${id}`;
  }
  const updateName = {
    eventName:newEventName
  };
  const updateEvent = await eventforRename.findOneAndUpdate(
    {_id:new ObjectId(id)},
    {$set:updateName},
    {returnDocument:'after'
  });
  if(!updateEvent){
    throw `Error -- Could not update event successfully for this id:${id}`;
  }
  updateEvent._id = updateEvent._id.toString();
  return updateEvent;
};

export{create,getAll,get,remove,rename}