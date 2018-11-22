import * as d3 from 'd3';
const Fraction = require('fraction.js');
import {graphicDimensions} from './utils.js';

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
    name: 'New York Times',
    year: 1910,
    price: .01
  },
  {
    name: 'New York Times',
    year: 1960,
    price: .05
  },
  {
    name: 'New York Times',
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
  .attr('width', graphicDimensions.width * .98) //svg 90% width of container
  .attr('height',graphicDimensions.width * .98 * .60) //svg 66% height of container
  // .style('background', 'lightblue')
  .attr('class', 'svg');

//getting the dimensions of the SVG

const svgDimensions = {
  width: document.querySelector('.svg').clientWidth,
  height: document.querySelector('.svg').clientHeight
}

console.log(svgDimensions);

const barWidth = svgDimensions.width * .25;
const barHeight = svgDimensions.height * .6;

const barX = i => {
  return svgDimensions.width * (.025 +(.35 * i));
} 

const barY = svgDimensions.height * .35;

 //append overall bars
 for (let i = 0; i <= 2; i++) {
  console.log(root_svg);
  root_svg.append('rect')
    .attr('class', 'overallBar')
    .attr('x', barX(i)) //the initial starting point is the first number. the second number is how much space there should be between the bars.
    .attr('y', barY)
    .attr('width', barWidth)
    .attr('height', barHeight)
    .style('fill', 'var(--buyingPowerSilver)')
}



function drawBuyingPower(item) {

  //selecting existing svg objects
  //chance opacity using transition()
  //remove

  //calculate width and height of imported svg object
  //scale it down to fit the width of the overall bar
  //draw with an opacity of 0
  //transition()
  // fade in
  
  //remove all text before drawing
  d3.selectAll('text')
    .remove();

  const yearText = root_svg.append('text')
    .attr('x', svgDimensions.width * .5)
    .attr('y', svgDimensions.height *.035)
    .attr('text-anchor', 'middle')
    .style('font-family', 'Rubik, sans-serif')
    .style('font-size', '1.5em');
  
  yearText.append('tspan')
    .text(`How far does one penny go when buying a `);
  
  yearText.append('tspan')
    .text(`${item}?`)
    .attr('x', svgDimensions.width * .5)
    .attr('y', svgDimensions.height * .145)
    .attr('id', 'item_title')
    .style('fill', 'var(--buyingPowerSilver)');

  const buyingPowerScale = d3.scaleLinear()
    .domain([0,1])
    .range([0, barHeight]);  

  const filteredItems = prefilteredItems.filter(d => {
        return d.name === item; 
      });
  
  const drawYearText = (year, xCoordinate) => {
    //find the item corresponding to the year, and make a fraction out of the buying power using fraction.js
    function displayBuyingPower() {
      const found = filteredItems.find(d => d.year === parseInt(year));
      const fraction = new Fraction(found.buying_power).toFraction(true);
      return fraction;
    }

    function displayCost() {
      //finds the item, displays the price, converts price to string of 2 decimal places
      const found = filteredItems.find(d => d.year === parseInt(year));
      return (found.price).toFixed(2);
    }

    //appending year
    root_svg.append('text')
      .text(`In ${year}`)
      .attr('x', xCoordinate)
      .attr('y', svgDimensions.height * .25)
      .attr('text-anchor', 'middle')
      .style('font-family', 'Rubik, sans-serif')
      .style('fill', 'var(--black)')
      .style('font-size', '2em');
    
    //appending year
    root_svg.append('text')
      .text(`A penny could buy ${displayBuyingPower()}`)
      .attr('x', xCoordinate)
      .attr('y', svgDimensions.height * .3)
      .attr('text-anchor', 'middle')
      .style('font-family', 'Rubik, sans-serif')
      .style('fill', 'var(--black)')
      .style('font-size', '1em');
    
    const itemText = root_svg.append('text')
      .attr('x', xCoordinate)
      .attr('y', svgDimensions.height * .33)
      .attr('text-anchor', 'middle')
      .style('font-family', 'Rubik, sans-serif')
      .style('fill', `var(--black)`)
      .style('font-size', '1em');
    
    itemText.append('tspan')
      .text('of a ');
    
    itemText.append('tspan')
      .text(`${item}.`)
      .style('fill', 'var(--buyingPowerSilver)');

    //appending Cost:
    const costText = root_svg.append('text')
      .attr('x', xCoordinate)
      .attr('y', svgDimensions.height * .995)
      .attr('text-anchor', 'middle')
      .style('font-family', 'Rubik, sans-serif')
      .style('fill', `var(--black)`)
      .style('font-size', '1em');  

    costText.append('tspan')
      .text('The ')
    
    costText.append('tspan')
      .text(`${item}`)
      .style('fill', 'var(--buyingPowerSilver)');

    costText.append('tspan')
      .text(` cost $${displayCost()}.`);
    
  }

  drawYearText('1910', svgDimensions.width * .15);
  drawYearText('1960', svgDimensions.width * .5);
  drawYearText('2010', svgDimensions.width * .85);


  //update selection
  const bars = root_svg.selectAll('.buyingPowerBar')
      .data(filteredItems);
  
  //enter selection
  const enterBars = bars.enter()
    .append('rect')
    .attr('class', 'buyingPowerBar')
    .attr('x', (d, i) => {
      return barX(i);
    })
    .attr('y', svgDimensions.height * .95)
    .attr('width', barWidth)
    .attr('height', 0)
    .style('fill', 'black')
    .transition()
    .duration(500)
    .attr('y', d => {
        return (barHeight - buyingPowerScale(d.buying_power)) + barY; // the top of each bar is a relationship between the height and corresponding data value
      })
    .attr('height', d => buyingPowerScale(d.buying_power))
    
    //update selection continued
    const updateBars = bars
      .transition()
      .duration(500)
      .attr('y', d => {
        return (barHeight - buyingPowerScale(d.buying_power)) + barY; // the top of each bar is a relationship between the height and corresponding data value
      })
      .attr('height', d => buyingPowerScale(d.buying_power))

    //exit selection
    const exitBars = bars.exit()
      .remove()

    console.log(filteredItems);

    console.log(bars);
}

export default drawBuyingPower;