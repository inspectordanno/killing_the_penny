import './scss/main.scss';
import './scss/fonts.scss';
import './scss/colors.scss';
import {initializeScroll} from './components/scroll';
import {csv} from 'd3-fetch';

const dataFiles = ['./src/data/sampletransactions.csv']

const promises = dataFiles.map(url => csv(url));

Promise.all(promises).then(data => {

  console.log(data)

  initializeScroll(data);

});

