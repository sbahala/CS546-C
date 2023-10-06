//backup - array utils.js

/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
function checkArrays(args){
  //console.log(args);
  if(args.length<2){
    throw console.error("Error -- Array Size less than two");
  }
  args.forEach(subarray => {
    if(subarray.length<=0){
      throw console.error("Invalid Array Size");
    }
    if(!Array.isArray(subarray)){
      throw console.error("All the elements are not array");
    }
    
  });
}
function checkArraysize(arr){
  if(!arr.some(dimensions => Array.isArray(dimensions))){
    throw console.error("No subarray Provided for 3D Array");
  }
  arr.forEach(subArray=>{
    if(subArray.length === 0 || subArray.length === 1 || subArray.length === 2){
      throw console.error("No proper values Provided for Array");
    }
    if(!Array.isArray(subArray)){
      throw console.error("All the elements are not array");
    }
    subArray.forEach(element =>{
      if(!typeof(element)=== 'number' || specialChars.test(element)){
        throw console.error("SubArray not a number");
    }})});
}
function validTraingleCheck(a,b,c){
  if (!(typeof(a) === 'number'|| typeof(b) === 'number' || typeof(c) === 'number'))
  {
    throw `[ ${a}, ${b}, ${c} ] are not number type to form a valid traingle`;
  }
  if(a ===0 || b ===0 || c === 0){
    throw `[ ${a}, ${b}, ${c} ]doesn't form a valid traingle`;
  }
  if(!(a+b > c && a+c >b && b+c >a)){
    throw `[ ${a}, ${b}, ${c} ]doesn't form a valid traingle`;
  }
}
function stringMetricArray(arr){
  if(!Array.isArray(arr)){
    throw `${arr || 'provided variable'} is not a valid Array argument`;
  }
  if(arr.length<2){
    throw `${arr.length || 'provided variable'} Atleast two strings required`;
  }
  arr.forEach(value => {
    if(typeof(value)!=="string" || value === undefined ||specialChars.test(value)){
      throw `"Invalid strings:" ${value}`;
    }});

}
export const mergeCommonElements = (...args) => {
  //this function takes in a variable number of arrays that's what the ...args signifies
  checkArrays(args);
  const flattenedArrays = args.map(subArray => subArray.flat(Infinity));
  const commonArray = args.flat(Infinity).filter(eachElement=>{
    return flattenedArrays.every(arr => arr.includes(eachElement));
  });
  const uniqArray = Array.from(new Set(commonArray)).sort((a, b) => { 
    const typeA = typeof a;
    const typeB = typeof b;
    if (typeA === typeB) {
      if (typeA === 'number') {
        return a - b; // Sort numbers in ascending order
      } else if (typeA === 'string') {
        return a.localeCompare(b); // Sort strings using localeCompare
      }
    } else {
      // Different types, prioritize numbers over strings
      if (typeA === 'number') {
        return -1; // Number comes before string
      } else {
        return 1; // String comes after number
      }
    } 
    // Default case (shouldn't happen, but for completeness)
    return 0;
  }); 
  return  uniqArray;
};

export const findTriangles = (arr) => {
  checkArraysize(arr);
  const valueObj ={};
  arr.forEach((subArray,index) => {
    let perimeter =0;
    let area =0;
    let triangleType ="";
    const [a,b,c] = subArray;//Destructuring the subArray
    validTraingleCheck(a,b,c);
    if(a === b && b === c && c === a ){
      perimeter = a+b+c;
      area = parseFloat(((Math.sqrt(3)/4) * a *a).toFixed(2)).toString();
      triangleType = "equilateral";
    }
    if((a===b && b !== c && c !== a) ){
      const height = (Math.sqrt((Math.pow(a,2)) - (Math.pow(c/2,2))));
      area = parseFloat(((1/2) * c * height).toFixed(2)).toString();
      perimeter = 2*a +c;
      triangleType = "isoceles";
    }
    if(a!==b && b === c && c!==a){
      const height = (Math.sqrt((Math.pow(b,2)) - (Math.pow(a/2,2))));
      area = parseFloat(((1/2) * a * height).toFixed(2)).toString();
      perimeter = 2*b +a;
      triangleType = "isoceles";
    }
    if(a!==b && b !== c && c===a){
      const height = (Math.sqrt((Math.pow(a,2)) - (Math.pow(b/2,2))));
      area = parseFloat(((1/2) * b * height).toFixed(2)).toString();
      perimeter = 2*a +b;
      triangleType = "isoceles";
    }
    if(a !== b && b !== c && c !== a){
      const side = (a + b+ c)/2;
      area = parseFloat((Math.sqrt(side*((side - a)*(side - b)*(side - c)))).toFixed(2)).toString();
      perimeter = a+b+c;
      triangleType = "scalene";
    }
    valueObj[index] = [area, perimeter,triangleType];

  });
  return valueObj;

};

