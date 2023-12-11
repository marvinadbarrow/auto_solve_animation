

let cardPack = [ 
  "1.png","2.png","3.png","4.png",
  "5.png","6.png","7.png","8.png",
  "9.png","10.png","11.png","12.png",
  "13.png","14.png","15.png","16.png",
  "17.png","18.png","19.png","20.png",
  "21.png","22.png","23.png","24.png",
  "25.png","26.png","27.png","28.png",
  "29.png","30.png","31.png","32.png",
  "33.png","34.png","35.png","36.png",
  "37.png","38.png","39.png","40.png",
  "41.png","42.png","43.png","44.png",
  "45.png","46.png","47.png","48.png",
  "49.png","50.png","51.png","52.png",]

let cardFlip = new Audio('sounds/card_flip.mp3')
let emptyPile = new Audio('sounds/empty_pile_sound.mp3')
  // FETCHING AUTO SOLVE SCENARIO LAYOUT FOR TESTING SOLVE BUTTON - 

  // variables for foundation trackers and drop pile trackers in solve scenario

  // variables for testing solve scenario
let dropPilesScenario = [];
let foundationPilesScenario = [];
let exDistributionDrop = [];
let exDistributionPick = [];

// SOLVE SCENARIO FETCH
//   fetch('/solve_scenario.json')
//   .then(res => res.json())
//   .then(data =>{
//     console.log('..fetched data')
//     dropPilesScenario.push(...data.drop_piles)
//     foundationPilesScenario.push(...data.foundations)

// useArrays(dropPilesScenario, foundationPilesScenario)
//   })




// AUTOMATIC SHUFFLING ON PAGE LOAD -------------------------
window.onload = function() {
  shuffleCards();
};



  // AUTOMATIC SOLVABLE DISTRIBUTION FUNCTION STARTS ---------------- 
//   fetch('/solvable_distribution.json')
// .then(res => res.json())
// .then(data =>{
//   console.log('fetched solvable distribution data')
//   console.log(data)
//  exDistributionDrop.push(...data.drop_pile_distribution)
// exDistributionPick.push(...data.pick_pile_distribution)

// distributeSolvable(exDistributionDrop, exDistributionPick)

// })


// Send distribution arrays for rendering
const distributeSolvable = (dropPiles, pickPile) =>{

  console.log(dropPiles)
  console.log(pickPile)
    // send solvable distribution for card distribution
    // showCardPiles(dropPiles[6], dropPiles[5], dropPiles[4], dropPiles[3], dropPiles[2], dropPiles[1], dropPiles[0], pickPile)
  }


  // AUTOMATIC SOLVABLE DISTRIBUTION FUNCTION ENDS ----------------






// undo button element
let undoBtn = document.getElementById('undo-btn')


//variabel to add event listeners to all piles using forEach
var dropPilesEl = document.querySelectorAll('.piles')
// to add event listeners to all foundation piles using forEach
var foundationPilesEl = document.querySelectorAll('.foundation-pile')

// to adjust game container afer deal button disappears, giving more space for the game. 

let gameContainerEl = document.getElementById('game-container')
// the below two functions are used to indicate whether the mouse button is pressed down or not. So in the multiReset function we can reset things more quickly if the mousup is the the value that we will be reading at mouseDownArr[0]

// ORIENTATION OF PAGE  - since the wrapper behaviour doesn't change appropriately when orientation is changed to portrait, I'll use this code to check orientation and, depending on what the orientation is, we can then use an appropriate wrapper for either portrait or landscape. - so if winW < winH we're in portrait and if winW > winH we're in landscape

let winW;
let winH;
let winCalc;



var mouseDownArr = []
var mouseDown = 0;
document.body.onmousedown = function() { 
  mouseDown = 1;
  mouseDownArr.unshift(mouseDown)
  // console.log(
    
  // )
}
document.body.onmouseup = function() {
  mouseDown = 0;
  mouseDownArr.unshift(mouseDown)
  // console.log(mouseDownArr)
}




// seven pile elements
var pileOne = document.getElementById('pile-one');
var pileTwo = document.getElementById('pile-two');
var pileThree = document.getElementById('pile-three');
var pileFour = document.getElementById('pile-four');
var pileFive = document.getElementById('pile-five');
var pileSix = document.getElementById('pile-six');
var pileSeven = document.getElementById('pile-seven');
var remainPile = document.getElementById('reveal')
var wastePile = document.getElementById('waste-pile')
var solveBtn = document.getElementById('solve-btn')
var movingCardsEl; // for the variables once cards are loaded









// arrays associated with each drop target
let origArr = []; 
let halfArr = [];
let destArr = [];
let shuffleArr = [];
let newArr; // we'll use this to shift the array elements from the waste array to the remain array

// arrays for the piles
let pileOneArr;
let pileTwoArr;
let pileThreeArr;
let pileFourArr;
let pileFiveArr;
let pileSixArr;
let pileSevenArr;
let remainingCardsArr;
let wastArr = []

let allPileElements = [pileOne, pileTwo, pileThree, pileFour, pileFive, pileSix, pileSeven]
// this array stores the trails of cards in a solutions; the order in which they moved from their drop pile positions to foundation array positions.  This array will be used as the source for moving the HTML elements when the auto complete button is clicked when a solution is available. 
let solutionMapArray = []



let foundationPileOne = document.getElementById('foundation-one');
let foundationPileTwo = document.getElementById('foundation-two');
let foundationPileThree = document.getElementById('foundation-three');
let foundationPileFour = document.getElementById('foundation-four');
let clickedFoundationArr = []


let allFoundationElements = [foundationPileOne, foundationPileTwo, foundationPileThree, foundationPileFour]


// the elements in this array are node lists, each one listing the contents (cards elements) of one of the foundation piles.  In the event that all pick cards are used and all of the drop pile cards are revealed, each nodelist will be looped through where, for each card element, the id will be extracted, the file extension removed from the id string, and the remaining string converted to a number, the resulting numbers will be pushed to a subarray representing the foundation pile corresponding to the node list. The resulting subarrays along with subarrays representing the drop piles, will be used used to create a method for automating the completion of the game from the above described scenario.  then the player will be given the option to allow the game to auto complete. 
let foundationPileMainArray = [foundationPileOne, foundationPileTwo, foundationPileThree, foundationPileFour]
  
// add event lister to all of the foundation piles so we can get the id of a clicked pile
foundationPileMainArray.forEach(element =>{

  element.addEventListener('mousedown', (e) =>{
    // to ensure that the value pushed to the clicked foundation array is always the id of the foundation pile. 
if(e.target.id.includes('.png')){
  clickedFoundationArr.push(e.target.parentNode.id)
}else{clickedFoundationArr.push(e.target.id)}
  })
})

// create some arrays which will take images associated with the values in the piles array... so pileOneArr will have an array associated with it that will, for each index value, have an associated url  to the image associated with that value
let pileOneImgArr = [];
let pileTwoImgArr = [];
let pileThreeImgArr = [];
let pileFourImgArr = [];
let pileFiveImgArr = [];
let pileSixImgArr = [];
let pileSevenImgArr = [];

// array to store selected cards and parent pile for multiple drag
let selectArray = []
// this array is for all of the id's of each element
let dragIdArray = []

// contains data in multi drag cards 
let dataArray = []

// card tracking objects temporarily pushed to this array, pending drop status; if drop fails, this array is emptied of the temporary card; if drop succeeds, then the card in the array is pushed to the breadcrumb array, after which it is deleted from this temporary array
let tempDragCardArr = []
let tempGroupElementsArr = []
let tempGroupObjectsArray = []

// each subarray represents one of each of the drop piles
var pileImgArrays = [ pileOneImgArr, pileTwoImgArr, pileThreeImgArr, pileFourImgArr, pileFiveImgArr, pileSixImgArr, pileSevenImgArr]

var secondLastChildArr = [] // Takes the details of the first .face-down card from bottom. If it is exposded, by lifting the card(s) covering it and dropping them elsewhere, its class will be changed to .face-up, causing it to flip and to face upward. 




// card shuffle functions - this happens automatically

const pushRandom = () =>{
  // random numbers between 1 and 52 inclusivet
  const randomCard = Math.floor(Math.random()*52 + 1); 
  // if number isn't already in array then push to array and run shuffle initiator again
 if(!shuffleArr.includes(randomCard)){shuffleArr.push(randomCard); shuffleCards()}
 // otherwise run the initiator again to get another card
 else{shuffleCards()}
}




const shuffleCards = () =>{

  // this will only run if our shuffle array isn't full otherwise it will log 'complete'
if(shuffleArr.length < 52){ pushRandom()}
else{
  

  // move game container up a little bit
  gameContainerEl.style.cssText = ' margin-top:-8vh;'
  
  
  cardsDistribute()
}}









// now we'll create all seven piles  and remaining cards pile and distribute the randomly generated cards among them

const cardsDistribute = () =>{

 //create array by extracting and using the first 7 cards of shuffled array
var getPile7 = shuffleArr.splice(0,7);

// then the next six cards
var getPile6 = shuffleArr.splice(0,6);

// next 5 cards for pile 5
var getPile5 = shuffleArr.splice(0,5);

// next 4 cards for pile 4
var getPile4 = shuffleArr.splice(0,4);

// next 3 cards for pile 3
var getPile3 = shuffleArr.splice(0,3);

// next 2 cards for pile 2
var getPile2 = shuffleArr.splice(0,2);

// // next card for pile 1
var getPile1 = shuffleArr.splice(0,1);

// there are 24 cards left over and they'll be used for the pick pile
var remainingCardsArr = shuffleArr.splice(0,24)


console.log(getPile7)
console.log(getPile6)
console.log(getPile5)
console.log(getPile4)
console.log(getPile3)
console.log(getPile2)
console.log(getPile1)
console.log(remainingCardsArr)

// so all cards are now taken care of. But we don't have access to these arrays outside of the function so we need to push the array somewhere; we can assign each array to an uninitiated variable, like the array 'getPile7 can be assigned to pileOneArr. 


// let trackingCompiler = [{getPile1: 'pile-one'}, {getPile2: 'pile-two'}, {getPile3: 'pile-three'}, {getPile4: 'pile-four'}, {getPile5: 'pile-five'}, {getPile6: 'pile-six'}, {getPile7: 'pile-seven'}]

showCardPiles(getPile1, getPile2, getPile3, getPile4, getPile5, getPile6, getPile7, remainingCardsArr)

// showCardPiles(trackingCompiler)
}


// ----------------- TRACKING ARRAYS ---------------------------

// arrays to keep track of cards in each pile - these are populated with integer values representing card values of each corresponding drop pile
let dropPileOne = []

let dropPileTwo = []
let dropPileThree = []
let dropPileFour = []
let dropPileFive = []
let dropPileSix = []
let dropPileSeven = []
let dropPileTracker; // to hold the above arrays


// main array and subarrays for foundation pile
let foundationOneArr = []
let foundationTwoArr = []
let foundationThreeArr = []
let foundationFourArr = []

// arrays for keeping track of card positions
let foundationTracker = [foundationOneArr, foundationTwoArr, foundationThreeArr, foundationFourArr]

let wasteCardTracker = []
let pickCardTracker = []

let breadcrumbArray = []



let allTrackers;

let pileNavigation = ['pile-one', 'pile-two', 'pile-three', 'pile-four', 'pile-five', 'pile-six', 'pile-seven' ]
let foundationNavigation = ['foundation-one', 'foundation-two', 'foundation-three', 'foundation-four']
// ----------------------------------------------------  


function showCardPiles(one, two, three, four, five, six, seven, reveal){

reveal.forEach(revealCard =>{
// create an object for each card in the pick pile
  let revealObj = {

    primary_card: {
      card:revealCard,
      origin:'pick-pile',
      destination:'',
      group_elements:''
    }, 
    
    total_selected: '', 
  when_flipped: '', 
  when_moved: '',
  principal_origin: 'pick-pile'
    }

pickCardTracker.push(revealObj)
})

one.forEach(element =>{
  let newObj = {

    primary_card: {
      card:element,
      origin:'pile-one',
      destination:'',
      group_elements:''
    }, 
    
    total_selected: '', 
  when_flipped: '', 
  when_moved: '',
    principal_origin: 'pile-one'
    }
  dropPileOne.push(newObj)
})
two.forEach(element =>{
  let newObj = {

    primary_card: {
      card:element,
      origin:'pile-two',
      destination:'',
      group_elements:''
    }, 
    
    total_selected: '', 
  when_flipped: '', 
  when_moved: '',
    principal_origin: 'pile-two'
    }
  dropPileTwo.push(newObj)
})
three.forEach(element =>{
  let newObj = {

    primary_card: {
      card:element,
      origin:'pile-three',
      destination:'',
      group_elements:''
    }, 
    
    total_selected: '', 
  when_flipped: '', 
  when_moved: '',
    principal_origin: 'pile-three'
    }
  dropPileThree.push(newObj)
})
four.forEach(element =>{
  let newObj = {

    primary_card: {
      card:element,
      origin:'pile-four',
      destination:'',
      group_elements:''
    }, 
    
    total_selected: '', 
  when_flipped: '', 
  when_moved: '',
    principal_origin: 'pile-four'
    }
  dropPileFour.push(newObj)
})
five.forEach(element =>{
  let newObj = {

    primary_card: {
      card:element,
      origin:'pile-five',
      destination:'',
      group_elements:''
    }, 
    
    total_selected: '', 
  when_flipped: '', 
  when_moved: '',
    principal_origin: 'pile-five'
    }
  dropPileFive.push(newObj)
})
six.forEach(element =>{
  let newObj = {

    primary_card: {
      card:element,
      origin:'pile-six',
      destination:'',
      group_elements:''
    }, 
    
    total_selected: '', 
  when_flipped: '', 
  when_moved: '',
    principal_origin: 'pile-six'
    }
  dropPileSix.push(newObj)
})
seven.forEach(element =>{
  let newObj = {

    primary_card: {
      card:element,
      origin:'pile-seven',
      destination:'',
      group_elements:''
    }, 
    
    total_selected: '', 
  when_flipped: '', 
  when_moved: '',
    principal_origin: 'pile-seven'
    }
  dropPileSeven.push(newObj)
})


dropPileTracker = [dropPileOne, dropPileTwo, dropPileThree, dropPileFour, dropPileFive, dropPileSix, dropPileSeven]
allTrackers = [dropPileTracker, foundationTracker]

 pileOneArr = one;
 pileTwoArr = two;
 pileThreeArr = three;
 pileFourArr = four;
 pileFiveArr = five;
 pileSixArr = six;
 pileSevenArr = seven;
 remainingCardsArr = reveal;


  // we now have access to the random cards distributed into seven arrays and can distribute them into our piles

  pushPiles() // we'll push all piles info to populate piles function

  
}


const pushPiles = () =>{
  
  populatePiles(pileOneArr, pileOne, pileOneImgArr, dropPileOne);
  populatePiles(pileTwoArr, pileTwo, pileTwoImgArr, dropPileTwo)
  populatePiles(pileThreeArr, pileThree, pileThreeImgArr, dropPileThree)
  populatePiles(pileFourArr, pileFour, pileFourImgArr, dropPileFour)
  populatePiles(pileFiveArr, pileFive, pileFiveImgArr, dropPileFive)
  populatePiles(pileSixArr, pileSix, pileSixImgArr, dropPileSix)
  populatePiles(pileSevenArr, pileSeven, pileSevenImgArr, dropPileSeven)
  // below goes to its own function which just takes the array and the pile, since we only need one card at a time from the array to be revealed. 
  pickPile(remainPile)
   }


// this creates images which the source cards can be pushed to
  const populatePiles = (array, pile, imageArray, trackArray) =>{
// tracking array is here because the last object in the array which represents the end card of the distributed pile needs to have show that the card was flipped at distribution, so set that object's 'when_flipped' property to zero - at the same time that the card's 'draggable' attribute is set to true, because that means the card gets flipped imediately, at zero, when no moves have been made. 
    if(pile.childNodes.length < 1){
     
      pile.style.opacity = '1'
  // condition ensures pile will start to be populated only if the pile is empty;  preventing repopulation
    for(i=0; i<array.length; i++){
      let testCard = document.createElement('img') // create image
      let id = cardPack[array[i] - 1] // create id using card value
      testCard.setAttribute('id', id) // set id as img attribute
      testCard.classList.add('cardEl')// give img a class
           testCard.setAttribute('draggable', false) // make img un-draggable
        testCard.src = `images/backgnd.jpg` // to be changed once card becomes draggable
        testCard.classList.add('card-border')
      testCard.style.display = 'inline-block'
      let image = testCard.src
   imageArray.push(image)
 
      
   
      pile.appendChild(testCard);// append card image to pile

      testCard.addEventListener('dragstart', dragStart) // added an event listener here to affect all loaded cards

      testCard.addEventListener('dragend', dragEnd)

      // give top cards class of .face-up and all other cards class of .face-down
    if (i<array.length -1){}else{
       testCard.setAttribute('draggable', true) // make img draggable
   testCard.src = `images/${id}` // change the card image from card back to card value, i.e. face down to face up


  // here you need to set the when_flipped property on the tracking object to zero,  indcating that the card was flipped at distribution before any moves were made. 

   trackArray[i].when_flipped = 0;
 

  }}
  
   }
  }


// flips remain pile cards
  const pickPile =(pile, waste) =>{
// create image for remain pile

let testCard = document.createElement('img') 
testCard.classList.add('cardElWaste')
testCard.classList.add('card-border')
testCard.src = `images/backgnd.jpg`
remainPile.appendChild(testCard)
pile.style.opacity = '1' // show border when card back is loaded
wastePile.classList.add('card-size'); // make waste pile same size as the size of the card

  }

  
// checks that the top card of any drop pile is face down, and if so, will flip it to face up. 
const   flipCard = (flipThis, index) =>{
// check that the received card is not draggable

setTimeout(() => {
  flipThis.setAttribute('draggable',true);
  let id = flipThis.id
  flipThis.src = `images/${id}`
  cardFlip.play()
}, 350);


// code for locating the tracking object and assigning a value to its when_flipped property

// get the index of pile tracking array
let trackingArray = dropPileTracker[index]
// edit the when_flipped property of the last card in the pile
trackingArray[trackingArray.length - 1].when_flipped = breadcrumbArray.length



}



