import 'intersection-observer';
import scrollama from 'scrollama';
import drawBuyingPower from './buying_power';
import drawRounding from './rounding';
import {select} from 'd3-selection';

export const initializeScroll = (data) => {

  const scroller_buying_power = scrollama();
  const scroller_rounding = scrollama();

  const handleStepEnter = (d) => {
    console.log(d);
    const chapterSelector = (d, attribute, functionName) => {
      if (d.element.hasAttribute(attribute)) {
        functionName(d.element.getAttribute(attribute), data);
      }
    }
    chapterSelector(d, 'data-step-buying-power', drawBuyingPower);
    chapterSelector(d, 'data-step-rounding', drawRounding);
  }
  
  scroller_buying_power
    .setup({
      step: '.step',
      container: '#container_buying_power',
      graphic: '.sticky_graphic'
    })
    .onStepEnter(handleStepEnter)

  scroller_rounding
    .setup({
      step: '.step',
      container: '#container_rounding',
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

