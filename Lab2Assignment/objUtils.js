/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
const keys=["a","b","c","d","e"];
const defaultSuits=['spades','hearts','diamonds','clubs'];
const defaultValues=['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
function checkValidKeys(puzzles,pieces){
      puzzles.forEach((arr)=>{
            Object.keys(arr).forEach((arrayObj)=>{
                  if(!keys.includes(arrayObj)){
                        throw `Error -- Puzzles should have keys from a-e`;
                  }
            })
      })
      Object.keys(pieces).forEach(element => {
            if(!keys.includes(element)){
                  throw `Error -- Pieces should have keys from a-e`;
            }           
      });
}
function puzzleValidation(puzzles,pieces){
      if(!puzzles || !pieces){
            throw `Error -- Provide puzzles as an array of objects and pieces as objects with key and values`;
      }
      if(!Array.isArray(puzzles)||!puzzles || puzzles.length ===0){
            throw `Error -- Invalid array for puzzles or it is empty`;
      }
      if(!pieces||typeof(pieces)!=="object" || Array.isArray(pieces)|| Object.keys(pieces).length === 0){
            throw `Error -- Invalid object for pieces or it is empty`;
      }
}

function checkifAllKeysAvailable(solvedPuzzle) {
      return keys.every((key) =>
        solvedPuzzle.some((element) => Object.keys(element).includes(key))
      );
}
function checkIfNaNValueExist(valueObj){
      Object.entries(valueObj).forEach(([key,val])=>{
            if(Number.isNaN(val)){
                  throw `Error - value of a key cannot be NaN for key - ${key}`;
            }

      })
}
function validateArr(arr){
      if (!Array.isArray(arr) || arr.length < 2) {
            throw `Error -- Invalid array Please provide an array with at least two objects`;
          }
      if(arr.some(val=>Array.isArray(val))){
            throw `Error -- Array of arrays provided`;
      }
      if (!arr.every(obj => typeof(obj) === 'object' && obj!== null && !Array.isArray(obj))){
            throw `Error -- Invalid array as every element must be an object`;
      }
      /*if(!arr.every((obj)=>Object.keys(obj).length>0 && Object.values(obj).every(eachvalue => eachvalue !== null && eachvalue !== ""))){
            //if (!arr.every((obj) => Object.keys(obj).length > 0)) {
            throw `Error -- Invalid array  as object should have at least 1 valid key/value`;
      }*/
      arr.forEach(obj =>{
            const keys = Object.keys(obj);
            const value = Object.values(obj);
            if(keys.length === 0 || keys.includes(null) || !keys.every(key => key.trim()!=="")){
                  throw `Error -- Invalid array  as object should have at least 1 valid key/value`;
            }
            if(!keys.every(key=> key!== "null" && key !== "")){
                  throw `Error -- Keys cannot be empty or null`;
            }
            if(!value.every(value=> value!== null && value !== "")){
                  throw `Error -- Values cannot be empty or null`;
            }
      })
}
function ValidatePokerArray(hand,community){
      if(!Array.isArray(hand) || !Array.isArray(community)){
            throw `Error -- Invalid array `;
      }
      if(!hand || hand.length!==2){
            throw `Error -- Invalid hand cards provided as it should contain 2 cards `;
      }
      if(!community || community.length<3 || community.length>5 ){
            throw `Error -- Invalid community cards provided as valid cards is betwwen 3 to 5 cards`;
      }
      hand.forEach((card)=>{
            if(!('suit'in card )|| !('value'in card)){
                  throw `Error -- Invalid card object: ${JSON.stringify(card)} `;
            }
            if(typeof(card.suit)!== "string" || typeof(card.value)!=="string"){
                  throw `Error -- Suit or values of card in hand is not String`;
            }
            if(!defaultSuits.includes(card.suit.trim()) || !defaultValues.includes(card.value.trim())){
                  throw `Error -- Hand has invalid suit or values: ${JSON.stringify(card)} `;
            }
      })
      community.forEach((card)=>{
            if(!('suit'in card )|| !('value'in card)){
                  throw `Error -- Invalid card object: ${JSON.stringify(card)} `;
            }
            if(typeof(card.suit)!== "string" || typeof(card.value)!=="string"){
                  throw `Error -- Suit or values of card in community is not String`;
            }
            if(!defaultSuits.includes(card.suit.trim()) || !defaultValues.includes(card.value.trim())){
                  throw `Error -- Community has invalid suit or values: ${JSON.stringify(card)}`;
            }
      })
      
}
function checkStraightFlush(sortedCards,cardSuitCount){
      const straight = sortedCards.length>=5 && sortedCards.slice(-5).every((val,index,arr) => index === 0 || defaultValues.indexOf(val) === defaultValues.indexOf(arr[index-1])+1);
      const flush = Object.values(cardSuitCount).some(cardcount => cardcount>= 5);
      if(straight && flush){
            return true;
      }else{
            return false;
      }

}
function threeOfAKind(cardValueCount){
      return Object.values(cardValueCount).some(cardcount => cardcount ==3);
}
function checkIfPair(cardValueCount){
      return Object.values(cardValueCount).some(cardcount => cardcount ==2);

}
function checkIfHighCard(sortedCard){
      let highCardCount =null;
      sortedCard.forEach((card)=>{
            if(typeof(card.value) === 'number'){
                  highCardCount++;
            }
      });
      if(highCardCount === 3){
            return true;
      }
}
export const solvePuzzles = (puzzles, pieces) => {
      puzzleValidation(puzzles,pieces);
      checkValidKeys(puzzles,pieces);
      const solvedPuzzle =[];
      const requiredkey =[];
      puzzles.forEach(elements=>{
            const puzzles1 = { ...elements };

            keys.forEach(key=>{
                  if(!puzzles1.hasOwnProperty(key) && pieces.hasOwnProperty(key)){
                        if (typeof pieces[key] === "string") {
                              puzzles1[key] = pieces[key].trim();
                            } else {
                              puzzles1[key] = pieces[key];
                            }
                  }
            })
            const sortkeys ={};
            keys.forEach(key => {
                  if(puzzles1.hasOwnProperty(key)){
                        if (typeof puzzles1[key] === "string") {
                              sortkeys[key] = puzzles1[key].trim();
                            } else {
                              sortkeys[key] = puzzles1[key];
                            }
                  }
            })
            checkIfNaNValueExist(sortkeys);
            solvedPuzzle.push(sortkeys);
      });
      if(checkifAllKeysAvailable(solvedPuzzle)){
            return solvedPuzzle;
      }
      else{
            return {};            
      }
      
};
export const evaluatePokerHand = (hand, communityCards) => {
      hand = hand.flat(Infinity);
      communityCards = communityCards.flat(Infinity);
      ValidatePokerArray(hand,communityCards);
      const allCards = hand.concat(communityCards);
      const cardSuitCount ={};
      const cardValueCount={};
      let isStraightFlush = false;
      let isThreeOfAKind = false;
      let isPair = false;
      for(const card of allCards){
            cardSuitCount[card.suit] = (cardSuitCount[card.suit] || 0)+1;
            cardValueCount[card.value] = (cardValueCount[card.value] || 0)+1;            
      }
      const sortedCardValues = defaultValues.filter(val=>cardValueCount.hasOwnProperty(val))
      .sort((firstval,secondval)=> defaultValues.indexOf(firstval) - defaultValues.indexOf(secondval));
      isStraightFlush = checkStraightFlush(sortedCardValues,cardSuitCount);
      if(isStraightFlush){
            return "Straight Flush";
      }
      isThreeOfAKind = threeOfAKind(cardValueCount);
      if(isThreeOfAKind){
            return "Three of a Kind";
      }
      isPair = checkIfPair(cardValueCount);
      if(isPair){
            return "Pair";
      }else{
            return "High Card";
      }

}
export const combineObjects = (arr) => {
      if(!arr){
            throw `Error - Array of objects not provided`;
      }
      arr = arr.flat(Infinity);
      validateArr(arr);
      const combinedResult ={};
      const commonKeys = Object.keys(arr[0]).filter((key) => arr.every((obj) => obj.hasOwnProperty(key)));
      arr.forEach((obj)=>{
            commonKeys.forEach((key)=>{
                  const trimvalue = typeof obj[key]==='string'?obj[key].trim():obj[key];
                  if(combinedResult.hasOwnProperty(key)){
                        combinedResult[key].push(trimvalue);
                  }
                  else{
                        combinedResult[key] = [trimvalue];
                  }
            });
      });
      /*const commonKeys = arr.reduce((keys, obj) => {
            return keys.filter((key) => obj.hasOwnProperty(key));
          }, Object.keys(arr[0]));
      const finalResult = {};
      commonKeys.forEach(key=>{
            finalResult[key]=combinedResult[key];
      })*/
      return combinedResult;

};
