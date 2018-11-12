import * as d3 from 'd3';
import {graphicDimensions, test} from './utils.js';


const items = [
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
    name: 'New York Times Weekday',
    year: 1910,
    price: .01
  },
  {
    name: 'New York Times Weekday',
    year: 1960,
    price: .05
  },
  {
    name: 'New York Times Weekday',
    year: 2010,
    price: 2.00
  },
  {
    name: 'Gallon of Gasoline',
    year: 1910,
    price: .12
  },
  {
    name: 'Gallon of Gasoline',
    year: 1960,
    price: .30
  },
  {
    name: 'Gallon of Gasoline',
    year: 2010,
    price: 2.80
  },
];

d3.select('.graphic_container')
  .append('svg')
  .attr('width', 900)
  .attr('height', 600)
  .style('background', 'lightblue');

console.log(graphicDimensions);
console.log(test);

  