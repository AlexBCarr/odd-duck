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

let indexArray = [1,5];

function renderPic(){

  while(indexArray.length < 3){
    let randoNum = randomIndex();
    if(!indexArray.includes(randoNum)){
      indexArray.push(randoNum);
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

  let imgOneIndex = indexArray.pop();
  let imgTwoIndex = indexArray.pop();
  let imgThreeIndex = indexArray.pop();

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
        borederWidth: 2,
        backgroundColor: ['gold'],
        borderColor: ['black']
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

  new Chart(ctx, chartObj);

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

// ******** EXECTUABLE CODE ********
let bagPic = new Pic('bag');
let bananaPic = new Pic('banana');
let bathroomPic = new Pic('bathroom');
let bootsPic = new Pic('boots');
let breakfastPic = new Pic('breakfast');
let bubblegumPic = new Pic('bubblegum');
let chairPic = new Pic('chair');
let cthulhuPic = new Pic('cthulhu');
let dogPic = new Pic('dog');
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

renderPic();


imgContainer.addEventListener('click', handleImgClick);
resultsBtn.addEventListener('click', handleShowResults);