export const stringMetrics = (arr) => {
  stringMetricArray(arr);
  let countVowels =0;
  let count = 0;
  let consonants =0;
  let longest = [];
  let longestlength =0;
  let shortest = [];
  let shortestlength = Infinity;
  let mean =0;
  let newArr =[];
  let medianLen =0;
  let mode =0;
  const lengths = [];
  const filteredArray = arr.filter((str) => str.trim() !== "");
  newArr = filteredArray.sort((a, b) => a.length - b.length);
  newArr.forEach(value => {
    const length = value.length;
    lengths.push(length);
    const vowels ="AEIOUaeiou";
    if(length > longestlength){
      longestlength = length;
      longest=[value];
    }
    else if (length === longestlength){
      longest.push(value);
    }
    if(length < shortestlength){
      shortestlength = length;
      shortest=[value];
    }
    else if (length === shortestlength){
      shortest.push(value);
    }
    value.split("").forEach(letters =>{
      count++;
      if(vowels.includes(letters)){
        countVowels++;
      }
    });
    consonants = count - countVowels;
    mean = count/newArr.length;

  });
  const dict ={};
  lengths.forEach(eachlen => {
    if(dict[eachlen] === undefined){
      dict[eachlen] =1;
    }
    else{
      dict[eachlen]++;
    }
  });
  let longestvalue ='';
  if (longest.length === 1){
    longestvalue = longest[0];
    console.log(longestvalue);
  }
  let shortestvalue ='';
  if (shortest.length === 1){
    shortestvalue = shortest[0];
    console.log(shortestvalue);

  }
  const mid = Math.floor(lengths.length / 2);
  medianLen= newArr.length % 2 !== 0 ? lengths[mid] : (lengths[mid - 1] + lengths[mid]) / 2;
  mode = Number(Object.keys(dict).reduce((a, b) => dict[a] > dict[b] ? a : b));

  return {vowels: countVowels,
    consonants: consonants,
    longest:longest.length>1?longest.sort():longestvalue,
    shortest:shortest.length>1?shortest.sort():shortestvalue,
    mean:mean,
    median:medianLen,
    mode:mode};
};

///Lab2 test cases bk

import * as arrayUtils from './arrayUtils.js';
import * as stringUtils from './stringUtils.js';
import* as objUtils from './objUtils.js';


//once check for undefined  null or false by simple !value
//Lastly check for trim

try{
    console.log(arrayUtils.mergeCommonElements([3, 4, 1, -2, -4], [3, 45, 1, 24, -4], [112, "-4", 0, 1, 3,]));//returns [ 1, 3 ]
    console.log(arrayUtils.mergeCommonElements([35, "hello", 24,  ["abc", 7], 3, -4], [3, ["62", 4], 1, 24, -4, "abc"])); //returns [-4, 3, 24, "abc"]
    console.log(arrayUtils.mergeCommonElements([5, 3, "apple", "banana"], [5, "banana", 2, 4], [1, 5, "apple", "banana", 0])); // returns [5, "banana"]
    console.log(arrayUtils.mergeCommonElements([4, [5, "apple"], 3], [3, 4, [5, "apple"]], [3, "apple", 6, 7])); // returns [3, "apple"]
    console.log(arrayUtils.mergeCommonElements(["apple", "apple"], ["apple", "apple", "banana"], ["apple", "apple", "mango"])); // returns ["apple"]
    //console.log(arrayUtils.mergeCommonElements([1, 2, 3], "string", [4, 5, 6])); // throws an error
    //console.log(arrayUtils.mergeCommonElements());// throws an error
    console.log(arrayUtils.mergeCommonElements([1],[[[5, "fizz","NAN", "foo"]]],[[[[["   ",7,6,0.9,":"]]]]]));
    console.log(arrayUtils.mergeCommonElements([6,"   "],[[[[["   ",7,6]]]]]));//returns [ 6, '   ' ]
    console.log(arrayUtils.mergeCommonElements(["bar", 0, 8, 1, [[[5, "fizz", "foo"]]]], [7, "foo", "buzz", ["fizz", 8]]));// returns [8, “fizz”, "foo"]
    console.log(arrayUtils.mergeCommonElements([3,0,25, 29,"Lab2",2,"Aiden"], ["CS-546" ,"Lab2",25, "Computer Science",29, 8,15], [6,3,"Patrick","Lab2",25,29]));//returns [ 25, 29, 'Lab2' ]
    console.log(arrayUtils.mergeCommonElements([3,0,25,"!Patrick","Lab2",2,"Aiden","CS-546","Computer Science"], ["CS-546" ,"Lab2","!Patrick", "Computer Science","Aiden", 8,15], ["CS-546",6,3,"!Patrick","Lab2",25,"Aiden","Computer Science"]));//returns [ '!Patrick', 'Aiden', 'Computer Science', 'CS-546', 'Lab2' ]
    console.log(arrayUtils.mergeCommonElements([3,0,25," ","Lab2",-1,"Aiden","CS-546",3,"Computer Science"], ["CS-546" ,"Lab2"," ", -1,"Computer Science","Aiden", 3,8,15], ["CS-546",-1,3," ","Lab2",25,"Aiden","Computer Science"]));// returns [ -1, 3, ' ', 'Aiden', 'Computer Science', 'CS-546', 'Lab2' ]

}catch(e){
    console.log(e);
}
try{
    //console.log(arrayUtils.findTriangles([[3,3,3], [3,3,4], [5,4,2]]) );//returns {'0': [3.9,9, "equilateral"], '1': [4.47,10, "isosceles"], '2': [3.8,11, "scalene"]}
    //console.log(arrayUtils.findTriangles([[7,5,5], [2,4,3], [12,12,11]]));  // returns {'0': [12.5, 17, "isosceles"], '1': [2.9, 9, "scalene"], '2': [58.66,35, "isosceles"]})
    //console.log(arrayUtils.findTriangles([5, 5, 5])); // throws an error)
    console.log(arrayUtils.findTriangles([[3,4,4],[5,6,7]])); // returns { '0': [ '5.56', 11, 'isoceles' ], '1': [ '14.7', 18, 'scalene' ] }
    console.log(arrayUtils.findTriangles([[   3,4  ,4],[5,6,7  ]])); //returns { '0': [ '5.56', 11, 'isoceles' ], '1': [ '14.7', 18, 'scalene' ] }
}catch(e){
    console.log(e);
}