// WASTE CARD DROPPED SORT WASTE
const   updateWaste = (tracking) =>{
console.log('this is the waste card that is moved away')
console.log(tracking)


// wasteCardTracker.shift()
// I think wastecard tracker is updated elsewhere so this is just for the element manipulation (hopefully)
console.log('waste card tracker')
console.log(wasteCardTracker)
  // you probably had this correct and all you needed to do was add the event listeners but now we have an issue with the cards in the wastepile doubling up so we'll, just remove the image and replace it.  

  
  // remove previous waste card if it exists
if(wastePile.childNodes.length > 0){

  // this must be the old card just moved away
  console.log('card left in pile')
  console.log(wastePile)

  // have to wonder if you need to remove anything, because, appending the card elsewhere should automatically remove it from the origin
  // wastePile.removeChild(wastePile.firstChild)

  wastArr.shift()

}



// now we can use it to display the corresponding card in the wastepile; which has no element since the image was removed from it
console.log('waste card tracker, position 1 should have next waste card top')
console.log(wasteCardTracker)
console.log(wasteCardTracker[1])
// get card value to use as ID
let newId = wasteCardTracker[1].primary_card.card;
// CREATE NEW IMAGE FOR WASTE PILE TOP CARD
let image = document.createElement('img')
// ADD REQUIRED ATTRIBUTES CLASSES
image.classList.add('cardElWaste')
image.classList.add('card-border')
image.setAttribute('draggable', true)

// set source name for image using ID
let sourceName = newId + '.png'
// assign image as source
image.src = `images/${sourceName}`
// set id using image name.extension
image.setAttribute('id', sourceName)
// append image to wastepile
wastePile.appendChild(image) 
// add drag event listeners to card 
image.addEventListener('dragstart', dragStart)
image.addEventListener('dragend', dragEnd)

let source = wastePile.firstChild.getAttribute('src')
console.log(source)

}


// this card removes the current waste pile top card value and sends the new zero position value to the sort where its value is used to get the image of the new top card.  
const preUpdateWaste = (cardObject) =>{
  console.log('checking id')
  console.log(parseInt(cardObject.id))
  let newTopCardObject = wasteCardTracker[0]

  console.log('top object of waste tracker before tracking update')
  console.log(newTopCardObject)
  if(wasteCardTracker.length > 1){
    updateWaste(newTopCardObject)  
  }
  // updateWaste(newTopCardObject)
}


  


    // if on moving a card away from a pile, the top card left behind is facing down, flip it to face up
    const faceUp = () =>{

// loop through each pile
for(i=0; i < dropPilesEl.length; i++){
// if there exists a lastChild and the last child is not draggable, this means that the card is at the end of the pile but is face down

// check which of the piles has the face down end card; this can only apply to one pile, since moving cards can only occur one pile at a time. 
if (dropPilesEl[i].lastChild && dropPilesEl[i].lastChild.getAttribute('draggable') === 'false'){//if pile end card isn't draggable
  let indexOfPile = i
flipCard(dropPilesEl[i].lastChild, indexOfPile)// send card to the flip function

}}
             
      }



// replaceing card back when cards are in remain array, but no cards are in the waste pile
const refreshRemain = () =>{
  
    let newRemainCard = document.createElement('img') 
    newRemainCard.classList.add('cardElWaste')
    newRemainCard.classList.add('card-border')
    newRemainCard.src = `images/backgnd.jpg`
    remainPile.appendChild(newRemainCard)
   
}





// PICK PILE FLIP THROUGH
const remainFlip = () =>{
  //PICK PILE RESET IMAGE - when all remain cards are in waste pile
  if(pickCardTracker.length < 1 && wasteCardTracker.length > 0){
    // remove the current card displayed on the pick pile
    remainPile.removeChild(remainPile.firstChild)
    // create a new card and give class details
    let newRemainCard = document.createElement('img') 
    newRemainCard.classList.add('cardElWaste')
    newRemainCard.classList.add('card-border')
    // set the image source to cardback and image to the pile
    newRemainCard.src = `images/pick_reset.png`
    remainPile.appendChild(newRemainCard)

  }else if(pickCardTracker.length > 0){
    remainPile.firstChild.src = `images/backgnd.jpg` 
  }


              // CARD FOR DISPALY ON WASTE PILE
 // create new image for wastepile card
let testCard = document.createElement('img')
// we'll use last index for our id 
let index = remainingCardsArr.length - 1 
let pickIndex = pickCardTracker.length - 1
console.log('pick index')
console.log(pickIndex)
console.log('remain card array index')
console.log(index)
console.log('pick tracker')
console.log(pickCardTracker)
console.log('tracking object')
console.log(pickCardTracker[pickIndex])
// the last card in the array gets displayed in the remain-waste
let value = pickCardTracker[pickIndex].primary_card.card // last index, LIV, value pulled
let id = cardPack[value - 1] // id is cardpack[LIV]
testCard.setAttribute('id', id)// give image id attribute
 testCard.classList.add('cardElWaste')// give image a class
 testCard.classList.add('card-border')// add border
testCard.setAttribute('draggable', true) // make draggable
testCard.src = `images/${id}` // define source

// CARD CREATION COMPLETE

// console.log(wastArr, remainingCardsArr)

// copy last remain array item to zero index of waste array - then we read out of wastArr to display the waste card, which makes sense.
wastArr.unshift(remainingCardsArr[index]);  

// pop the item out of remain array since it is now in wastArr
remainingCardsArr.pop() 


// CREATE A NEW OBJECT FOR WASTE ARRAY AND BREADCRUMB
let newFlippedObject = {

  primary_card: {
    card:pickCardTracker[pickCardTracker.length -1].primary_card.card,
    origin:'pick-pile',
    destination:'waste-pile',
    group_elements:''
  }, 
  
  total_selected: '', 
when_flipped: breadcrumbArray.length + 1, 
when_moved: breadcrumbArray.length + 1,
  principal_origin: 'pick-pile'

}

// push new card object to breadcrumb
breadcrumbArray.push(newFlippedObject)

// unshift card object to waste pile array
wasteCardTracker.unshift(newFlippedObject)

// pop object from pickcard tracker
pickCardTracker.pop()


console.log('pickCardTracker')
console.log(pickCardTracker)
console.log('wasteCardTracker')
console.log(wasteCardTracker)
// then we need to append it to the waste pile
// remove card image if one exists
if(wastePile.childNodes.length > 0){
wastePile.removeChild(wastePile.firstChild)
}
// append created card
wastePile.appendChild(testCard)
cardFlip.play()
// add dragstart and dragend event listeners
testCard.addEventListener('dragstart', dragStart)
testCard.addEventListener('dragend', dragEnd)
console.log('breadcrumbArray')
console.log(breadcrumbArray)

// once any card has been moved from drop piles or pick piles the undo button will appear - when the game is solved breadcrumbs will be cleared so button will disapper. 
if(breadcrumbArray.length > 0){
  // show button if breadcrumbs exist
  undoBtn.style.display = "block"

}

}
  


 // when no more waste cards are available 
const pickPileRefill = () =>{
  console.log('remain flip no card function')
  // only show refill card if waste tracker contains cards. 
if(wasteCardTracker.length > 0){
      // remove the current card displayed on the pick pile
      remainPile.removeChild(remainPile.firstChild)
      // create a new card and give class details
      let newRemainCard = document.createElement('img') 
      newRemainCard.classList.add('cardElWaste')
      newRemainCard.classList.add('card-border')
      // set the image source to cardback and image to the pile
      newRemainCard.src = `images/pick_reset.png`
      remainPile.appendChild(newRemainCard)
}



// there should be no cards in the pile by now. 
if(wastePile.firstChild){
  wastePile.firstChild.src  = 'images/no more cards img.png';
  // console.log(wastePile)
  
}

// use newArr variable to hold the array of entire values all spliced from wastArr
newArr = wastArr.splice(0, -1);

// push all of those values to remain array
newArr.forEach(element => remainingCardsArr.push(element));

// this also has to be done for the tracking objects - all the elements in the waste tracker need to be pushed to the pick card tracker; we can do it using spread. 

// first we need to swap all of the destinations with origins on the waste card array to indicate that they went from the waste pile back to the origin.  They will all get the same breadcrumb number and that will indicate that they were all moved together, in fact, instead of sending all of the 24 cards to the breadcrumb array, we could send a special object to indicate the transfer of all the cards back to the pick pile. 

wasteCardTracker.forEach(object =>{
  console.log('waste pile original')
console.log(object)
  // create a new object
  let newPickObject = {
      primary_card: {
      card:object.primary_card.card,
      origin:'waste-pile',
      destination:'pick-pile',
      group_elements: wasteCardTracker.length
    }, 
    
    total_selected: '', 
  when_flipped: object.when_flipped, 
  when_moved: breadcrumbArray.length,
    principal_origin: 'pick-pile'
  }
  // newPickObject.primary_card.destination = 'pick-pile'
  // newPickObject.primary_card.origin = 'waste-pile'
  // newPickObject.when_moved = breadcrumbArray.length
  // newPickObject.primary_card.group_elements = wasteCardTracker.length
  // newPickObject.total_selected = wasteCardTracker.length, 
  console.log('pick pile variation')
  console.log(newPickObject)

  
  
  breadcrumbArray.push(newPickObject)
  console.log('object just pushed to breadcrumb')
  console.log(newPickObject)
  pickCardTracker.push(newPickObject)
  // so now the new objects pushed to pick array are also pushed to breadcrumb array


})



console.log('breadcrumb array')
console.log(breadcrumbArray)

console.log('checking pick card tracker')
console.log(pickCardTracker)

 // clear the waste card tracker of old objects
wasteCardTracker = []

// clear newArr ready for next cycle
newArr = []

}


// decides what to do when the PICK pile is clicked, depending on whether PICK cards are available or have run out.  If they have run out, there are two possibilities; either all pick cards are on the waste pile, or all former pick piles are now in either foundation or drop piles. 
const cardChoice = () =>{

 
if(pickCardTracker.length > 0){
  // if pick card tracker has cards
  remainFlip() // create and load image for next card to be flipped
}else{
  // this leaves the waste pile empty and sends the cards that were on the waste pile back to the pick pile - BUT THERE MUST BE CARDS ON THE WASTE PILE FOR THIS FUNCTION TO RUN; if all pick cards are spend then this shouldn't run so use an IF condition
  if(wasteCardTracker.length > 0){
    console.log('refilling pick pile')
    pickPileRefill()
  }
 }

 console.log(pickCardTracker)
   }
      
   // attach event listener to remain pile; 
   // by clicking on this pile, as long as pick cards remain the pick cards are dropped faceup to the waste pile. 
remainPile.addEventListener('click', cardChoice)




// for when multiple cards are dragged
const dragstartMulti = (event) =>{
// console.log('hello')
event.target.style.width = '8.5vw'
event.dataTransfer.setData("text/plain", event.target.id)
setTimeout(() => {
  event.target.classList.add('hide')

}, 1);
}

// for when multiple cards are dropped
const dragendMulti = (event) =>{
  
  // console.log('dragging ended')
  
  }
  



// BEGIN DRAG
const dragStart = (event) =>{
  //let card = event.target;
  event.target.classList.add('dragging')
 event.dataTransfer.setData("text/plain", event.target.id);
// the class added causes the dragged card to be highighted with a red solid 4px border

}

// STOP DRAG
const dragEnd = (event) =>{
  event.target.classList.remove('dragging')

 
}


// ENTER DROP TARGET
const dragEnter = (event) =>{
  event.target.classList.add('enter')
// the class added causes the target pile to be highighted with a red solid 4px border
}

// DRAG OVER DROP TARGET
const dragOver = (event) =>{
   event.preventDefault();
 
}


// LEAVE DROP TARGET
const dragLeave = (event) =>{
  // NOTE, the event target is the PILE
  event.target.classList.remove('enter');// gets rid of highlight
}
 
// we need an auto reset for the non ace drop. 




// similar to MULTI RESET - this runs if multiple cards are clicked but not dragged, or if dragged multiple cards fail drop requirements and are returned to original pile  
const autoResetGo = (pile,object,wrapper, command) =>{

// then we can establish the pile type from its class
let getPileType = pile.getAttribute('class');
// console.log(getPileType)
// console.log(command)
// console.log(pile)
if(command < 3 && pile.childNodes.length > 0){
// that means that there's a child in the clicked pile that has an id length of '2' digits or less so it must be a wrapper element so we can remove it (also the 'pile.childNodes.length > 0' ensures that if the exited pile contains no childnodes, then the For Loop for setting children attributes to 'draggable, true' does not run: previously, before adding the childnodes.length condition there was an error being thrown back)
  let wrapperElement = document.getElementById(wrapper.id)
  var parent = wrapperElement.parentNode
  // console.log(object)
   if(wrapper.length > 1){

  }


  let children = wrapper.childNodes
  // ERROR HERE possibly - we should be checking wrapper childnodes length.. SORTED - we had the delete wrapper elements inside the loop. So the children were being removed from the wrapper before they could have the draggable attribute reset because they were no longer inside the wrapper.  So; moved the unwrap functioun outside of the loop and placed it AFTER the loop. So, once the loop is complete and all children attributes are reset, we then unwrap the wrapper and delete it.... PROBLEM SOLVED. 

           // loop through children to add draggable:true; attribute
  for(i = 0; i < object.length ; i++){
  
    children[i].setAttribute('draggable', 'true')
    children[i].classList.remove('multi-style')
  }



      // for unwrapping the multiple dragged cards

// essentially, if wrapper has a first child, then, insert it before wrapper element, so eventually this will happen until there are no more children
while (wrapperElement.firstChild) parent.insertBefore(wrapperElement.firstChild, wrapperElement);

// remove wrapper from pile once no more first children exist
parent.removeChild(wrapperElement);
// ok, this actually works so now 




  // console.log(pile)
  // to check their draggability
}else{
// all id's have a character length longer than 3 so all of them must be image elements and not a wrapper so we will do nothing just log that there's no wrapper

// console.log('no wrapper')
}}







// once all cards are face up and there are no remaining pick cards, this array will be mapped and used configure a pathway from current game state to completed game state
// let allCurrentPilesArray = [currentPileOne, currentPileTwo, currentPileThree, currentPileFour, currentPileFive, currentPileSix, currentPileSeven]



// variables for card elements in each pile
let pileOneChildren = pileOne.childNodes
let pileTwoChildren = pileTwo.childNodes
let pileThreeChildren = pileThree.childNodes
let pileFourChildren = pileFour.childNodes
let pileFiveChildren = pileFive.childNodes
let pileSixChildren = pileSix.childNodes
let pileSevenChildren = pileSeven.childNodes

// array of pile cards which will be mapped through to get the id of each card in a given pile.
let allPilesArray = [pileOneChildren, pileTwoChildren, pileThreeChildren, pileFourChildren, pileFiveChildren, pileSixChildren, pileSevenChildren]




// let allFoundationPilesArray = [currentFoundationPileOne, currentFoundationPileTwo, currentFoundationPileThree, currentFoundationPileFour]

let autoSolvePossible = 0; // when cards are finished, increment this value to '1' so that you can stop the 'cards finished' alert from re-executing each time you move a card in the drop pile after the initial alert.  you might also be able to manipulate the allPilesArray from within that condition. So, rather than repopulating the array from scratch, you can pick push the moved card values to destination piles and pop moved cards from origin piles. 

// console.log(pileOneArr, pileTwoArr, pileThreeArr, pileFourArr,    pileFiveArr, pileSixArr, pileSevenArr)


