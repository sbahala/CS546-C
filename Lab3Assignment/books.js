//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Books data link: https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json

import axios from "axios";
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
}
async function getAuthorsDetails(){
    try{
        const{data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json');
        if(!data || !Array.isArray(data) || data.length === 0){
            throw `Error  -- Invalid Author data`;
        }
        return data;
    }catch(e){
        throw `Error  -- In fetching book details for :${e}`;
    }
    
}
function trimValue(val){
    return val.trim();

}
const getBookById = async (id) => {
    if(!id){
        throw `Error -- Book id not provided`;
    }else if (typeof(id) !== 'string'){
        throw `Error -- Book id provided is not of String type`;
    }
    else if(id.trim().length === 0 || id.length === 0){
        throw `Error -- Book id cannot be empty`;
    }
    id = trimValue(id);
    let bookDetails = await getBooksDetails();
    let requiredBookData ={};
    bookDetails.forEach(element => {
        if(element.id === id){
            requiredBookData = element;
        }      
    });
    if(!requiredBookData){
        throw`Errorr --- The required book details is not found for the given ID: ${id}`;
    }
    if(JSON.stringify(requiredBookData)=== '{}'){
        throw `Error --  The required book details are not found for the given ID: ${id}`;
    } 
    return requiredBookData;
};

const getAuthorName = async (bookId) => {
    if(!bookId){
        throw `Error -- Book id not provided`;
    }else if (typeof(bookId) !== 'string'){
        throw `Error -- Book id provided: ${bookId} is not of String type`;
    }
    else if(bookId.trim().length === 0 || bookId.length === 0){
        throw `Error -- Book id cannot be empty`;
    }
    bookId = trimValue(bookId);
    let bookDetails = await getBooksDetails();
    let authhorDetails = await getAuthorsDetails();
    let requiredAuthrId ={};
    bookDetails.forEach(element => {
        if(element.id === bookId){
            requiredAuthrId = element.authorId.trim();
        }      
    });
    if(!requiredAuthrId){
        throw `Error -- Author id is not found for the given book id: ${bookId}`;

    }
    let authorName ={};
    authhorDetails.forEach(element =>{
        if(element.id === requiredAuthrId){
            authorName = element;//.first_name.concat(" ").concat(element.last_name).toString();
        }
    })
    if(!authorName){
        throw `Error -- Author details are not available for the book id ${bookId}`;
    }
    if(JSON.stringify(authorName) === '{}'){
        throw `Error --  Author details are not available for the book id ${bookId}`;
    }
    if(!authorName.first_name || !authorName.last_name){
        throw `Error --  Author first name and last name details are not available for the book id`;
    }
    if(authorName){
        return `${authorName.first_name.trim()} ${authorName.last_name.trim()}`;
    }   
    
};

const sameGenre = async (genre) => {
    if(!genre){
        throw `Error -- valid genre not provided`;
    }else if (typeof(genre) !== 'string'){
        throw `Error -- genre provided: ${genre} is not of String type`;
    }
    else if(genre.trim().length === 0 || genre.length === 0){
        throw `Error -- genre cannot be empty`;
    }
    genre = trimValue(genre);
    let bookGenreDetails = await getBooksDetails();
    //let authhorDetails = await getAuthorsDetails();
    const requiredAuthrId = bookGenreDetails.filter(element => element.genres.some(id => id.toLowerCase() === genre.toLowerCase()));
    if(!requiredAuthrId){
        throw `Error -- No book details found for the provided genre:${genre}`;
    }
    if(JSON.stringify(requiredAuthrId) === '[]'){
        throw `Error --  No book details found for the provided genre:${genre}`;
    }
    return requiredAuthrId;

};

const priceRange = async (min, max) => {
    /*if(!min && !max){
        throw `Error -- min and max price range not provided`;
    }*/
    if(min === undefined && max === undefined){
        throw `Error -- min and max price range not provided`;
    }
    if(min === undefined){
        throw `Error -- min price range not provided`;
    }
    if(max === undefined){
        throw `Error -- max price range not provided`;
    }
    /*if(!min){
        throw `Error -- min price range not provided`;
    }
    if(!max){
        throw `Error -- max price range not provided`;
    }*/
    if(typeof(min) !== 'number' || !isFinite(min) || isNaN(min)){
        throw `Error -- provided min:${min} price range is not Number type`;
    }
    if(typeof(max) !== 'number' || !isFinite(max) || isNaN(max)){
        throw `Error -- provided max:${max} price range  is not Number type`;
    }
    if(min === max){
        throw `Error -- price range min and max cannot be same`;
    }
    if(min>= max){
        throw `Error -- price range min should be less than max`;
    }
    if(min<0 || max<0){
        throw `Error -- price range should not be below 0`;
    }
    let bookPriceDetails = await getBooksDetails();
    let filterPriceDetail = [];
    bookPriceDetails.forEach(element =>{
    if(element.hasOwnProperty('price')&& element.price >= min && element.price<=max){
        filterPriceDetail.push(element);
    }
   })
   if(!filterPriceDetail){
    throw `Error -- Book details are not available for the given min or max price range`;   
   }
   if(JSON.stringify(filterPriceDetail) === '[]')
   {
    throw `Error -- Book details are not available for the given min or max price range`;
}
   return filterPriceDetail;
};

const getAllBooksWithAuthorName = async () => {
    let bookData = await getBooksDetails();
    let authhorData = await getAuthorsDetails();
    let bookWithAuthor =[];
    if(!bookData || !authhorData){
        throw `Error -- BookData or Author data is not available`;
    }
    bookData.forEach(element =>{
        //const author = authhorData.find(author => author.id === element.authorId);
        const authorId = element.authorId;
        if(!authorId){
            throw `Error -- Book data ${element.id} does not have the authorId`;
        }
        const author = authhorData.find(author => author.id === authorId);
        if(!author){
            throw `Error -- No author found for authorID ${authorId} in book ${element.id}`;
        }
        const bookWithAuthorName ={
            ...element,
            author: `${author.first_name} ${author.last_name}`,
        }
        if(!bookWithAuthorName || !bookWithAuthorName.author){
            throw `Error -- No book data with author name for book ${element.id}`;
        }
        delete bookWithAuthorName.authorId;
        bookWithAuthor.push(bookWithAuthorName);
       })
       return bookWithAuthor;
};
export{getBookById,getAuthorName,sameGenre,priceRange,getAllBooksWithAuthorName}