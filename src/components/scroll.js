import 'intersection-observer';
import scrollama from 'scrollama';
import drawBuyingPower from './buying_power';
import drawRounding from './rounding'

const scroller = scrollama();

const handleStepEnter = (d) => {
  const chapterSelector = (d, attribute, functionName) => {
    if (d.element.hasAttribute(attribute)) {
      functionName(d.element.getAttribute(attribute))
    }
  }
  chapterSelector(d, 'data-step-buying-power', drawBuyingPower);
  chapterSelector(d, 'data-step-rounding', drawRounding);

  const drawChapter = (d) => {
    if (d.element.classList.contains('intro') || d.element.classList.contains('conclusion')) {
      console.log('hey');
    }
  }
  drawChapter(d);
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