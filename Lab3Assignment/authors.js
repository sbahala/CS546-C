//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Authors data link: https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json
import axios from "axios";
//const { default: axios } = require("axios");

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
    
}
async function getBooks(){
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
function datatrim(val){
    return val.trim();

}
function sortvalues(val){
    return val.sort((a,b)=>a.split(' ')[1].localeCompare(b.split(' ')[1]));
}
const getAuthorById = async (id) => {
    if(!id){
        throw `Error -- Author id not provided`;
    }else if (typeof(id) !== 'string'){
        throw `Error -- Author id: ${id} provided is not of String type`;
    }
    else if(id.trim().length === 0 || id.length === 0){
        throw `Error -- Author id cannot be empty`;
    }
    id = datatrim(id);
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
        throw `Error --  Author details not found for the given id: ${id}`;
    }  
    if(JSON.stringify(requiredAuthorData)=== '{}'){
        throw `Error --  Author details not found for the given id: ${id}`;
    }
    return requiredAuthorData;
};

const searchAuthorByName = async (searchTerm) => {
    if(!searchTerm){
        throw `Error -- searchTerm not provided`;
    }else if (typeof(searchTerm) !== 'string'){
        throw `Error -- searchTerm:${searchTerm} provided is not of String type`;
    }
    else if(searchTerm.trim().length === 0 || searchTerm.length === 0){
        throw `Error -- searchTerm cannot be empty`;
    }
    searchTerm = datatrim(searchTerm);
    searchTerm = searchTerm.toLowerCase();
    let authhorNameDetails = await getAuthors();
    const matchAuthorByNames = authhorNameDetails.filter(detail =>
        detail.first_name.toLowerCase().includes(searchTerm) || detail.last_name.toLowerCase().includes(searchTerm)
    );
    const sortedAuthorNames = matchAuthorByNames.sort((a,b) =>{
        const lNameSort = a.last_name.localeCompare(b.last_name);
        return lNameSort !==0 ? lNameSort : authhorNameDetails.indexOf(a) -authhorNameDetails.indexOf(b);

    }).map(author => `${author.first_name} ${author.last_name}`);
    /*const sortedAuthorNames = matchAuthorByNames.map(author => `${author.first_name} ${author.last_name}`)
    .sort((a,b)=> a.split(' ')[1].localeCompare(b.split(' ')[1]));*/
    if(!sortedAuthorNames){
        throw `Error --  Author details not found for the searchTerm: ${searchTerm}`;
    }
    if(sortedAuthorNames.length === 0){
        throw `Error --  Author details not found for the searchTerm: ${searchTerm}`;
    }

    return sortedAuthorNames;

};

const getBookNames = async (firstName, lastName) => {
    if(!firstName && !lastName){
        throw `Error -- firstName and lastName  not provided`;
    }
    if(!firstName || !lastName){
        throw `Error -- firstName or lastName  not provided`;
    }else if (typeof(firstName) !== 'string' || typeof(lastName) !== 'string'){
        throw `Error -- Given firstName:${firstName}  or lastName:${lastName} is not of String type`;
    }
    else if(firstName.trim().length === 0 || lastName.length === 0){
        throw `Error -- firstName or lastName cannot be empty`;
    }
    firstName = datatrim(firstName);
    lastName = datatrim(lastName);
    let authhorbookDetails = await getAuthors();
    const matchAuthorByNames = authhorbookDetails.find(detail =>
        detail.first_name.trim().toLowerCase()=== firstName.toLowerCase() && detail.last_name.trim().toLowerCase() === lastName.toLowerCase()
    );
    if(!matchAuthorByNames){
        throw `Error -- There is no author ${firstName} ${lastName} in authors.json`;
    }
    if(matchAuthorByNames.books.length === 0){
        throw `Error -- Author ${firstName} ${lastName} can be found but they have written no books`;
    }

    const booksDetails = await getBooks();
    const bookNamesByAuthor = matchAuthorByNames.books.map(id =>
        booksDetails.find(books => books.id === id).title).sort();
    
    if(!bookNamesByAuthor){
        throw `Error -- No book details found for author: ${firstName} ${lastName}`;
    }
    if(bookNamesByAuthor.length === 0){
        throw `Error -- No book details found for author: ${firstName} ${lastName}`;
    }

    return bookNamesByAuthor;

};

const youngestOldest = async () => {
    let authorData = await getAuthors();
    let oldestDate = Infinity;
    let youngestDate = -Infinity;
    let oldestAuthors = [];
    let youngestAuthors =[];
    const authorName = author => `${author.first_name} ${author.last_name}`;
    authorData.forEach(record =>{
        const name = authorName(record);
        if(!name || name.trim() === ""){
            throw `Error -- Invalid author name`
        }
        if(!record.date_of_birth){
            throw `Error -- Missing date of Birth for :${name}`
        }
        const authorBirthDate = new Date(record.date_of_birth).getTime();
        if(authorBirthDate<oldestDate){
            oldestDate = authorBirthDate;
            oldestAuthors = [authorName(record)];
        } else if(authorBirthDate === oldestDate){
            oldestAuthors.push(authorName(record));
        }

        if(authorBirthDate>youngestDate){
            youngestDate = authorBirthDate;
            youngestAuthors = [authorName(record)];
        } else if(authorBirthDate === youngestDate){
            youngestAuthors.push(authorName(record));
        }
    })
    if(!oldestAuthors.length){
        throw `Error -- No oldestAuthors found in the data`
    }
    if(!youngestAuthors.length){
        throw `Error -- No youngestAuthors found in the data`
    }
    if(oldestAuthors.length>1){
        oldestAuthors = sortvalues(oldestAuthors);
    }
    if(youngestAuthors.length>1){
        youngestAuthors = sortvalues(youngestAuthors);
    }
    return {
        youngest: youngestAuthors.length === 1 ? youngestAuthors[0]:youngestAuthors,
        oldest: oldestAuthors.length === 1 ? oldestAuthors[0]:oldestAuthors
    };
};

const sameBirthday = async (month, day) => {
    if(!month || !day){
        throw `Error -- Month or day not provided`;
    }
    if(typeof(month) !== "number" || typeof(day) !== "number"){
        throw `Error -- Month and Day should be provided in number`;
    }
    if(!Number.isInteger(month)|| !Number.isInteger(day)){
        throw `Error -- Month and day must be whole numbers`;
    }
    if(month<1 || month>12){
        throw `Error -- Month should be between 1 ans 12`;
    }
    if(month === 2 ){
        if(day>28){
            throw `Error -- There are not ${day} days in Feb`;
        }
    }
    const daysForMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
    const months =[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`];
    if(day<1 || day>daysForMonth[month -1]){
        throw `Error -- There are not ${day} days in ${months[month -1]}`;
    }
    let authorBirthrelatedData = await getAuthors();
    const sameBirthday =authorBirthrelatedData.filter(data =>{
        const[birthmonth,birthday,birthyear] = data.date_of_birth.split("/").map(Number);
        return birthmonth === month  && birthday === day;
    });

    if(sameBirthday.length<2){
        throw `Error -- No two authors have the same birthday`;
    }
    const sortedAuthors = sortvalues(sameBirthday.map(author =>`${author.first_name} ${author.last_name}`));
    if(sortedAuthors.length ===0){
        throw ` Error -- No authors found for this birthday`;
    }
    return sortedAuthors;

    //return sortvalues(sameBirthday.map(author =>`${author.first_name} ${author.last_name}`));
};

export{getAuthorById,searchAuthorByName,getBookNames,youngestOldest,sameBirthday}
