// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import { ObjectId } from "mongodb";
import {Router} from 'express';
const router = Router();
import validator from "validator";
import events from '../data/events.js';
import attendees from '../data/attendees.js';

///
const checkId = async(id, varName) =>{
  if (!id) throw `Error: You must provide a ${varName}`;
  if (typeof id !== 'string') throw `Error:${varName} must be a string`;
  id = id.trim();
  if (id.length === 0)
    throw `Error: ${varName} cannot be an empty string or just spaces`;
  if (!ObjectId.isValid(id)) throw `Error: ${varName} invalid object ID`;
  return id;
}
const prefixPattern = /^([a-zA-Z0-9]+([_\.-]?[a-zA-Z0-9]+)*)$/
const domainPattern = /^([a-zA-Z0-9-]+)+(\.[a-zA-Z]{2,})+$/
const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(20\d{2})$/
const timeRegex = /^([1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/
const monthNames = [`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`];
const usStates = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA",
"MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];
const checkCreate = async(eventName, 
  description, 
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
    /*const minuteStr = mint.slice(0,2);
    const period = mint.slice(2).toUpperCase();
    const minute = parseInt(minuteStr,10);  */
    const minute = parseInt(mint.substr(0,2),10);
    const period = mint.substr(3).toUpperCase();

    
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
    if(!eventName ||!description || !eventLocation || !contactEmail || !maxCapacity || maxCapacity === undefined || Number.isNaN(maxCapacity) ||priceOfAdmission === undefined || Number.isNaN(priceOfAdmission) ||!eventDate ||!startTime ||!endTime || publicEvent === undefined || publicEvent === null){
      throw `All fields need to have valid values`;
    }
    [eventName,description,contactEmail, eventDate, startTime, endTime].forEach(val =>{
      vallidStringCheck(val);
    });
    if(eventName.trim().length<5){
      throw `Error -- Given eventname: ${eventName} cannot be less than 5 characters`;
    }
    if(description.trim().length<25){
      throw `Error -- Given eventDescription: ${description} cannot be less than 25 characters`;
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
      throw `Error --  startTime: ${startTime} must be a valid time in 12-hour AM/PM format for example "11:30 PM"`;
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
      throw `Error --  endTime: ${endTime} must be a valid time in 12-hour AM/PM format for example "11:30 PM"`;
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

///
router
  .route('/')
  .get(async (req, res) => {
    try{
      const eventList = await events.getAll();
      return res.json(eventList);
    }catch(e){
      return res.status(500).json({error: e});
    }
    //code here for GET
  })
  .post(async (req, res) => {
    const eventData = req.body;
    if (!eventData || Object.keys(eventData).length === 0) {
      return res.status(400).json({error: 'There are no fields in the request body'});
    }
    try{
      //check for json body 
      const bodyKeys = Object.keys(req.body);
      const reqKeys = ['eventName','description','eventLocation','contactEmail','maxCapacity','priceOfAdmission','eventDate','startTime','endTime','publicEvent'];
      const hasKeys = reqKeys.every(key=>bodyKeys.includes(key));
      const hasNoExtraKeys = bodyKeys.every(key =>reqKeys.includes(key));
      if(!hasKeys || !hasNoExtraKeys){
        throw `Error -- Json Body doesn't match the expected Schema`;
      }
      //
      //checking the inputs and if error should return with 400
      //req.params.id = await checkId(req.params.id, 'ID url param');
      const {eventName,
        description,
        eventLocation,
        contactEmail,
        maxCapacity,
        priceOfAdmission,
        eventDate,
        startTime,
        endTime,
        publicEvent} = eventData;
        await checkCreate(eventName,
          description,
          eventLocation,
          contactEmail,
          maxCapacity,
          priceOfAdmission,
          eventDate,
          startTime,
          endTime,
          publicEvent)
    }catch(e){
      return res.status(400).json({error: e});
    }
    try{
      const {eventName,
        description,
        eventLocation,
        contactEmail,
        maxCapacity,
        priceOfAdmission,
        eventDate,
        startTime,
        endTime,
        publicEvent} = eventData;
          //insert the event
          const newEvent = await events.create(eventName,
            description,
            eventLocation,
            contactEmail,
            maxCapacity,
            priceOfAdmission,
            eventDate,
            startTime,
            endTime,
            publicEvent);
            return res.json(newEvent);
    }catch(e){
      return res.status(500).json({error: e});
    }
    //code here for POST
  });

router
  .route('/:id')
  .get(async (req, res) => {
    //code here for GET
    try {
      req.params.id = await checkId(req.params.id, 'Id URL Param');
    } catch (e) {
      return res.status(400).json({error: e});
    }
    //try getting the event by ID
    try {
      const post = await events.get(req.params.id);
      return res.json(post);
    } catch (e) {
      return res.status(404).json({error: e});
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    //check the id
    try {
      req.params.id = await checkId(req.params.id, 'Id URL Param');
    } catch (e) {
      return res.status(400).json({error: e});
    }
    //try to delete event
    try {
      let deletedPost = await events.remove(req.params.id);
      return res.json(deletedPost);
    } catch (e) {
      return res.status(404).json({error: e});
    }
  })
  .put(async (req, res) => {
    //code here for PUT
    const updatedData = req.body;
    //make sure there is something in the req.body
    if (!updatedData || Object.keys(updatedData).length === 0) {
      return res
        .status(400)
        .json({error: 'There are no fields in the request body'});
    }
    try{
      req.params.id = await checkId(req.params.id, 'ID url param');
      const bodyKeys = Object.keys(req.body);
      const reqKeys = ['eventName','description','eventLocation','contactEmail','maxCapacity','priceOfAdmission','eventDate','startTime','endTime','publicEvent'];
      const hasKeys = reqKeys.every(key=>bodyKeys.includes(key));
      const hasNoExtraKeys = bodyKeys.every(key =>reqKeys.includes(key));
      if(!hasKeys || !hasNoExtraKeys){
        throw `Error -- Json Body doesn't match the expected Schema`;
      }
      //const eventData = req.body;
      const {eventName,
        description,
        eventLocation,
        contactEmail,
        maxCapacity,
        priceOfAdmission,
        eventDate,
        startTime,
        endTime,
        publicEvent} = updatedData;
        await checkCreate(eventName,
          description,
          eventLocation,
          contactEmail,
          maxCapacity,
          priceOfAdmission,
          eventDate,
          startTime,
          endTime,
          publicEvent)
    }catch(e){
      //console.log(e);
      return res.status(400).json({error: e});
    }
    //try to update the post
    try {
      const {eventName,
        description,
        eventLocation,
        contactEmail,
        maxCapacity,
        priceOfAdmission,
        eventDate,
        startTime,
        endTime,
        publicEvent} = updatedData;
      const updatedEvent = await events.update(
        req.params.id,
        eventName,
        description,
        eventLocation,
        contactEmail,
        maxCapacity,
        priceOfAdmission,
        eventDate,
        startTime,
        endTime,
        publicEvent
        //updatedData
      );
      return res.json(updatedEvent);
    } catch (e) {
      //console.log(e);
      return res.status(404).json({error: e});
    }
  });
export default router;