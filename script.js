  let solveBtn = document.getElementById('solve-btn')
  solveBtn.style.display = 'none'


// in-game sounds
let swooshSound = new Audio('sounds/swish_quiet.mp3')
let foundationDrop = new Audio('sounds/foundation_drop.mp3')
  //variabel to add event listeners to all piles using forEach
var dropPilesEl = document.querySelectorAll('.piles')
// to add event listeners to all foundation piles using forEach
var foundationPilesEl = document.querySelectorAll('.foundation-pile')


// seven pile elements
var pileOne = document.getElementById('pile-one');
var pileTwo = document.getElementById('pile-two');
var pileThree = document.getElementById('pile-three');
var pileFour = document.getElementById('pile-four');
var pileFive = document.getElementById('pile-five');
var pileSix = document.getElementById('pile-six');
var pileSeven = document.getElementById('pile-seven');

console.log(pileFive.getBoundingClientRect())
// all drop pile elements
let allPileElements = [pileOne, pileTwo, pileThree, pileFour, pileFive, pileSix, pileSeven]



// foundation piles
let foundationPileOne = document.getElementById('foundation-one');
let foundationPileTwo = document.getElementById('foundation-two');
let foundationPileThree = document.getElementById('foundation-three');
let foundationPileFour = document.getElementById('foundation-four');


// get coordinates for all foundation
let foundationOneCoords = foundationPileOne.getBoundingClientRect()
let foundationTwoCoords = foundationPileOne.getBoundingClientRect()
let foundationThreeCoords = foundationPileOne.getBoundingClientRect()
let foundationFourCoords = foundationPileOne.getBoundingClientRect()


// all foundation elements
let allFoundationElements = [foundationPileOne, foundationPileTwo, foundationPileThree, foundationPileFour]


  // scenario buttons 
let scenarioOneBtn = document.getElementById('scenario-1-btn');
let scenarioTwoBtn = document.getElementById('scenario-2-btn');
let scenarioThreeBtn = document.getElementById('scenario-3-btn');

  // scenario buttons container 
  let scenariosBtns = document.getElementById('scenario-btns');


    // scenario buttons 
let refreshBtn = document.getElementById('refresh-btn');
  // // test to delay loop
  // for(let i = 1; i < 11; i++){
  //   setDelay(i)
  // }



  // function setDelay(i){
  //   setTimeout(() => {
  //     console.log(i)
  //   }, 1000*i);
  // }
  // FETCHING EAMPLE SOLVE SITUATION FOR TESTING SOLVE BUTTON - 

  // variables for foundation trackers and drop pile trackers in solve scenario
  let dropPilesScenario = [];
  let foundationPilesScenario = [];
  



    function scenarioOne(){

      fetch('/solve_scenario.json')
      .then(res => res.json())
      .then(data =>{
  
        dropPilesScenario.push(...data.drop_piles)
  foundationPilesScenario.push(...data.foundations)
          getArrays(dropPilesScenario, foundationPilesScenario)
      })
    }

    function scenarioTwo(){

      fetch('/solve_scenario_2.json')
      .then(res => res.json())
      .then(data =>{
  
        dropPilesScenario.push(...data.drop_piles)
  foundationPilesScenario.push(...data.foundations)
          getArrays(dropPilesScenario, foundationPilesScenario)
      })
    }

    
    function scenarioThree (){

      fetch('/solve_scenario_3.json')
      .then(res => res.json())
      .then(data =>{
  
        dropPilesScenario.push(...data.drop_piles)
  foundationPilesScenario.push(...data.foundations)
          getArrays(dropPilesScenario, foundationPilesScenario)
      })
    }
    


// event  listeners for scenario buttons 
scenarioOneBtn.addEventListener('click', () =>{
  scenariosBtns.style.display = 'none'
  solveBtn.style.display = 'block'
  scenarioOne()
})

scenarioTwoBtn.addEventListener('click', () =>{
  scenariosBtns.style.display = 'none'
  solveBtn.style.display = 'block'
  scenarioTwo()
})

