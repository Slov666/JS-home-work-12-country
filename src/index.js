import './styles.css';
import 'animate.css'
import debounce from'lodash.debounce'
import './servisec'
import country from './tempaltes/country.hbs'
import countries from './tempaltes/countries-list.hbs'
import searchAPI from './servisec';
import * as PNotify from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
const inputRef = document.querySelector('.inputForJS');
const boxByListRef = document.querySelector('#boxForJS');
inputRef.addEventListener('input',  debounce(onInput, 500));

function onInput(e) {
  const inputValue = e.target.value;
  searchAPI(inputValue, parsePromise)
  if(inputRef.value === '')(
    addClassRemove()
  )
}

function parsePromise(data) {
  console.log(data.length);
  addClassRemove()
  
  if (data.length === 1) {
    addClassRemove()
    addClass()
    boxByListRef.insertAdjacentHTML('beforeend', country(data))
    PNotify.success({
      title: 'Success',
      text: 'You found what you were looking for!',
      hide: true,
      delay: 1500,
      maxOpen: 1,
    });
  }
  if (data.length > 1 & data.length <= 10) {
    addClassRemove()
    addClass()
    PNotify.success({
      title: 'Success',
      text: 'You found something..',
      hide: true,
      delay: 1500,
      maxOpen: 1,
    });
    boxByListRef.insertAdjacentHTML('beforeend', countries(data))
  }
  if(data.length > 10){
    PNotify.error({
      title: 'Uh Oh!',
      text: 'Too many matches found. Please enter a more specific query!',
      hide: true,
      delay: 1500,
      maxOpen: 1,
    });
  } 
  if(data.length === undefined || data.length > 10 ){
    inputRef.classList.add('invalid')
    PNotify.error({
      title: 'Uh Oh!',
      text: '404 NOT FOUND',
      hide: true,
      delay: 1500,
      maxOpen: 1,
    });
  }
}

function addClassRemove (){
  inputRef.classList.remove('invalid')
  inputRef.classList.remove('valid')
  boxByListRef.innerHTML = ''
}
function addClass(){
  inputRef.classList.add('valid')
}