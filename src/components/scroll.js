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

  //this makes a new scrollama instance for each new container
  const makeScrollamaInstance = (instance,container) => {
    instance = scrollama();

    instance
      .setup({
        step: '.step',
        container: container,
        graphic: '.sticky_graphic'
      })
      .onStepEnter(handleStepEnter);

    return instance;
  }

  makeScrollamaInstance(scroller_buying_power, '#container_buying_power');
  makeScrollamaInstance(scroller_rounding, '#container-rounding');
  
    // .onStepExit(handleStepExit)
    // .onContainerEnter(handleContainerEnter)
    // .onContainerExit(handleContainerExit);
  
    // function handleStepExit(d) {
    //   console.log(d.element);
    //   console.log('exited');
    // }
}

