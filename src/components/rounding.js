import * as d3 from 'd3';
import {generateSVG} from './utils.js';

const rounding_svg = generateSVG('#container_rounding', 'svg_rounding');

const svgDimensions = {
width: document.querySelector('#svg_rounding').clientWidth,
height: document.querySelector('#svg_rounding').clientHeight
}

d3.select('#svg_rounding')
    .style('background-color', 'green');

const drawRounding = (data_step, data) => {
  console.log('drawrounding imported');
  console.log(data);

  // d3.selectAll('.g_rounding')
  //   .attr('opacity', 0);

  d3.select(`#g${data_step}`)
    .attr('opacity', 1);

  if (d3.select(`#g${data_step}`).node() === null ) {
    d3.select('#svg_rounding')
      .append('g')
      .attr('id', `g${data_step}`)
      .attr('class', 'g_rounding')
      .append('rect')
      .attr('fill', 'orange')
      .attr('width', 100)
      .attr('height', 100)
      .attr('x', 500)
      .attr('y', 500)
  }

  if (data_step == 1)  {
  
    let useThisG = d3.select('#g1')
      .select('rect')
      .attr('fill', 'purple')

  }

  if (data_step == 2)  {

    let useThisG = d3.select('#g1')
      .select('rect')
      .attr('fill', 'gray')
  }
}

export default drawRounding;

