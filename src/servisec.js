const BASE_URL = 'https://restcountries.eu/rest/v2/name/';

export default function searchAPI(search, callback) {
  fetch(BASE_URL + search).then(j => j.json()).then(data => {
    callback(data)
  }).catch(error=> console.log(error))  
}
