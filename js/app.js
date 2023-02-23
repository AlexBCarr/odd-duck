'use strict';

console.log('motivated mindset!');

// ******** GLOBALS ********
let picArray = [];
let votingRounds = 25;

// ******** DOM WINDOW ********
let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');
let resultsBtn = document.getElementById('show-results-btn');
let resultList = document.getElementById('results-container');

// ******** canvas Element for Chart ********
let ctx = document.getElementById('my-chart');

// ******** COMSTRUCTOR FUNCTION ********
function Pic(name, fileExtension = 'jpg'){
  this.name = name;
  this.image = `img/${name}.${fileExtension}`;
  this.votes = 0;
  this.views = 0;
}


// ******** UTILITIES *******

let indexArray = [];

function renderPic(){

  while(indexArray.length < 6){
    let randomNum = randomIndex();
    if(!indexArray.includes(randomNum)){
      indexArray.push(randomNum);
    }
  }

  // let imgOneIndex = randomIndex();
  // let imgTwoIndex = randomIndex();
  // let imgThreeIndex = randomIndex();

  // while(imgOneIndex === imgTwoIndex || imgOneIndex === imgThreeIndex || imgTwoIndex === imgThreeIndex){
  //   imgTwoIndex = randomIndex();
  //   imgThreeIndex = randomIndex();
  // }

  console.log(indexArray);

  let imgOneIndex = indexArray.shift();
  let imgTwoIndex = indexArray.shift();
  let imgThreeIndex = indexArray.shift();

  imgOne.src = picArray[imgOneIndex].image;
  imgOne.title = picArray[imgOneIndex].name;
  imgOne.alt = 'this is an image of ${picArray[imgOneIndex].name}';

  imgTwo.src = picArray[imgTwoIndex].image;
  imgTwo.title = picArray[imgTwoIndex].name;
  imgTwo.alt = 'this is an image of ${picArray[imgTwoIndex].name}';

  imgThree.src = picArray[imgThreeIndex].image;
  imgThree.title = picArray[imgThreeIndex].name;
  imgThree.alt = 'this is an image of ${picArray[imgThreeIndex].name}';


  picArray[imgOneIndex].views++;
  picArray[imgTwoIndex].views++;
  picArray[imgThreeIndex].views++;


}

function randomIndex(){
  return Math.floor(Math.random() * picArray.length);
}