undoBtn.addEventListener('click', ()=>{


if(breadcrumbArray.length > 0){
  
  console.log('back button clicked... checking breadcrumb history')
  let lastBreadcrumb = breadcrumbArray[breadcrumbArray.length - 1]
let groupElementsNumber = lastBreadcrumb.primary_card.group_elements

console.log(`
card value: ${lastBreadcrumb.primary_card.card}
current location: ${lastBreadcrumb.primary_card.destination}
previous location: ${lastBreadcrumb.primary_card.origin}
number of cards moved: ${lastBreadcrumb.primary_card.group_elements}
number of cards selected: ${lastBreadcrumb.total_selected}
when moved: ${lastBreadcrumb.when_moved}
when flipped: ${lastBreadcrumb.when_flipped}
`)

let groupElementsValue;
let originPileName = lastBreadcrumb.primary_card.origin
let originLastCardElement;
let originPileElement;
let endCardPileTracker;
let movedCardTracker;
let originIndex;//to locate origin tracking array
let dropCard; // drop card's HTML element
let dropIndex;//to locate destination tracking array
let destinationPileName = lastBreadcrumb.primary_card.destination
let destinationPileElement;
let MovedCardObject; // drop card tracking object
let endCardObject // if origin pile is not empty, this object is the tracking object of the last card of the origin pile

// else/if to determine card origin, so the undo can return it.

// if the origin was a foundation or drop pile 
if(originPileName.includes('foundation')){
  // ONE DESTINATION: DROP PILE
console.log('this card came from a foundation pile')
allFoundationElements.forEach((foundation, pileIndex) =>{
  if(foundation.id == originPileName){
        // ORIGIN PILE ELEMENT
        originPileElement = foundation
        // ORIGIN INDEX
    originIndex = pileIndex

// ORIGIN TRACKER ARRAY 
console.log('origin pile tracker')
endCardPileTracker = foundationTracker[pileIndex]

  }})


    // LOCATE DESTINATION PILE ELEMENT
allPileElements.forEach((pile, pileIndex) =>{
  if(pile.id == destinationPileName){

//DROP PILE INDEX (tracker index is the same)
    dropIndex = pileIndex

  // get DROP CARD ELEMENT
    dropCard = pile.lastChild
    console.log('dropCard')
    console.log(dropCard)




// CARD TRACKER ARRAY
console.log('drop pile tracker')
movedCardTracker = dropPileTracker[pileIndex]
console.log('drop card object')
//DROP CARD OBJECT
MovedCardObject = movedCardTracker[movedCardTracker.length - 1]
console.log(MovedCardObject)

// RETURN / APPEND DROP CARD
  originPileElement.append(dropCard)


//TEMPORARY BREADCRUMB STORE
let storeBreadcrumb = []
//STORE CURRENT BREADCRUMB
storeBreadcrumb.push(lastBreadcrumb)
 //REMOVE CURRENT FROM BREADCRUMB HISTORY
breadcrumbArray.pop()

  // GET PREVIOUS BREADCRUMB INSTANCE OF DROP CARD  - the properties on that breadcrumb give details of the cards movement to the origin from elsewhere
  let highestIndex = -1;
  let previousBreadcrumb;
  breadcrumbArray.forEach((object) =>{
    if(object.primary_card.card === MovedCardObject.primary_card.card){
      if(breadcrumbArray.indexOf(object) > highestIndex ){
        previousBreadcrumb = object
        highestIndex = breadcrumbArray.indexOf(object)
      } 
      
    }
  })

  console.log('highestIndex')
  console.log(highestIndex)

  console.log('previous breadcrumb object')
  console.log(previousBreadcrumb)

// CREATE NEW OBJECT FOR PREVIOUS BREADCRUMB PROPERTIES
let newUndoObj = {
  ...previousBreadcrumb
}

// PUSH NEW OBJECT TO ORIGIN TRACKER
endCardPileTracker.push(newUndoObj)
// POP UNEDITED OBJECT FROM DESTINATION TRACKER
movedCardTracker.pop()
// CLEAR TEMP STORE
storeBreadcrumb = []




  }
})



// ------------------ FOUNDATION ORIGIN -------------------------
}else if(originPileName.includes('pick')){
  // one destination; waste pile
  
  console.log('this card came from a pick pile')

  // NOTE: PICK PILE HAS NO PHYSICAL LOCATION, ONLY THE CONTENTS OF THE TRACKING ARRAY REFER TO CARDS ON THE PICK PILE. 

  // SINGLE CARD UNDO - since pick cards are taken from the end of the pick array, and unshifted to the beginning of the waste array, then the reverse requires the zero position waste array object to be pushed to pick array; a new object can be created and out of the zero position object on the waste array, and then pushed to pick array, and the waste array can be shifted.  Then the current waste array first child can be removed, but returning the card that was there is a little bit harder.  Will probably have to create a new card object to append.  The template for this is found in the remain flip function I think.  Since the tracking object for the previous waste pile top card doesn't get changed after the card is covered by another on the waste pile, there's no need to create a new object, the one at position zero refers to the last move of the appended card. 

  // REMOVE CARD ELEMENT FROM WASTEPILE 
  console.log('waste pile card')
  console.log(wastePile)


//TEMPORARY BREADCRUMB STORE
let storeBreadcrumb = []
//STORE CURRENT BREADCRUMB
storeBreadcrumb.push(lastBreadcrumb)
 //REMOVE CURRENT FROM BREADCRUMB HISTORY
breadcrumbArray.pop()

// FIND CARD OBJECT - that has to be the card object that represents the one at the top of the waste pile, so that has to be the card at position zero of the tracking array for waste cards
MovedCardObject = wasteCardTracker[0]

// GET PREVIOUS BREADCRUMB INSTANCE OF PICK CARD  - the properties on that breadcrumb give details of the cards movement to the WASTE PILE from PICK PILE
let highestIndex = -1;
let previousBreadcrumb;
breadcrumbArray.forEach((object) =>{

// if there is a breadcrumb sharing the same number as 
if(object.primary_card.card === MovedCardObject.primary_card.card){
    if(breadcrumbArray.indexOf(object) > highestIndex ){
      previousBreadcrumb = object
      highestIndex = breadcrumbArray.indexOf(object)
    } 
    
  }
})


// if the highest index is -1, then there are no other instances of the waste card and that means that it has only been in the waste pile once, and that is the move we're attempting to undo. If the card has never moved, then there would be no details on any of the object's properties aside from the card value so all of those have to be reset. 

console.log('highestIndex')
console.log(highestIndex)

// VARIABLE FOR UNDO CARD
let newUndoObj
if(highestIndex >= 0){ // if previous versions of the object exist
// previous breadcrumb object must exist
  console.log('previous breadcrumb object')
console.log(previousBreadcrumb)
// CREATE NEW OBJECT FOR PREVIOUS BREADCRUMB PROPERTIES
 newUndoObj = {
  ...previousBreadcrumb
  }

}else{ // this is the card's first visit to the waste pile

  // create a new obj using wasteCardTracker[0] 
  newUndoObj = {
    ...wasteCardTracker[0]
    }
  
    // modify object to reflect a card that is yet to be moved
    newUndoObj.primary_card.destination = '';
    newUndoObj.when_flipped = '';
    newUndoObj.when_moved = ''
}

// PUSH NEW OBJECT BACK TO PICK PILE TRACKER
pickCardTracker.push(newUndoObj)
  // REMOVE TRACKING OBJECT FROM WASTE ARRAY ZERO POSITION
  wasteCardTracker.shift()
// CLEAR TEMP STORE
storeBreadcrumb = []

// CREATE TOP NEW CARD IMAGE
// only do this if there is more than one card on the waste pile; i.e. more than one object in the wasteCardTracker array. 
if(wasteCardTracker.length > 0){

 // create new image for wastepile card
let newCardElement = document.createElement('img')
// GET CARD RAW VALUE from card which moved down to zero position on wastecard tracker - but this can only work if the array has cards in it 
  console.log('waste pile updated top card')
  console.log(wasteCardTracker[0])
  console.log('waste card tracker full array')
  console.log(wasteCardTracker)
  
  let value = wasteCardTracker[0].primary_card.card 
  // CREATE CARD ID USING CARD VALUE
  let id = value + '.png' 
  // SET ID ATTRIBUTE ON CARD ELEMENT USING ABOVE ID
  newCardElement.setAttribute('id', id)
  // GIVE WASTE CLASSNAME
   newCardElement.classList.add('cardElWaste')
   // ADD BORDER
   newCardElement.classList.add('card-border')
   // MAKE DRAGGABLE
  newCardElement.setAttribute('draggable', true)
  // GET CARD IMAGE
  newCardElement.src = `images/${id}` // define source
  // ATTACH DRAGE EVENTS TO CARD ELEMENT
  newCardElement.addEventListener('dragstart', dragStart)
  newCardElement.addEventListener('dragend', dragEnd)
  wastePile.classList.add('card-size');


  // APPEND NEW CARD TO WASTEPILE
  wastePile.append(newCardElement)
  // AT THIS POINT, THERE SHOULD BE 2 CARDS ON THE WASTE PILE SO REMOVE THE FIRST CARD ELEMENT. 
  if(wastePile.childNodes.length > 1){
    wastePile.removeChild(wastePile.firstChild)
  }
  console.log(wastePile)
}else{ // ONLY ONE CARD TO REMOVE
  // So no card to create
console.log(wastePile)
  if(wastePile.childNodes.length > 0){
    wastePile.removeChild(wastePile.firstChild)
      // create the 'no more cards' element for wastepile
  let newDefaultImage = document.createElement('img')
  // SET SOURCE AS 'NO MORE CARDS' IMAGE
  newDefaultImage.src = 'images/no more cards img.png';
  // ADD CLASSES FOR STYLINGS
  newDefaultImage.classList.add('cardElWaste')
  newDefaultImage.classList.add('card-border')
  // APPEND IMAGE
  wastePile.append(newDefaultImage)
  }

  remainPile.firstChild.src =  `images/pick_reset.png`;


}

console.log('waste pile')
console.log(wasteCardTracker)
console.log('pick pile tracker')
console.log(pickCardTracker)
console.log('breadcrumbs')
console.log(breadcrumbArray)  

// when there are no cards on the waste pile, if, for each object in the tracking array, the object's destination property is an empty string, that indicates the the undo of the current waste card back to pick pile has returned to piles to the initial distribution state where no pick cards have been flipped. So return pick pile image to 'card back', and use an image (which I will create) that says, start card pick, or similar
if(wasteCardTracker.length < 1){
  if(pickCardTracker.length > 0){
    let testValue = 0;
    pickCardTracker.forEach(object => {
      if(object.primary_card.destination == ''){
        testValue ++;
      }else{
        testValue = testValue
      }
    });

// after the loop, if testValue = pick array length then all cards are back in pick array in their initial distribution state; so render pick pile and waste pile images to reflect that state.
if(testValue === pickCardTracker.length){

  if(remainPile.firstChild){
    remainPile.firstChild.src = 'images/back.png'
  }
  
  if(wastePile.firstChild){
    wastePile.firstChild.src = 'images/reveal_deck_card.png'; 
    wastePile.firstChild.style.cssText = 'outline: 5px solid yellow; outline-offset: 3px;'
  }
emptyPile.play()
}

  }
}

}else if(originPileName.includes('waste')){
  // one destination; pick pile
    console.log('this card came from a waste pile')

            // ORIGIN PILE  (WASTE PILE)
            originPileElement = wastePile

    // ORIGIN PILE TRACKER
endCardPileTracker = wasteCardTracker
// DESTINATION TYPE: FOUNDATION 
if(destinationPileName.includes('foundation')){

      // LOCATE DESTINATION PILE ELEMENT
  allFoundationElements.forEach((foundation, foundationIndex) =>{
    if(foundation.id == destinationPileName){
    
    //DROP CARD ELEMENT
    dropCard = foundation.lastChild
    console.log('dropCard')
    console.log(dropCard)

    //FOUNDATION INDEX (can also be used to find card tracker)
      dropIndex = foundationIndex
    //DROP CARD TRACKER ARRAY
    console.log('foundation pile tracker')
    movedCardTracker = foundationTracker[foundationIndex]

    //DROP CARD TRACKING OBJECT
    console.log('drop card object')
    MovedCardObject = movedCardTracker[movedCardTracker.length - 1]
    console.log(MovedCardObject)
    


     

    
                // REMOVE CURRENT CARD FROM WASTE PILE - IF ONE EXISTS.  There might not be one because the returned card may have been the only one in the waste pile before it was moved to the foundation pile; it's movement would have left waste pile empty. So it's return would be to an empty waste pile so there would be no card to remove from waste pile. 
                if(originPileElement.childNodes.length > 0){
                  originPileElement.removeChild(originPileElement.firstChild)
                  
                }    // RETURN/APPEND DROP CARD TO ORIGIN  in this case it's probably better not to append the card but to change the source 
                originPileElement.append(dropCard)

    // TEMP BREADCRUMB STORE
    let storeBreadcrumb = []
    // STORE CURRENT BREADCRUMB
    storeBreadcrumb.push(lastBreadcrumb)
    // REMOVE CURRENT BREADCRUMB FROM HISTORY
    breadcrumbArray.pop()
    
    
      // GET PREVIOUS BREADCRUMB INSTANCE OF DROP CARD  - the properties on that breadcrumb give details of the cards movement to the origin from elsewhere
    let highestIndex = -1;
    let previousBreadcrumb;
    breadcrumbArray.forEach((object) =>{
      if(object.primary_card.card === MovedCardObject.primary_card.card){
        if(breadcrumbArray.indexOf(object) > highestIndex ){
          previousBreadcrumb = object
          highestIndex = breadcrumbArray.indexOf(object)
        } 
        
      }
    })
    
    console.log('highestIndex')
    console.log(highestIndex)
    console.log('previous breadcrumb object')
    console.log(previousBreadcrumb)
    
    // CREATE NEW OBJECT FOR PREVIOUS BREADCRUMB PROPERTIES
    let newUndoObj = {
    ...previousBreadcrumb
    }
    
    // UNSHIFT NEW OBJECT TO WASTE TRACKER -  since the tracking object of the waste pile top card is in the zero position of the waste tracker. 
    endCardPileTracker.unshift(newUndoObj)
    // POP UNEDITED OBJECT FROM DESTINATION TRACKER
    movedCardTracker.pop()
    // CLEAR TEMP STORE
    storeBreadcrumb = []
    
    
    
    }
      })


} // DESTINATION TYPE: PICK PILE
else if(destinationPileName.includes('pick')){

  // when destination is pick pile, this means all cards on waste pile were simultaneously moved back to pick pile. The number of cards transferred is in the group elements property of all cards. JUST REALIZED THIS IS NOT STRICTLY TRUE: when a single card is being undone on the waste pile, it also has a destination of pick pile

  console.log('all waste pile contents objects breadcrumb')
  console.log(lastBreadcrumb)
console.log('breadcrumb array length')
console.log(breadcrumbArray.length)
console.log('cards to remove')
console.log(groupElementsNumber)
  //recursion to save a copy of each card's breadcrumb object to the temporary array, and to remove the original breadcrumb. Clear temporary array first
  tempGroupObjectsArray = []

  function processBreadcrumb(cardsToRemove){
    // shift copy of last breadcrumb to temporary array
  tempGroupObjectsArray.unshift(breadcrumbArray[breadcrumbArray.length - 1])

// remove original from breadcrumb array
  breadcrumbArray.pop()
  // decrement cards to remove number
  cardsToRemove --
  // if cards to remove value is greater than zero
  if(cardsToRemove > 0){
  // run function with decremented number
    processBreadcrumb(cardsToRemove)
  }else{
    // otherwise cards to remove = zero so don't run function again
    console.log('all cards removed')
  }
  }
// send number of cards to be copied to temporary store and to have originals removed from breadcrumb array
  processBreadcrumb(groupElementsNumber)



  // CREATE NEW WASTE ARRAY OBJECTS TO REPRESENT UNDONE CARDS

  // FOR EACH TEMPORARY ARRAY BREADCRUMB ELEMENT
  tempGroupObjectsArray.forEach(object =>{

let highestIndex = -1; // initiate highest index
let previousBreadcrumb; // variable for closest previous breadcrumb
// FIND PREVIOUS COPIES OF OBJECT
breadcrumbArray.forEach((crumb) =>{
  // if breadcrumb object matches temporaray object
  if(crumb.primary_card.card === object.primary_card.card){
    // if the index of breadcrumb object is higher than current highest index
    if(breadcrumbArray.indexOf(crumb) > highestIndex ){
      // set previous crumb for object as the current breadcrumb
      previousBreadcrumb = crumb
      //set highest index as index of current breadcrumb
      highestIndex = breadcrumbArray.indexOf(crumb)
    } 
    
  }
})

// after the breadcrumb loop has ended, use the highest indexed breadcrumb to create a new object to push to waste card tracker, representing the undon card move. If a previous breadcrumb exists, the highest index veriable will have been set to a new number
if(highestIndex > -1){
  let newUndoObj = {
    ...previousBreadcrumb
  }

  // wasteCardTracker should be empty so start to populate it. NOTE: the order of the objects in the temporary array is the same order of the objects in breadcrumb, that is, the order in which they were moved to pickCardTracker. 

  wasteCardTracker.push(newUndoObj)
  
}

  })

// empty the pick card tracker
pickCardTracker = []

// for the multiple card remove change the source of the pick pile image to card back again
remainPile.firstChild.src = `images/backgnd.jpg` 
// the waste tracker array's zero position object's 'primary_card.card' value can be used to get the corresponding card image for display.  AN IMAGE NEEDS TO BE CREATED WHEN THERE IS NO CHILD IN THE WASTE ARRAY

let newWasteCard = document.createElement('img')
// SET SOURCE AS 'NO MORE CARDS' IMAGE
newWasteCard.src = `images/${wasteCardTracker[0].primary_card.card}.png`;
// ADD CLASSES FOR STYLINGS
newWasteCard.classList.add('cardElWaste')
newWasteCard.classList.add('card-border')
// APPEND IMAGE
wastePile.append(newWasteCard)

if(wastePile.childNodes.length > 1){
  // if there is more than one card on the waste pile after this drop then remove the first child
  wastePile.removeChild(wastePile.firstChild)
}
    
}// DESTINATION TYPE: DROP PILE
else{ 

      // LOCATE DESTINATION PILE ELEMENT
      allPileElements.forEach((dropPile, dropPileIndex) =>{
        if(dropPile.id == destinationPileName){
        
        //DROP CARD ELEMENT
        dropCard = dropPile.lastChild
        console.log('dropCard')
        console.log(dropCard)
    
        //DROP PILE INDEX (can also be used to find card tracker)
          dropIndex = dropPileIndex
        // CARD TRACKER ARRAY
        console.log('dropPile pile tracker')
        console.log(dropPileTracker[dropPileIndex])
        movedCardTracker = dropPileTracker[dropPileIndex]
        console.log('drop card object')
        //DROP CARD TRACKER OBJECT
        MovedCardObject = movedCardTracker[movedCardTracker.length - 1]
        console.log(MovedCardObject)
        
    
        // REMOVE CURRENT CARD FROM WASTE PILE - if the waste pile is not left empty by the waste card movement to drop pile then 
        if(originPileElement.childNodes.length > 0){
          originPileElement.removeChild(originPileElement.firstChild)
        }
     
        // RETURN/APPEND DROP CARD TO ORIGIN  in this case it's probably better not to append the card but to change the source 
            originPileElement.append(dropCard)
        
        // TEMP BREADCRUMB STORE
        let storeBreadcrumb = []
        // STORE CURRENT BREADCRUMB
        storeBreadcrumb.push(lastBreadcrumb)
        // REMOVE CURRENT BREADCRUMB FROM HISTORY
        breadcrumbArray.pop()
        
        
          // GET PREVIOUS BREADCRUMB INSTANCE OF DROP CARD  - the properties on that breadcrumb give details of the cards movement to the origin from elsewhere
        let highestIndex = -1;
        let previousBreadcrumb;
        breadcrumbArray.forEach((object) =>{
          if(object.primary_card.card === MovedCardObject.primary_card.card){
            if(breadcrumbArray.indexOf(object) > highestIndex ){
              previousBreadcrumb = object
              highestIndex = breadcrumbArray.indexOf(object)
            } 
            
          }
        })
        
        console.log('highestIndex')
        console.log(highestIndex)
        console.log('previous breadcrumb object')
        console.log(previousBreadcrumb)
        
        // CREATE NEW OBJECT FOR PREVIOUS BREADCRUMB PROPERTIES
        let newUndoObj = {
        ...previousBreadcrumb
        }
        
        // UNSHIFT NEW OBJECT TO WASTE TRACKER -  since the tracking object of the waste pile top card is in the zero position of the waste tracker. 
        endCardPileTracker.unshift(newUndoObj)
        // POP UNEDITED OBJECT FROM DESTINATION TRACKER
        movedCardTracker.pop()
        // CLEAR TEMP STORE
        storeBreadcrumb = []
        
        
        
        }
          })
   

}

console.log('waste pile')
console.log(wasteCardTracker)
console.log('pick pile tracker')
console.log(pickCardTracker)
console.log('breadcrumbs')
console.log(breadcrumbArray)
    }else{
  //DROP PILE ORIGIN
      console.log('this card came from a drop pile')

allPileElements.forEach((pile, pileIndex) =>{
  if(pile.id == originPileName){
        // ORIGIN PILE
        originPileElement = pile
        // ORIGIN INDEX
    originIndex = pileIndex

    // IF ORIGIN PILE STILL HAS CARDS
    if(originPileElement.lastChild){

        // ORIGIN PILE END CARD
 originLastCardElement = originPileElement.lastChild
      console.log('originLastCardElement')
      console.log(originLastCardElement)

// ORIGIN TRACKER ARRAY
    console.log('origin pile tracker')
    endCardPileTracker = dropPileTracker[pileIndex]
    console.log(endCardPileTracker)
// END CARD TRACKER OBJECT
    console.log('left behind card')
    endCardObject = endCardPileTracker[endCardPileTracker.length - 1]
    console.log(endCardObject)


// DESTINATION TYPE: FOUNDATION (ONLY SINGLE CARDS CAN DROP)
if(destinationPileName.includes('foundation')){
  console.log('destination is a foundation pile')

  allFoundationElements.forEach((foundation, foundationIndex) =>{
// LOCATE ORIGIN PILE ELEMENT
if(foundation.id == destinationPileName){

//DROP PILE INDEX (same as tracker index)
  dropIndex = foundationIndex
  //DROP CARD ELEMENT
  dropCard = foundation.lastChild
  console.log('dropCard')
  console.log(dropCard)
// CARD TRACKER ARRAY
console.log('foundation pile tracker')
movedCardTracker = foundationTracker[foundationIndex]
console.log('drop card object')
//DROP CARD TRACKER OBJECT
MovedCardObject = movedCardTracker[movedCardTracker.length - 1]
console.log(MovedCardObject)

// ORIGIN END CARD ORIENTATION CHECK
if(endCardObject.when_flipped === MovedCardObject.when_moved){
  console.log('end card was facedown before drop card moved')

// RESET FACEDOWN ATTRIBUTES
originLastCardElement.src =  `images/backgnd.jpg`
originLastCardElement.setAttribute('draggable', false)

// RETURN / APPEND DROP CARD
originPileElement.append(dropCard)

//because the moved card was on top of a facedown card, it must have been the first move; reset card's object properties to reflect that. 

//OBJECT PROPERTY RESETS
endCardObject.when_flipped = ''
MovedCardObject.primary_card.destination = ''
MovedCardObject.when_moved = ''
MovedCardObject.total_selected = ''

//TRACKING OBJECT REPOSITION
endCardPileTracker.push(MovedCardObject)
movedCardTracker.pop()
breadcrumbArray.pop()

console.log('result')
console.log(dropPileTracker)


}else{

console.log('end card was face up before drop card moved')
// RETURN/APPEND DROP CARD TO ORIGIN
originPileElement.append(dropCard)

// TEMP BREADCRUMB STORE
let storeBreadcrumb = []
// STORE CURRENT BREADCRUMB
storeBreadcrumb.push(lastBreadcrumb)
// REMOVE CURRENT BREADCRUMB FROM HISTORY
breadcrumbArray.pop()


  // GET PREVIOUS BREADCRUMB INSTANCE OF DROP CARD  - the properties on that breadcrumb give details of the cards movement to the origin from elsewhere
let highestIndex = -1;
let previousBreadcrumb;
breadcrumbArray.forEach((object) =>{
  if(object.primary_card.card === MovedCardObject.primary_card.card){
    if(breadcrumbArray.indexOf(object) > highestIndex ){
      previousBreadcrumb = object
      highestIndex = breadcrumbArray.indexOf(object)
    } 
    
  }
})

console.log('highestIndex')
console.log(highestIndex)
console.log('previous breadcrumb object')
console.log(previousBreadcrumb)

// CREATE NEW OBJECT FOR PREVIOUS BREADCRUMB PROPERTIES
let newUndoObj = {
...previousBreadcrumb
}

// PUSH NEW OBJECT TO ORIGIN TRACKER
endCardPileTracker.push(newUndoObj)
// POP UNEDITED OBJECT FROM DESTINATION TRACKER
movedCardTracker.pop()
// CLEAR TEMP STORE
storeBreadcrumb = []

}

}
  })
}else{ // DESTINATION TYPE: DROP PILE
  console.log('destination is a drop pile')

  // NOTE: when origin and destination are both drop pile, since multiple cards can be moved between drop piies, there needs to be a check for the movement of multiple cards, and if true, these need to be handled using extra steps. since ALL cards need to be edited to represent their states prior to their movement, and all need to be transferred back to the origin drop pile. Their tracking objects also need to be returned to the origin drop pile tracker. also, all of their breadcrumb objects will need to be removed. 



let pileLength;
let groupStartIndex;
let groupStartCard;

  // LOCATE DESTINATION PILE ELEMENT
  allPileElements.forEach((pile, pileIndex) =>{
    if(pile.id == destinationPileName){
  
  //DROP PILE INDEX (tracker index is the same)
      dropIndex = pileIndex
    // DESTINATION PILE ELEMENT
      destinationPileElement = pile;

// 'DESTINATION PILE TRACKING ARRAY
console.log('drop pile tracker')
movedCardTracker = dropPileTracker[pileIndex]
console.log(movedCardTracker)


// DROPPED CARD OBJECT AT THE END OF TRACKING ARRAY - note: if multiple cards are dropped then this is the last card in the selected group - otherwise it's just the single card that was selected. 
MovedCardObject = movedCardTracker[movedCardTracker.length - 1]
console.log(' last drop card object of the group')
console.log(MovedCardObject)

// GET GROUP ELEMENTS VALUE ON THE CARD - the number of cards dragged
groupElementsValue = MovedCardObject.primary_card.group_elements
// GET THE OBJECT TYPE OF THE VALUE - the type will either be an empty string or a number (multiple cards have a number, single cards an empty string)
let valueType = typeof groupElementsValue
console.log('group elements kind')
console.log(valueType + ': ' + groupElementsValue)
      //-----------------------------------------------


    // MULTIPLE CARD TRANSFER; DROP PILE TO DROP PILE
    if(valueType == 'number'){ 
  console.log('group drag: number of cards dragged')
  console.log(groupElementsValue)

// FIRST DROP CARD OBJECT
// if single card was moved then the drop object is at the end of destination tracker; but if multiple cards were transferred then use movedCardTracker.length - groupElementsValue as the index to get the first card object.  

// GET PRIMARY CARD INDEX
let primaryCardIndex = movedCardTracker.length - groupElementsValue
// GET PRIMARY CARD OBJECT - highest numbered card
let groupMoveFirstCardObject = movedCardTracker[primaryCardIndex]
console.log('checking if the below index is the same as the one logged on line 1820 because the pile tracker length have the same value as the drop pile childNodes length')
console.log(movedCardTracker.length)

console.log('primary card (highest numbered card)')
console.log(groupMoveFirstCardObject)
console.log('group elements object type')

      // number values indicate multiple card drop 
      console.log('multiple card undo - DROP PILE') 
      console.log('number of cards to undo')
      console.log(groupElementsValue)    
      console.log(groupMoveFirstCardObject)
      console.log('origin pile')
      console.log(originPileElement)  

      console.log('origin pile end card element')
      console.log(originPileElement.lastChild)  

      console.log('origin pile end card tracking object')
      console.log(endCardObject)  

      console.log('PRIMARY drop card tracking object')
      console.log(groupMoveFirstCardObject)  

      console.log('length of pile')

      // GET DESTINATION PILE LENGTH  - this should be the same as the tracking array length
      pileLength = destinationPileElement.childNodes.length
      console.log(pileLength)

      // DIFFERENCE OF PILE LENGTH AND GROUP ELEMENTS TOTAL GIVES FIRST CARD INDEX - this should be the same as the primaryCardIndex found above
      groupStartIndex = pileLength - groupElementsValue
      console.log('start index; used specifically ')
      console.log(groupStartIndex)
      
      // GET GROUP FIRST CARD 
      groupStartCard = destinationPileElement.children[groupStartIndex]
      console.log('group starting card: for info')
      console.log(groupStartCard) 

    


// ORIGIN END CARD ORIENTATION CHECK: CARD FLIPPED BY MOVE
if(endCardObject.when_flipped === MovedCardObject.when_moved){
  console.log('ORIGIN end card was facedown before drop card moved; UNflip card')
  
  console.log( originPileElement.lastChild)
  // RESET ORIGIN END CARD'S FACEDOWN ATTRIBUTES
  originPileElement.lastChild.src =  `images/backgnd.jpg`
  originPileElement.lastChild.setAttribute('draggable', false)
  // play flip sound
cardFlip.play()


    // ORIGIN END CARD OBJECT PROPERTY RESETS
    endCardObject.when_flipped = ''

    // SINCE ORIGIN END CARD WAS FLIPPED, THIS WAS THE FIRST MOVE OF THE GROUP'S FIRST CARD; SO RESET IT'S PROPERTIES.  I don't trust the properties rewrite on this object so I'm going to create a new object and use properties on the primary card to complete the properties on the new object; write the new property values that need changing and then push the object to the origin tracker. Because this is the primary card's first move, the principal origin property takes the origin pile name, and so does the primary_card.origin property, the destination is empty because prior to the undo move there was no movement of the card yet. 

    let primaryUndoObj = {
      primary_card: {
        card: groupMoveFirstCardObject.primary_card.card,
        origin:originPileName,
        destination:'',
        group_elements:''
      }, 
      
      total_selected: '', 
    when_flipped: groupMoveFirstCardObject.when_flipped, 
    when_moved: '',
      principal_origin: originPileName
    }

    // PUSH  NEW PRIMARY CARD OBJECT BACK TO ORIGIN TRACKER - don't forget to remove it from the drop pile tracker - this is done at the end using recursion based on the group_elements value
    endCardPileTracker.push(primaryUndoObj)

  

  //SECONDARY CARDS TRACKING OBJECTS UPDATE AND REPOSITION ------------------------


// FIND ALL SECONDARY CARD OBJECTS IN DESTINATION TRACKER - clear temporary object store first
tempGroupObjectsArray = []
// this pushes a copy of each card in the destination tracker to a temporary array where the object properties can be updated. 
movedCardTracker.forEach((cardObj, objIndex) =>{
  if(objIndex > primaryCardIndex){
    tempGroupObjectsArray.push(cardObj)
  }
})


console.log('temporary group objects array: should contain one object less than group selection number')
console.log(tempGroupObjectsArray)


 // REMOVE OBJECTS FROM BREADCRUMB ARRAY
 function removeBreadcrumbs(cardsToRemove){
  // console.log(cardsToRemove)
  // Number of times breadcrumb is possed is equal to the number of cards in the group
  breadcrumbArray.pop()
  cardsToRemove --
  if(cardsToRemove > 0){
    removeBreadcrumbs(cardsToRemove)
  }else{
    console.log('all cards removed')
  }
  }
  removeBreadcrumbs(groupElementsValue)




  // FIND OTHER BREADCRUMB INSTANCES OF SECONDARY CARDS - UPDATE AND PUSH BACK TO ORIGIN TRACKER  - when two consecutive cards are face up, the upper card must have made at least one movement to the lower card; so if it is moved as part of a group, that would be at least it's second move, or better stated, is second move after moving to the card it was already on top of; and that means that it must have another breadcrumb instance that isn't the one referring to the move that we are trying to undo. This applies to ALL secondary cards in the group. 
 tempGroupObjectsArray.forEach(object =>{
  // initialte highest index variable
  let highestIndex = -1

  // check all breadcrumb objects
  breadcrumbArray.forEach((crumb, crumbIndex) =>{
    // if a matching breadcrumb is found
    if(crumb.primary_card.card === object.primary_card.card){
      // increment highestindex of object
      if(breadcrumbArray.indexOf(crumb) > highestIndex ){
        // set previous crumb for object as the current breadcrumb
       
        //set highest index as index of current breadcrumb
        highestIndex = breadcrumbArray.indexOf(crumb)
      } 
    }
// once last breadcrumb object has been examined, push the breadcrumb with the highest index to the origin tracker

    if(crumbIndex === breadcrumbArray.length - 1){

// PUSH BREADCRUMB REPRESENTING CARDS LAST MOVE BACK TO ORIGIN TRACKER - only if the tracking object has another instance

let numberPushed = 0; // initialize number pushed variable to ensure the correct number of objects have been pushed back to the origin tracker, there should be the total number of cards dragged minus one. 
if(highestIndex > -1){

  endCardPileTracker.push(breadcrumbArray[highestIndex])
  numberPushed ++; // increase number pushed by 1
  console.log('highest index')
console.log(highestIndex)
console.log('previous breadcrumb')
console.log(crumb)
}

    }

  })
// once all breadcrumbs have been examined use highest index to get card's previous breadcrumb and push to origin tracker array
 })




 // REMOVE OBJECTS FROM DESTINATION PILE TRACKER 
function removeCardObjects(cardsToRemove){

  movedCardTracker.pop()
  cardsToRemove --
  if(cardsToRemove > 0){
    removeCardObjects(cardsToRemove)
  }else{
    console.log('all tracking objects removed')
  } 
  
  }
  removeCardObjects(groupElementsValue)
  



}else{ // ORIGIN END CARD WAS NOT FLIPPED BY GROUP CARD MOVE - MULTIPLE card UNDO onto faceup card. 

// same process as above but this time the primary card is included in the breadcrumb search since it must have a history (WHERE IT MOVED TO THE END CARD, WHICH IS FACE UP) and therefore a previous breadcrumb. 

  //TRACKING OBJECTS REPOSITION
// FIND ALL CARD OBJECTS - clear temporary object store first
tempGroupObjectsArray = []
// this pushes a copy of each card in the destination tracker to a temporary array where the object properties can be updated. 
movedCardTracker.forEach((cardObj, objIndex) =>{
  if(objIndex >= primaryCardIndex){
    tempGroupObjectsArray.push(cardObj)
  }
})

// check objects of all moved cards are temporarily stored
console.log('temporary moved objects')
console.log(tempGroupObjectsArray)

// REMOVE OBJECTS FROM BREADCRUMB ARRAY
function removeBreadcrumbs(howMany){
  console.log(howMany)
  breadcrumbArray.pop()
  howMany --
  if(howMany > 0){
    removeBreadcrumbs(howMany)
  }else{
    console.log('all cards removed')
  }
  
  
  }
  removeBreadcrumbs(groupElementsValue)

  // FIND OTHER BREADCRUMB INSTANCES OF CARDS 
  tempGroupObjectsArray.forEach(object =>{
    // initialte highest index variable
    let highestIndex = -1
    // check all breadcrumb objects
    breadcrumbArray.forEach((crumb, crumbIndex) =>{
      // if a matching breadcrumb is found
      if(crumb.primary_card.card === object.primary_card.card){
        // increment highestindex
        highestIndex ++
      }else{
        // otherwise keep current index value
        highestIndex = highestIndex
      }
  // once last breadcrumb object has been examined, push the breadcrumb with the highest index to the origin tracker
  
      if(crumbIndex === breadcrumbArray.length - 1){
  
        endCardPileTracker.push(breadcrumbArray[highestIndex])
        console.log('highest index')
  console.log(highestIndex)
  console.log('card generating index')
  console.log(crumb)
      }
  
    })
  // once all breadcrumbs have been examined use highest index to get card's previous breadcrumb and push to origin tracker array
  
  
   })
  


}

// ------- APPENDING ALL CARDS BACK TO ORIGIN -------------------

      // CREATE DOCUMENT FRAGMENT TO APPEND MULTIPLE CARDS 
      let df = new DocumentFragment()
       // to hold cards to be removed from destination pile
      let realElements = []
      //LOOP THROUGH DESTINATION PILE 
destinationPileElement.childNodes.forEach((child, childIndex) =>{
  console.log(child)

  // FROM PRIMARY CARD ONWARD 
  if(childIndex >= groupStartIndex){
    // CREATE CLONE CARD
    let newChild = child.cloneNode(false)
    // PUSH CLONE TO TEMPORARY ELEMENT ARRAY 
    tempGroupElementsArr.push(newChild)
     // PUSH CARD HTML NODE TO REAL ELEMENT ARRAY 
    realElements.push(child)
  }

 // APPEND EACH CLONE FROM TEMPORARY ELEMENT TO DOCUMENT FRAGMENT
  tempGroupElementsArr.forEach(child =>{
    console.log(child)
df.append(child)
// CHECK DOCUMENT FRAGEMENT
console.log(df)
console.log(realElements)



  })

})
// APPEND DOCUMENT FRAGMENT TO ORIGIN PILE
originPileElement.append(df)
// CLEAR TEMPORARY ELEMENTS ARRAY
tempGroupElementsArr = []
// CLEAR REAL ELEMENTS ARRAY - I don't think this array is needed but keeping it for the moment until complete refactor of code base. 
realElements = []


// -------  END OF APPENDING ALL CARDS BACK TO ORIGIN -------------

// -- ALL TRACKING COMPLETE REPOSITIONING; REMOVE CARD ELEMENTS

// REMOVE UNDO CARDS FROM DESTNATION PILE
function removeCardElements(howMany){
  destinationPileElement.removeChild(destinationPileElement.lastChild)
  howMany --
  if(howMany > 0){
    removeCardElements(howMany)
  }else{
    console.log('all cards removed')
  }
  
  
  }
  removeCardElements(groupElementsValue)
  




    }else{// SINGLE CARD TRANSFER - DROP PILE TO DROP
       // SINGLE CARD TRANSFER - DROP PILE TO DROP
      console.log('single card undo - DROP PILE') 
console.log(`
group elements number: ${groupElementsNumber}

`)

      //DROP CARD OBJECT

console.log('MovedCardObject')
console.log(MovedCardObject)
console.log('group elements object type')



  //DROP CARD ELEMENT
  dropCard = destinationPileElement.lastChild
  console.log('dropCard')
  console.log(dropCard)



// ORIGIN END CARD ORIENTATION CHECK
if(endCardObject.when_flipped === MovedCardObject.when_moved){
  console.log('ORIGIN end card was facedown before drop card moved; UNflip card')
  
  // RESET FACEDOWN ATTRIBUTES
  originLastCardElement.src =  `images/backgnd.jpg`
  originLastCardElement.setAttribute('draggable', false)
  cardFlip.play()
 

  setTimeout(() => {
     // RETURN / APPEND DROP CARD - have a small delay for the card's return
  originPileElement.append(dropCard)
  }, 350);
  
  //because the moved card was on top of a facedown card, it must have been the first move; reset card's object properties to reflect that. 
  
  //END CARD OBJECT PROPERTY RESETS
  endCardObject.when_flipped = ''

  // DROP CARD PROPERTY RESET - create a new tracking object just to be safe. 
  let newDropObj = {

    primary_card: {
      card:MovedCardObject.primary_card.card,
      origin: originPileName,
      destination:'',
      group_elements:''
    }, 
    
    total_selected: '', 
  when_flipped: MovedCardObject.when_flipped, 
  when_moved: '',
    principal_origin: originPileName
    }

  
  //TRACKING OBJECT REPOSITION
  endCardPileTracker.push(newDropObj)
  movedCardTracker.pop()
  breadcrumbArray.pop()
  
  
  }else{// END CARD WAS NOT FLIPPED BY DROP CARD - DROP CARD HISTORY
  
  console.log('end card was face up before drop card moved')
  // return drop card to origin pile
  originPileElement.append(dropCard)
  
  
  //TEMPORARY BREADCRUMB STORE
  let storeBreadcrumb = []
  //STORE CURRENT BREADCRUMB - in a new object
  let newCurrentBreadcrumbObj = {
    ...lastBreadcrumb
  }
  storeBreadcrumb.push(newCurrentBreadcrumbObj)
  //REMOVE CURRENT FROM BREADCRUMB HISTORY
  breadcrumbArray.pop()
  
  // GET PREVIOUS BREADCRUMB INSTANCE OF DROP CARD  - the properties on that breadcrumb give details of the cards movement to the origin from elsewhere
  let highestIndex = -1;
   breadcrumbArray.forEach((object) =>{
    if(object.primary_card.card === MovedCardObject.primary_card.card){
      if(breadcrumbArray.indexOf(object) > highestIndex ){
 
        highestIndex = breadcrumbArray.indexOf(object)
      } 
      
    }
  })

  // given that previous breadcrumb will change several times, to avoid any unforseen issues I think it's better to use the highest available index once the loop of the breadcrumb array is complete. And also to use a condition for only allowing an attmpt at append if highest index has changed. 
  
  console.log('highestIndex')
  console.log(highestIndex)
  
  
  // CREATE NEW OBJECT FOR PREVIOUS BREADCRUMB PROPERTIES - only if highest index has changed
  if(highestIndex > -1){

    let newUndoObj = {
      ...breadcrumbArray[highestIndex]
      }

  // PUSH NEW OBJECT TO ORIGIN TRACKER
  endCardPileTracker.push(newUndoObj)
  // POP UNEDITED OBJECT FROM DESTINATION TRACKER
  movedCardTracker.pop()
  // CLEAR TEMP STORE
  storeBreadcrumb = []

  }else{

    // in the unlikely event of a the unavailability of a previous breadcrumb log the error and show the card for debugging purposes
    console.log('no history breadcrumb exists for this object')
    console.log(MovedCardObject)
  }

  


  
  }
      }

  }
})


}

  
    }else{// ORIGIN IS AN EMPTY PILE
      
      // origin pile tracker
      endCardPileTracker = dropPileTracker[pileIndex]
      // otherwise show pile.  The card can just be dropped back to the previous location
      console.log('origin pile empty')
      console.log(pile)
      // find the drop card and append to origin pile
      console.log(destinationPileName)

      // DESTINATION IS FOUNDATION (ONE CARD DROP ONLY)
  if(destinationPileName.includes('foundation')){
allFoundationElements.forEach((foundation, foundationIndex) =>{
  if(foundation.id == destinationPileName){
  // assign index variable
  dropIndex = foundationIndex

  // probably not necessary but for debugging of any unexpected issues. 
  if(foundation.lastChild){
  // get drop card
  dropCard = foundation.lastChild
  console.log('dropCard')
  console.log(dropCard)
  // remove empty border
  originPileElement.style.cssText = 'border-style: none;'
  originPileElement.append(dropCard)

  }else{
    console.log('foundation card does not exist although it should since the destination is a foundation - INVESTIGATE')
  }

movedCardTracker = foundationTracker[foundationIndex]
MovedCardObject = movedCardTracker[movedCardTracker.length - 1]
  }
})
  // save the card's most recent breadcrumb object to temp array
  let tempBreadCrumb = []
  tempBreadCrumb.push(lastBreadcrumb)
  breadcrumbArray.pop()


  console.log(tempBreadCrumb)
  console.log(breadcrumbArray)

  // use highestIndex variable to get highest index of any previous versions of the card's tracking object 

    // check for other instances - this only applies for kings so use a condition for the values greater than 48

// if the card is a king, its raw value is greater than 48 so check for previous breadcrumb items
if(MovedCardObject.primary_card.card > 48){ // CARD IS A KING

  let highestIndex = -1;
  breadcrumbArray.forEach((object) =>{
    if(object.primary_card.card === MovedCardObject.primary_card.card){
      if(breadcrumbArray.indexOf(object) > highestIndex ){
        highestIndex = breadcrumbArray.indexOf(object)
      } 
      
    }
  })


  if(highestIndex > -1){ //NOT KING'S FIRST MOVE
    // this should give the penultimate move made by the card 
    console.log('previous breadcrumb')
    console.log(breadcrumbArray[highestIndex])
// create a new object using that previous breadcrumb object
    let newUndoObj = {
      ...breadcrumbArray[highestIndex]
    }

// you  don't have to change ANY properties on this object because these were the properties on the card prior to the move which we're trying to undo. so push it to the tracker for the origin pile. 
endCardPileTracker.push(newUndoObj)
// remove cards object from destination pile
movedCardTracker.pop()
tempBreadCrumb = []
  }else{ //KING'S FIRST MOVE so we can use the object in temp storage and just update values on a new object we create using the temp storage, and reseting other values. 

   
    let newUndoKingObj = {
       
      primary_card: {
        card:tempBreadCrumb[0].primary_card.card,
        origin: originPileName,
        destination:'',
        group_elements:''
      }, 
      
      total_selected: '', 
    when_flipped: tempBreadCrumb[0].when_flipped, 
    when_moved: '',
    principal_origin: originPileName
    }

      // now the object needs to be pushed back to the origin tracker
      endCardPileTracker.push(newUndoKingObj)
      // remove cards object from destination pile
  }

movedCardTracker.pop()
}else{
  // CARD IS NOT A KING - move back to empty pile, and it must have been original to the pile so reset all of the properties on the new object. 

  // create new object from breadcrumb object
  let newUndoObj = {
       
    primary_card: {
      card:tempBreadCrumb[0].primary_card.card,
      origin: originPileName,
      destination:'',
      group_elements:''
    }, 
    
    total_selected: '', 
  when_flipped: tempBreadCrumb[0].when_flipped, 
  when_moved: '',
  principal_origin: originPileName
  }

        // now the object needs to be pushed back to the origin tracker
        endCardPileTracker.push(newUndoObj)
        // remove cards object from destination pile
movedCardTracker.pop()

tempBreadCrumb = []


}


  }else{ // DESTINATION DROP PILE

      // GET DESTINATION PILE AND INDEX
allPileElements.forEach((pile, pileIndex) =>{
  // find the drop pile
  if(pile.id == destinationPileName){
// assign index variable
    dropIndex = pileIndex;
// GET PILE ELEMENT 
destinationPileElement = pile;
    // DROP CARD ELEMENT  - FOR SINGLE CARD DROPS
    dropCard = pile.lastChild
    console.log('dropCard')
    console.log(dropCard)
    // remove empty border
    originPileElement.style.cssText = 'border-style: none;'

    movedCardTracker = dropPileTracker[pileIndex]
MovedCardObject = movedCardTracker[movedCardTracker.length - 1]


// CHECK OBJECT TYPE of group_elements property  - if type is number then multiple cards were moved, if type is an empty string, only one card was moved. 
let groupElementsValue = MovedCardObject.primary_card.group_elements
// GET VALUE OBJECT TYPE
let valueType = typeof groupElementsValue
       
    
    if(valueType == 'number'){// MULTIPLE CARD UNDO
  console.log('multiple cards undo')
  console.log(` group elements: ${groupElementsValue}`)
  // INDEX OF OBJECT OF PRIMARY DROP CARD 
  let primaryCardIndex = movedCardTracker.length - groupElementsValue
  // PRIMARY CARD'S OBJECT 
  let groupMoveFirstCardObject = movedCardTracker[primaryCardIndex]

  // GET PRIMARY CARD'S RAW VALUE (the raw value of the primary card is used to check whether a card is a king or not;  king card undos  are sometimes handled in the same manner as non-king undos but, depending on their movement history, may require deviation from the method used method non-king cards )
  let primaryCardValue = groupMoveFirstCardObject.primary_card.card
  console.log('MovedCardObject')
  console.log(groupMoveFirstCardObject)
  console.log('group elements object type')
  
        // number values indicate multiple card drop 
        console.log('multiple card undo - TO EMPTY DROP PILE') 
        console.log('number of cards to undo')
        console.log(groupElementsValue)  
        console.log('primary card object')  
        console.log(groupMoveFirstCardObject)
        console.log('origin pile')
        console.log(originPileElement)  
  
        console.log('length of pile')
  
        // GET DESTINATION PILE LENGTH - used to calculate index of primary card element
        pileLength = destinationPileElement.childNodes.length
        console.log('pile length')
        console.log(pileLength)
  
        // DIFFERENCE OF PILE LENGTH AND GROUP ELEMENTS TOTAL GIVES PRIMARY CARD INDEX IN PILE ELEMENT 
        groupStartIndex = pileLength - groupElementsValue
             console.log('start index')
        console.log(groupStartIndex)
        
        // GET GROUP FIRST CARD 
    groupStartCard = destinationPileElement.children[groupStartIndex]
        console.log('group starting card: for info')
        console.log(groupStartCard) 

// REMOVE CURRENT BREADCRUMBS FOR ALL CARDS; the previous breadcrumbs will be used for the undone card movements.  NOTE: if the primary card is a non-king then it has no previous breadcrumb, but it is not difficult to determine what the values of its properties should be; the when_flipped properties takes from the current breadcrumb since that property does not change for cards that don't originate in the pick pile, which must be the case for the non-king primary card that returns to an empty pile.  The card will have the same origin as primary origin, and, no destination, when moved, or group elements values. 
// REMOVE OBJECTS FROM BREADCRUMB ARRAY - because, for secondary cards we'll need to use the previous breadcrumb object as the of properties information on the undone cards. 
function removeBreadcrumbs(cardsToRemove){
  // console.log(cardsToRemove)
  // Number of times breadcrumb is possed is equal to the number of cards in the group
  breadcrumbArray.pop()
  cardsToRemove --
  if(cardsToRemove > 0){
    removeBreadcrumbs(cardsToRemove)
  }else{
    console.log('all cards removed')
  }
  }
  removeBreadcrumbs(groupElementsValue)

        // CREATE TEMPORARY ARRAY TO HOLD COPIES OF DROP CARD OBJECTS AT DESTINATION - clear the array first
        tempGroupObjectsArray = []


// PUSH A COPY OF EACH CARD'S TRACKING OBJECT TO TEMP ARRAY
movedCardTracker.forEach((cardObj, objIndex) =>{
  if(objIndex >= primaryCardIndex){
    tempGroupObjectsArray.push(cardObj)
  }
})

// check objects of all moved cards are temporarily stored
console.log('temporary moved objects')
console.log(tempGroupObjectsArray)


// check if primary drop card (first in group) is a king or non-king

if(primaryCardValue < 49){ // < 49 RAW VALUE IS NON-KING

  console.log(`multiple card undo; EMPTY DROP PILE - NON-KING PRIMARY CARD
  
  There is only one possible scenario here: 
  The primary card must have originated in the drop pile, because non-kings cannot be moved to empty drop piles. 

  The PRIMARY card must have already flipped because if a facedown card  in the same pile as a group of cards that moves, and sits directly below the group, it will flip to faceup, but not move with the group. Because the primary card is part of the group it must have already been face up, and therefore already flipped.  We can just copy the when_flipped property from the current breadcrumb 
  
  `)
  // card is a non-king so, prior to last move was original to the pile, and not moved before. 

  // RESET PRIMARY CARD PROPERTIES - by creating a new object and copying values not needing to change from temporary object array zero index, or where necessary, rewriting the values on properties to reflect the card's non-moved state
  let newPrimaryObject = {

    primary_card: {
      card: tempGroupObjectsArray[0].primary_card.card,
      origin: originPileName,
      destination:'',
      group_elements:''
    }, 
    
    total_selected: '', 
  // card would have been flipped on another occation prior to cards move, if it was not in pile one. So it's best to use the value on the current breadcrumb
  when_flipped: tempGroupObjectsArray[0].when_flipped, 
  when_moved: '',
    principal_origin: originPileName
  }

// PUSH PRIMARY CARD OBJECT TO ORIGIN TRACKER
endCardPileTracker.push(newPrimaryObject)

// REMOVE PRIMARY CARD OBJECT FROM TEMP ARRAY
tempGroupObjectsArray.shift()



 // FIND OTHER BREADCRUMB INSTANCES OF SECONDARY CARDS -  AND PUSH OBJECT TO ORIGIN TRACKER. THE MOST RECENT PREVIOUS BREADCRUMB OF EACH OBJECT REFLECTS THE OBJECT IN ITS STATE PRIOR TO THE MOVE
 tempGroupObjectsArray.forEach(object =>{
  // initialte highest index variable
  let highestIndex = -1
  // check all breadcrumb objects
  breadcrumbArray.forEach((crumb, crumbIndex) =>{
    // if a matching breadcrumb is found
    if(crumb.primary_card.card === object.primary_card.card){
      // increment highestindex of object
    if(breadcrumbArray.indexOf(crumb) > highestIndex ){
      // set previous crumb for object as the current breadcrumb
      previousBreadcrumb = crumb
      //set highest index as index of current breadcrumb
      highestIndex = breadcrumbArray.indexOf(crumb)
    } 
    }
// once last breadcrumb object has been examined, push the breadcrumb with the highest index to the origin tracker

    if(crumbIndex === breadcrumbArray.length - 1){
// PUSH BREADCRUMB REPRESENTING CARDS LAST MOVE BACK TO ORIGIN TRACKER


// once all breadcrumbs have been examined use highest index to get card's previous breadcrumb and push to origin tracker array


// to be sure that we are pushing a breadcrumb object at all, the index change will indicate that one exists; only if the index is not -1 will the breadcrumb be pushed to the origin pile tracker.  If no object exists then the error can be investigated. 
if(highestIndex > -1){

  endCardPileTracker.push(breadcrumbArray[highestIndex])
  console.log('highest index')
console.log(highestIndex)
console.log('card generating index')
console.log(crumb)

}

    }

  })

 })


 // REMOVE OBJECTS FROM DESTINATION PILE TRACKER
 function removeCardObjects(cardsToRemove){

  movedCardTracker.pop()
  cardsToRemove --
  if(cardsToRemove > 0){
    removeCardObjects(cardsToRemove)
  }else{
    console.log('all tracking objects removed')
  } 
  
  }
  removeCardObjects(groupElementsValue)
  



}else{
  // PRIMARY (first card in group) CARD IS A KING - we need to find out if the card has moved before; we cannot use the when_moved moved property because that gives no information about previous moves if they exist; it only logs the moved that left the card in its current state. 

        // use highestIndex variable to get highest index of any previous versions of the card's tracking object 
        let highestIndex = -1;
        breadcrumbArray.forEach((object) =>{
          // IF ANOTHER INSTANCE IS FOUND 
    if(object.primary_card.card === primaryCardValue){
      // IF THE INDEX OF THE INSTANCE IS GREATER THAN highestIndex 
            if(breadcrumbArray.indexOf(object) > highestIndex ){
        // REASSIGN highestIndex WITH CURRENT INDEX 
              highestIndex = breadcrumbArray.indexOf(object)
            }else{
              highestIndex = highestIndex
            } 
            
          }
        })
    

    // IF highestIndex DIFFERS FROM THE INITIALIZED VALUE  
        if(highestIndex > -1){ // NOT KING'S FIRST MOVE
    // so ALL of the cards have history; get previous breadcrumbs for king and secondary cards
  // FIND OTHER BREADCRUMB INSTANCES OF ALL CARDS 
  tempGroupObjectsArray.forEach(object =>{
    // initialte highest index variable
    let highestIndex = -1
    // check all breadcrumb objects
    breadcrumbArray.forEach((crumb, crumbIndex) =>{
      // if a matching breadcrumb is found
      if(crumb.primary_card.card === object.primary_card.card){
        // increment highestindex
        if(breadcrumbArray.indexOf(crumb) > highestIndex ){
          // set previous crumb for object as the current breadcrumb
          previousBreadcrumb = crumb
          //set highest index as index of current breadcrumb
          highestIndex = breadcrumbArray.indexOf(crumb)
        } 
      }
  // once last breadcrumb object has been examined, push the breadcrumb with the highest index to the origin tracker
  
      if(crumbIndex === breadcrumbArray.length - 1){
  // PUSH PREVIOUS CRUMB TO ORIGIN TRACKER - but make to check for errors use the condition to only attempt the push if the initialized highest index value has changed. 
  if(highestIndex > -1){
    // not sure if it would be better to create a new object; better safe than sorry
let newEndCardObject = {
...breadcrumbArray[highestIndex]
}

    endCardPileTracker.push(newEndCardObject)
    console.log('highest index')
console.log(highestIndex)
console.log('card generating index')
console.log(crumb)

  }else{
    console.log('there is no history breadcrumb for this card')
  }

      }
  
    })
  
  
   })
  


    // CLEAR TEMPORARY BREADCRUMBS STORE 
    tempBreadCrumb = []
        }else{ // KING'S FIRST MOVE
          
           // KING'S FIRST MOVE so we can create a new object with fresh values to represent the king in the state of unmoved card originating in the origin pile. 
    
         
          let newUndoKingObject = {

            primary_card: {
// get card value from zero position item which is primary card tracking object
              card: tempGroupObjectsArray[0].primary_card.card,
              origin:originPileName,
              destination:'',
              group_elements:''
            }, 
            
            total_selected: '', 
// if the card was in pile one, then it never flipped, otherwise it must have flipped at some point, either way, just copy whatever is on the current breadcrumb            
          when_flipped: tempGroupObjectsArray[0].when_flipped, 
          when_moved: '',
            principal_origin: originPileName
          }

            // now the object needs to be pushed back to the origin tracker
            endCardPileTracker.push(newUndoKingObject)
// REMOVE KING CARD OBJECT FROM TEMP ARRAY so that others can be looped through to find their previous breadcrumbs
tempGroupObjectsArray.shift()

            // CHECK PREVIOUS BREADCRUMBS OF OTHER CARDS, SO THEY CAN BE USED AS CARD TRACKING OBJECTS FOR SECONDARY CARDS IN THEIR ORIGINAL STATE BEFORE CURRENT MOVE
            tempGroupObjectsArray.forEach(object =>{
              // initialte highest index variable
              let highestIndex = -1
              // check all breadcrumb objects
              breadcrumbArray.forEach((crumb, crumbIndex) =>{
                // if a matching breadcrumb is found
                if(crumb.primary_card.card === object.primary_card.card){
                  // increment highestindex
                  highestIndex ++
                }else{
                  // otherwise keep current index value
                  highestIndex = highestIndex
                }
            // once last breadcrumb object has been examined, push the breadcrumb with the highest index to the origin tracker
            
// WHEN ALL BREADCRUMBS HAVE BEEN CHECKED, IF A PREVIOUS BREADCRUMB IS FOUND PUSH TO ORIGIN TRACKER
                if(crumbIndex === breadcrumbArray.length - 1){


            // again, use a condition that a previous breadcrumb exists or not, so we can handle errors
            if(highestIndex > - 1){
              endCardPileTracker.push(breadcrumbArray[highestIndex])
              console.log('highest index')
        console.log(highestIndex)
        console.log('card generating index')
        console.log(crumb)
            }else{
              console.log('no previous breadcrumb exists')
            }

                }
            
              })
            // once all breadcrumbs have been examined use highest index to get card's previous breadcrumb and push to origin tracker array
            
            
             })
        }
    


     
         // REMOVE OBJECTS FROM DESTINATION PILE TRACKER
 function removeCardObjects(cardsToRemove){

  movedCardTracker.pop()
  cardsToRemove --
  if(cardsToRemove > 0){
    removeCardObjects(cardsToRemove)
  }else{
    console.log('all tracking objects removed')
  } 
  
  }
  removeCardObjects(groupElementsValue)
  
}

    // remove card's object from destination pile at the end with the other cards

  // ------- APPENDING ALL CARDS BACK TO ORIGIN -------------------

      // CREATE DOCUMENT FRAGMENT TO APPEND MULTIPLE CARDS 
      let df = new DocumentFragment()
       // to hold cards to be removed from destination pile
      let realElements = []
      //LOOP THROUGH DESTINATION PILE 
destinationPileElement.childNodes.forEach((child, childIndex) =>{
  console.log(child)

  // FROM FIRST CARD ONWARD 
  if(childIndex >= groupStartIndex){
    // CREATE CLONE CARD
    let newChild = child.cloneNode(false)
    // PUSH CLONE TO TEMPORARY ELEMENT ARRAY 
    tempGroupElementsArr.push(newChild)
     // PUSH CARD HTML NODE TO REAL ELEMENT ARRAY 
    realElements.push(child)
  }

 // APPEND EACH CLONE FROM TEMPORARY ELEMENT TO DOCUMENT FRAGMENT
  tempGroupElementsArr.forEach(child =>{
    console.log(child)
df.append(child)
// CHECK DOCUMENT FRAGEMENT
console.log(df)
console.log(realElements)
  })

})
// APPEND DOCUMENT FRAGMENT TO ORIGIN PILE
originPileElement.append(df)
tempGroupElementsArr = []


// -------  END OF APPENDING ALL CARDS BACK TO ORIGIN -------------
// forgotten to remove the end card elements from destination. 
// -- ALL TRACKING COMPLETE REPOSITIONING; REMOVE CARD ELEMENTS

// REMOVE UNDO CARDS FROM DESTNATION PILE
function removeCardElements(howMany){
  destinationPileElement.removeChild(destinationPileElement.lastChild)
  howMany --
  if(howMany > 0){
    removeCardElements(howMany)
  }else{
    console.log('all cards removed')
  }
  
  
  }
  removeCardElements(groupElementsValue)
  



}else{ // SINGLE CARD UNDO 


  /* there are three possible scenarios here
  1. card is a king so may have moved to the origin from elsewhere
  2. card is not a king and could not have been placed in the origin so it could not have come from elsewhere. */


  // CREATE TEMPORARY ARRAY 
  let tempBreadCrumb = []
// save COPY OF card's most recent breadcrumb object 
  tempBreadCrumb.push(lastBreadcrumb)
  // REMOVE ORIGINAL  BREADCRUMB 
  breadcrumbArray.pop()


  console.log(tempBreadCrumb)
  console.log(breadcrumbArray)


    // check for other BREADCRUMBS instances - this only applies to kings so use a condition for raw card values greater than 48


  if(tempBreadCrumb[0].primary_card.card > 48){ // CARD IS A KING
    
      // use highestIndex variable to get highest index of any previous versions of the card's tracking object 
    let highestIndex = -1;
    breadcrumbArray.forEach((object) =>{
      // IF ANOTHER INSTANCE IS FOUND 
if(object.primary_card.card === tempBreadCrumb[0].primary_card.card){
  // IF THE INDEX OF THE INSTANCE IS GREATER THAN highestIndex 
        if(breadcrumbArray.indexOf(object) > highestIndex ){
    // REASSIGN highestIndex WITH CURRENT INDEX 
          highestIndex = breadcrumbArray.indexOf(object)
        } 
        
      }
    })

// IF highestIndex ISN'T INITIALIZED VALUE  
    if(highestIndex > -1){ // NOT KING'S FIRST MOVE
// THE BREADCRUMB WITH THE HIGHEST INDEX IS THE KING'S LAST STATE  
      console.log('previous breadcrumb')
      console.log(breadcrumbArray[highestIndex])
// create a new object using that previous breadcrumb object
      let newUndoObj = {
        ...breadcrumbArray[highestIndex]
      }

// you  don't have to change ANY properties on this object because these were the properties on the card prior to the move which we're trying to undo. so push to origin pile tracker. 
endCardPileTracker.push(newUndoObj)
// remove card's object from destination pile
movedCardTracker.pop()
// CLEAR TEMPORARY BREADCRUMBS STORE 
tempBreadCrumb = []
    }else{ // KING'S FIRST MOVE so we can use the object in temp storage and just update its values

     
      let newUndoObj = {
        ...tempBreadCrumb[0]
      }
      // update values
      newUndoObj.primary_card.destination = ''
      newUndoObj.when_moved = ''
      newUndoObj.total_selected = ''
    }

        // now the object needs to be pushed back to the origin tracker
        endCardPileTracker.push(newUndoObj)
        // remove card's object from destination pile
movedCardTracker.pop()
  }else{
    // CARD IS NOT A KING - move back to empty pile

    // create new object from temporary breadcrumb object
    let newUndoObj = {
      ...tempBreadCrumb[0]
    }
    // update object values
    newUndoObj.primary_card.destination = ''
    newUndoObj.when_moved = ''
    newUndoObj.total_selected = ''

              // now the object needs to be pushed back to the origin tracker
              endCardPileTracker.push(newUndoObj)
              console.log(endCardPileTracker)
              
              // remove cards object from destination pile
      movedCardTracker.pop()
    
      tempBreadCrumb = []
    
  }

// APPEND CARD HERE 
  originPileElement.append(dropCard)


}
  }

})





  }


    }
 
  }
})
// get the origin pile element

// 
    }

if(breadcrumbArray.length < 1){
  undoBtn.style.cssText = 'display:none;'
}  

}
})












