export const questionOne = (arr) => {
  // Implementation of  question 1 here
  const vowels ="AEIOUaeiou";
  let countVowels =0;
  let isEven = false;
  arr.forEach(eachWord =>{
    eachWord.split('').forEach(eachChar =>{
      if(vowels.includes(eachChar)){
        countVowels++;
      }
      isEven = countVowels%2 === 0;
    });

  });
  return[countVowels,isEven]; //returns result
};

export const questionTwo = (obj1, obj2) => {
  // Implementation question 2 here
  let keyObj1 = Object.keys(obj1);
  let keyObj2 = Object.keys(obj2);
  const uniqueKeyResult1 = keyObj1.filter(keyVal => keyObj2.indexOf(keyVal) == -1);
  const uniqueKeyResult2 = keyObj2.filter(keyVal => keyObj1.indexOf(keyVal) == -1);
  return uniqueKeyResult1.concat(uniqueKeyResult2);//returns result
};

export const questionThree = (arr) => {
  // Implementation question 3 here
  const valueObj ={};
  //arr.forEach(subArray => {subArray.forEach(side =>{console.log(side);})
  //arr.forEach(subArray => {console.log(subArray);});//works
  arr.forEach((subArray,index) => { 
    let perimeter =0;
    let area =0;
    const [a,b,c] = subArray;//Destructuring the subArray
    if(a === b && b === c && c === a ){
      perimeter = a+b+c;
      area = parseFloat(((Math.sqrt(3)/4) * a *a).toFixed(2)).toString();
    }
    if((a===b && b !== c && c !== a) ){
      const height = (Math.sqrt((Math.pow(a,2)) - (Math.pow(c/2,2))));
      area = parseFloat(((1/2) * c * height).toFixed(2)).toString();
      perimeter = 2*a +c;
    }
    if(a!==b && b === c && c!==a){
      const height = (Math.sqrt((Math.pow(b,2)) - (Math.pow(a/2,2))));
      area = parseFloat(((1/2) * a * height).toFixed(2)).toString();
      perimeter = 2*b +a;
    }
    if(a!==b && b !== c && c===a){
      const height = (Math.sqrt((Math.pow(a,2)) - (Math.pow(b/2,2))));
      area = parseFloat(((1/2) * b * height).toFixed(2)).toString();
      perimeter = 2*a +b;
    }
    if(a !== b && b !== c && c !== a){
      const side = (a + b+ c)/2;
      area = parseFloat((Math.sqrt(side*((side - a)*(side - b)*(side - c)))).toFixed(2)).toString();
      perimeter = a+b+c;  
    }
    valueObj[index] = [area, perimeter.toFixed(2)];

  });
  return valueObj; //returns result
};

export const questionFour = (string) => {
  // Implementation question 4 here
  const splitValues = string.split(",");
  const stringValues =[];
  splitValues.forEach(value => {
    //console.log(value.substring(Math.floor(value.length/2))+ value.substring(0,Math.floor(value.length/2)));
    //console.log(value.slice(Math.floor(value.length/2))+ value.slice(0,Math.floor(value.length/2)));
    stringValues.push(value.substring(Math.floor(value.length/2))+ value.substring(0,Math.floor(value.length/2)));
  });
  return stringValues; //returns result
};


//DO NOT FORGET TO UPDATE THE INFORMATION BELOW OR IT WILL BE -2 POINTS PER FIELD THAT IS MISSING.
export const studentInfo = {
  firstName: 'SUSHMITA',
  lastName: 'BAHALA',
  studentId: '20015641'
};