try{
    //console.log(arrayUtils.stringMetrics(["hello", "patrick", "hill", "trees", "seventeen"])); //returns {vowels: 11, consonants: 19, longest: "seventeen", shortest: "hill", mean: 6, median:  5, mode: 5})
    //console.log(arrayUtils.stringMetrics(["123", "rob", "stark", "aegon"])); //returns {vowels: 6, consonants: 11, longest: ["aegon", "stark"], shortest: "rob", mean: 4.25, median:  4.5, mode: 5})
    console.log(arrayUtils.stringMetrics(["     hello", "patrick"," "," " ,"hill", "trees", "seventeen"]));//returns {vowels: 11, consonants: 19, longest: "seventeen", shortest: "hill", mean: 6, median:  5, mode: 5})
    //Yet to check this --- No strings with just empty spaces are valid
    console.log(arrayUtils.stringMetrics(["hello@123", "@123"]));//remove the valid string validation
}catch(e){
    console.log(e);
}

try{
    console.log(stringUtils.emojiCounter("      :fire::fire:     ")); // return 2
    console.log(stringUtils.emojiCounter(":::fire:fire:")); //  return 1
    console.log(stringUtils.emojiCounter(":fire::pregnant_man::fire:")); //  return 3
    console.log(stringUtils.emojiCounter("I am so happy :joy::joy: about scoring a :100: on my test! I feel :fire:! But ::100: doesn't count. Neither does :joy::100: in a row.")); // Should return 7
    console.log(stringUtils.emojiCounter("Today was :sunny::sunny:::rainy::sunny:::sunny:rainy::sunny::rainy:::sunny:::rainy:sunny:!")); //  return 9
    console.log(stringUtils.emojiCounter("::")); //  return 0
    //console.log(stringUtils.emojiCounter("             ")); // Throws error
}catch(e){
    console.log(e);
}

try{
    let lastStocks = `AAPL,175.25|GOOG,135.40|AMZN,140.00`;
    let currStocks = `amzn,136.75|GOOG,135.60|AAPL,180.12`;
    //console.log(stringUtils.sortStockPrices(lastStocks, currStocks)); // returns [{symbol: "AAPL", price: 180.12, change: 2.8 }, {symbol: "GOOG", price: 135.60, change: 0.1}, {symbol: "AMZN", price: 136.75, change: -2.3}]

    let lastStocks1 = `GME,18.25|AMC, 8.00|PFE, 34.00`;
    let currStocks1 = `amc, 7.75|GME, 18.80|AAL, 13.32`;
    //console.log(stringUtils.sortStockPrices(lastStocks1, currStocks1)); // throws an error

    let lastStocks2 = `GME,18.25|AMC, 8.00|PFE, 34.00`;
    let currStocks2 = `SQLZ,153.25|253.09, AZH|ZQPM.05, 2A6.7Z`;
    //console.log(stringUtils.sortStockPrices(lastStocks2, currStocks2)); // throws an error -- Invalid Format

    let lastStocks3 = `      GOOG,135.40|AMZN,140.00`;
    let currStocks3 = `amzn,136.75|GOOG,135.60`;
    console.log(stringUtils.sortStockPrices(lastStocks3, currStocks3));// returns [{ symbol: 'GOOG', price: 135.6, change: 0.1 },{ symbol: 'AMZN', price: 136.75, change: -2.3 }]

}catch(e){
    console.log(e);
}