// DROP TO TARGET
const drop = (event) =>{
// console.log(event)




// ASSESS CONDITION OF WASTE PILE AND PICK PILE HERE ---------

 
 event.target.style.opacity = "1";

  // remove pile highlight
  event.target.classList.remove('enter')

 
    // the rest of the function can only continue if data can be extracted from event.dataTransfer (if the card fails to drop, there will be no data available so we want to prevent an attempt to use the data to find the drop object id)

  // THIS COULD BE IN A FUNCTION 
  // get id data from dragged card
  const id = event.dataTransfer.getData("text/plain");
  // create new object using id 
  if(id){
  const newObj = document.getElementById(id);

  // extract integer value from id
let objBaseValue = parseInt(newObj.id)
// convert number to card's true value
let objTrueValue = Math.ceil(objBaseValue/4)

// variables for checking card colors
let lastChildSuitColor; 
let dropCardSuitColor; 

// variable used to store the number of facedown cards in the drop piles when all pick cards have been distributed







// pick each foundation pile one by one and send them to the compare function


// if needed, convert waste cards to normal cards, since waste cards are only dragged as single cards, and there is no wrapper to unwrap, we can avoid both multiReset and autoResetGo if on conversion and just prevent default.  No need to run faceUp either because they don't come from a drop pile. but preupdateWaste needs to run. 


// LAST GATE FOR CARD DROPS
const cardType = (object) =>{


// CHECK CLASS LIST ATTRIBUTE ON CARD
let objectType = object.getAttribute('class')
// CARD HAS 'DRAGGING' CLASS PRIOR TO DROP SO REMOVE NOW CARD IS DROPPED
if(objectType.includes('dragging')){
   object.classList.remove('dragging')
}






// if the dropped object was a waste card 
  if(objectType.includes('cardElWaste')){

  console.log('waste card object dropped elsewhere');
  console.log(object);
// the card loses its status as waste card and becomes a normal card
    object.classList.remove('cardElWaste');
    object.classList.add('cardEl'); 

    // FUNCTION FOR DEALING WITH WASTE CARD DROP
    preUpdateWaste(object)

    // NOTE: preUpdateWaste is for when the drop card is a waste pile card.  The card drops to the destination further down inside this current function; but then the waste pile needs updating because there are no physical cards on the pile, but rather, just the array representation of the cards currently on the pile. That array is updated, and then, the next card image is selected based on an array element in a specific position on the array (zero position).  This is where dropped waste cards differ from dropped foundation or regular pile cards.  In the left behind ordinary piles, the card is already in place, or there is no card at all, so there is no need to create an element to place in the origin pile.  The waste pile on the other hand needs this to be done.   


    // later on I'll be having 3 cards display on the origin pile so this will alter things slightly where, only when the waste pile has > 3 cards will the update waste function be needed. 
  }



event.preventDefault()
// this is the destination 
console.log('event target - drop pile')
console.log(event.target)
event.target.appendChild(object)

// once any card has been moved from drop piles or pick piles the undo button will appear - when the game is solved breadcrumbs will be cleared so button will disappear, preventing accidental use of the undo button after game completion. 
if(breadcrumbArray.length > 0){
  // show button if breadcrumbs exist
  undoBtn.style.display = "block"

}




let destination = event.target.id
// console.log('destination')
// console.log(destination)

// functions for moving cards to appropriate tracking array --- 


// card originating in WASTE pile
const wasteCardDrop = (card, destination, cardObject) =>{
  // console.log('waste card drop function in operation ...')
  // console.log('card primary details')
  // console.log(
  //   `
  //  card: ${card}
  // origin: ${cardObject.primary_card.origin}
  // destination: ${destination}
  //   `
  // )

  // console.log('card main details')
  console.log(cardObject)
  // get destination index and push OBJECT to associated array (note, waste pile cards positions are automatically updated elsewhere, so no need to find and remove them from waste array since that is alread done)
let destinationIndex; 
// if destination is a drop pile
if(destination.includes('pile')){
pileNavigation.forEach(element =>{
   // check navigation array for destination name
  if(element == destination){ 
    // get index of the element wwhose value is the destination name
    destinationIndex = pileNavigation.indexOf(element)

// use the index to get the array which corresponds to the pile name and push the object to the end of the array, which represents the card being at the end of the pile
    dropPileTracker[destinationIndex].push(cardObject)

    // check the destination pile to ensure it worked
console.log('destination pile (card originated in waste pile)')
console.log(dropPileTracker[destinationIndex])
  }
})


}else{ // if destination is a foundation pile
  foundationNavigation.forEach(element =>{
// check navigation array for destination name
    if(element == destination){
      // get index of matching destination name
      destinationIndex = foundationNavigation.indexOf(element)
// using the index value find the corresponding tracking array in the main foundation tracker, and push the object to that array so it will be the last element of the array, which represents its true position in the pile, the last card. 
foundationTracker[destinationIndex].push(cardObject)
    }
  })
}

// console.log('all code executed logging tracking arrays...')
// console.log(allTrackers)

}

// card originating in foundation pile
const foundationCardDrop = (card, destination, cardObject) =>{
let cardOrigin = cardObject.primary_card.origin
//  console.log('foundation card drop function')
//  console.log(
  //  `
 // card: ${card}
 // origin: ${cardOrigin}
 // destination: ${destination}
 //   `
 // )

  console.log(cardObject)
  // NOTE: foundation cards can only go to drop piles so the object is going to pile tracker. cards of one foundation pile can be moved to another foundation pile if its empty, but the whole group has to move which is redundant so I could prevent movement from one foundation to another and that would solve the problem of having to code for multiple foundation cards moving from one foundation pile to  another which is redundant and in no way impacts the game outcome. Since the only card that can move into an empty spot is an 'ace' you could prevent a card drop to a foundation pile if the card's origin is a foundation pile.  Since in group drops, only the first card's details are used, preventing the ace drop prevents the whole group drop. 


    // ADD CARD TO DESTINATION - get destination index and push OBJECT to associated array
  let destinationIndex; 
  // if destination is a drop pile
   pileNavigation.forEach(element =>{
     // check navigation array for destination name
    if(element == destination){
      // get index of matching name
      destinationIndex = pileNavigation.indexOf(element)
console.log(destinationIndex)
      //push object to the pile array with the same index
      dropPileTracker[destinationIndex].push(cardObject)
      console.log(allTrackers)
    }
  })

   // REMOVE CARD FROM ORIGIN get origin index and pop OBJECT from associated array
   let originIndex; 
   foundationNavigation.forEach(element =>{
    if(element == cardOrigin){
      originIndex = foundationNavigation.indexOf(element)
      // card must be the end card in the foundation subarray since it is the last card on the foundation pile (only one at a time can be dropped)
      foundationTracker[originIndex].pop()
      console.log(allTrackers)
  }
  })

}
 
// single card originating in drop pile 
const singleCardDrop = (card, destination, cardObject, ) =>{
//   console.log(breadcrumbArray[breadcrumbArray.length - 1])
//   console.log('single card drop function... in operation')
// // destination can be another drop pile or a foundation pile.
// console.log('object (post drop) of selected card with DESTINATION added')

let cardOrigin = cardObject.primary_card.origin
console.log(cardObject)
// console.log('card tracking details')
// console.log(
//   `
// card: ${card}
// origin: ${cardOrigin}
// destination: ${destination}
//   `
// )


let destinationIndex;
 // get destination index and push OBJECT to associated array
 // if destination is a foundation pile
if(destination.includes('foundation')){
    // push object to foundation tracker
  foundationNavigation.forEach(element =>{
    // check navigation array for destination name
        if(element == destination){
          // get index of matching foundation name
          destinationIndex = foundationNavigation.indexOf(element)
    //push object to the foundation  tracking array having the same index
    foundationTracker[destinationIndex].push(cardObject)
    console.log(allTrackers)
        }
      })
}else{
  
  
  // foundation pile is not a destination
  // push object to drop pile tracker
  pileNavigation.forEach(element =>{
    // check navigation array for destination name
   if(element == destination){
     // get index of matching name
     destinationIndex = pileNavigation.indexOf(element)
     dropPileTracker[destinationIndex].push(cardObject)

   }
 })
}


// get index for card origin and remove from associated drop pile subarray in drop pile tracker
// CURRENTLY NOT CATCHING THE CARD FROM ORIGIN. 
pileNavigation.forEach(element =>{
  if(element == cardOrigin){
    index = pileNavigation.indexOf(element)
    dropPileTracker[index].pop()
}})

// console.log('all code executed - log tracking array')
// console.log(allTrackers)

}

// multiple cards originating in drop pile 
const multipleCardDrop = (card, destination, cardObject) =>{
  console.log('card')
  console.log(card)

  console.log('multiple card drop function')
  console.log(
    `
  card: ${card}
  origin: ${cardObject.primary_card.origin}
  destination: ${destination}
  cards moved: ${cardObject.total_selected}
    `
  )



    // the advantage is that multiple cards only move from drop pile to drop pile, so, unlike with single card or waste pile drops, destination type check is not needed. 

const modifyGroupCards = (selected, total, array) =>{
console.log(selected, total, array)
let moveMade = breadcrumbArray.length
// array is origin array
// total is number of cards selected, how many to delete in splice
// selected is card index in original array
let destinationArray;
let destinationIndex; 
let trueDestination = destination
let trueOrigin = array[selected].primary_card.origin

console.log(trueOrigin, trueDestination)

// finding destination array
pileNavigation.forEach(element =>{
  // check navigation array for destination name
 if(element == destination){
   // get index of matching name
   destinationIndex = pileNavigation.indexOf(element)
   destinationArray = dropPileTracker[destinationIndex]

   // the group elements total is missing from the first element so I'm adding it here, it's not really necessary because the total is already in 'selected' but just for uniformity. 
array[selected].primary_card.group_elements = total
array[selected].primary_card.destination = destination
array[selected].when_moved = moveMade


   // because you don't need to alter the first card for group elements, true origin and destinations you could push it to the destination array from here - its details will still be available for the other objects in the incoming 'origin' array because that array isn't cleared of the first element until ALL modifications are complete. 

   // this will only push the first selected card object to the destination array
  //  breadcrumbArray.push(firstObject)
   destinationArray.push(array[selected])
  }
})



// adding '1' to selected means that only the cards beyond the first selected card in the original pile will receive the modifications of origin, group elements, and destination, which are already correct on the first selected card. 
for(i = selected +1; i < array.length; i++){

// create a new object and populate with data for transfer objects
  let newDestinationObj = {
    primary_card: {
      card:array[i].primary_card.card,
      origin: trueOrigin,
      destination:destination,
      group_elements: total
    }, 
    
    total_selected: total, 
    when_flipped:array[i].when_flipped, 
    // will replace the when_moved constant with breadcrumb length
    // when_moved: moveMade,
    when_moved: breadcrumbArray.length + 1,
    principal_origin: array[i].principal_origin
    }

    breadcrumbArray.push(newDestinationObj)
    destinationArray.push(newDestinationObj)


// push objects to destination tracker array

}
  // after all card objects have been modified and pasted pushed to destination tracker, then the original objects can be deleted from origin tracking array. 
    dropPileTracker[originIndex].splice(selected, total)
console.log(allTrackers)
console.log(breadcrumbArray)

}
  

  // the only difficulties here involve  splicings all moved cards from the origin subarray, and pushing all cards to destination subarray. The easier of the two is removing the card objects from the origin array because only the index of the first card, which we already have the code for finding in other functions, is needed. Then just splice from that index to the end of the array; so I'll start with that
let originIndex;
let cardIndex
let originTrackerArray;
let originArrayLength
let toDelete
pileNavigation.forEach(element =>{
   // check navigation array for destination name
  if(element == cardObject.primary_card.origin){
    // get index of matching name
    originIndex = pileNavigation.indexOf(element)

    // but this is just the index which finds the subarray with the destination name; what's still needed is the index of the exact card object
    originTrackerArray = dropPileTracker[originIndex]
originArrayLength = originTrackerArray.length
    dropPileTracker[originIndex].forEach(elementValue =>{
      if(elementValue.primary_card.card === card){

        cardIndex = dropPileTracker[originIndex].indexOf(elementValue)
        console.log(cardIndex)
         toDelete = originArrayLength - cardIndex
// splice all moved cards from original tracking array

        modifyGroupCards(cardIndex, toDelete, originTrackerArray)
// dropPileTracker[originIndex].splice(cardIndex, toDelete) 
      }
    })
  }
})



// all cards apart from the first are showing, so the arrays need to be populated immediately after shuffle. Face down cards should also be included.

}

// -----------------------------------------------------------


// tracking card movement; this will be used for the auto complete when it becomes clear that there is a solution to win the game. It can also be used to create a history of movements in the game so that a back button can be used. 
const trackCard = (cardObject) =>{

// console.log('tracking object')
// console.log(cardObject)
  //prior to the calling of this function, the temporary object for the drop card has been pushed to breadcrumb array so the temporary array entry can be deleted because it is no longer needed - a copy of it was sent to this function so now the copy is used. 

  tempDragCardArr = [] 
// console.log('card tracker function in operation...')
// console.log('card object, argument to this function')
// console.log(cardObject)


let card;
let origin;
let dropDestination;
let cardsMoved;


  if(cardObject){
    // console.log('card is being tracked')

    objectOnly = cardObject.primary_card
    card = cardObject.primary_card.card
    origin = cardObject.primary_card.origin;
    dropDestination = cardObject.primary_card.destination;
    cardsMoved = cardObject.total_selected;

//   console.log('show object deails prior to sending to card appropriate card drop manager - which transfers the objects between origin and destination tracking arrays')

// console.log(`
// card: ${card}
// origin: ${origin}
// destination: ${dropDestination}
// cards moved: ${cardsMoved}
// `)
  

// origin of card dicates how it is to be processed
// if the origin was the waste pile
if(origin == 'waste-pile'){
  wasteCardDrop(card, dropDestination, cardObject)
  }else if(origin.includes('foundation')){
    // if the origin was a foundation pile
  foundationCardDrop(card, dropDestination, cardObject)
  // only the inner object needs to be sent because 
  }else{
  
    switch(cardsMoved){
      case 1: // do same code as moving foundation card (once that is figured out)
      singleCardDrop(card, dropDestination, cardObject)
      break;
      default: // work out how to catch all moved cards in the origin  array and to push them all to the destination array
      multipleCardDrop(card, dropDestination, cardObject)
    }
  
  
  }
    
  }else{
    // do nothing
    console.log('card is not being tracked')
  }



}


console.log('object')
console.log(object)
// card ORIGIN is waste pile - create a new waste pile object for tracking. 
if(wasteCardTracker.length > 0 && wasteCardTracker[0].primary_card.card === parseInt(object.id)){
  console.log(' card originated in waste pile')
  
  // console.log('card moved from waste pile')
 
  let wasteObj = {
    primary_card: {
          card:  wasteCardTracker[0].primary_card.card,
          origin:'waste-pile',
          destination:event.target.id, 
          group_elements: ''
             }, 
        when_flipped:breadcrumbArray.length + 1,
        when_moved:breadcrumbArray.length + 1,
        total_selected: 1,
        principal_origin: wasteCardTracker[0].principal_origin
      }

breadcrumbArray.push(wasteObj)
// NOW removed the card from the pack-waste workflow
wasteCardTracker.shift()



  // update origin and destination details of object because, in the breadcrumb array, the object will still have origin as pick pile and destination as waste pile. 
let breadcrumbWasteCard = breadcrumbArray[breadcrumbArray.length - 1]
      // send card object to tracker
  trackCard(breadcrumbWasteCard)
  }else{

    if(tempDragCardArr.length < 1){ // ORIGIN is foundation pile

      // if an element doesn't exist in the  temporary object arry then this must have originated in the foundation because foundation clicks don't send objects to the temporary array

      // to get the origin pile it's possible to loop through the tracking array of all foundation piles, check only the end element of each subarray, and whichever one has the card value of the parsed object id, is the object which belongs to the card.  then in the below new object we could copy accross the details that should remain and update the new object, push it to the array for the destination and also push it to the breadcrumb. 
      let rawValue = parseInt(object.id)
      let destinationPileName = event.target.id
      let foundationIndex;
      let foundationName; 
      let foundationObjectDropped;

foundationTracker.forEach(subarray =>{
  if(subarray.length > 0){
    let finalCard = subarray[subarray.length - 1]
    if(finalCard.primary_card.card === rawValue){
      foundationIndex = foundationTracker.indexOf(subarray)
     foundationName = foundationNavigation[foundationIndex]
    //  console.log('finalCard')
    //  console.log(finalCard)
    //  console.log('name of foundation pile')
    //  console.log(foundationName)

// create a new object
      foundationObjectDropped = {
      primary_card: {
        card:  rawValue,
        origin:foundationName,
        destination:destinationPileName, 
        group_elements: ''
           }, 
      when_flipped:finalCard.when_flipped,
      when_moved:breadcrumbArray.length + 1,
      total_selected: 1,
      principal_origin: finalCard.principal_origin

    }
    breadcrumbArray.push(foundationObjectDropped)
    // console.log(breadcrumbArray)
    // console.log('foundation card just moved')
    // console.log(foundationObjectDropped)
    trackCard(foundationObjectDropped)
    }
  }

})



    }else{
// ORIGIN is drop pile
// console.log('check there is a temporary object for the dropped card')

if(tempDragCardArr[0]){
  // console.log('checking temporary object array')
  // console.log(tempDragCardArr[0]) 
  let droppedObject = tempDragCardArr[0]

  // create a new drop object and add/update details

  // NOTE: if the card has moved before, then the ORIGIN needs to be taken from the card' destination; two ways of doing this are to check that the 'when moved' property has a value, or to check whether the destination property is a non empty string. 

  // an example, if I moved card '2' from pile seven to pile one, then it's properties will be ORIGIN:pile-7, DESTINATION:pile1.  If I go to move it back to pile 7, when I update the new object with the previous detials, I'll use target.id for the destination, which is correct, but the origin is pile-7, so the new object will have the properties;  ORIGIN:pile-7, DESTINATION:pile-7. This is going to affect the functions that search for and remove items, meaning the item origin, being wrong, might cause no object to be returned in the search for the object in the origin tracking array.  So nothing may be moved, leading to the object being in two places.  So that the tracking is no longer accurate.  

  // create a variable for the origin and assign the correct value depending on whether the card was previously moved. 

  let trueOrigin; 
  if(droppedObject.when_moved > 0){
// console.log('this card has been moved before; use destination property for new origin property')
trueOrigin = droppedObject.primary_card.destination
  }else{
    // console.log('first time movement of this card, so use origin for new origin')
    trueOrigin = droppedObject.primary_card.origin
  }
   let pileObjectDropped = {
    primary_card: {
      card:  droppedObject.primary_card.card,
      origin:trueOrigin,
      destination:event.target.id, 
      group_elements: ''
         }, 
    when_flipped:droppedObject.when_flipped,
    when_moved:breadcrumbArray.length,
    total_selected: droppedObject.total_selected,
    principal_origin:droppedObject.principal_origin
   }
   breadcrumbArray.pop() // get rid of old object
   breadcrumbArray.push(pileObjectDropped) // push new object
   trackCard(pileObjectDropped)
}else{
  // console.log('no object exists in temporaray store')
}
    }



  }

faceUp()



multiReset(newObj) // this removes the red border and wrapper

// give empty drop piles a visible border for easy locating
dropPilesEl.forEach(function(cardPile){
  if(cardPile.childNodes.length < 1){
cardPile.style.cssText = 'border-style: solid;background-color:none; border-color:yellow; border-width:2px;'

    }else{cardPile.style.cssText = 'border-style: none;'}
  })

  // give empty foundation piles visible border for locating  
    foundationPilesEl.forEach(function(cardPile){
      if(cardPile.childNodes.length < 1){
    cardPile.style.cssText = 'border-style: solid;'
            }else{cardPile.style.cssText = 'border-style: none; background-color:none;';}
})

  }




// non king drop to DROP PILE
const checkNumbers = (color1, color2, number1, number2) =>{

  // parameter for adjacent card difference calculation
  let consecutiveVal = number1 - number2
switch(consecutiveVal){
//if the adjacent cards are consecutive their sum difference is 1
case 1:
  // then if the adjacent colours are different
if(color1 !== color2){ 

// the card drop is legal
// if temporary array contains the card's tracking object
  if(tempDragCardArr.length > 0){
// push tracking object to breadcrumb
// console.log('check temporary array')
// console.log(tempDragCardArr[0])
    breadcrumbArray.push(tempDragCardArr[0])
  }


  cardType(newObj) // send card to be appended. 
}else{
  // if the cards are consecutive but are not different colours
  console.log('invalid card: consecutive cards must be of different colors')};
// remove card's tracking object from temporary drag card array
tempDragCardArr.pop() // don't push to breadcrumb and don't append
break;
// if the card values are not consecutive
default: // illegal move 
console.log('invalid card: difference between consecutive cards must be 1')
// remove card's tracking object from temporary drag card array
tempDragCardArr.pop()
}
}

// drop pile cards check adjascent colours
const checkColors = (prevCard, dropCard) =>{
  // determine previous card colour by finding the remainder of the card raw value divided by 4. 
  switch(prevCard % 4){
    case 0: //spades
    case 1: lastChildSuitColor = 'black' // clubs
    break;
    default: lastChildSuitColor = 'red' // any other number and the suits are dimonds or hearts
    }

// determine drop card color with the same method above
    switch(dropCard % 4){
      case 0:
      case 1: dropCardSuitColor = 'black'
      break;
      default: dropCardSuitColor = 'red'
         }

         // convert end card raw value to true value 
         let lastChildTrueVal = Math.ceil(prevCard/4)
         // variable takes drop card's true value
         let dropCardTrueVal = objTrueValue

         // send end card and drop card suit colour and end card and drop card tru value
checkNumbers(lastChildSuitColor, dropCardSuitColor, lastChildTrueVal, dropCardTrueVal)
}



// DROP CARD SCENARIOS BELOW --------------------------------- these functions are used to decide if the card will be appended to the drop target, the intended pile destination. This is done by comparing the details of the last card in event target, the destination pile, with the details of the card that is attempting to make the drop,  If the card attempting to drop is rejected because of an illegal move, then the cards tracking object is deleted from the temporary drag card array. But, note, for cards originating in the waste pile and foundation pile, there exist no temporary object yet because they were only created in the event listener for drop pile clicked cards. Those objects have to be created separately. 

// king drop to DROP PILE
const emptyPilePlaceKing = () =>{

  // push card object to breadcrumb as this card's drop is successful
  // this stops an empty value being placed in the breadcrumb array when a card is dropped from the waste pile
  if(tempDragCardArr.length > 0){
    // console.log('empty drop pile placing KING...')
    breadcrumbArray.push(tempDragCardArr[0])
  }
  cardType(newObj)
 }

// placement on DROP PILE
const placeNonKing = () =>{
  // get last child in drop target pile
  let endChild = event.target.lastChild;
 
// extract id
  let lastChildBaseValue = parseInt(endChild.id)

  // send end card value and drop card value
  checkColors(lastChildBaseValue, objBaseValue)

}

// NON ACE DROP FOUNDATION PILE
const FoundationNumbers = (prevCard, dropCard) =>{
   
  let consecutiveVal = prevCard - dropCard;
  // if drop card and end card true values are consecutive subtracting the drop card's value from the end card's value should result in -1; any other result indicates the cards' values are not consecutive

  switch(consecutiveVal){
   case -1: // cards are consecutive so go ahead and complete card drop

   // SUCCESS so push card to breadcrumb
  // this stops an empty value being placed in the breadcrumb array when a card is dropped from the waste pile
  if(tempDragCardArr.length > 0){
    breadcrumbArray.push(tempDragCardArr[0])
  }

      cardType(newObj)
  
  break;
  default:
    console.log('only ajdacent cards must have consecutive numbers')
// remove card's tracking object from temporary drag card array
tempDragCardArr.pop()
         }}

// check suit of drop card against the last card in the pile
const FoundationSuits = (prevCard, dropCard) =>{
// from foundationPlaceNonAce()
  let prevSuit = prevCard % 4;
  let dropSuit = dropCard % 4;
  // if the division of drop card and end card's raw number by 4 results in the same remainder; the cards are of the same suit, so you can proceed and check the true values are consecutive. 

  // determine previous card suit
  switch(prevSuit){
    case dropSuit: // cards are the same suit
   
   // convert previous card raw value to true value
   let lastChildTrueVal = Math.ceil(prevCard/4);
 // variable takes drop object's true value
 let dropCardTrueVal = objTrueValue
 // send both cards to check their true values are consecutive
FoundationNumbers(lastChildTrueVal, dropCardTrueVal)
break;// cards are not of the same suit so reject card drop
    default: console.log('suits must match in foundation pile')
    // remove card's tracking object from temporary drag card array
tempDragCardArr.pop()
    }



      
        

}

// ACE DROP on EMPTY foundation pile
const emptyFoundationPlaceAce = () =>{

  // SUCCESS - but if the card comes from the waste pile, there is not a copy in the temporary array because the tracking object is created only when a card from the waste pile successfully drops to foundation or drop piles, so there's nothing here to push; so check the condition of temporaray array first and if it's empty, no matter because the drop card will be pushed to breadcrumb array by other means. 

  // this stops an empty value being placed in the breadcrumb array when a card is dropped from the waste pile
  if(tempDragCardArr.length > 0){
    breadcrumbArray.push(tempDragCardArr[0])
  }

    cardType(newObj)
}

// if foundation pile is not empty we drop a non-ace (only single card drops allowed here)
const foundationPlaceNonAce = () =>{
// if the number of cards in the wrapper is less than two, then only one card is being dropped and the attempted move is legal
if(newObj.childNodes.length < 2){
 // now the current card's color and number needs to be checked against the colour and number of card we are attempting to drop onto
 // get the pile's end card
  let endChild = event.target.lastChild;
  // get the raw valuie of the end card
  let lastChildBaseValue = parseInt(endChild.id)
  // send card to check its suit
FoundationSuits(lastChildBaseValue, objBaseValue)

}else{
    // number of cards in the wrapper is 2 or greater
    console.log('multiple card drop disallowed');
  // remove card's tracking object from temporary drag card array
tempDragCardArr.pop()
  
  }
 }



// SWITCH PILE TYPE, then check pile state and drop card to see whether the card meets the initial conditions for dropping on the specific pile in its given state; if the card meets initial conditions, it is sent on to one of the above functions, either for the final decision to drop or for further assessment. 
switch(event.target){
  // if the destination is a foundation pile
case foundationPileOne:
case foundationPileTwo:
case foundationPileThree:
case foundationPileFour:
// if the pile is empty and the true value of the dragged card is '1', i.e. it is an ace
if(event.target.childNodes.length === 0 ){
  // drop the card to the empty foundation pile
if(objTrueValue === 1){ emptyFoundationPlaceAce() // drop the ace}  
}else{ // PILE EMPTY, but card isn't an ace; illegal move
console.log('only an ACE can be placed on empty foundation')
// remove card's tracking object from temporary drag card array
tempDragCardArr.pop()
 }
}else{
// foundation pile contains cards so 'attempt to place non ace'
foundationPlaceNonAce()
}
  break;

// any other card must have a destination of drop pile (waste pile drops are handled elsewhere)
  default:   
if(objTrueValue === 13){ // if card is KING
// check number of cards in pile
  switch(event.target.childNodes.length){// check number of cards in pile
    case 0: emptyPilePlaceKing()// if pile is empty, drop king
    break;
    // otherwise pile is not empty; KING drop is illegal
   default: console.log('cannot drop king on another card')
   // remove card's tracking object from temporary drag card array
tempDragCardArr.pop()
  }
  }else{ // otherwise card is NON-KING
    switch(event.target.childNodes.length){
      // if pile is empty - illegal move cannot drop a non-king
      case 0: console.log('cannot drop non-king card on empty space')
      // remove card's tracking object from temporary drag card array
tempDragCardArr.pop()
      break;
 // otherwise pile is not empty so drop non king
      default: placeNonKing();
  }}
  
}
// dealing with two values: king or non-king




// ALL CARDS ORIENTATION ASSESSMENT ----------------------------------------------------------------------------------------------------------------

let faceDownCards;



// trying this function on waste card drops

// the below condition applies when all pick cards have been  distributed, with the exception of 'one' card, the only card in the waste pile and which is face up; if true, then all cards originating in the pick pile are now faceup and distributed.
console.log('wasteCardTracker')
console.log(wasteCardTracker)
console.log('pickCardTracker')
console.log(pickCardTracker)
if(wasteCardTracker.length < 2 && pickCardTracker.length === 0){
  // reset facedown cards for each time the check runs
 faceDownCards = 0;
  console.log('pick pile and waste pile are empty')
console.log(`auto solve possible variable ${autoSolvePossible}`)
  // if autosovepossible variable is 1 the check for card orientation has been done and it was already found that all cards are face us, so the check (which is inside this condition) will not run since, once cards are oriented in a face up position, they cannot be facedown again, so once this situation of all cards being oriented face up is achieved, the sate remains for the rest of the game. 
  if(autoSolvePossible < 1){ 

console.log('auto solve is possible')

// loop through drop piles 
dropPileTracker.forEach(pile =>{  // on each drop pile
  // if the first card's tracking object has an empty string for the when_flipped property it must still be face down
console.log('checking drop pile face down cards')
  // forgot that the pile needs to actually have cards in order to check otherwise this will fail.  The tracking array will have contain no elements on which to check the 'when_flipped' property; only do this on populated piles. 
  if(pile.length > 0){
    console.log(pile)
    console.log(pile[0])

    if(pile[0].when_flipped >= 0 || pile[0].when_flipped !==''){
      //when_flipped has a value, so don't increment
      faceDownCards = faceDownCards
        }else{

              // otherwise  increment the faceDownCards variable
      faceDownCards +=1
        }
    
  }

})


// with the parent condition met, ONCE ALL CARDS ARE FACEUP, the game can be solved. 
if(faceDownCards === 0){ // all cards are facing up, and game completion must be possible. So give player the option to auto complete game. NOTE* if the player continues the game, there is no need to re-run this function because this current condition always applies; pick cards and all other cards are already facing upward. 

  console.log('all cards are facing up - show solve button')
// show auto solve button 
  solveBtn.style.cssText = 'display:block;'

  alert('would you like to auto solve this game? if so click the solve button')
  // increase cards finish variable, which will prevent the 'faceup' check running again. 
  autoSolvePossible += 1

// REMOVE EVENT LISTENER FROM PICK PILE

undoBtn.style.cssText = 'display:none;'
  // CHANGE IMAGES FOR PICK PILE AND WASTE PILE
    // CREATE NEW IMAGE ELEMENT
    let newDefaultImage = document.createElement('img')
    // SET SOURCE AS 'NO MORE CARDS' IMAGE
    newDefaultImage.src = 'images/no more cards img.png';
    // ADD CLASSES FOR STYLINGS
    newDefaultImage.classList.add('cardElWaste')
    newDefaultImage.classList.add('card-border')
    // APPEND IMAGE
    wastePile.append(newDefaultImage)
  
  
  
    // if remain pile still has card back
    if(remainPile.childNodes.length > 0){
    // REMOVE CARD BACK FROM REMAIN PILE
    remainPile.removeChild(remainPile.firstChild)
    }
  
    // CREATE NEW IMAGE
    let newremainImage = document.createElement('img')
    // SET SOURCE AS CARD FACE WITH ALL SUITS IMAGE
    newremainImage.src = 'images/default card face.png';
    // ADD CLASSES FOR STYLING
    newremainImage.classList.add('cardElWaste')
    newremainImage.classList.add('card-border')
    // APPEND IMAGE
    remainPile.append(newremainImage)
  

}else{

  console.log('some cards are still face down')
  // do nothing - the game can only be solved once all cards are face up so although  autoSolvePossible variable will only increment at that point if it is ever reached. 

}
}

}else{
  
  // console.log('piles not empty yet')

}
// END OF ALL CARDS ORIENTATION ASSESSMENT ------------------------------------------------------------------------------------------------------------------

console.log(dropPileTracker)
console.log(foundationTracker)
console.log(breadcrumbArray)
}else{
    console.log('failed card drop - try again')
  }

}





