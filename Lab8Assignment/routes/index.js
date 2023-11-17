//Here you will import route files and export them as used in previous labs
import marvelRoutes from './characters.js';

const constructorMethod = (app) =>{
    app.use('/', marvelRoutes);
    app.use('*', (req, res) => {
        res.status(404).render(`error`,{title:"Error",code:404, description: 'Page Not found'});
      });
};
export default constructorMethod;