scenarioThreeBtn.addEventListener('click', () =>{
  scenariosBtns.style.display = 'none'
  solveBtn.style.display = 'block'
  scenarioThree()
})

// refresh page 
 refreshBtn.addEventListener('click', () =>{
location.reload()
}) 






let dropPileTracker = []
let foundationTracker = []
// this keeps a record of all card movements in the solve. 
let solutionMapArray = []






function getArrays(drop, foundation){



  dropPileTracker.push(...drop)
  foundationTracker.push(...foundation)
// variable for end card of foundation pile

console.log('foundation piles all')
console.log(foundationTracker)

console.log('drop piles all')
console.log(dropPileTracker)

populatePiles(dropPileTracker)
populateFoundation(foundationTracker)
}


// populate drop piles
function populatePiles(piles){

piles.forEach((dropPile, pileIndex) =>{
  if(dropPile.length > 0){

    dropPile.forEach(object =>{

      let cardId = object.primary_card.card + '.png'
      let testCard = document.createElement('img') // create image
        testCard.setAttribute('id', cardId ) // set id as img attribute
        testCard.classList.add('cardEl')// give img a class
             testCard.setAttribute('draggable', true) // make img
             testCard.src = `images/${cardId}`
             testCard.classList.add('card-border')
            //  testCard.classList.add('card-transition')
            //  testCard.classList.add('duration-1')
       
             testCard.style.display = 'inline-block'
    
           allPileElements[pileIndex].append(testCard)
    })


  }

})


}


// populate foundationsSt
function populateFoundation(foundations){

  foundations.forEach((foundationPile, pileIndex) =>{
    if(foundationPile.length > 0){
       foundationPile.forEach(object =>{
  
        let cardId = object.primary_card.card + '.png'
        let testCard = document.createElement('img') // create image
          testCard.setAttribute('id', cardId ) // set id as img attribute
          testCard.classList.add('foundationCardEl')// give img a class
               testCard.setAttribute('draggable', true) // make img
               testCard.src = `images/${cardId}`
               testCard.classList.add('card-border')
               testCard.style.display = 'inline-block'
             allFoundationElements[pileIndex].append(testCard)
      })
  
  
    }
  
  })
  
  
  }




  let lastFoundationCard;
