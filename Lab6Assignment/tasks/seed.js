import {dbConnection, closeConnection} from '../config/mongoConnection.js';
import attendees from '../data/attendees.js';
import events from '../data/events.js';

const db = await dbConnection();
await db.dropDatabase();

const createwithoutAttendeeEvents = await events.create("Patrick's Halloween party","Come join us halloween party!",{streetAddress: "1 Castle Point Terrace", city: "Hoboken", state: "nj", zip: "07030"}, "phill@stevens.edu",2,0,"08/25/2024","2:00 PM","8:00 PM",true);
const createwithoutAttendeeEventsid = createwithoutAttendeeEvents._id.toString();

const createEvents = await events.create("Patrick's Big End of Summer BBQ","Come join us for our yearly end of summer bbq!",{streetAddress: "1 Castle Point Terrace", city: "Hoboken", state: "nj", zip: "07030"}, "phill@stevens.edu",2,0,"08/25/2024","2:00 PM","8:00 PM",false);
const createEventsid = createEvents._id.toString();

const aidenBday = await events.create("Aiden's Birthday Bash","Aiden turns 5 and you're all invited!",{streetAddress: "2 Castle Point Terrace", city: "Hoboken", state: "NJ", zip: "07030"}, "ahill@stevens.edu",15,0,"09/04/2024","1:00 PM","4:00 PM",false);
const aidenBdayid = aidenBday._id.toString();

const ciansBday = await events.create("Cian's Birthday Bash","Cian turns 15 and you're all invited!",{streetAddress: "1 Castle Point Terrace", city: "Hoboken", state: "NJ", zip: "07030"}, "cian@stevens.edu",15,0,"09/04/2024","2:00 PM","5:00 PM",true);
const ciansBdayid = ciansBday._id.toString();

const christmasBday = await events.create("Christmas  Bash","All of you are invited for Christmass celebration",{streetAddress: "1 Castle Point Terrace", city: "Hoboken", state: "NJ", zip: "07030"}, "sbahala@stevens.edu",5,0,"09/04/2024","2:00 PM","5:00 PM",true);
const christmasBdayid = christmasBday._id.toString();

const projectCeleb = await events.create("Project End celebration","Lets celebrate for our succesful project completion!",{streetAddress: "1 Castle Point Terrace", city: "Hoboken", state: "NJ", zip: "07030"}, "cian@stevens.edu",15,0,"09/04/2024","7:00 PM","9:00 PM",true);
const projectCelebid = projectCeleb._id.toString();

const hackathonCeleb = await events.create("Hackathon Celebration","Participate in the Hackathon event where you get to know what is new !",{streetAddress: "1 Castle Point Terrace", city: "Hoboken", state: "NJ", zip: "07030"}, "cian@stevens.edu",15,0,"09/04/2024","1:00 AM","2:30 AM",true);
const hackathonCelebid = hackathonCeleb._id.toString();

const preChristmasBday = await events.create("Pre Christmas party","All of you are invited for PreChristmass celebration",{streetAddress: "1 Castle Point Terrace", city: "Hoboken", state: "NJ", zip: "07030"}, "sbahala@stevens.edu",2,0,"09/04/2024","2:00 PM","5:00 PM",true);
const preChristmasBdayid = preChristmasBday._id.toString();

const preHalloweenParty = await events.create("Pre Halloween party","Lets celebrate a prehalloweenn party!",{streetAddress: "1 Castle Point Terrace", city: "Hoboken", state: "NJ", zip: "07030"}, "cian@stevens.edu",4,0,"09/04/2024","7:00 PM","9:00 PM",true);
const preHalloweenPartyid = preHalloweenParty._id.toString();

const productLaunchCeleb = await events.create("Product Launch","Welcome to see the release of our new product !",{streetAddress: "1 Castle Point Terrace", city: "Hoboken", state: "NJ", zip: "07030"}, "cian@stevens.edu",7,0,"11/04/2023","2:00 PM","5:00 PM",true);
const productLaunchCelebid = productLaunchCeleb._id.toString();

await attendees.createAttendee(createEventsid,"Patrick","Hill","phill@gmail.com");
await attendees.createAttendee(createEventsid,"Aieden","Hill","ahill@gmail.com");

await attendees.createAttendee(aidenBdayid,"Aieden","Hill","ahill@gmail.com");
await attendees.createAttendee(aidenBdayid,"Patrick","Hill","phill@gmail.com");

await attendees.createAttendee(ciansBdayid,"Patrick","Hill","phill@gmail.com");
await attendees.createAttendee(ciansBdayid,"Aieden","Hill","ahill@gmail.com");


await attendees.createAttendee(christmasBdayid,"Patrick","Hill","phill@gmail.com");
await attendees.createAttendee(christmasBdayid,"Aieden","Hill","ahill@gmail.com");
await attendees.createAttendee(christmasBdayid,"Aieden","Hill","chill@gmail.com");
await attendees.createAttendee(christmasBdayid,"Aieden","Hill","dhill@gmail.com");
await attendees.createAttendee(christmasBdayid,"Aieden","Hill","ihill@gmail.com");


await attendees.createAttendee(projectCelebid,"Patrick","Hill","phill@gmail.com");
await attendees.createAttendee(projectCelebid,"Aieden","Hill","ahill@gmail.com");

await attendees.createAttendee(hackathonCelebid,"Patrick","Hill","phill@gmail.com");
await attendees.createAttendee(hackathonCelebid,"Aieden","Hill","ahill@gmail.com");


await attendees.createAttendee(preChristmasBdayid,"Patrick","Hill","phill@gmail.com");
await attendees.createAttendee(preChristmasBdayid,"Aieden","Hill","ahill@gmail.com");

await attendees.createAttendee(preHalloweenPartyid,"Patrick","Hill","phill@gmail.com");
await attendees.createAttendee(preHalloweenPartyid,"Aieden","Hill","ahill@gmail.com");
await attendees.createAttendee(preHalloweenPartyid,"Patrick","Hill","chill@gmail.com");
await attendees.createAttendee(preHalloweenPartyid,"Aieden","Hill","hill@gmail.com");

await attendees.createAttendee(productLaunchCelebid,"Patrick","Hill","phill@gmail.com");
await attendees.createAttendee(productLaunchCelebid,"Aieden","Hill","ahill@gmail.com");


console.log('Done seeding database');

await closeConnection();