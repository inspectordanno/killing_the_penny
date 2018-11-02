import 'intersection-observer';
import scrollama from 'scrollama';
import {select} from 'd3';

const scroller = scrollama();

scroller
  .setup({
    step: '.step',
    container: '.scroll_container',
    graphic: '.sticky_graphic'
  })
  .onStepEnter(handleStepEnter)
  .onStepExit(handleStepExit)
  // .onContainerEnter(handleContainerEnter)
  // .onContainerExit(handleContainerExit);

  function handleStepEnter(d) {
    console.log(d.element);
    console.log('entered');
  }

  function handleStepExit(d) {
    console.log(d.element);
    console.log('exited');
  }