//AUTO SOLVE FUNCTIONS BELOW-------------------------------------



let lastFoundationCard;
let totalCardsAdded = 0;

// temporary function for testing solve scenario; auto solve function seems to be working now - will need to test on several solve scenarios. 
function useArrays(newdrop, newFoundation){

  // dropPileTracker.push(...newdrop)
  // foundationTracker.push(...newFoundation)
}





// function for placing cards into solved state
const placeAllCards = (map) =>{
/*
BROAD MOVEMENTS:
-get the pile index of the map object under examination
- using the correct pile get the card which corresponds to the object
- append the card from the end of the drop pile to the end of the foundation pile

*/


// function for dropping cards to foundation piles, one card per second, to complete the game
  function delayCardDrop(mapIndex, pileIndex, foundationIndex){
    setTimeout(() => {
// map index comes from the solution map, indicating which step in the path to solution is in process
// pile index is for the parent of the card to be moved to foundation index
// foundationIndex is used to decide where to append the card
      allFoundationElements[foundationIndex].append(allPileElements[pileIndex].lastChild)

      console.log(i)
    }, 1000*mapIndex);

    if(mapIndex === solutionMapArray.length){
      alert('GAME IS COMPLETE')
      breadcrumbArray = []
    }
  }





let indexOfDropPile;
let foundationIndex;
let dropObjValue;
let dropCardValue;
let mapIndex = 0;
  map.forEach(step =>{
    indexOfDropPile = step.drop_pile_index;
    foundationIndex = step.foundation_pile_index
    dropObjValue = step.moved_values.drop_pile_end_card

    // get card 
    console.log('map step')
console.log(step)
    console.log('card object')
    console.log(allPileElements[indexOfDropPile].lastChild)
// console.log(allPileElements[dropPileIndex])
console.log('foundation pile to have card appended')
console.log(allFoundationElements[foundationIndex])
mapIndex++
delayCardDrop(mapIndex, indexOfDropPile, foundationIndex)
// append card to foundation pile

  })
}
// AUTO-COMPLETE CHECK TO SEE IF ALL CARDS ARE FACE UP
function comparePileCard(fPile, index){


// variable for the number of empty drop pile trackers
let totalEmptyDropPiles = 0;
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
    

        console.log('check move')
        console.log(`
        drop pile end card: ${lastDropPileCardValue}
        foundation pile end card: ${lastFoundationCardValue}
        sum difference: ${lastDropPileCardValue - lastFoundationCardValue} 
        `)






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

      // console.log(moveDetails)

        
        



// push move details to solution map array
      solutionMapArray.push(moveDetails)
        }

        // push the drop pile card object to the foundation tracker
        foundationTracker[index].push(dropPile[dropPile.length -1])
        // if total cards added is incremented (as they are when a compatible card is found), the greater than zero value indicates that the card was removed from the tracking subarray for drop piles and a new end card exists; the new card can be used to check the other foundation arrays to see if it is compatible with any of the end cards. 
        totalCardsAdded ++