try{
    //console.log(stringUtils.mashUp("     Patrick     ", "Hill    "));//Returns "Hillick Patr"
    console.log(stringUtils.mashUp("     Patrick     ", "Hill    ","ji"));
    //console.log(stringUtils.mashUp("Patrick", 123));//Throws error : Invalid type of data where type of String 1 is string and type of String 2 is number
    //console.log(stringUtils.mashUp("helloooo", "world!")); //Returns "worloooo helld!"
    //console.log(stringUtils.mashUp("       Patrick", "")); //Throws error//check this as it throws error but not a precise error message
    //console.log(stringUtils.mashUp()); // Throws Error//check this
    //console.log(stringUtils.mashUp("John")); // Throws error//Invalid type of input data where type of String 1 is string and type of String 2 is undefined
    //console.log(stringUtils.mashUp ("h", "Hello") );// Throws Error//String is not atleast length 4 where String1 is h and String2 is Hello
    //console.log(stringUtils.mashUp ("h","e")); // Throws Error)//String is not atleast length 4 where String1 is h and String2 is e
}catch(e){
    console.log(e);
}
try{
    //console.log(objUtils.solvePuzzles([    ], {a: "house", b: "apple", c: 50, d: 100, f:200})); //throws error
    //console.log(objUtils.solvePuzzles({a: "house", b: "apple", c: 50, d: 100, f:200}, {a: "house", b: "apple", c: 50, d: 100, f:200})); // throws error - Invalid array for puzzles or it is empty
    //console.log(objUtils.solvePuzzles([{b: "tree", d: "patrick"}], [{b: "tree", d: "patrick"}]));// throws error // Invalid object for pieces or it is empty
    //console.log(objUtils.solvePuzzles( " ", [{b: "tree", d: "patrick"}]));//throws error//Invalid array for puzzles or it is empty
    //console.log(objUtils.solvePuzzles([{b: "tree", d: "patrick"}], {a: "house", b: "apple", c: 50, d: 100, f:200})); //throws error
    //console.log(objUtils.solvePuzzles([{a: 23, b: 17, d: 2}, {b: 17, d: 3, e: "hello"}], {a: 45, b: 60, c:-3, d: 88, e: 12})); //returns [{a: 23, b: 17, c:-3, d: 2, e:12}, {a:45, b: 17, c:-3, d: 3, e: “hello”} ]
    console.log(objUtils.solvePuzzles([{b:"   tree", d:"patrick"}], {a:"   house", b:"apple", c: 50, d: 100, e:200})); //returns [{a: “house”,b: “tree”, c: 50, d: “patrick”, e:200}])
    //console.log(objUtils.solvePuzzles([{b: "tree", d: "patrick"}], {a: "house", b: "apple", c: 50, f: 100, e:200}));// throws error //Pieces should have keys from a-e
    //console.log(objUtils.solvePuzzles([{ a: 23, b: 17, d: "" },{ b: 17, e: 42 },{ c: undefined, d: 88, e: 12 }],{ a: 45, b: 60, c: -3, d: undefined, e: NaN }));// returns [{ a: 23, b: 17, c: -3, d: '' },{ a: 45, b: 17, c: -3, e: 42 },{ a: 45, b: 60, c: undefined, d: 88, e: 12 }]
    //the above and below condition requires work
    console.log(objUtils.solvePuzzles([{f: 17, d: 2}, {d: 3, e: "hello"}], {c:-3, b: 88, e: 12})); // throws error :Puzzles should have keys from a-e
    console.log(objUtils.solvePuzzles([{b:"patrick"}], {c: 50, d: 100, e:200}));//returns empty array {} // as the puzzle is incomplete without the value "a"
}catch(e){
    console.log(e);
}

try{
    //console.log(objUtils.combineObjects([{ a: 3, b: 7, c: 5 , d:7},{ d: 4, e: 9, a:"apple" },{ a: 8, d: 2 } ]));// Returns:{ a: [3, "apple", 8]   d: [7,4,2] })
    //console.log(objUtils.combineObjects([{ j:True, ba: 7, c: 5 , d:7},{ j:90, e: 9, a:"apple" }, { j:15, dd: 2 } ])); /* Returns:{j: [True, 90, 15]  } */
    //console.log(objUtils.combineObjects([{ k: "True", ba: 7, c: 5 , d:7},{ j: 90, e: 9, a:"apple" },{ j: 15, dd: 2 } ])); /* Returns:{} */
    console.log(objUtils.combineObjects([{ j: 15} ])); //throws error //Invalid array Please provide an array with at least two objects
    //console.log(objUtils.combineObjects([{  },{ j: 90, e: 9, a:"apple" },{ j: 15, dd: 2 } ]));// throws error //Invalid array  as object should have at least 1 key/value. 
    //work for True as it is boolean and it should work
}catch(e){
    console.log(e);
}

