//Here you will require route files and export them as used in previous labs.
import palindromeRoutes from './palindromeCheck.js';

const constructorMethod = (app) =>{
    app.use('/', palindromeRoutes);
    app.use('*', (req, res) => {
      //console.log('Error');
        res.status(404).json({ error: "Page Not found" });
        //res.status(404).render(`error`,{title:"Error",code:404, description: 'Page Not found'});
      });
};
export default constructorMethod;
