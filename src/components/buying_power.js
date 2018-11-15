import * as d3 from 'd3';
const Fraction = require('fraction.js');
import {graphicDimensions} from './utils.js';
import * as d3Array from 'd3-array';

//initial object of items

let prefilteredItems = [
  {
    name: 'cup of coffee',
    year: 1910,
    price: .05
  },
  {
    name: 'cup of coffee',
    year: 1960,
    price: .20
  },
  {
    name: 'cup of coffee',
    year: 2010,
    price: 1.50
  },
  {
    name: 'Hersheyʼs chocolate bar',
    year: 1910,
    price: .02
  },
  {
    name: 'Hersheyʼs chocolate bar',
    year: 1960,
    price: .05
  },
  {
    name: 'Hersheyʼs chocolate bar',
    year: 2010,
    price: .99
  },
  {
    name: 'postage stamp',
    year: 1910,
    price: .02
  },
  {
    name: 'postage stamp',
    year: 1960,
    price: .04
  },
  {
    name: 'postage stamp',
    year: 2010,
    price: .44
  },
  {
    name: 'New York Times weekday',
    year: 1910,
    price: .01
  },
  {
    name: 'New York Times weekday',
    year: 1960,
    price: .05
  },
  {
    name: 'New York Times weekday',
    year: 2010,
    price: 2.00
  },
  {
    name: 'gallon of gas',
    year: 1910,
    price: .12
  },
  {
    name: 'gallon of gas',
    year: 1960,
    price: .30
  },
  {
    name: 'gallon of gas',
    year: 2010,
    price: 2.80
  },
];

//adding buying power metric to each item

prefilteredItems = prefilteredItems.map(d => { 
  d.buying_power = Math.round((.01 / d.price) * 1000) / 1000;
  return d;
})

console.log(prefilteredItems);

//appending an SVG

const root_svg = d3.select('.graphic_container')
  .append('svg')
  .attr('width', graphicDimensions.width * .90) //svg 90% width of container
  .attr('height',graphicDimensions.width * .90 * .66) //svg 66% height of container
  .attr('class', 'svg')
  .style('background', 'lightblue');

//getting the dimensions of the SVG

const svgDimensions = {
  width: document.querySelector('.svg').clientWidth,
  height: document.querySelector('.svg').clientHeight
}

console.log(svgDimensions);

function drawBuyingPower(item) {

  //remove all text before drawing
  d3.selectAll('text')
    .remove();
  
  //remove all overallBars before drawing
  d3.selectAll('.overallBar')
  .remove();

  const yearText = root_svg.append('text')
    .attr('x', svgDimensions.width * .5)
    .attr('y', svgDimensions.height *.12)
    .attr('text-anchor', 'middle')
    .style('font-family', 'Rubik, sans-serif')
    .style('font-size', '30px');
  
  yearText.append('tspan')
    .text(`How far does one penny go when buying a `);
  
  yearText.append('tspan')
    .text(`${item}?`)
    .style('fill', 'orange');

  
  //append overall bars
  for (let i = 0; i <= 2; i++) {
    root_svg.append('rect')
      .attr('class', 'overallBar')
      .attr('x', svgDimensions.width * (.075 +(.35 * i))) //the initial starting point is the first number. the second number is how much space there should be between the bars.
      .attr('y', svgDimensions.height * .35)
      .attr('width', svgDimensions.width * .15)
      .attr('height', svgDimensions.height * .4)
      .style('fill', 'lightgray')
      .order();
  }

  const buyingPowerScale = d3.scaleLinear()
    .domain([0,1])
    .range([0, svgDimensions.height * .4]);  

  let filteredItems = prefilteredItems.filter(d => {
        return d.name === item; 
      });
  
  const drawYearText = (year, xCoordinate, yearColor) => {
    //find the item corresponding to the year, and make a fraction out of the buying power using fraction.js
    function displayBuyingPower() {
      let found = filteredItems.find(d => d.year === parseInt(year));
      const fraction = new Fraction(found.buying_power).toFraction(true);
      return fraction;
    }

    function displayCost() {
      let found = filteredItems.find(d => d.year === parseInt(year));
      return (found.price).toFixed(2);
    }

    console.log(displayBuyingPower());

    //appending year
    root_svg.append('text')
      .text(`In ${year}`)
      .attr('x', xCoordinate)
      .attr('y', svgDimensions.height * .25)
      .attr('text-anchor', 'middle')
      .style('font-family', 'Rubik, sans-serif')
      .style('fill', yearColor)
      .style('font-size', '24px');
    
    //appending year
    root_svg.append('text')
      .text(`A penny could buy ${displayBuyingPower()} of a ${item}.`)
      .attr('x', xCoordinate)
      .attr('y', svgDimensions.height * .3)
      .attr('text-anchor', 'middle')
      .style('font-family', 'Rubik, sans-serif')
      .style('fill', yearColor)
      .style('font-size', '12px');

    //appending Cost:
    root_svg.append('text')
      .text(`The ${item} cost $${displayCost()}.`)
      .attr('x', xCoordinate)
      .attr('y', svgDimensions.height * .8)
      .attr('text-anchor', 'middle')
      .style('font-family', 'Rubik, sans-serif')
      .style('fill', yearColor)
      .style('font-size', '12px');  
    
  }

  drawYearText('1910', svgDimensions.width * .15, 'red');
  drawYearText('1960', svgDimensions.width * .5, 'green');
  drawYearText('2010', svgDimensions.width * .85, 'blue');


  //update selection
  const bars = root_svg.selectAll('.buyingPowerBar')
      .data(filteredItems, d => d.name);
  
  //enter selection
  const enterBars = bars.enter()
    .append('rect')
    .attr('class', 'buyingPowerBar')
    .attr('x', (d, i) => {
      return svgDimensions.width * (.075 +(.35 * i))
    })
    .attr('y', svgDimensions.height * .75)
    .attr('width', svgDimensions.width * .15)
    .attr('height', 0)
    .style('fill', 'black')
    .transition()
    .duration(500)
    .attr('y', d => {
      return (svgDimensions.height * .4 - buyingPowerScale(d.buying_power)) + svgDimensions.height * .35 ; // the top of each bar is a relationship between the height and corresponding data value
    })
    .attr('height', d => buyingPowerScale(d.buying_power))
    
    
    //update selection continued
    const updateBars = bars
      .attr('y', d => {
      return (svgDimensions.height * .4 - buyingPowerScale(d.buying_power)) + svgDimensions.height * .35 ; // the top of each bar is a relationship between the height and corresponding data value
    })
      .attr('height', d => buyingPowerScale(d.buying_power))

    const exitBars = bars.exit()
      .remove()

    console.log(filteredItems);

    console.log(bars);
}

export default drawBuyingPower;