import * as arrayUtils from './arrayUtils.js';
import * as stringUtils from './stringUtils.js';
import* as objUtils from './objUtils.js';

try{
    console.log(arrayUtils.mergeCommonElements([35, "hello", 24,  ["hi", 7], 2, -4], [2, ["62", 4], 1, 24, -4, "hi"])); //returns [-4, 2, 24, "hi"]

}catch(e){
    console.log(e);
}
try{
    console.log(arrayUtils.mergeCommonElements([], [4, 5, 6], [4]) ); // throws an error//Invalid Array as each array should have atleast one string or number

}catch(e){
    console.log(e);
}

try{
    console.log(arrayUtils.findTriangles([[.75, .75, .75],[1.001, 1.002, 1.001], [7, 8, 9]])); //returns { "0": [ 0.24, 2.25,'equilateral'  ], "1": [ 0.43, 3,'isoceles' ], "2": [ 26.83, 24 ,'scalene'] }
}catch(e){
    console.log(e);
}
try{
    console.log(arrayUtils.findTriangles([[ 4,  5,  4],[7,7,6,8]]));//throws error //Error -- Array of subarrays with 3 values each is required
}catch(e){
    console.log(e);
}
try{
    console.log(arrayUtils.stringMetrics(["apple", "banana", "cherry", "date", "fig", "grape"])); //returns { vowels: 11, consonants: 18,longest: [ 'banana', 'cherry' ],shortest: 'fig',mean: 4.83,median: 5,mode: [ 5, 6 ]}
}catch(e){
    console.log(e);
}

try{
    console.log(arrayUtils.stringMetrics(["     hello", "patrick"," "," " ,"hill", "trees", "seventeen"]));//thows error//Error -- Invalid input provided
}catch(e){
    console.log(e);
}

try{
    console.log(stringUtils.emojiCounter(":::smile::smile:")); //  returns 2
}catch(e){
    console.log(e);
}

try{
    console.log(stringUtils.emojiCounter("             ")); // Throws error //Errorr ---Valid Emoji Message is not provided

}catch(e){
    console.log(e);
}
try{
    let lastStocks = `AAPL,175.25|GOOG,135.40|AMZN,140.00`;
    let currStocks = `amzn,136.75|GOOG,135.60|AAPL,180.12`;
    console.log(stringUtils.sortStockPrices(lastStocks, currStocks)); // returns [{symbol: "AAPL", price: 180.12, change: 2.8 }, {symbol: "GOOG", price: 135.60, change: 0.1}, {symbol: "AMZN", price: 136.75, change: -2.3}]

}catch(e){
    console.log(e);
}

try{

    let lastStocks3_3 = `GME,18.25|GME,18.25`;
    let currStocks3_3 = `GME,18.25|GME,18.25`;
    console.log(stringUtils.sortStockPrices(lastStocks3_3, currStocks3_3)); // throws an error -- Duplicate Stock Ticker found

}catch(e){
    console.log(e);
}

try{
    console.log(stringUtils.mashUp("Flo wers", "Lilly","petals"));//returns Lillers Flowy
}catch(e){
    console.log(e);
}

try{
    console.log(stringUtils.mashUp(1, 2));//throws error //Error -- Invalid type of input data where type of String 1 is number and type of String 2 is number
}catch(e){
    console.log(e);
}

try{
    console.log(objUtils.solvePuzzles([{a: 23, b: 17, d: 2}, {b: 17, d: 3, e: "hello"}], {a: 45, b: 60, c:-3, d: 88, e: 12})); //returns [{a: 23, b: 17, c:-3, d: 2, e:12}, {a:45, b: 17, c:-3, d: 3, e: “hello”} ])
    console.log(objUtils.solvePuzzles([{b: "tree", d: "mountain"}], {a: "house", b: "apple", c: 50, d: 100, e:200})); //returns [{a: “house”,b: “tree”, c: 50, d: “patrick”, e:200}])
}catch(e){
    console.log(e);
}

try{
    console.log(objUtils.solvePuzzles([{b: "tree", d: "patrick"}], {a: "house", b: "apple", c: 50, d: 100, f:200})); //returns error//Pieces should have keys from a-e
}catch(e){
    console.log(e);
}
try{

    let hand = [{suit: 'clubs', value: '7'}, {suit: 'clubs', value: '5'}];
    let communityCards = [
        {suit: 'clubs', value: '6'},
        {suit: 'clubs', value: '4'},
        {suit: 'hearts', value: '2'},
        {suit: 'clubs', value: '3'},
        {suit: 'hearts', value: '6'}
    ];
    console.log(objUtils.evaluatePokerHand(hand, communityCards)); // Returns "Straight Flush"
}catch(e){
    console.log(e);
}

try{
    let hand = [{suit: 'hearts', value: '4'}, {suit: 'clubs', value: '9'},{suit: 'hearts', value: '4'}];
    let communityCards = [
        {suit: 'diamonds', value: '2'},
        {suit: 'spades', value: '5'},
        {suit: 'hearts', value: '6'},
        {suit: 'clubs', value: '7'},
        {suit: 'diamonds', value: '8'}];
        console.log(objUtils.evaluatePokerHand(hand, communityCards)); // throws error //Invalid hand cards provided as it should contain 2 cards 
}catch(e){
    console.log(e);
}
try{
    console.log(objUtils.combineObjects([[[[{ a: 2, b: 7, c: 5 , d:7},{ d: 4, e: 9, a:"fruits" },{ a: 7, d: 2 }]]] ]));//returns {a: [2, "fruits", 7] d: [7,4,2]}
    console.log(objUtils.combineObjects(
        [   { j: true, ba: 7, c: 5 , d:7},
            { j: 90, e: 9, a:"apple" },
            { j: 15, dd: 2 }]
        ));
}catch(e){
    console.log(e);
}
try{
    console.log(objUtils.combineObjects([{ a: 2, b: 7, c: 5 , d:7}],[{ a: 2, b: 7, c: 5 , d:7}],[{ a: 2, b: 7, c: 5 , d:7}]));//Error -- Invalid array Please provide an array with at least two objects
    
}catch(e){
    console.log(e);
}