try{
    let hand = [{suit: '  hearts', value: '2  '}, {suit: 'hearts', value: '3'}];
    let communityCards = [
        {suit: 'hearts', value: '4'},
        {suit: 'hearts', value: '5'},
        {suit: 'hearts', value: '6'} ];
    console.log(objUtils.evaluatePokerHand(hand, communityCards)); // Returns "Straight Flush"
    let hand1 = [{suit: 'hearts', value: '5'}, {suit: 'clubs', value: '5'}];
    let communityCards1 = [ {suit: 'diamonds', value: '4'},
    {suit: 'spades', value: '5'},
    {suit: 'hearts', value: '2'},
    {suit: 'clubs', value: 'J'},
    {suit: 'diamonds', value: 'Q'}];
    console.log(objUtils.evaluatePokerHand(hand1, communityCards1)); // Returns "Three of a Kind"
    //evaluatePokerHand(hand1, communityCards1);
    let hand2 = [{suit: 'hearts', value: '4'}, {suit: 'clubs', value: '9'},{suit: 'hearts', value: '4'}];
    let communityCards2 = [
        {suit: 'diamonds', value: '2'},
        {suit: 'spades', value: '5'},
        {suit: 'hearts', value: '6'},
        {suit: 'clubs', value: '7'},
        {suit: 'diamonds', value: '8'}];
        console.log(objUtils.evaluatePokerHand(hand2, communityCards2)); // throws error //Invalid hand cards provided as it should contain 2 cards 
    let hand3 = [{suit: 'hearts', value: '5'}, {suit: 'clubs', value: '6'}];
    let communityCards3 = [ {suit: 'diamonds', value: '4'},
    {suit: 'spades', value: '5'},
    {suit: 'hearts', value: '2'},
    {suit: 'clubs', value: 'J'},
    {suit: 'diamonds', value: 'Q'}];
    console.log(objUtils.evaluatePokerHand(hand3, communityCards3)); // Returns "Pair"
}catch(e){
    console.log(e);
}


///
import * as arrayUtils from './arrayUtils.js';
import * as stringUtils from './stringUtils.js';
import* as objUtils from './objUtils.js';


//once check for undefined  null or false by simple !value
//Lastly check for trim
//Do not submit like this make sure each case in each try block

try{
    console.log(arrayUtils.mergeCommonElements([[[[[[["a",[[[[[[]]]]]]]]]]]]], ["a" ])); //returns ['a']
    console.log(arrayUtils.mergeCommonElements([35, "hello", 24,  ["abc", 7], 3, -4], [3, ["62", 4], 1, 24, -4, "abc"])); //returns [-4, 3, 24, "abc"]
    //console.log(arrayUtils.mergeCommonElements([], [4, 5, 6], [4]) ); // throws an error//Invalid Arraya as each array should have atleast one string or number
    console.log(arrayUtils.mergeCommonElements([[[[[]]]],"a","b",[[],[],[]],"c"],["a","b",[[[[]]]]]));//returns [ 'a', 'b' ]

}catch(e){
    console.log(e);
}
try{
    //console.log(arrayUtils.mergeCommonElements([], [4, 5, 6], [4]) ); // throws an error//Invalid Arraya as each array should have atleast one string or number
    console.log(arrayUtils.mergeCommonElements([1],[[[5, "fizz","NAN", "foo"]]],[[[[["   ",7,6,0.9,":"]]]]]));//returns []//as non of the  value matches
    console.log(arrayUtils.mergeCommonElements(["Hi", 'Hello', 42],['World', 3.14, [NaN, 'Example']]));//throws error//value should be either number or string not: "null"

}catch(e){
    console.log(e);
}

try{
    //console.log(arrayUtils.findTriangles([[[[[.75,.77,.85]]]],[1.001, 1.002, 1.001], [7, 8, 9]]));// throws error// Error -- Array of subarrays should have only numbers.
    console.log(arrayUtils.findTriangles([[.75, .75, .75],[1.001, 1.002, 1.001], [7, 8, 9]])); //returns { "0": [ 0.24, 2.25,'equilateral'  ], "1": [ 0.43, 3,'isoceles' ], "2": [ 26.83, 24 ,'scalene'] }
    //console.log(arrayUtils.findTriangles([5, 5, 5])); // throws an error)//No subarray Provided for 3D Array
    //console.log(arrayUtils.findTriangles([["Hello",4,4],[5,6,7]]));//In subArray Hello not a number
}catch(e){
    console.log(e);
}
try{
    console.log(arrayUtils.findTriangles([[ 4,  5,  4],[7,7,6,8]]));//throws error //Error -- Array of subarrays with 3 values each is required
}catch(e){
    console.log(e);
}

