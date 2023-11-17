//import express and express router as shown in lecture code and worked in previous labs.  Import your data functions from /data/characters.js that you will call in your routes below
import {Router} from 'express';
const router = Router();
import {searchCharacterByName,searchCharacterById } from '../data/characters.js';

const checkNumber = async(id) =>{
  if(typeof(id)=== undefined){
    throw {title:"Marvel Character Finder",code :400, message: "Id is undefined"};
  }
  const numID = Number(id);
  if(isNaN(numID)){
    throw {title:"Marvel Character Finder",code :400, message: "Id must be a valid one to search for"};
  }
};

router.route('/').get(async (req, res) => {
  //code here for GET will render the home handlebars file
  res.render('home', {title:"Marvel Character Finder"});
});

router.route('/searchmarvelcharacters').post(async (req, res) => {
  //code here for POST this is where your form will be submitting searchCharacterByName and then call your data function passing in the searchCharacterByName and then rendering the search results of up to 15 characters.
  try{
    const formBody = req.body;
    var searchTerm = formBody.searchCharacterByName;//formBody;
  
    if(!searchTerm){
      res.status(400).render(`error`,{title:"Marvel Character Finder",searchPage: true,code:400,description:`Search name cannot be null`});
      return;
    }
    if(searchTerm.trim().length === 0){
      res.status(400).render(`error`,{title:"Marvel Character Finder",searchPage: true,code:400,description:`Search name cannot be empty spaces`});
      return;
    }
    const getSearchByName = await searchCharacterByName(searchTerm);
    if(getSearchByName.length === 0){
      res.render(`characterSearchResults`,{title:"Marvel Characters Not Found",noResult: true,code:404,message:"Character not found", searchCharacterByName :searchTerm});
    }else{
      res.render(`characterSearchResults`,{title:"Marvel Characters Found", searchResult:getSearchByName,searchCharacterByName:searchTerm});

    }
    
  }catch(e){
    res.status(e.code).render(`error`,{title:e.title,code:e.code,description:e.message});
    /*if(e.code){
      res.status(e.code).render(`error`,{title:e.title,code:e.code,description:e.message});
    }*/

  }
});

router.route('/marvelcharacter/:id').get(async (req, res) => {
  //code here for GET a single character
  try{
  if(!req.params.id){
    res.status(400).render(`error`,{title:"Marvel Character Finder",code:400, description:`Id cannot be NUll or undefined`});
    return;
  }
  if(req.params.id.trim().length === 0){
    res.status(400).render(`error`,{title:"Marvel Character Finder",code:400, description:`Id cannot be empty spaces`});
    return;
  }
  //console.log(req.params.id);
  await checkNumber(req.params.id);
  const characterById = await searchCharacterById(req.params.id.trim());
  let name = characterById[0].name;
  res.render(`characterById`,{title:name, searchResult:characterById});
  }catch(e){
    if(e.code){
      res.status(e.code).render(`error`,{title:e.title,code:e.code,description:e.message});
    }else{
      res.status(500).render(`error`,{title:error,code:500, description:`InternalServer Error`});

    }

    /*if(e.code === "ERR_BAD_REQUEST"){
      res.status(404).render(`error`,{code:404, description:e.message});
    }if(e.code === 400){
      res.status(e.code).render(`error`,{code:400, description:e.message});
    }*/


    //res.status(404).render(`error`,{code:404, description:`Character not found`});
   /* if(e.code){
      res.status(e.code).render(`error`,{code:e.code, description:e.message});
    }else{
      res.status(404).render(`error`,{code:404, description:`Character not found`});

    }*/
  }
});

export default router;