let totalCardsAdded = 0;



  {



    
// function for placing cards into solved state
const placeAllCards = (map) =>{
  /*
  BROAD MOVEMENTS:
  -get the pile index of the map object under examination
  - using the correct pile get the card which corresponds to the object
  - append the card from the end of the drop pile to the end of the foundation pile
  
  */

  
  // GOING TO CHANGE THIS TO A RECURSIVE METHOD WITH A DELAY ON EACH CARD DROP
  
  let indexOfDropPile;
  let foundationIndex;
  let dropObjValue;
  let dropCardValue;
  let mapIndex = 0;


function moveCard(mapIndex){
console.log('current map index')
console.log(mapIndex)

let mapDetails = map[mapIndex]

// only  if index is valid 
if(mapDetails){

// get drop pile and foundation index as well as card value 
indexOfDropPile = mapDetails.drop_pile_index;
foundationIndex = mapDetails.foundation_pile_index
dropObjValue = mapDetails.moved_values.drop_pile_end_card

// get card object using index
console.log('card object')
let cardObject = allPileElements[indexOfDropPile].lastChild


// add class for transitions so the card can change position
cardObject.setAttribute('class','cardEl card-bordercard-transition duration-1')

// GET X/Y VALUES OF END CARD AND DESTINATION FOUNDATION
      // get viewport position information of card 
      let cardCoords = cardObject.getBoundingClientRect()

      
      // object for x/y coordinates of card 
      let cardXYObj = {
        'x':cardCoords.x,
        'y':cardCoords.y
      }

      // get viewport position of foundation 
let foundationCoords = allFoundationElements[foundationIndex].getBoundingClientRect()

// object for x/y coordinates of card
let foundationXYObj = {
  'x':foundationCoords.x,
  'y':foundationCoords.y
}   



// CALCULATE CARD X/Y TRANSLATION REQUIREMENTS
let xTranslation = foundationXYObj.x - cardXYObj.x + 30
let yTranslation = foundationXYObj.y - cardXYObj.y  +30 

cardObject.style.transform = `translate(${xTranslation}px, ${yTranslation}px)`
swooshSound.play()


// append card
// allFoundationElements[foundationIndex].appendChild(cardObject)

// change card class for non-cascading positioning, BUT, if you add the class prior to dropping, then the card will drop down approximately 12vw prior to translation, which will give the impression that the card landed stopped short (below) of the foundation pile prior to being appended.  So, it's better to give the card-transition and duration-1 classes 'first' and then immediately after card drop, give add the foundation classlist.  In face, once the card is appended you don't even need the transition and animation duration classes so you can use setAttribute and only give the foundationCardEl class so it will be the only class on the card.  






// if current index argument is not the highest index of the map array
// if(mapIndex < map.length -1)
if(mapIndex < map.length)
{

  
// wait two seconds, then increment index, and re-run function with next index 
  setTimeout(() => {
    // just prior to appending card change style class to that which removes its cascade height so it sits directly on top of the previous card. 
    cardObject.setAttribute('class', 'foundationCardEl')

    // also, revert the translation back to zero for both x and y. The purpose of translation is for the visual effect of moving the card from the drop pile to the foundation pile, but when the card is appended to the foundation pile, if the translations are still on it, then it will sit X pixels and Y pixels outside of the intended position; the x/y translations need to be zero once the card sits in its destination
    cardObject.style.transform = `translate(${0}px, ${0}px)`
    
    
    // now append the card. Because of the tiny duration between reset of translations and card append; the movement that the card will do back to the end of a drop pile from the foundation prior to getting appended will be imperceptible. I assume this in occuring within a few thousandths of a second. 
    foundationDrop.play()
    allFoundationElements[foundationIndex].appendChild(cardObject)

    // increase the index to get the next step in the map array and repeat the process for the next card (if the index is still a valid index for the array)
    mapIndex ++
    moveCard(mapIndex)
  }, 1100);

}else{
  console.log('mapping complete')



}

}else{
// refresh page 
  refreshBtn.style.display = 'block'
}


}

  moveCard(0)





  }




  // AUTO-COMPLETE CHECK TO SEE IF ALL CARDS ARE FACE UP
  function comparePileCard(fPile, index){
  
  console.log('foundation')
  
  // variable for the number of empty drop pile trackers
  let totalEmptyDropPiles = 0;
  // variable for foundation end card value
  let lastFoundationCardValue;
  
  
    // GET FOUNDATION PILE END CARD
    lastFoundationCardValue = fPile[fPile.length - 1].primary_card.card
    // variable for end card in drop pile
    let lastDropPileCardValue;
  
    // LOOP DROP PILE TRACKER
    dropPileTracker.forEach((dropPile, dropIndex) =>{
  // only check non-empty drop piles;  if pile is empty, increment totalEmptyDropPiles variable in else part of this condition
      if(dropPile.length > 0){ 
        console.log(dropPile, dropIndex)
    // get the raw value of the last card of the current drop pile 
        lastDropPileCardValue = dropPile[dropPile.length -1].primary_card.card
  
        // if the absolute value fo the sum difference of both cards id 4
        if(lastDropPileCardValue - lastFoundationCardValue === 4){
  
          {
  
            // CODE FOR SOLUTION MAP
  
                  // if the sum difference of the raw values of the last drop pile card and the foundation card is equal to 4 then the drop pile card is the only possible card that can be added to the currently examined foundation pile.
      

  
  
  
  
  // console.log('move details')
         let moveDetails = {
          'moved_values': {
            "drop_pile_end_card": lastDropPileCardValue,
            "foundation_pile_end_card": lastFoundationCardValue,
            "sum_difference": lastDropPileCardValue - lastFoundationCardValue 
          },
          'card_object': dropPile[dropPile.length -1],
          'drop_pile_index': dropIndex,
          'foundation_end_card_object':fPile[fPile.length - 1],
          'foundation_pile_index': index,
        }
  
        console.log(moveDetails)
  
          
          
  
  
  
  // push move details to solution map array
        solutionMapArray.push(moveDetails)
          }
  
          // push the drop pile card object to the foundation tracker
          foundationTracker[index].push(dropPile[dropPile.length -1])
          // if total cards added is incremented (as they are when a compatible card is found), the greater than zero value indicates that the card was removed from the tracking subarray for drop piles and a new end card exists; the new card can be used to check the other foundation arrays to see if it is compatible with any of the end cards. 
          totalCardsAdded ++
  
  // reassign the last foundation card with the raw value of the new card added from drop pile end 
          lastFoundationCard += 4;
          // pop the moved card's object from the current drop pile tracking array
          dropPileTracker[dropIndex].pop()
        }else{
  // drop pile card is incompatible with end card of foundation pile so do nothing. 
        }
      }else{
  // drop pile tracker subarray is empty so increment variable holding the number of empty drop pile tracking arrays. 
  totalEmptyDropPiles ++;
  
  
  // REMOVE EMPTY PILE ELEMENT'S BORDER
  allPileElements[dropIndex].style.cssText = 'border-style:none;'
      }
  
  // if the loop has reached the last subarray
  if(dropIndex === 6){
  // if all drop piles are empty
  if(totalEmptyDropPiles > 6 ){
  
    // all drop piles have been re-located to foundation piles and the solve is complete
   // alert('SOLVE COMPLETE')
   
    console.log('solution map array')
    console.log(solutionMapArray)
  
  
              console.log('all foundations array')
            //   // each pile should contain 13 cards
            console.log(foundationTracker)
          
            // console.log('all drop piles array')
            // // all drop piles should be empty
            // console.log(dropPileTracker)
          placeAllCards(solutionMapArray)
  }else{ 
    // there are still populated drop pile tracking arrays so solve is not complete. 
  // if one or more cards were added to foundation piles, this means that the cards added to the foundation pile, when moved, exposed new end cards on the drop piles; those cards now need to be checked against the current foundation pile 
    if(totalCardsAdded > 0){
    
      // cards have been added so reset the total added cards and loop through the drop pile arrays again to see if any cards (some of which will be new) are compatible with the new end cards in the current foundation pile. 
      totalCardsAdded = 0;
      pickFoundation(index)
    }else{
  
      // no cards were added to the current pile because none of the end cards in the drop piles were compatible.  increment the index and run pick foundation to select the next foundation tracking array, 
  
      // NOTE: the use of the '%' operation is so that when the last foundation index is reached, the incremented new index will return to the first index number, and the first foundation tracking array will be examined again.  This will continue to happen until all drop pile triacking arrays are empty. 
        let newIndex = (index + 1)%4
        pickFoundation(newIndex)
        }
  
  
  }
  
  
  }
   
    })
  
  // eventually there will be the scenario where the index of the looped drop pile will be 6, AND, the number of empty drop pile tracking arrays will be seven, which indicates that the there are no more cards in drop pile tracking subarrays and hence all cards have been transferred to foundation piles. This will execute the 'solve complete' part of this function, so that there will be no further calls of the pickFoundation function below and the solve is complete. 
  
  }
  
  function pickFoundation(foundationIndex){
    let newIndex = foundationIndex  
    // select foundation tracking subarray 
  let pickFoundation = foundationTracker[newIndex]  
  // send array and its index to the compare function
  

 
      comparePileCard(pickFoundation, newIndex)  
  }
  
  
  // Send initial index value to examine first foundation pile
  solveBtn.addEventListener('click', () =>{
    solveBtn.style.display = 'none'
    // console.log('running solve')
    pickFoundation(0)
  })
  
  }