try{
    //console.log(arrayUtils.stringMetrics(["     hello", "patrick"," "," " ,"hill", "trees", "seventeen"]));//thows error//Error -- Invalid input provided
    //console.log(arrayUtils.stringMetrics());//Error -- Error -- No array argument provided
    console.log(arrayUtils.stringMetrics(["bananas", "tomato", "berry", "cranberries"]));//returns mode: null
    console.log(arrayUtils.stringMetrics(["mapleyy","whistle","chample","paddley"]));
    console.log(arrayUtils.stringMetrics(["apple", "banana", "cherry", "date", "fig", "grape"])); //should return multiple modes//returns mode: [ 5, 6 ]
    console.log(arrayUtils.stringMetrics(["at", "at","hill", "trees", "seventeen","seventeen"]));//should return "at" and sevtenteen at only once
}catch(e){
    console.log(e);
}

try{
    //console.log(stringUtils.emojiCounter("      I am so happy :joy::joy: about scoring a :100: on my test! I feel :fire:! But ::100: doesn't count. Neither does :joy::100: in a row.")); // return 2
    console.log(stringUtils.emojiCounter(":::fire:fire:")); //  return 1
    console.log(stringUtils.emojiCounter(":fire::pregnant_man::fire:")); //  return 3
    console.log(stringUtils.emojiCounter("I am so happy :joy::joy: about scoring a :100: on my test! I feel :fire:! But ::100: doesn't count. Neither does :joy::100: in a row.")); // Should return 7
    console.log(stringUtils.emojiCounter("Today was :sunny::sunny:::rainy::sunny:::sunny:rainy::sunny::rainy:::sunny:::rainy:sunny:!")); //  return 9
    console.log(stringUtils.emojiCounter(":( ):")); //  return 0
    //console.log(stringUtils.emojiCounter("             ")); // Throws error
    //emojiCounter(): Should we throw an error if the input string does not contain a ":" or just return 0. //return 0
    //For EmojiCounter, is the emoji `:(space):` valid?// check if its valid


    ///Imp//:(space):// this should return1
}catch(e){
    console.log(e);
}

try{
    let lastStocks = `AAPL,175.25|GOOG,135.40|AMZN,140.00`;
    let currStocks = `amzn,136.75|GOOG,135.60|AAPL,180.12`;
    console.log(stringUtils.sortStockPrices(lastStocks, currStocks)); // returns [{symbol: "AAPL", price: 180.12, change: 2.8 }, {symbol: "GOOG", price: 135.60, change: 0.1}, {symbol: "AMZN", price: 136.75, change: -2.3}]

    let lastStocks1 = `GME,18.25|AMC, 8.00|PFE, 34.00`;
    let currStocks1 = `amc, 7.75|GME, 18.80|AAL, 13.32`;
    //console.log(stringUtils.sortStockPrices(lastStocks1, currStocks1)); // throws an error

    let lastStocks2 = `GME,18.25|AMC, 8.00|PFE, 34.00`;
    let currStocks2 = `SQLZ,153.25|253.09, AZH|ZQPM.05, 2A6.7Z`;
    //console.log(stringUtils.sortStockPrices(lastStocks2, currStocks2)); // throws an error -- Invalid Format

    let lastStocks3_3 = `GME,18.25|GME,18.25`;
    let currStocks3_3 = `GME,18.25|GME,18.25`;
    //console.log(stringUtils.sortStockPrices(lastStocks3_3, currStocks3_3)); // throws an error -- Duplicate Stock Ticker found

    let lastStocks3_1 = `GME,-18.25|AMC,-8.00|PFE,-34.00`;
    let currStocks3_2 = `GME,20.25|AMC,10.00|PFE,36.00`;
    console.log(stringUtils.sortStockPrices(lastStocks3_1, currStocks3_2)); // throws an error -- Invalid Format

    let lastStocks3 = `      GOOG,135.40|AMZN,140.00`;
    let currStocks3 = `amzn,136.75|GOOG,135.60`;
    console.log(stringUtils.sortStockPrices(lastStocks3, currStocks3));// returns [{ symbol: 'GOOG', price: 135.6, change: 0.1 },{ symbol: 'AMZN', price: 136.75, change: -2.3 }]
    //Note 3. There should not be duplicate stock tickers in the input (invalid).

}catch(e){
    console.log(e);
}

try{
    //check ifthe space in between strings 
    console.log(stringUtils.mashUp("Flo wers", "Lilly","petals"));//returns Lillers Flowy
}catch(e){
    console.log(e);
}

