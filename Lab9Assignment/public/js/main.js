//Here is where you will do all of the logic and processing for the palindrome and prime checking.

/*const checkPalindrome =(inputValue)=>{
    if(!inputValue){
        throw `Please enter a value to check for Palindrome`;
    }
    inputValue = inputValue.trim();
    if(inputValue.length == 0 ){
        throw `Please enter a value as you have just entered empty spaces`;
    }
    inputValue = inputValue.toLowerCase().replaceAll(" ",'').replace(/[^\w\s]/g,"")
    if(inputValue.length == 0){
        throw  `Please enter a valid string or value to check`;
    }
    let first = inputValue.slice(0,inputValue.length/2).split("").reverse().join(""),second
    if(inputValue.length % 2 == 0){
        second = inputValue.slice(inputValue.length/2);
    }else{
        second = inputValue.slice((inputValue.length/2)+1);

    }if(first == second){
        return true;
    }else{
        return false;
    }

}*/

const isPrime =num=>{
    for(let i =2,s=Math.sqrt(num);i<=s;i++){
        if(num%i === 0) return false;
    }
    return num>1;

};
const checkIFPalindrome= str =>{
    const val = str.toLowerCase().replace(/[^a-z0-9]/gi,'');
    return(
        val === val.split('').reverse().join('')
    );
};
let formElement = document.getElementById("palindromeForm");
let inputValue = document.getElementById("palindrome_input");
let ol = document.getElementById("palindromes");
let errorDiv = document.getElementById('error');

inputValue.addEventListener('input',()=>{
    if(!errorDiv.hidden){
        errorDiv.hidden = true;
    }
})

formElement.addEventListener('submit',(event)=>{
    console.log('Form submission fired');
    event.preventDefault();
    console.log('Has a form');
    errorDiv.hidden = true;
    if(!inputValue.value){
        errorDiv.textContent ='Input cannot be empty';
        errorDiv.hidden = false;
        return;
    }
    if(!inputValue.value.trim()){
        errorDiv.textContent ='Input cannot be only spaces';
        errorDiv.hidden = false;
        return;
    }
    const words = inputValue.value.split(',');
    const res = words.map(checkIFPalindrome);
    //const count = res.filter(Boolean).length;
    const count = words.length;
    const resList = document.createElement('li');
    resList.textContent = JSON.stringify(res);
    if(isPrime(count)){
        resList.className = "prime";
    }else{
        resList.className = "not-prime";
    }
    document.getElementById('palindromes').appendChild(resList);

    inputValue.value='';

    

    /*try{
        errorDiv.hidden = true;
        const inputPalValue = inputValue.value;
        const palindromeNodes = document.createTextNode(inputPalValue);
        const isPal = checkIFPalindrome(inputPalValue);
        li = document.createElement("li");
        li.appendChild(palindromeNodes);
        if(isPal){
            li.className = "is-Palindrome";
        }else{
            li.className = "is-Palindrome";
        }
        ol.insertBefore(li,ol.childNodes[0]);

    }catch(e){
        errorDiv.hidden = false
        errorDiv.textContent =e;

    }*/

})
