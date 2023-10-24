/*
    1. Create a event of your choice.
    2. Log the newly created event. (Just that event, not all events)
    3. Create another event of your choice.
    4. Query all events, and log them all
    5. Create the 3rd event of your choice.
    6. Log the newly created 3rd event. (Just that event, not all events)
    7. Rename the first event
    8. Log the first event with the updated name. 
    9. Remove the second event you created.
    10. Query all events, and log them all
    11. Try to create an event with bad input parameters to make sure it throws errors.
    12. Try to remove an event that does not exist to make sure it throws errors.
    13. Try to rename an event that does not exist to make sure it throws errors.
    14. Try to rename an event passing in invalid data for the newEventName parameter to make sure it throws errors.
    15. Try getting an event by ID that does not exist to make sure it throws errors.
*/

//import * as events from "./events.js";
import * as events from './data/events.js';
import { dbConnection,closeConnection } from "./config/mongoConnection.js"

//comment it and check for other functions as it will drop your table
const db = await dbConnection();
await db.dropDatabase();

async function main(){
    let patrickBBQ,aidenBday,juniperSkyReunion
    //1.Create a event of your choice.
    try{
        patrickBBQ = await events.create("Patrick's Big End of Summer BBQ","Come join us for our yearly end of summer bbq!",{streetAddress: "1 Castle Point Terrace", city: "Hoboken", state: "nj", zip: "07030"}, "phill@stevens.edu",30,0,"08/25/2024","2:00PM","8:00PM",false);
        console.log(patrickBBQ);//2. Log the newly created event. (Just that event, not all events)
    }catch(e){
    console.log(e);
    }  
    //3.Create another event of your choice.
    try{
        aidenBday = await events.create("Aiden's Birthday Bash","Aiden turns 5 and you're all invited!",{streetAddress: "2 Castle Point Terrace", city: "Hoboken", state: "NJ", zip: "07030"}, "ahill@stevens.edu",15,0,"09/04/2024","1:00PM","4:00PM",false);
    }catch(e){
    console.log(e);
    }
    //4.Query all events, and log them all
    try{
        const allEvents = await events.getAll();
        console.log(allEvents);
    }catch(e){
        console.log(e);
    }
    //5.Create the 3rd event of your choice.
    try{
        juniperSkyReunion = await events.create("Juniper Sky reunion concert!","The boys of Juniper Sky reunite for a one night only show at The Chance Theater in Poughkeepsie NY!",{streetAddress: "6 Crannell St", city: "Poughkeepsie", state: "NY", zip: "12601"}, "js@juniperskyrocks.com",900,25,"01/25/2024","8:00PM","10:00PM",true);
        console.log(juniperSkyReunion);//6.Log the newly created 3rd event. (Just that event, not all events)
    }catch(e){
    console.log(e);
    }
    //7.Rename the first event
    try{
        if(!patrickBBQ || !patrickBBQ._id){
            throw `Error -- patrickBBQ or its id is not defined `;
        }
        const renameAiden = await events.rename(patrickBBQ._id,"Patrick's BBQ");
        console.log(renameAiden);//8.Log the first event with the updated name. 
    }catch(e){
        console.log(e);
    }
    //9.Remove the second event you created.
    try{
        if(!aidenBday || !aidenBday._id){
            throw `Error -- aidenBday or its id is not defined `;
        }
        const removeEvent = await events.remove(aidenBday._id);
        console.log(removeEvent);//{eventName: "Aiden's Birthday Bash", deleted: true}
    }catch(e){
        console.log(e);
    }
    // 10.Query all events, and log them all
    try{
        const allEvents = await events.getAll();
        console.log(allEvents);
    }catch(e){
        console.log(e);
    }
    //11.Try to create an event with bad input parameters to make sure it throws errors.
    try{
        const patrickBBQ1 = await events.create("Patrick's Big End of Summer BBQ","Come join us for our yearly end of summer bbq!",{streetAddress: "1 Castle Point Terrace", city: "Hoboken", state: "nj", zip: "07030"}, "phill@stevens.edu",30,25.12,"10/11/2023","08:00PM","11:45PM",false);
        console.log(patrickBBQ1);//Error --  Given startTime: 08:00PM for date : 10/11/2023 has already passed
    }catch(e){
    console.log(e);
    }
    //12.Try to remove an event that does not exist to make sure it throws errors.
    try{
        const allEvents = await events.remove(aidenBday._id);
        console.log(allEvents);
    }catch(e){
        console.log(e);
    }
    //13.Try to rename an event that does not exist to make sure it throws errors.
    try{
        const tryRename = await events.rename(aidenBday._id,"Aiden's 5th Birthday Bash");
        console.log(tryRename);
    }catch(e){
        console.log(e);
    }
    //14.Try to rename an event passing in invalid data for the newEventName parameter to make sure it throws errors.
    try{
        const tryRenameInvalid = await events.rename(juniperSkyReunion._id,"123");
        console.log(tryRenameInvalid);
    }catch(e){
        console.log(e);
    }
    //15.Try getting an event by ID that does not exist to make sure it throws errors.
    try{
        const getEvent = await events.get(aidenBday._id);
        console.log(getEvent);
    }catch(e){
        console.log(e);
    }

await closeConnection();
console.log('Done!');

}
main();