try{
    console.log(stringUtils.mashUp(1, 2));//throws error //Error -- Invalid type of input data where type of String 1 is number and type of String 2 is number
    //console.log(stringUtils.mashUp([[[[[["12345 ", "23456 "]]]]]],[[[[["12345 ", "23456 "]]]]]));//Throws error //Error -- Invalid type of input data where type of String 1 is object and type of String 2 is object
}catch(e){
    console.log(e);
}

try{
    console.log(objUtils.solvePuzzles([{a: 23, b: 17, d: 2}, {b: 17, d: 3, e: "hello"}], {a: 45, b: 60, c:-3, d: 88, e: 12})); //returns [{a: 23, b: 17, c:-3, d: 2, e:12}, {a:45, b: 17, c:-3, d: 3, e: “hello”} ])
    console.log(objUtils.solvePuzzles([{b: "tree", d: "patrick"}], {a: "house", b: "apple", c: 50, d: 100, e:200})); //returns [{a: “house”,b: “tree”, c: 50, d: “patrick”, e:200}])
    console.log(objUtils.solvePuzzles([{b: "tree", d: "patrick"}], {a: "house", b: "apple", c: 50, d: 100, f:200})); //returns error//Pieces should have keys from a-e

}catch(e){
    console.log(e);
}

try{
    //console.log(objUtils.solvePuzzles({a: "house", b: "apple", c: 50, d: 100, f:200}, {a: "house", b: "apple", c: 50, d: 100, f:200})); // throws error - Invalid array for puzzles or it is empty
    //console.log(objUtils.solvePuzzles([{b: "tree", d: "patrick"}], [{b: "tree", d: "patrick"}]));// throws error // Error -- Invalid object for pieces or it is empty
    //console.log(objUtils.solvePuzzles( " ", [{b: "tree", d: "patrick"}]));//throws error//Invalid array for puzzles or it is empty
    //console.log(objUtils.solvePuzzles([{ a: 23, b: 17, d: "" },{ b: 23, e: 42 },{ c: 2, d: 12, e: 12 }],{ a: 45, b: 60, c: -3, d: NaN, e: 12 }));// throws error //Error - value of a key cannot be NaN for key - d
    //console.log(objUtils.solvePuzzles([{f: 17, d: 2}, {d: 3, e: "hello"}], {c:-3, b: 88, e: 12})); // throws error :Puzzles should have keys from a-e
    console.log(objUtils.solvePuzzles([{b:"patrick"}], {c: 50, d: 100, e:200}));//returns empty array {} // as the puzzle is incomplete without the value "a"
}catch(e){
    console.log(e);
}

try{
    //console.log(objUtils.combineObjects([{ a: 3, b: 7, c: 5 , d:7},{ d: 4, e: 9, a:"apple" },{ a: 8, d: 2 } ]));// Returns:{ a: [3, "apple", 8]   d: [7,4,2] })
    //console.log(objUtils.combineObjects([{ j:True, ba: 7, c: 5 , d:7},{ j:90, e: 9, a:"apple" }, { j:15, dd: 2 } ])); /* Returns:{j: [True, 90, 15]  } */
    //console.log(objUtils.combineObjects([{ k: "True", ba: 7, c: 5 , d:7},{ j: 90, e: 9, a:"apple" },{ j: 15, dd: 2 } ])); /* Returns:{} */
    console.log(objUtils.combineObjects([{ j: 15} ])); //throws error //Invalid array Please provide an array with at least two objects
    //console.log(objUtils.combineObjects([{  },{ j: 90, e: 9, a:"apple" },{ j: 15, dd: 2 } ]));// throws error //Invalid array  as object should have at least 1 key/value. 
    //work for True as it is boolean and it should work
}catch(e){
    console.log(e);
}

try{
    let hand1_1 = [[[[[{suit: 'hearts', value: 2}, {suit: 'clubs', value: '6'}]]]]];
    let communityCards1_1 = [ {suit: 'hearts', value: 'K'},{suit: 'hearts', value: 'K'},
    {suit: 'hearts', value: 'K'},{suit: 'hearts', value: 0}];
    console.log(objUtils.evaluatePokerHand(hand1_1, communityCards1_1));// throws error //Error -- Suit or values of card in hand is not String

}catch(e){
    console.log(e);
}