// use reassign the last foundation card with the raw value of the new card added from drop pile end 
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
  console.log('SOLVE COMPLETE')

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
  // console.log('running solve')
  pickFoundation(0)
})


//AUTO SOLVE FUNCTIONS ABOVE-------------------------------------




// if multiple cards are dropped this resets the cards to draggable 'true' and unwraps them, then deletes the wrapper from the drop pile
const multiReset = (wrapper) =>{

  
// check if object has children, i.e. is a wrapper
let wrapperElement = document.getElementById(wrapper.id)
// console.log(wrapperElement)

let hasChildren = wrapper.childNodes.length
if(hasChildren > 0){
// if true, give child nodes a variable so we can add or remove attributes and classes
let children = wrapper.childNodes

if(hasChildren > 1){
// console.log('multiple cards')
// console.log('children')
// console.log(children)
}

// loop through children to add attributes
for(i = 0; i < hasChildren; i++){
  children[i].setAttribute('draggable', 'true')
  children[i].classList.remove('multi-style')
 
  // push the children to a temporary array
}

// CONSOLE console.log(wrapperElement)

// for unwrapping the multiple dragged cards
var parent = wrapperElement.parentNode
// console.log(parent.childNodes)
while (wrapperElement.firstChild) parent.insertBefore(wrapperElement.firstChild, wrapperElement);
parent.removeChild(wrapperElement);
// ok, this actually works so now 

// check card attributes in the drop pile
// console.log(event.target) 





// the calculation can be made when the pick source is empty, 
/* 
   
*/
// we might be able to use insertBefore to take the cards out of the wrapper and then we can delete it. 

}else{console.log('single card')}
}





