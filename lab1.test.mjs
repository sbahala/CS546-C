import * as lab1 from './lab1.mjs';

//TODO: Calling each function in lab1.mjs 5 times each, passing in different input
console.log(lab1.questionOne(["Hello", "good", "weather", "today"])); // returns  and logs[9, false]
console.log(lab1.questionOne(["I", "love", "CS 546.", "Best class ever."])); // returns and logs [7, false] 
console.log(lab1.questionOne(["Ths s nrdbl", "grd"])); // returns and logs [0, true]
console.log(lab1.questionOne(["I","started","learning","WebProgramming"])); // returns and logs [ 10, true ]
console.log(lab1.questionOne(["Spring","is","best","to",";"])); // returns and logs [ 4, true ]


console.log(lab1.questionTwo({ a: 3, b: 2, c: 1, d: 7 }, { a: 6, b: 5, c: 4, e: 8 })); // returns and logs ["d","e"]
console.log(lab1.questionTwo({ a: 3, a: 2, c: 1, c: 7 }, { a: 6, b: 5, c: 4, e: 8 })); // returns and logs[ 'b', 'e' ]
console.log(lab1.questionTwo({ a: 6, b: 5, c: 4, e: 3 }, { a: 6, b: 5, c: 4, d: 4, e: 3 })); //returns and logs[ 'd' ]
console.log(lab1.questionTwo({ a: 2, b: 3, c: 4, d: 5 }, { a: 2, b: 3, c: 4, d: 5})); // returns and logs[] as all the keys are same
console.log(lab1.questionTwo({ a: 3, b: 2, c: 1, d: 7, f: 8, g: 2 }, { a: 6, b: 5, c: 4, e: 8 })); // returns and logs[ 'd', 'f', 'g', 'e' ]


console.log(lab1.questionThree([[3,3,3], [3,3,4], [5,4,2]])); // returns and logs{ '0': [ '3.9', 9 ], '1': [ '4.47', 10 ], '2': [ '3.8', 11 ] }
console.log(lab1.questionThree([[7,5,5], [2,4,3], [8,5,6], [12,12,11]]));   // returns and logs{'0': [12.5, 17], '1': [2.9,9], '2': [14.98,19], '3': [58.66,35]} 
console.log(lab1.questionThree([[13,24,13],[2,4,4],[5,5,5],[6,6,7]])); // returns and logs{'0': [ '60', 50 ],'1': [ '3.87', 10 ],'2': [ '10.83', 15 ],'3': [ '17.06', 19 ]}
console.log(lab1.questionThree([[4,4,4],[2,4,4],[5,5,5],[7,7,7]])); // returns and logs{'0': [ '6.93', 12 ], '1': [ '3.87', 10 ], '2': [ '10.83', 15 ], '3': [ '21.22', 21 ] }
console.log(lab1.questionThree([[3.5,3.5,3.5],[7.5,6.5,6.5],[7.5,8.0,7.5],[6.8,5.2,7.1]])); // returns and logs{'0': [ '5.3', 10.5 ],'1': [ '19.91', 20.5 ], '2': [ '25.38', 23 ], '3': [ '16.73', 19.1 ] }

console.log(lab1.questionFour('patrick,hill,trees,home'));  // returns and logs ['rickpat', 'llhi', 'eestr', 'meho']
console.log(lab1.questionFour('joseph,ball,square,pencil'));  //returns and logs ['ephjos', 'llba', 'aresqu', 'cilpen']
console.log(lab1.questionFour('sushmita,bahala,software,student'));// returns and logs ['mitasush','alabah','waresoft','dentstu']
console.log(lab1.questionFour('baking,cake,needs,practice')); // returns and logs ['ingbak','keca','edsne','ticeprac']
console.log(lab1.questionFour('explore,newyork,during,spring')); // returns and logs ['loreexp','yorknew','ingdur','ingspr']