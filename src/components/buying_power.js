import * as d3 from 'd3';
const Fraction = require('fraction.js');
import {graphicDimensions} from './utils.js';

//initial object of items

class Item {
  constructor(name, year, price, file) {
    this.name = name;
    this.year = year;
    this.price = price;
    this.file = file;
  }
}

let prefilteredItems = [
  //coffee
  new Item('cup of coffee', 1910, 0.05, '../src/images/coffee.svg'),
  new Item('cup of coffee', 1960, 0.20, '../src/images/coffee.svg'),
  new Item('cup of coffee', 2010, 1.50, '../src/images/coffee.svg'),

  //Hershey's chocolate bar
  new Item(`Hersheyʼs chocolate bar`, 1910, 0.02, '../src/images/chocolate.svg'),
  new Item(`Hersheyʼs chocolate bar`, 1960, 0.05, '../src/images/chocolate.svg'),
  new Item(`Hersheyʼs chocolate bar`, 2010, 0.99, '../src/images/chocolate.svg'),

  //postage stamp
  new Item('postage stamp', 1910, 0.02, '../src/images/stamp.svg'),
  new Item('postage stamp', 1960, 0.04, '../src/images/stamp.svg'),
  new Item('postage stamp', 2010, 0.44, '../src/images/stamp.svg'),

  //New York Times
  new Item('New York Times', 1910, 0.01, '../src/images/newspaper.svg'),
  new Item('New York Times', 1960, 0.05, '../src/images/newspaper.svg'),
  new Item('New York Times', 2010, 2.00, '../src/images/newspaper.svg'),

  //loaf of bread
  new Item('loaf of bread', 1910, 0.03, '../src/images/bread.svg'),
  new Item('loaf of bread', 1960, 0.23, '../src/images/bread.svg'),
  new Item('loaf of bread', 2010, 2.50, '../src/images/bread.svg')
];

//adding buying power metric to each item
//then convering buying power to something that will be converted to a fraction

prefilteredItems = prefilteredItems.map(d => { 
  d.buying_power = Math.round((.01 / d.price) * 1000) / 1000;
  d.toFraction = d.buying_power;
  const lastDigit = d.buying_power.toString().split('').pop()
  if (lastDigit == 3) {
    d.toFraction = d.buying_power + '(3)'; //3 repeating which will convert to 1/3
  }
  return d;
})

console.log(prefilteredItems);

//appending an SVG

const root_svg = d3.select('.graphic_container')
  .append('svg')
  .attr('width', graphicDimensions.width * .98) //svg 90% width of container
  .attr('height',graphicDimensions.width * .98 * .60) //svg 66% height of container
  .style('font-family', `'Source Sans Pro', sans-serif`)
  .attr('class', 'svg');
 
const title_g = root_svg
  .append('g')
  .attr('id', 'title')
  .attr('transform', 'translate(0,-3.5)')

const content_g = root_svg
  .append('g')
  .attr('id', 'content')
  // .attr('transform', 'translate(0,1)')


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
  content_g.append('rect')
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
  
  //remove all images before drawing
  d3.selectAll('.svgImage')
    // .transition()
    // .attr('opacity', 0)
    .remove();

  const yearText = title_g.append('text')
    .attr('x', svgDimensions.width * .5)
    .attr('y', svgDimensions.height *.035)
    .attr('text-anchor', 'middle')
    // .style('font-family', 'Dosis, sans-serif')
    .style('font-size', '1.5em');
  
  yearText.append('tspan')
    .text(`How far does one penny go when buying a `);
  
  yearText.append('tspan')
    .text(`${item}?`)
    .attr('x', svgDimensions.width * .5)
    .attr('y', svgDimensions.height * .12)
    .attr('id', 'item_title')
    .style('fill', 'var(--buyingPowerSilver)');

  const buyingPowerScale = d3.scaleLinear()
    .domain([0,1])
    .range([0, barHeight]);  

  const filteredItems = prefilteredItems.filter(d => {
        return d.name === item; 
      });
  
  //drawing external svgs

  const drawImages = (xCoordinate, opacity) => {

    content_g.append('image')
      .attr('class', 'svgImage')
      .attr('x', xCoordinate)
      .attr('y', svgDimensions.height * .22)
      .attr('opacity', 0)
      .attr('width', 30)
      .attr('height', 30)
      .attr('href', filteredItems[0].file) //this gets the file attribute
      .transition()
      .duration(1000)
      .attr('opacity', 1);
  }

  drawImages(svgDimensions.width * .135);
  drawImages(svgDimensions.width * .49);
  drawImages(svgDimensions.width * .84);
  
  const drawYearText = (year, xCoordinate) => {
    //find the item corresponding to the year, and make a fraction out of the buying power using fraction.js
    function displayBuyingPower() {
      const found = filteredItems.find(d => d.year === parseInt(year));
      const fraction = new Fraction(found.toFraction).toFraction(true);
      return fraction;
    }

    function displayCost() {
      //finds the item, displays the price, converts price to string of 2 decimal places
      const found = filteredItems.find(d => d.year === parseInt(year));
      return (found.price).toFixed(2);
    }

    //appending year
    content_g.append('text')
      .text(`In ${year}`)
      .attr('x', xCoordinate)
      .attr('y', svgDimensions.height * .20)
      .attr('text-anchor', 'middle')
      // .style('font-family', 'Dosis, sans-serif')
      .style('fill', 'var(--black)')
      .style('font-size', '2em');
    
    //appending year
    content_g.append('text')
      .text(`A penny could buy ${displayBuyingPower()}`)
      .attr('x', xCoordinate)
      .attr('y', svgDimensions.height * .3)
      .attr('text-anchor', 'middle')
      // .style('font-family', 'Dosis, sans-serif')
      .style('fill', 'var(--black)')
      .style('font-size', '1em');
    
    const itemText = content_g.append('text')
      .attr('x', xCoordinate)
      .attr('y', svgDimensions.height * .33)
      .attr('text-anchor', 'middle')
      // .style('font-family', 'Dosis, sans-serif')
      .style('fill', `var(--black)`)
      .style('font-size', '1em');
    
    itemText.append('tspan')
      .text('of a ');
    
    itemText.append('tspan')
      .text(`${item}.`)
      .style('fill', 'var(--buyingPowerSilver)');

    //appending Cost:
    const costText = content_g.append('text')
      .attr('x', xCoordinate)
      .attr('y', svgDimensions.height * .992)
      .attr('text-anchor', 'middle')
      // .style('font-family', 'Dosis, sans-serif')
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
  const bars = content_g.selectAll('.buyingPowerBar')
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