// we don't need forEach for this since it is only one element
wastePile.addEventListener('dragover', dragOver)
wastePile.addEventListener('dragleave', dragLeave)


// add event listeners to all foundation piles
foundationPilesEl.forEach(function(element){
  element.addEventListener('dragenter', dragEnter)
  element.addEventListener('dragover', dragOver)
  element.addEventListener('dragleave', dragLeave)
  element.addEventListener('drop', drop)
})

// add event listeners to all drop piles
dropPilesEl.forEach(function(element){
  element.addEventListener('dragenter', dragEnter)
  element.addEventListener('dragover', dragOver)
  element.addEventListener('dragleave', dragLeave)
  element.addEventListener('drop', drop)
})









// after looping through clicked to top card of pile we send the pile, clicked card and top card for selection - 
const selectRange = (pile, start,object) =>{





let pileId = pile.id // we need pile id to grab element properly
// switch id and use the pile that has matching id as element for start and end children in new range. 

  


switch(pileId){
case pileOne.id: tempPile = pileOne
break;
case pileTwo.id: tempPile = pileTwo
break;
case pileThree.id: tempPile = pileThree
break;
case pileFour.id: tempPile = pileFour
break;
case pileFive.id: tempPile = pileFive
break;
case pileSix.id: tempPile = pileSix
break;
case pileSeven.id: tempPile = pileSeven
break;
}


// console.log(start, pile.childNodes.length, object)

let end = pile.childNodes.length;
let testRange = new Range() // create new range
testRange.setStart(tempPile, start); // set 'element, start child'
testRange.setEnd(tempPile, end);// set 'element, end child'
  document.getSelection().removeAllRanges(); // clear existing selection if any
 document.getSelection().addRange(testRange); // select new range
 // $(tempPile).multidraggable() // make pile multidraggable

//  console.log('origin pile')
//  console.log(testRange.endContainer.id)
//  console.log('testRange')
//  console.log(testRange.commonAncestorContainer.childNodes)

  let firstCard = object[0]
  let wrapperId = parseInt(object[0].id)

  // console.log('first card value - which is card id')
  // console.log(wrapperId)


// we could try to create a dive here, insert it into tempPile, and then append all items in the array to it, increase its z-index to above the cards and then make it draggable, and see if we can move it to another position. But then that would defeat whole purpose of multidraggable... Well, let's see. UPDATE = yes, it was right; we no longer needed the the multidraggable JQuery... I just removed the 'draggable function from the cards that we append to the div so that they could not be moved.  gave the wrapper an id of the base value of the first card, and then when it gets dropped that number is used to check the colour and true number of the div which, if suitable, allows the div to be dropped onto a card or an empty space.. WORKS LIKE A CHARM! 

let wrapper = document.createElement('div') // div to wrap cards in
wrapper.setAttribute('id',wrapperId) // give id (integer value of clicked card so when wrapper is dropped, drop handler can read it's id and extract true value and colour value which would match the clicked card to see if colour and number match criteria for dropping)

// now check orientation of the page and give appropriate wrapper dimensions. If width > height, use landscape, or if width < height, use portrait
winW = window.innerWidth;
winH = window.innerHeight
winCalc = winW - winH


if(winCalc < 0){
  wrapper.classList.add('wrapper-portrait')
}else{

  wrapper.classList.add('wrapper-landscape')
}



wrapper.setAttribute('draggable', 'true') // make draggable
tempPile.insertBefore(wrapper,firstCard) // insert into pile
// console.log(tempPile)
wrapper.addEventListener('dragstart', dragstartMulti)// add event listeners
wrapper.addEventListener('dragend', dragendMulti)

for(i=0; i < object.length; i++){
  wrapper.appendChild(object[i]) // append cards to be dragged
  object[i].setAttribute('draggable', 'false')// make cards un-draggable

}
// now the wrapper can be dragged and dropped (if the id value allows for it)


// BUT if the drop fails, or we change our minds and choose not to drag the wrapper, we need to make the undraggable cards dragabble again, and to unwrap the wrapper: those two things would have been done if the wrapper was dropped, but since in this scenario there is no drop we'll use the below function and in it, set a time delay of a couple of seconds before resetting the selected cards to their normal draggable, unwrapped state. 




let commandUnwrap = 0;
let commandNothing = 0;


// since this settimeout is causing some issues of the card disappearing for over a second when the mouse button is released, we might as well try to ditch the time out and use mouseup instead, that might actually work better.  I've had to jig this function quite a bit to get a reasonable timing from card pickup  to card drop or reject - still working on it

if(mouseDownArr[0] === 0){
// console.log('mouse down')

setTimeout(() => {
      
   
  // console.log(pile.childNodes.length)
  
    for(i = 0; i<pile.childNodes.length; i++)
    { 
    //  console.log(pile.childNodes[i].id.length)
  if(pile.childNodes[i].id.length < 3){
  commandUnwrap += pile.childNodes[i].id.length
  }else{
    commandNothing += pile.childNodes[i].id.length
  }}
  
  // if commandUnwrap has no value then the auto reset go will not run, but if it does have a value then the reset function will run
  if(commandUnwrap > 0){autoResetGo(pile,object,wrapper,commandUnwrap)}else{autoResetGo(pile,object,wrapper,commandNothing)}

}, 3000);


}else{

  setTimeout(() => {
      
   
    // console.log(pile.childNodes.length)
    
      for(i = 0; i<pile.childNodes.length; i++)
      { 
      //  console.log(pile.childNodes[i].id.length)
    if(pile.childNodes[i].id.length < 3){
    commandUnwrap += pile.childNodes[i].id.length
    }else{
      commandNothing += pile.childNodes[i].id.length
    }}
    
    // if commandUnwrap has no value then the auto reset go will not run, but if it does have a value then the reset function will run
    if(commandUnwrap > 0){autoResetGo(pile,object,wrapper,commandUnwrap)}else{autoResetGo(pile,object,wrapper,commandNothing)}

  }, 1500);

}

      
   



 // ok, so we can use the id length to figure out if the pile contains a wrapper, because the wrapper id consists of only 1 or two charachters, a single or a double digit - all other id's are at least 5 characters long because '.png' is four characters long, and a number (single digit or double digit) is added making the 'id' 5 or 6 charachters long.   
}



