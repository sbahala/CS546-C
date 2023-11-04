// This data file should export all functions using the ES6 standard as shown in the lecture code
import { ObjectId } from "mongodb";
import { events } from "../config/mongoCollections.js";
import validator from "validator";
import eventsData from "./events.js";

const prefixPattern = /^([a-zA-Z0-9]+([_\.-]?[a-zA-Z0-9]+)*)$/
const domainPattern = /^([a-zA-Z0-9-]+)+(\.[a-zA-Z]{2,})+$/
const nameregex = /^[a-zA-Z\s'-\u00C0-\u017F]+$/
const invaliregex = /[\d~`!@#$%^&*()_+={}[\]|\\:;"<>,.?]/
const checkId = async(id, varName) =>{
  if (!id) throw `Error: You must provide a ${varName}`;
  if (typeof id !== 'string') throw `Error:${varName} must be a string`;
  id = id.trim();
  if (id.length === 0)
    throw `Error: ${varName} cannot be an empty string or just spaces`;
  if (!ObjectId.isValid(id)) throw `Error: ${varName} invalid object ID`;
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
const createAttendee = async (eventId, firstName, lastName, emailAddress) => {
  if(!firstName ||!lastName || !emailAddress){
    throw `All fields need to have valid values`;
  }
  //Implement Code here
  await checkId(eventId, "Event Id");
  //implement check functionality for all the values firstName, lastName, emailAddress
  await checkAttendee(firstName, lastName, emailAddress);
  let eventDetails;
  try{
    eventDetails = await events();
  }catch(e){
    throw `Error -- Failed to connect to events due to :${e.message}`;
  }
  let attendeeData = {
    _id: new ObjectId(),
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    emailAddress: emailAddress.trim()
  }
  let eventWithoutAttendee = await eventsData.get(eventId);
  if(!eventWithoutAttendee){
    throw 'No such events exists with the given id to add attendees';
  }

  let existingAttendee = await eventsData.get(eventId);
  if(existingAttendee.attendees.some(element =>element.emailAddress === emailAddress)){
    throw `Attendee with the emailaddress :${emailAddress} already exists for this event`;
  }
  const nextAttendeeNumber = eventWithoutAttendee.totalNumberOfAttendees +1;
  if(nextAttendeeNumber > eventWithoutAttendee.maxCapacity){
    throw `The event is already full and we cannot allow an attendee no: ${nextAttendeeNumber} , as our event max capacity is:${eventWithoutAttendee.maxCapacity}`;
  }
  let result = await eventDetails.updateOne({_id: new ObjectId(eventId)}, {$addToSet:{attendees: attendeeData}})
  if(result.modifiedCount === 0){
    throw 'Unable to add attendees to the event';
  }

  let eventWithAttendee = await eventsData.get(eventId);
  if(!eventWithAttendee){
    throw 'No such events exists with the given id after adding attendees';
  }

  //here code to update the number of attendees
  let updatedAttendeCounts = eventWithAttendee.attendees.length;
  if(updatedAttendeCounts){
    result = await eventDetails.updateOne({_id: new ObjectId(eventId)},{$set:{totalNumberOfAttendees:updatedAttendeCounts}})
    if(result.modifiedCount === 0){
      throw ' Unable to update the totalNumberof Attendees for the event';
    }
  }
  eventWithAttendee = await eventsData.get(eventId);
  if(!eventWithAttendee){
    throw 'Unable to get the event details after updating the eventAttendees';
  }
  eventWithAttendee._id = eventWithAttendee._id.toString()
  eventWithAttendee.attendees.forEach(element => {
    element._id = element._id.toString(); 
  });
  return eventWithAttendee;
};

const getAllAttendees = async (eventId) => {
  //Implement Code here
  await checkId(eventId,"Event Id");
  const eventDataWithAttendee = await eventsData.get(eventId)
  if(!eventDataWithAttendee){
    throw `No such event exists with the id: ${eventId} to display attendees`;
  }
  if(eventDataWithAttendee.attendees.length === 0){
    return [];
    //throw ` No attendees with the given event id: ${eventId}`;
  }
  eventDataWithAttendee.attendees.forEach(element =>{
    element._id = element._id.toString();
  });
  return eventDataWithAttendee.attendees;
};

const getAttendee = async (attendeeId) => {
  //Implement Code here
  await checkId(attendeeId,"Attendee Id");
  let eventgetDetails = await events();
  const attendeeData = await eventgetDetails.aggregate([
    {$unwind:"$attendees"},
    {$match:{"attendees._id": new ObjectId(attendeeId)}},
    {$replaceRoot:{newRoot:"$attendees"}}
  ]).toArray();
  if(attendeeData.length === 0){
    throw `Attendee with the give id :${attendeeId} not found`;
  }
  attendeeData[0]._id = attendeeData[0]._id.toString();
  return attendeeData[0];
};

//below is my back up code which I am not using and I have also not exported
const removeAttendee_bk = async (attendeeId) => {
  //Implement Code here
  attendeeId = await checkId(attendeeId,"Attendee Id");
  let forRemoveAttendeeData = await events();

  //logic to check if the id exists
  const checkdeletionId = await forRemoveAttendeeData.findOne({
    //_attendeeId: new ObjectId(attendeeId)
    "attendees._id": new ObjectId(attendeeId)
  });
  if(!checkdeletionId){
    throw `No attendee found with the id: ${attendeeId}`;
  }
  //logic to delete 
  /*const deletionInfo = await forRemoveAttendeeData.findOneAndDelete({
    //_attendeeId: new ObjectId(attendeeId)
    "attendees._id": new ObjectId(attendeeId)
  });
  console.log(deletionInfo);*/
  //logic ends
  //logic to pull and delete
  const deleteAttendee = await forRemoveAttendeeData.updateOne(
    {_id:checkdeletionId._id},
    {$pull:{attendees:{_id:new ObjectId(attendeeId)}}}
    );

  if (deleteAttendee.modifiedCount === 0 ) {
    throw `Error: Could not delete user with id of ${attendeeId}`;
  }
  let forRemoveAttendeeList = await forRemoveAttendeeData.find({}).toArray()
  let deletedAttendeeId, isDeleted, eventId;
  let removeResult
  for(const x of forRemoveAttendeeList){
    for (const y of x.attendees){
      if(y._id.toString() === attendeeId){
        removeResult = await forRemoveAttendeeData.updateMany({},{$pull:{attendees:{_id: new ObjectId(attendeeId)}}})
        if(removeResult.modifiedCount === 0){
          throw `Unable to delete the attendee with given attendee ID: ${attendeeId}`;
        }
        deletedAttendeeId = attendeeId;
        isDeleted = true;
        eventId= x._id.toString();
      }
    }
  }
  if(isDeleted === false){
    throw `No attendee found with that id :${attendeeId}`;
  }
  await checkId(eventId,"Event Id");
  const updatedEventBeforeDeletion = await eventsData.get(eventId);

  const updatedAttendeCountsDelete = updatedEventBeforeDeletion.attendees.length;
  if(updatedAttendeCountsDelete){
    removeResult = await forRemoveAttendeeData.updateOne({_id: new ObjectId(eventId)},{$set:{totalNumberOfAttendees:updatedAttendeCountsDelete}})
    if(removeResult.modifiedCount === 0){
      throw ' Unable to update the totalNumberof Attendees for the event after delete';
    }
  }
  const updatedEventAfterDeletion = await eventsData.get(eventId);
  if(!updatedEventAfterDeletion){
    throw `Error fetching updated event data after attendee removal`;
  }
  //logic to update the total number of atendee
  return updatedEventAfterDeletion;

};


const removeAttendee = async (attendeeId) => {
  //Implement Code here
  attendeeId = await checkId(attendeeId,"Attendee Id");
  let forRemoveAttendeeData = await events();

  //logic to check if the id exists
  const checkEventdeletionId = await forRemoveAttendeeData.findOne({
    //_attendeeId: new ObjectId(attendeeId)
    "attendees._id": new ObjectId(attendeeId)
  });
  if(!checkEventdeletionId){
    throw `No attendee found with the id: ${attendeeId}`;
  }
  const deleteAttendee = await forRemoveAttendeeData.updateOne(
    {_id:checkEventdeletionId._id},
    {$pull:{attendees:{_id:new ObjectId(attendeeId)}}}
    );

  if (deleteAttendee.modifiedCount === 0 ) {
    throw `Error: Could not delete user with id of ${attendeeId}`;
  }
  //Update attendees count
  const updatedEventsDeletion = await forRemoveAttendeeData.findOne({_id:checkEventdeletionId._id});
  const updatedCount = updatedEventsDeletion.attendees.length;
  const updatedAttendeCounts = await forRemoveAttendeeData.updateOne(
    {_id:checkEventdeletionId._id},
    {$set:{totalNumberOfAttendees:updatedCount}});
  if(updatedAttendeCounts.modifiedCount ===0){
    throw 'Unable to update the totalNumberof Attendees for the event after delete';
  }

  //fetch
  const updatedEventAfterDeletion = await forRemoveAttendeeData.findOne({_id:checkEventdeletionId._id});
  if(!updatedEventAfterDeletion){
    throw `Error fetching updated event data after attendee removal`;
  }
  //logic to update the total number of atendee
  return updatedEventAfterDeletion;

}
export default {createAttendee,getAllAttendees,getAttendee,removeAttendee};