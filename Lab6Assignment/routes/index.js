// This file will import both route files and export the constructor method as shown in the lecture code

/*
    - When the route is /events use the routes defined in the events.js routing file
    - When the route is /attendees use the routes defined in attendee.js routing file
    - All other enpoints should respond with a 404 as shown in the lecture code
*/

import eventsRoutes from  './events.js';
import attendeesRoutes from './attendees.js';

const constructorMethod = (app) => {
    app.use('/events', eventsRoutes);
    app.use('/attendees', attendeesRoutes);
  
    app.use('*', (req, res) => {
      res.status(404).json({error: 'Route Not found'});
    });
  };
  
  export default constructorMethod;