// WHEN PILE IS CLICKED draggable cards from clicked card upwards are highlighted ready for dragging
dropPilesEl.forEach(function(cardPile){
  // for each pile add an event listener. 

// PROBLEM SOLVED... 'click' is a combination of 'mousedown' and 'mouseup', so you have to wait for mouseup to happen before the function actually starts running. So by setting the event listener to 'mousedown' everything will start to run as soon as you click down on the mouse.  The function will then decide if the target is draggable, i.e, the actual clicked card, and loop from that card through to the last card if 'draggable:true; '. Then the parent is pushed to the array, and so are the click child.  Then in the select array, they are wrapped and the wrapper is made draggable and highlighted, given an id that corresponds to the value of the clicked card, and is therefore ready for dragging and dropping.  This means that it is impossible to drag a sandwiched draggable card without dragging all of the cards above it.  As opposed to using the click function which requires 'mouseup'; if you tried to drag the card between mousedown and mouseup, then the loop and highlight function would not work so you could drag the card out; but now that's impossible. PROBLEM SOLVED.  Now you just need to check the issues with dragging into the foundation pile to prevent that occuring - we can just specify what type of 'attribute' to disallow from any attempted drop cards.  

// NOTE 2.. we also need to deal with what happens if multiple cards are dropped back into their original pile because you change your mind. You'll need to unwrap them so perhaps we can make the unwrap function separate (which I think we already have; it's the multiReset function) - I think the conditions for this already exist in the drop() frunction, 

// and you need to do multi-reset on from the foundation pile as well. this wasn't an issue before because when draging just one card, which is what we do to drop a card on a foundation pile, it wasn't wrapped in a container, but now even just 'one' selected card is wrapped so we need to unwrap it.  

cardPile.addEventListener('mousedown', (event) => {
  // clear select array on double click 

  //console.log('NEW CARD SELECTED ----------------------------')
  selectArray = []
  dragIdArray = []





  // define pile children, children length, and clicked target
  let children = cardPile.childNodes // cards belonging to pile
  let maxVal = children.length // number of cards
  let target = event.target // clicked card
  let parent = target.parentNode // parent pile
  let attr = target.getAttribute('draggable') // target drag status


let cardValue =  parseInt(target.id)
// console.log('origin pile element below:')
// console.log(parent)
// console.log('origin pile name below:')
// console.log(parent.id)
if(event.target.length > 0){
  // console.log('previous card')
  // console.log(event.target.previousSibling)
}else{
  // console.log('no cards left in pile')
}


// getting the object of the clicked card from the tracking array. 
let pileIndex;
let cardObj
pileNavigation.forEach(pile =>{
  if(pile == parent.id){
pileIndex = pileNavigation.indexOf(pile)
// console.log('card objects in tracking subarray of origin pile (minus the moved card - unopened console element will show original number of cards in pile; but opened, the correct total will show')
// console.log(dropPileTracker[pileIndex])
dropPileTracker[pileIndex].forEach(card =>{
if(card.primary_card.card === cardValue){
cardObj = card
// console.log('object of selected card, with destination properties added')
// console.log(cardObj)
}
})
  }
})


// THIS IS FOR CREATING THE DRAGGABLE GROUP
if(attr == "true"){ // if draggable: true; get the HTML element
selectArray.push(parent) // THIS IS THE SELECTED PILE
//$(cardPile).multidraggable()
for(i=0; i < maxVal; i++){ // loop through pile's children (cards)
if(children[i] == target){ // when child[i] is target card

let j;
for(j=i; j<maxVal; j++){ 
// loop through parent pile from child[j] to last child
  children[j].classList.add('multi-style')// style looped children
selectArray.push(j) // push children to array
dragIdArray.push(children[j])
// console.log(dragIdArray)

}}}


cardObj.total_selected = dragIdArray.length
tempDragCardArr.push(cardObj)

// console.log('breadcrumbs - last element is last card moved')
// console.log(tempDragCardArr[0])
// create an object from array entries with the indexes as keys

selectRange(selectArray[0], selectArray[1], dragIdArray)
}else{
console.log('cannot drag a face down card')

}





})
})



