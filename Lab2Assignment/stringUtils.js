/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
const emojiRegex = /:[^\s:]+:|:\w+:/g;

function validateMessage(message){
      if(typeof(message)!== "string"){
            throw `Errorr --- Invalid message type provided`;
      }
      if(message.trim() === ""){
            throw `Errorr ---Valid Emoji Message is not provided`;
      }     

}
function createdict(lastAndCurrStocks){
      const stockPrictdict ={};
      lastAndCurrStocks.split("|").forEach(objkey => {
            const [stockTicker, price] = objkey.split(',');
            stockPrictdict[stockTicker.toUpperCase()] = parseFloat(price)
      });
      return stockPrictdict;
}
function comparekeys(lastStocksPricedict,currStocksPricedict){
      const lastkeys = Object.keys(lastStocksPricedict).sort();
      const currkeys = Object.keys(currStocksPricedict).sort();

      if(JSON.stringify(lastkeys) !== JSON.stringify(currkeys)){
            throw `Error -- Stocks are not same`;
      }
}
function checkdataType(lastStocks, currStocks){
      if(typeof(lastStocks)!== "string" || typeof(currStocks)!="string"){
            throw `Error -- Invalid dataType provided for laststocks:${lastStocks} and currstocks:${currStocks}`;
      }
}
function checkifValidTicker(key){
      const regtickerExp = /^[a-z]{1,5}$/i;
      if(!key.match(regtickerExp)){
            throw`Error -- Invalid stockticker : ${key}`;
      }
}
function checkIfDuplicate(lastStocks, currStocks){
      let stockArr = lastStocks.split("|");
      let stockSet = new Set();
      stockArr.forEach((stock)=>{
            let[comp,prc] =stock.split(",");
            comp =comp.toUpperCase();
            if(stockSet.has(comp)){
                  throw `Error -- Duplicate Stock Ticker found`;
            }
            stockSet.add(comp);
      });
}
function validatePrice(price){
      const num = parseFloat(price);
      if(isNaN(num) || !isFinite === num){
            throw `Error -- Provided Invalid price: ${num}`;
      }
}
function checkStockPriceFormat(lastStocks,currStocks){
      const formatPattern = /^([A-Za-z]{1,5},\s*("?\d+(\.\d{1,2})?"?\|)+)+[A-Za-z]{1,5},\s*("?\d+(\.\d{1,2})?"?)$/;// works for any length

      if(!(formatPattern.test(lastStocks))){
            throw`Error -- Invalid format given for laststock:${lastStocks} `;
      }
      if(!(formatPattern.test(currStocks))){
            throw`Error -- Invalid format given for currStocks:${currStocks} `;
      }
}
function vallidateStrings(str1,str2){
      if(!(str1 || str2)){
            throw`Error -- Strings are not provided`;
      }
      if(typeof(str1)!== "string" || typeof(str2)!=="string"){
            throw`Error -- Invalid type of input data where type of String 1 is ${typeof(str1)} and type of String 2 is ${typeof(str2)}`;
      }
      if(!(str1.length>= 4 && str2.length>=4)){
            throw`Error -- String is not atleast length 4 where String1 is ${str1} and String2 is ${str2}`;
      }
}
export const emojiCounter = (message) => {
      if(!message){
            throw `Error -- No emoji message provided`;
      }
      validateMessage(message);
      message = message.trim();
      const emojiMatch = message.match(emojiRegex);
      return emojiMatch && emojiMatch.length > 0?emojiMatch.length:0;
}
export const sortStockPrices = (lastStocks, currStocks) => {
      lastStocks = lastStocks.trim();
      currStocks=currStocks.trim();
      checkdataType(lastStocks,currStocks);
      checkStockPriceFormat(lastStocks,currStocks);
      checkIfDuplicate(lastStocks,currStocks);
      const result =[];
      const currStocksPricedict = createdict(currStocks);
      const lastStocksPricedict = createdict(lastStocks);
      comparekeys(lastStocksPricedict,currStocksPricedict);
      const getCommonKeys = Object.keys(lastStocksPricedict).filter(key =>
            currStocksPricedict.hasOwnProperty(key));
      getCommonKeys.forEach(key =>{
            checkifValidTicker(key);
            const currPrice = currStocksPricedict[key];
            validatePrice(currPrice);
            const lastPrice = lastStocksPricedict[key];
            validatePrice(lastPrice);
            const changePrice = currPrice.toFixed(2);
            const newPrice = (((currPrice - lastPrice) / lastPrice) * 100).toFixed(1);
            result.push({
                  symbol: key,
                  price: parseFloat(changePrice),
                  change: parseFloat(newPrice),
                });
      });
      
      return result;
};

export const mashUp = (string1, string2) => {
      if(!string1 && !string2){
            throw `Error -- Input is empty or not a valid String`;
      }
      if(!string1 || !string2){
            throw `Error -- Provide two strings of atleast length 4 each for masup`;
      }
      vallidateStrings(string1,string2);
      string1 = string1.trim();
      string2 = string2.trim();
      const stringValues =[];
      const val1=string1.substring(0,4);
      const val2=string2.substring(0,4);
      const masupString = `${val2}${string1.substring(4)} ${val1}${string2.substring(4)}`;
      return masupString; //returns result
};
