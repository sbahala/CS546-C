export const questionOne = (arr) => {
  // Implementation of  question 1 here
  if(arr.length === 0){
    return "NoValuesPassed for question One";
  }
  const vowels ="AEIOUaeiou";
  let count =0;
  let isEven = false;
  arr.forEach(eachWord =>{
    eachWord.split('').forEach(eachChar =>{
      if(vowels.includes(eachChar)){
        count++;
      }
      isEven = count%2 === 0;
    });

  });
  return[count,isEven]; //return result
};

export const questionTwo = (obj1, obj2) => {
  // Implementation question 2 here
  if(Object.keys(obj1).length === 0 || Object.keys(obj2).length === 0){
    return "NoValuesPassed for question Two";
  }
  let keyObj1 = Object.keys(obj1);
  let keyObj2 = Object.keys(obj2);
  const uniqueKeyResult1 = keyObj1.filter(keyVal => keyObj2.indexOf(keyVal) == -1);
  const uniqueKeyResult2 = keyObj2.filter(keyVal => keyObj1.indexOf(keyVal) == -1);
  return uniqueKeyResult1.concat(uniqueKeyResult2);//return result
};

export const questionThree = (arr) => {
  // Implementation question 3 here
  if(arr.length === 0){
    return "NoValuesPassed for question Three";
  }
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
    valueObj[index] = [area, perimeter];

  });
  return valueObj; //return result
};

export const questionFour = (string) => {
  // Implementation question 4 here
  if(string.trim().length === 0){
    return "NoValuesPassed for question Four";
  }
  const splitValues = string.split(",");
  const stringValues =[];
  let val =0;
  splitValues.forEach(value => {
    let valSize = value.length;
    let flag = valSize%2 ==0 ?true:false;
    if(flag){
      val = valSize/2;
    }
    else{
      //val = Math.ceil(valSize/2); //ceil gives the o/p = ickpatr for patrick
      val =  Math.floor(valSize/2); //floor gives the o/p = rickpat for patrick

    }
    let eachValues = callSplit(valSize,value,val);
    stringValues.push(eachValues);
  });
  return stringValues; //return result
};
function callSplit(valSize,value,val){
  let newWord='';
  for(let i =val;i<valSize;i++){
    newWord += value[i];
  }
  for(let i =0;i<val;i++){
    newWord += value[i];
  }
  return newWord;
}

//DO NOT FORGET TO UPDATE THE INFORMATION BELOW OR IT WILL BE -2 POINTS PER FIELD THAT IS MISSING.
export const studentInfo = {
  firstName: 'Sushmita',
  lastName: 'Bahala',
  studentId: '20015641'
};
