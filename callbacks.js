console.log('plat');
setTimeout(()=>{
    console.log('Fertilizer');
},5000);
console.log('Add');

//

console.log('plat');
setTimeout(()=>{
    console.log('Fertilizer');
    console.log('Add');
},5000);


const list =["Super","may","hi"];
const newlist = list.map((element)=>{
    return element +'man'
});

console.log(newlist);

function greeting {
    //console.log

}
function intro(first,last,callback){

const fullname = first+last; //names;
callback(fullname);
}
//ImageBitmapRenderingContext('patrick','hill,greeting');


//Promise example
const weather = true;
constdate = new Promise((resolve,reject)=>{
    if(weather){
    const details={};
    resolve(details);
    }else{
        reject();
    }

})

date 
    then((details)=>{
        console.log
    })
    .catch((error)=>{
        console.log("error");
    });
//

function date(){
    if(weather){
    const details={name:"xyz"};
    resolve(details);
    return Promise.resolve(details);
    }else{
        return Promise.reject("bad weather");
    }

}

date()
    .then((details)=>{
        console.log
    })
    .catch((error)=>{
        console.log("error");
    });
//
const myDate=()=>{
date()
    .then((details)=>{
        console.log
    })
    .catch((error)=>{
        console.log("error");
    });
};
myDate();
console.log('This runs first');// Irrespective of the above function being called this console prints first


//async
async function myfun(){

}
//
//return in async - promise fullfiling
const myRidev= async()=>{
    return'20164Matic';
};
const yourRide=()=>{
    return Promise.resolve("hi");
}

function foo(){
    return Promise.reject('Rejected');
}

async function hi(){//this rejects promise
    throw `error`;
}

//

async function hi(){//this rejects promise
    try{
        let details = await date();
        let message = await ondragover(details);
        console.log(message);

    }catch(e){
        console.log(error);
    }
}