try{

    let hand1_1 = [{suit: 'hearts', value: '10'}, {suit: 'clubs', value: '9'}];
    let communityCards1_1 = [ [[[[[{suit: 'clubs', value: '8'},
    {suit: 'clubs', value: '6'},
    {suit: 'clubs', value: '10'},
    {suit: 'diamonds', value: '10'},
    {suit: 'clubs', value: '7'}]]]]]];
    console.log(objUtils.evaluatePokerHand(hand1_1, communityCards1_1)); // Returns "High Card"
    //evaluatePokerHand(hand1, communityCards1);

    let hand = [{suit: '  hearts', value: 'Q'}, {suit: 'hearts', value: 'K'}];
    let communityCards = [
        {suit: 'hearts', value: '8'},
        {suit: 'hearts', value: '7'},
        {suit: 'hearts', value: '10'},
        {suit: 'hearts', value: '9'},
        {suit: 'hearts', value: 'J'} ];
    //console.log(objUtils.evaluatePokerHand(hand, communityCards)); // Returns "Straight Flush"

    let hand_2 = [{suit: 'hearts', value: '6'}, {suit: 'hearts', value: '3'}];
    let communityCards_2 = [
        {suit: 'hearts', value: '4'},
        {suit: 'hearts', value: '5'},
        {suit: 'hearts', value: '2'}];
   // console.log(objUtils.evaluatePokerHand(hand_2, communityCards_2)); // Returns "Straight Flush"

    
    let hand1 = [{suit: 'hearts', value: '5'}, {suit: 'clubs', value: '5'}];
    let communityCards1 = [ {suit: 'diamonds', value: '4'},
    {suit: 'spades', value: '5'},
    {suit: 'hearts', value: '2'},
    {suit: 'clubs', value: 'J'},
    {suit: 'diamonds', value: 'Q'}];
    //console.log(objUtils.evaluatePokerHand(hand1, communityCards1)); // Returns "Three of a Kind"
    //evaluatePokerHand(hand1, communityCards1);
    
    let hand2 = [{suit: 'hearts', value: '4'}, {suit: 'clubs', value: '9'},{suit: 'hearts', value: '4'}];
    let communityCards2 = [
        {suit: 'diamonds', value: '2'},
        {suit: 'spades', value: '5'},
        {suit: 'hearts', value: '6'},
        {suit: 'clubs', value: '7'},
        {suit: 'diamonds', value: '8'}];
       // console.log(objUtils.evaluatePokerHand(hand2, communityCards2)); // throws error //Invalid hand cards provided as it should contain 2 cards 
    
        let hand3 = [{suit: 'hearts', value: '5'}, {suit: 'clubs', value: '6'}];
    let communityCards3 = [ {suit: 'diamonds', value: '4'},
    {suit: 'spades', value: '5'},
    {suit: 'hearts', value: '2'},
    {suit: 'clubs', value: 'J'},
    {suit: 'diamonds', value: 'Q'}];
    //console.log(objUtils.evaluatePokerHand(hand3, communityCards3)); // Returns "Pair"
}catch(e){
    console.log(e);
}

///
/*export const evaluatePokerHand = (hand, communityCards) => {
      ValidatePokerArray(hand,communityCards);
      let firstsuit = null;
      let sortedCardDict={};
      const sortedCards = [...hand, ...communityCards].map((card) => ({
            suit: card.suit.trim(),
            value: card.value.trim()
          })).sort((a, b) =>
            cardValues.indexOf(a.value) - cardValues.indexOf(b.value)
          );
       console.log(sortedCards);
       firstsuit = sortedCards[0].suit.trim();
       if(checkStraightFlush(sortedCards,firstsuit)){
            return "Straight Flush";
       }
       sortedCardDict= formCardDict(sortedCards);
       if(threeOfAKind(sortedCardDict)){
            return "Three of a Kind";
       }
       if(checkIfPair(sortedCardDict)){
            return "Pair";
       }else{
            return "HighCard";
       }
       /*if(checkIfHighCard(sortedCards)){
            return "HighCard";
       }*/
//}; 

/*function checkStraightFlush(sortedCards,firstsuit){
      const sameSuit= sortedCards.every((card)=>card.suit.trim().toLowerCase() === firstsuit.trim().toLowerCase());
      const firstValueIndex = cardValues.indexOf(sortedCards[0].value.trim());
      const areConsecutive = sortedCards.every(
            (card, index) =>
              cardValues.indexOf(card.value.trim()) === firstValueIndex + index
          );
      if(sameSuit && areConsecutive ){
            return true;
      }
      else {
            return false;
      }          
      
}*/

/*function formCardDict(sortedCards){
    const cardDict={};
    sortedCards.forEach((card)=>{
          if(cardDict[card.value]){
                cardDict[card.value]++;
          }else{
                cardDict[card.value]=1;
          }
    });
    return cardDict;

}*/

////shortest:shortest.length>1?shortest.sort():shortestvalue,
////:[a-zA-Z`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]+:
//const regex = /:(?!:)[^:]*\S[^:]*:(?!:)|:[^\s:]+:|:\w+:/g;
     //const formatPattern = /^[A-Za-z]{1,5},\s*("?\d+(\.\d{1,2})?"?\|)+[A-Za-z]{1,5},\s*("?\d+(\.\d{1,2})?"?\|)+[A-Za-z]{1,5},\s*("?\d+(\.d{1,2)?.\d{2}$)/;//works for fixed length with 3 prices