// ***** HELPER FUNCTION TO RENDER CHART *****
function renderChart(){
  let picNames = [];
  let picVotes = [];
  let picViews = [];

  for (let i = 0; i < picArray.length; i++) {
    picNames.push(picArray[i].name);
    picVotes.push(picArray[i].votes);
    picViews.push(picArray[i].views);
  }

  let chartObj = {
    type: 'bar',
    data: {
      labels: picNames,
      datasets: [{
        label: '# Of Votes',
        data: picVotes,
        borderWidth: 2,
        backgroundColor: ['black'],
        borderColor: ['yellow']
      },
      {
        label: '# Of Views',
        data: picViews,
        borderWidth: 2,
        backgroundColor: ['grey'],
        borderColor: ['yellow']
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

// ******* CHART CONSTRUCTOR *******

  new Chart(ctx, chartObj); //eslint-disable-line

}

// ******** EVENT HANDLERS ********

function handleImgClick(event){
  let imgClicked = event.target.title;
  console.dir(imgClicked);

  for(let i =0; i < picArray.length; i++){
    if(imgClicked === picArray[i].name){
      picArray[i].votes++;
      votingRounds--;
      renderPic();
    }
  }


  if(votingRounds === 0){
    imgContainer.removeEventListener('click', handleImgClick, resultList);

    // ****** LOCAL STORAGE STARTS HERE ******
    // ! STEP 1 - TURN INTO STRING
    let stringifiedPics = JSON.stringify(picArray);

    console.log('Stringifed Pics >>> ', stringifiedPics);

    // ***** MOVE INTO LOCAL STORAGE ******
    localStorage.setItem('myPics', stringifiedPics);

    // let retreivedPics = localStorage.getItem('myPics');

    // console.log('Pics from LS >>>', retreivedPics);

    // let parsedPics = JSON.parse(retreivedPics);

    // console.log('Parsed Pics >>>>', parsedPics);

    // if(retreivedPics){
    //   picArray = parsedPics;
    // } else {
    //   let bagPic = new Pic('bag');
    //   let bananaPic = new Pic('banana');
    //   let bathroomPic = new Pic('bathroom');
    //   let bootsPic = new Pic('boots');
    //   let breakfastPic = new Pic('breakfast');
    //   let bubblegumPic = new Pic('bubblegum');
    //   let chairPic = new Pic('chair');
    //   let cthulhuPic = new Pic('cthulhu');
    //   let dogPic = new Pic('dog-duck');
    //   let dragonPic = new Pic('dragon');
    //   let penPic = new Pic('pen');
    //   let petSweepPic = new Pic('pet-sweep');
    //   let scissorsPic = new Pic('scissors');
    //   let sharkPic = new Pic('shark');
    //   let sweepPic = new Pic('sweep', 'png');
    //   let tauntaunPic = new Pic('tauntaun');
    //   let unicornPic = new Pic('unicorn');
    //   let waterCanPic = new Pic('water-can');
    //   let wineGlassPic = new Pic('wine-glass');

    //   picArray.push(bagPic,bananaPic,bathroomPic,bootsPic,breakfastPic,bubblegumPic,chairPic,cthulhuPic,dogPic,dragonPic,penPic,petSweepPic,scissorsPic,sharkPic,sweepPic,tauntaunPic,unicornPic,waterCanPic,wineGlassPic);



    // }


  }
}

function handleShowResults(){
  if(votingRounds === 0){
    // for(let i = 0; i < picArray.length; i++){
    //   let picListItem = document.createElement('li');
    //   picListItem.textContent = '${picArray[i].name}: View: ${picArray[i].views} & Votes: ${piArray[i].votes}';
    //   resultsList.appendChild(picListItem);
    // }
    renderChart();

    resultsBtn.removeEventListener('click', handleShowResults);
  }
}

// ***** PICS FROM LOCAL STORAGE

let retreivedPics = localStorage.getItem('myPics');

console.log('Pics from LS >>>', retreivedPics);

let parsedPics = JSON.parse(retreivedPics);

console.log('Parsed Pics >>>>', parsedPics);

// ******** LONG WAY OF UPDATING PARSED PICS ********

// if(retreivedPics){
//   for(let i = 0; i < parsedPics.length; i++){
//     if(parsedPics[i].name === 'bag'){
//       let reconstructedBag = new Pic(parsedPics[i].name, 'png');
//       reconstructedBag.views = parsedPics[i].views;
//       reconstructedBag.votes = parsedPics[i].votes;
//       picArray.push(reconstructedBag);
//     } else {
//       let reconstructedBag = new Pic(parsedPics[i].name);
//       reconstructedBag.views = parsedPics[i].views;
//       reconstructedBag.votes = parsedPics[i].votes;
//     }
//   }
// } else {
//   let bagPic = new Pic('bag');
//   let bananaPic = new Pic('banana');
//   let bathroomPic = new Pic('bathroom');
//   let bootsPic = new Pic('boots');
//   let breakfastPic = new Pic('breakfast');
//   let bubblegumPic = new Pic('bubblegum');
//   let chairPic = new Pic('chair');
//   let cthulhuPic = new Pic('cthulhu');
//   let dogPic = new Pic('dog-duck');
//   let dragonPic = new Pic('dragon');
//   let penPic = new Pic('pen');
//   let petSweepPic = new Pic('pet-sweep');
//   let scissorsPic = new Pic('scissors');
//   let sharkPic = new Pic('shark');
//   let sweepPic = new Pic('sweep', 'png');
//   let tauntaunPic = new Pic('tauntaun');
//   let unicornPic = new Pic('unicorn');
//   let waterCanPic = new Pic('water-can');
//   let wineGlassPic = new Pic('wine-glass');

// }



// ******** EXECTUABLE CODE ********
// let bagPic = new Pic('bag');
// let bananaPic = new Pic('banana');
// let bathroomPic = new Pic('bathroom');
// let bootsPic = new Pic('boots');
// let breakfastPic = new Pic('breakfast');
// let bubblegumPic = new Pic('bubblegum');
// let chairPic = new Pic('chair');
// let cthulhuPic = new Pic('cthulhu');
// let dogPic = new Pic('dog-duck');
// let dragonPic = new Pic('dragon');
// let penPic = new Pic('pen');
// let petSweepPic = new Pic('pet-sweep');
// let scissorsPic = new Pic('scissors');
// let sharkPic = new Pic('shark');
// let sweepPic = new Pic('sweep', 'png');
// let tauntaunPic = new Pic('tauntaun');
// let unicornPic = new Pic('unicorn');
// let waterCanPic = new Pic('water-can');
// let wineGlassPic = new Pic('wine-glass');

// ******** SHORT WAY OF UPDATING PARSED PICS ********


if(retreivedPics){
  picArray = parsedPics;
} else {
  let bagPic = new Pic('bag');
  let bananaPic = new Pic('banana');
  let bathroomPic = new Pic('bathroom');
  let bootsPic = new Pic('boots');
  let breakfastPic = new Pic('breakfast');
  let bubblegumPic = new Pic('bubblegum');
  let chairPic = new Pic('chair');
  let cthulhuPic = new Pic('cthulhu');
  let dogPic = new Pic('dog-duck');
  let dragonPic = new Pic('dragon');
  let penPic = new Pic('pen');
  let petSweepPic = new Pic('pet-sweep');
  let scissorsPic = new Pic('scissors');
  let sharkPic = new Pic('shark');
  let sweepPic = new Pic('sweep', 'png');
  let tauntaunPic = new Pic('tauntaun');
  let unicornPic = new Pic('unicorn');
  let waterCanPic = new Pic('water-can');
  let wineGlassPic = new Pic('wine-glass');

  picArray.push(bagPic,bananaPic,bathroomPic,bootsPic,breakfastPic,bubblegumPic,chairPic,cthulhuPic,dogPic,dragonPic,penPic,petSweepPic,scissorsPic,sharkPic,sweepPic,tauntaunPic,unicornPic,waterCanPic,wineGlassPic);



}


// picArray.push(bagPic,bananaPic,bathroomPic,bootsPic,breakfastPic,bubblegumPic,chairPic,cthulhuPic,dogPic,dragonPic,penPic,petSweepPic,scissorsPic,sharkPic,sweepPic,tauntaunPic,unicornPic,waterCanPic,wineGlassPic);


console.log('Normal Original Pic Array', picArray);
renderPic();


renderPic();

imgContainer.addEventListener('click', handleImgClick);
resultsBtn.addEventListener('click', handleShowResults);




