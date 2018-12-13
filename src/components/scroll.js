import 'intersection-observer';
import scrollama from 'scrollama';
import drawBuyingPower from './buying_power';
import drawRounding from './rounding';
import {select} from 'd3-selection';

export const initializeScroll = (data) => {

  const scroller = scrollama();

  const handleStepEnter = (d) => {
    console.log(d);
    const chapterSelector = (d, attribute, functionName) => {
      if (d.element.hasAttribute(attribute)) {
        functionName(d.element.getAttribute(attribute), data);
      }
    }
    chapterSelector(d, 'data-step-buying-power', drawBuyingPower);
    chapterSelector(d, 'data-step-rounding', drawRounding);
  
    //when i enter a section, delete everything
    if (d.element.classList.contains('erase')) {
      select('.svg')
        .attr('opacity', 1)
        .transition()
        .duration(500)
        .attr('opacity', 0)
        .remove();
    }
  }
  
  scroller
    .setup({
      step: '.step',
      container: '.scroll_container',
      graphic: '.sticky_graphic'
    })
    .onStepEnter(handleStepEnter)
    // .onStepExit(handleStepExit)
    // .onContainerEnter(handleContainerEnter)
    // .onContainerExit(handleContainerExit);
  
  
  
  
    // function handleStepExit(d) {
    //   console.log(d.element);
    //   console.log('exited');
    // }
}

