//import axios, md5
import axios from "axios";
import md5 from 'blueimp-md5' //you will need to install this module;
const publickey = 'f8834ef4848f460e57dacb7bd7a6612e';
const privatekey = '0434c04c41e1af6741afff99d9555f919e9558ec';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
//const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
const checkNumber = async(id) =>{
  if(typeof(id)=== undefined){
    throw {code :400, message: "Id is undefined"};
  }
  const numID = Number(id);
  if(isNaN(numID)){
    throw {code :400, message: "Id must be a valid one to search for"};
  }
};
export const searchCharacterByName = async (searchTerm) => {
  //Function to search the api and return up to 15 characters matching the name param
  if(!searchTerm) throw {title:"Marvel Character Finder",code:400,message:"Search name cannot be Null"};
  if(searchTerm.trim().length === 0 ) throw {title:"Marvel Character Finder",code:400,message:"Search name cannot be empty spaces"};
  searchTerm = searchTerm.trim();
  try{
    const {data}= await axios.get(`${baseUrl}?nameStartsWith=${searchTerm}&ts=${ts}&apikey=${publickey}&hash=${hash}&limit=15`);
    return data.data.results
  }catch(e){
    //console.log(e);
    const message = e.response.data && e.response.data.status ? e.response.data.status:e.response.statusText;
    if(e.response && e.response.status){
      throw{title:"Marvel Character Finder",code:e.response.status,message:message};
    }
    if(e.request){
      throw{title:"Marvel Character Finder",code:500,message:"The request was made but no response received"};//e.response.statusText
    }
      
}
 

};

export const searchCharacterById = async (id) => {
  //Function to fetch a character from the api matching the id
  if(!id) throw {title:"Marvel Character Finder",code :400, message: "Id cannot be Null"};
  if(id.length === 0) throw {title:"Marvel Character Finder",code :400, message: "Id cannot be empty spaces"};
  if(id.length !=7) throw {title:"Marvel Character Finder",code :400, message: `Invalid Id: ${id}`};
  await checkNumber(id);
  id = id.trim();
  try{
    const {data} = await axios.get(`${baseUrl}/${id}?ts=${ts}&apikey=${publickey}&hash=${hash}`);
    if(!data || !data.data.results || data.data.results.length === 0){
      throw{title:"Marvel Character Finder",code:404,message:"Character not found"};
  }
    //console.log(data.data.results);
    return data.data.results
  }catch(e){
    const message = e.response.data && e.response.data.status ? e.response.data.status:e.response.statusText;
    if(e.response && e.response.status){
      throw{title:"Marvel Character Finder",code:e.response.status,message:message};
    }else{
      throw{title:"Marvel Character Finder",code:500,message:"InternalServer Error"};
    }    
}

};
