/*Here, you can export the functions you did for lab 3
to get the authors, books, getBookByID, getAuthorById.  You will import these functions into your routing files and call the relevant function depending on the route. 

*/
//import * as authorsData from "./authors.js";
//import * as booksData from "./books.js";

import axios from "axios";
import helpers from '../helpers.js';
//you must use axios to get the data
async function getAuthors(){
    try{
        const{data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json');
        if(!data || !Array.isArray(data) || data.length === 0){
            throw `Error  -- Invalid Author data`;
        }
        return data;
    }catch(e){
        throw `Error  -- In fetching Author details for: ${e}`;       
    }
    
};

async function getBooksDetails(){
    try{
        const{data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json');
        if(!data || !Array.isArray(data) || data.length === 0){
            throw `Error  -- Invalid Book data`;
        }
        return data;
    }catch(e){
        throw `Error  -- In fetching book details for: ${e}`;
    }  
};

const getAuthorById = async (id) => {
    id = helpers.checkAuthorID(id);   
    id = helpers.datatrim(id);
    let authorDetails = await getAuthors();
    let requiredAuthorData ={};
    authorDetails.forEach(element => {
        for(const data in element){
            if(data === "id"){
                if(element[data] === id){
                    requiredAuthorData = element;
                }
            }
        }   
    });
    if(!requiredAuthorData){
        throw 'Error -- Author Not Found!';
    }  
    if(JSON.stringify(requiredAuthorData)=== '{}'){
        throw 'Error -- Author Not Found!';
    }
    return requiredAuthorData;
};

const getAllAuthor = async (...args) => {
    if(args.length>0 || args === null){
        throw `Error -- The getAll func doesn't require any arguments`;
    }   
    let authorAllDetails = await getAuthors();
    return authorAllDetails;
};

const getBookById = async (id) => {
    id = helpers.checkBookID(id);
    id = helpers.datatrim(id);
    let bookDetails = await getBooksDetails();
    let requiredBookData ={};
    bookDetails.forEach(element => {
        if(element.id === id){
            requiredBookData = element;
        }      
    });
    if(!requiredBookData){
        throw 'Error -- Book Not Found!';
    }
    if(JSON.stringify(requiredBookData)=== '{}'){
        throw 'Error -- Book Not Found!';
    } 
    return requiredBookData;
};

const getAllBook = async (...args) => {
    if(args.length>0 || args === null){
        throw `Error -- The getAll func doesn't require any arguments`;
    }   
    let bookAllDetails = await getBooksDetails();
    return bookAllDetails;
};

export{getAuthorById,getAllAuthor,getBookById,getAllBook}