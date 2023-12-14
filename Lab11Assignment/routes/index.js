//Here you will require route files and export the constructor method as shown in lecture code and worked in previous labs.

import apiRoutes from './routesApi.js';
//import {getAll} from '../data/index.js';

const constructorMethod = (app) => {
  app.use('/', apiRoutes);

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

export default constructorMethod;