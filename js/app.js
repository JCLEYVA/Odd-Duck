'use strict';

const state = []; 
let roundsOfVoting = 25;
let chartObj = null;

function Image(name, source) {
  this.name = name;
  this.source = source;
  this.timesClicked = 0;
  this.timesShown = 0;
}

state.push(new Image('bag', 'images/bag.jpeg'));
state.push(new Image('pen', 'images/pen.jpeg'));
state.push(new Image('banana', 'images/banana.jpeg'));
state.push(new Image('bathroom', 'images/bathroom.jpeg'));
state.push(new Image('boots', 'images/boots.jpeg'));
state.push(new Image('breakfast', 'images/breakfast.jpeg'));
state.push(new Image('bubblegum', 'images/bubblegum.jpeg'));
state.push(new Image('chair', 'images/chair.jpeg'));
state.push(new Image('cthulhu', 'images/cthulhu.jpeg'));
state.push(new Image('dog-duck', 'images/dog-duck.jpeg'));
state.push(new Image('dragon', 'images/dragon.jpeg'));
state.push(new Image('sweep', 'images/sweep.jpeg'));
state.push(new Image('scissors', 'images/scissors.jpeg'));
state.push(new Image('shark', 'images/shark.jpeg'));
state.push(new Image('sweep', 'images/sweep.jpeg'));
state.push(new Image('tauntaun', 'images/tauntaun.jpeg'));
state.push(new Image('unicorn', 'images/unicorn.jpeg'));
state.push(new Image('water-can', 'images/water-can.jpeg'));
state.push(new Image('wine-glass', 'images/wine-glass.jpeg'));

let imgEls = document.querySelectorAll('img'); 
let trackVotesEl = document.getElementById('track-votes');


console.log('current state', state); 


function generateRandomDucks() {
  return Math.floor(Math.random() * state.length);
}


function renderDucks() {
  let duck1 = state[generateRandomDucks()];
  let duck2 = state[generateRandomDucks()];
  let duck3 = state[generateRandomDucks()];
  
  while (duck1.name === duck2.name || duck1.name === duck3.name || duck2.name === duck3.name){
    duck2 = state[generateRandomDucks()];
    duck3 = state[generateRandomDucks()];
  }

  while (imgEls[0].id === duck1.name || imgEls[0].id === duck2.name || imgEls[0].id === duck3.name || imgEls[1].id === duck1.name || imgEls[1].id === duck2.name || imgEls[1].id === duck3.name || imgEls[2].id === duck1.name || imgEls[2].id === duck2.name || imgEls[2].id === duck3.name){
    duck1 = state[generateRandomDucks()];
    duck2 = state[generateRandomDucks()];
    duck3 = state[generateRandomDucks()];
    while (duck1.name === duck2.name || duck1.name === duck3.name || duck2.name === duck3.name){
      duck2 = state[generateRandomDucks()];
      duck3 = state[generateRandomDucks()];
    }
  }

  imgEls[0].src = duck1.source;
  imgEls[0].id = duck1.name;
  duck1.timesShown += 1;
  imgEls[1].src = duck2.source;
  imgEls[1].id = duck2.name;
  duck2.timesShown += 1;
  imgEls[2].src = duck3.source;
  imgEls[2].id = duck3.name;
  duck3.timesShown += 1;
}

function handleClick(event){
  let imgClicked = event.target.id;
  state.forEach(image => {
    if(image.name === imgClicked){
      image.timesClicked += 1;
    }
  });

  if(roundsOfVoting > 1){
    renderDucks();
    roundsOfVoting--;
  } else {
    trackVotesEl.removeEventListener('click', handleClick);
    chartObj = drawChart();
    roundsOfVoting--;
    writeData('products', state);
  }
}

trackVotesEl.addEventListener('click', handleClick);

if (readData('products') === null){
  '';
} else {
  readData('products');
}

renderDucks();

function writeData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function readData(key){
  return JSON.parse(localStorage.getItem(key));
}

console.log('PRODUCTS LIST AFTER CLICKS', state);
console.log('LOCAL STORAGE AFTER CLICKS', localStorage);


const canvasEL = document.getElementById('chart');

function drawChart() {
  let labels = [];
  let timesShown = [];
  let timesClicked = [];
  state.forEach(product => {
    labels.push(product.name);
    timesShown.push(product.timesShown);
    timesClicked.push(product.timesClicked);
  });

 

  return new Chart(canvasEL, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Times Shown',
        data: timesShown,
        borderWidth: 1,
      }, {
        label: 'Times Clicked',
        data: timesClicked,
        borderWidth: 1,
      }]
    },
    options: {
      indexAxis: 'y',
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}




