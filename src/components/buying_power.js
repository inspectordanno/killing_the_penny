import * as d3 from 'd3';
import {graphicDimensions} from './utils.js';
import * as d3Array from 'd3-array';

//initial object of items

let items = [
  {
    name: 'Cup of Coffee',
    year: 1910,
    price: .05
  },
  {
    name: 'Cup of Coffee',
    year: 1960,
    price: .20
  },
  {
    name: 'Cup of Coffee',
    year: 2010,
    price: 1.50
  },
  {
    name: `Hershey's Chocolate Bar`,
    year: 1910,
    price: .02
  },
  {
    name: `Hershey's Chocolate Bar`,
    year: 1960,
    price: .05
  },
  {
    name: `Hershey's Chocolate Bar`,
    year: 2010,
    price: .99
  },
  {
    name: 'Postage Stamp',
    year: 1910,
    price: .02
  },
  {
    name: 'Postage Stamp',
    year: 1960,
    price: .04
  },
  {
    name: 'Postage Stamp',
    year: 2010,
    price: .44
  },
  {
    name: 'New York Times Weekday Edition',
    year: 1910,
    price: .01
  },
  {
    name: 'New York Times Weekday Edition',
    year: 1960,
    price: .05
  },
  {
    name: 'New York Times Weekday Edition',
    year: 2010,
    price: 2.00
  },
  {
    name: 'Gallon of Gas',
    year: 1910,
    price: .12
  },
  {
    name: 'Gallon of Gas',
    year: 1960,
    price: .30
  },
  {
    name: 'Gallon of Gas',
    year: 2010,
    price: 2.80
  },
];

//adding buying power metric to each item

items = items.map(d => { 
  d.buying_power = Math.round((.01 / d.price) * 1000) / 1000;
  return d;
})

console.log(items);

//grouping items by year

items = d3Array.group(items, d => d.year);

console.log(items);

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

function drawBuyingPower(item) {
  root_svg.append('text')
    .text(item)
    .attr('x', svgDimensions.width * .5)
    .attr('y', svgDimensions.height *.12)
    .attr('text-anchor', 'middle')
    .style('font-family', 'Rubik, sans-serif')
    .style('font-size', '40px');

  const drawYearText = (year, xCoordinate, yearColor) => {

    //appending year
    root_svg.append('text')
      .text(year)
      .attr('x', xCoordinate)
      .attr('y', svgDimensions.height * .25)
      .attr('text-anchor', 'middle')
      .style('font-family', 'Rubik, sans-serif')
      .style('fill', yearColor)
      .style('font-size', '24px');

    //appending Cost:
    root_svg.append('text')
      .text('Cost:')
      .attr('x', xCoordinate)
      .attr('y', svgDimensions.height * .8)
      .attr('text-anchor', 'middle')
      .style('font-family', 'Rubik, sans-serif')
      .style('fill', yearColor)
      .style('font-size', '18px');  
    
  }

  drawYearText('1910', svgDimensions.width * .15, 'red');
  drawYearText('1960', svgDimensions.width * .5, 'green');
  drawYearText('2010', svgDimensions.width * .85, 'blue');

  //append overall bar
  for (let i = 1; i <= 3; i++) {

    console.log('hello')
    root_svg.append('rect')
      .attr('class', 'overallBar')
      .attr('x', svgDimensions.width * (.075 +(.35 * (i-1))))
      .attr('y', svgDimensions.height * .35)
      .attr('width', svgDimensions.width * .15)
      .attr('height', svgDimensions.height *.4 )
      .style('fill', 'lightgray');
    }

  // const w = 50;

  // for (let i =1; i <=3; i++) {
  //   w * .15 * i
  // }

}

drawBuyingPower('Cup of Coffee');
  