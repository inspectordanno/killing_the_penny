import * as d3 from 'd3';

const drawRounding = (data_step) => {
  if (data_step == 1) {
    d3.selectAll('.svg > *')
      .attr('opacity', 1)
      .transition()
      .duration(500)
      .attr('opacity', 0)
      .remove();
  }
}

export default drawRounding;

