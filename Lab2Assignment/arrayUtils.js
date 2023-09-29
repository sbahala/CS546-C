/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
const checkArrays = (args) => {
  if (args.length < 2) {
    throw `Error -- Array Size less than two`;
  }
  args.forEach((subarray) => {
    if (subarray.flat(Infinity).length <= 0) {
      throw `Error --Invalid Array as each array should have atleast one string or number`;
    }
    if (!Array.isArray(subarray.flat(Infinity))) {
      throw `Error -- All the elements are not array`;
    }
  });
  args.forEach((subarray)=>{
    subarray.flat(Infinity).forEach(value=>{
      if((typeof(value) !== 'string' && typeof(value) !== 'number')|| (typeof(value) === 'number' && isNaN(value))|| typeof(value) === 'boolean' || typeof(value) ==='object'){
        throw `Error -- value should be either number or string not: "${JSON.stringify(value)}"`;

      }
      if(value === null){
        throw `Error -- value should be either number or string `;

      }
      if(value === undefined){
        throw `Error -- value cannot be undefined `;
      }
    })
  })

};
const checkArraysize = (arr) => {
  if(arr == null || arr.length === 0){
    throw`Error -- Input provided is undefined , empty or null`;
  }
  if (typeof arr === 'string' && arr.trim() === "") {
    throw `Error -- Input provided contains whitespace string and not a valid array.`;
  }
  if(!arr.some((subarrays)=> Array.isArray(subarrays))){
    throw `Error -- No subarray provided for 3D Array`;
  }
  for (let i = 0; i < arr.length; i++) {
    if (!Array.isArray(arr[i]) || arr[i].length < 3) {
      throw `Error -- Array of subarrays should have only numbers.`;
  }}
  if(!Array.isArray(arr) || !arr.every(subarrays => Array.isArray(subarrays) && subarrays.length === 3)){
    throw `Error -- Array of subarrays with 3 values each is required`;
  }
  arr.forEach((subArray) =>{
    if ([0,1,2].includes(subArray.length)){
      throw `Error -- No proper values provided for Array`;
    }
    if(!Array.isArray(subArray)){
      throw `Error -- All the elements are not array`;
    }
    subArray.forEach((element)=>{
      if(typeof(element)!== 'number'){
        throw   `Error -- In subarray ${element} not a number`;
      }
    });
  });
};
function validTraingleCheck(a,b,c){
  if (!(typeof(a) === 'number'|| typeof(b) === 'number' || typeof(c) === 'number'))
  {
    throw `Error -- [ ${a}, ${b}, ${c} ] are not number type to form a valid traingle`;
  }
  if(a ===0 || b ===0 || c === 0){
    throw `Error -- [ ${a}, ${b}, ${c} ]doesn't form a valid traingle`;
  }
  if(!(a+b > c && a+c >b && b+c >a)){
    throw `Error -- [ ${a}, ${b}, ${c} ]doesn't form a valid traingle`;
  }
}
const stringMetricArray = (arr) => {
  if(!arr){
    throw `Error -- No array argument provided`;
  }
  arr=arr.flat(Infinity);
  if (!Array.isArray(arr)) {
    throw `Error -- Improper Array argument provided`;
  }
  if (arr.length < 2) {
    throw `Error -- At least two strings required for stringMetric calculation`;
  }
  arr.forEach((value) => {
    if (typeof value !== 'string' || value === undefined || value.trim() ==="") {//|| specialChars.test(value)//not required
      throw `Error -- Invalid input provided`;
    }
  });
};
export const mergeCommonElements =(...args)=>{
  checkArrays(args);
  const flattenedArrays = args.map(subArray => subArray.flat(Infinity));
  const commonArray = args.flat(Infinity).filter(eachElement =>{
    return flattenedArrays.every(arr => arr.includes(eachElement));
  });
  const uniqArray = Array.from(new Set(commonArray)).sort((a,b)=>{
    const value1 = typeof(a);
    const value2 = typeof(b);
    if(value1 === value2){
      if(value1 === 'number'){
        return a - b;
      } else if(value1 === 'string'){
        return a.localeCompare(b);
      }
    }
    else{
      if (value1 === 'number'){
        return -1;
      }
      else{
        return 1;
      }
    }
    return 0;
  });
  return uniqArray;
}
export const findTriangles = (arr) => {
  checkArraysize(arr);
  const valueObj ={};
  arr.forEach((subArray,index) => {
    let perimeter =0;
    let area =0;
    let triangleType ="";
    const[a,b,c] = subArray;
    validTraingleCheck(a,b,c);
    if(a === b && b === c && c === a ){
      perimeter = a+b+c;
      area = parseFloat(((Math.sqrt(3)/4) * a *a).toFixed(2));
      triangleType = "equilateral";
    }
    if((a===b && b !== c && c !== a) ){
      const height = (Math.sqrt((Math.pow(a,2)) - (Math.pow(c/2,2))));
      area = parseFloat(((1/2) * c * height).toFixed(2));
      perimeter = 2*a +c;
      triangleType = "isoceles";
    }
    if(a!==b && b === c && c!==a){
      const height = (Math.sqrt((Math.pow(b,2)) - (Math.pow(a/2,2))));
      area = parseFloat(((1/2) * a * height).toFixed(2));
      perimeter = 2*b +a;
      triangleType = "isoceles";
    }
    if(a!==b && b !== c && c===a){
      const height = (Math.sqrt((Math.pow(a,2)) - (Math.pow(b/2,2))));
      area = parseFloat(((1/2) * b * height).toFixed(2));
      perimeter = 2*a +b;
      triangleType = "isoceles";
    }
    if(a !== b && b !== c && c !== a){
      const side = (a + b+ c)/2;
      area = parseFloat((Math.sqrt(side*((side - a)*(side - b)*(side - c)))).toFixed(2));
      perimeter = a+b+c;
      triangleType = "scalene";
    }
    perimeter = parseFloat(perimeter.toFixed(2));
    valueObj[index] = [area, perimeter,triangleType];

  });
  return valueObj;

};

export const stringMetrics = (arr) => {
  stringMetricArray(arr);
  if(!arr){
    throw `Error -- No array argument provided`;
  }
  arr=arr.flat(Infinity);
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
  const filteredArray = arr.map((str) => str.trim()).filter((str) => str !== "");
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
  const countWords = Math.max(...Object.values(dict));
  const numberOfModes = Object.keys(dict).filter(key => dict[key] === countWords).map(Number).sort((a, b) => a - b);
  mode = countWords === 1? null: numberOfModes.length === 0 ? null : (numberOfModes.length === 1 ? numberOfModes[0] : numberOfModes);
  let longestvalue ='';
  const uniqueLongestValue = [...new Set(longest)];
  if (uniqueLongestValue.length === 1){
    longestvalue = uniqueLongestValue[0];
  }
  else{
    longestvalue = uniqueLongestValue.sort();
  }
  let shortestvalue ='';
  const uniqueShortestValue = [...new Set(shortest)];
  if (uniqueShortestValue.length === 1) {
    shortestvalue = uniqueShortestValue[0];
  }
  else {
    shortestvalue = uniqueShortestValue.sort();
  }
  const mid = Math.floor(lengths.length / 2);
  medianLen= newArr.length % 2 !== 0 ? lengths[mid] : (lengths[mid - 1] + lengths[mid]) / 2;
  return {vowels: countVowels,
    consonants: consonants,
    longest: longestvalue,
    shortest:shortestvalue,
    mean:parseFloat(mean.toFixed(2)),
    median:parseFloat(medianLen.toFixed(2)),
    mode:mode};
};