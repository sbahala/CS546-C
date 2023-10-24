//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes

//You can import your getBooks() function in the /data/data.js file that you used for lab 3 to return the list of books.  You can also import your getBookById(id) function and call it in the :/id route.
import {Router} from 'express';
const router = Router();
import{getBookById,getAllBook} from '../data/data.js';
import helpers from '../helpers.js';

router.route('/').get(async(req,res) =>{
    try{
        const bookData = await getAllBook();
        res.json(bookData);

    }catch(e){
        return res.status(500).send(e);
    }
});
// Implement GET Request Method and send a JSON response  See lecture code!

router.route('/:id').get(async(req,res) =>{
    try{
        req.params.id = helpers.checkBookID(req.params.id);
        const bookDataByID = await getBookById(req.params.id);
        res.json(bookDataByID);
    }catch(e){
        if(e === 'Error -- Book Not Found!'){
            return res.status(404).json(e);
        }else{
            return res.status(404).json(e);
        }
    }
});
// Implement GET Request Method and send a JSON response See lecture code!

export default router;
