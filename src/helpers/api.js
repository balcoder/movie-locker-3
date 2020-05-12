import { KEY } from '../movie-locker.config';
const APIURL = 'https://api.themoviedb.org/3/';
const GENRESURL = `${APIURL}genre/movie/list?api_key=${KEY}&language=en-US&include_adult=false&page=1`;
const GENREURL = `${APIURL}discover/movie?api_key=${KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=`;
const POPULARURL = `${APIURL}discover/movie?api_key=${KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=`;
const INNOWURL = `${APIURL}discover/movie?api_key=${KEY}&language=en-US&region=US&release_date.gte=2020-02-19&release_date.lte=2020-03-19&with_release_type=3|2;`
const TOPRATEDURL = `${APIURL}movie/top_rated?api_key=${KEY}&language=en-US&page=1`
const SEARCHURL = `${APIURL}search/movie?api_key=${KEY}&language=en-US&include_adult=false`
const INCINEMANOW =`${APIURL}discover/movie?api_key=${KEY}&language=en-US&region=US&release_date.gte=2020-02-19&release_date.lte=2020-03-19&with_release_type=3|2;`;
const UPCOMING = `${APIURL}movie/upcoming?api_key=${KEY}`;

//hand the response from our async fetch to handleError
function handleError(res) {
  if(!res.ok) {
    // if between 400 and 499 client side problem 400:Bad Request 401 (Unauthorized) 403 (Forbidden)
    if(res.status >= 400 && res.status < 500) {
      return res.json().then(data => {
        let err = { errorMessage: data.message };
        throw err;
      })
    } else {
      // 500 (Internal Server Error) 501 (Not Implemented)
      let err = { errorMessage: 'Please try later: Server problem' }
      throw err;
    }
  }  
  return res.json();
}

// get list of genres with their ids
export async function getGenre() {  
  return fetch(GENRESURL)    
    .then(res => handleError(res))
}

// get a list of movies with a genre id (like 'Action' = 27)
export async function getGenres(id) {
  let promises = [];
  // Get the number of pages from the search term
  let page_results = await fetch(`${GENREURL}1&with_genres=${id}`)
    .then(res => handleError(res));
  let pages = page_results.total_pages;
  let numPages = pages < 10 ? pages : 10;  
  for(let i = 1; i <= numPages; i++) {     
    promises.push(fetch(`${GENREURL}${i}&with_genres=${id}`)
        .then(res => handleError(res)))
  }
  return Promise.all(promises);
}


// Get a number of pages of popular movies
export async function getPopular() {
  let promises = [];
  // Get the number of pages from the search term
  let page_results = await fetch(POPULARURL + 1)
    .then(res => handleError(res));
  let pages = page_results.total_pages;
  let numPages = pages < 10 ? pages : 10;
  for(let i = 1; i <= numPages; i++) {
  
    promises.push(fetch(POPULARURL + i )
      .then(res => handleError(res)))
  }
  return Promise.all(promises);  
}


// Get a  list of movies based on search term
export async function getSearch(phrase) {
  let promises = [];
  // Get the number of pages from the search term
  let page_results = await fetch(`${SEARCHURL}&page=1&query=${phrase}`)
    .then(res => handleError(res));  
  let pages = page_results.total_pages;
  let numPages = pages < 10 ? pages : 10;
  for(let i = 1; i <= numPages; i++) {
    promises.push(fetch(`${SEARCHURL}&page=${i}&query=${phrase}`)
      .then(res => handleError(res)))
  }    
  return Promise.all(promises);
}

export async function getInTheCinemaNow() {
  return fetch(`${INNOWURL}`)
    .then(res => handleError(res))
}

export async function getSelected(term) {
  
  let url = '';
  switch (term) {
    case 'Top Rated':
      url = TOPRATEDURL;      
      break;
    case 'In Cinema Now':
      url = INCINEMANOW;     
      break;
    case 'Upcoming':
      url = UPCOMING;      
      break;
    default:
      url = TOPRATEDURL;     
  }  
  let promises = []; 
  // Get the number of pages from the search term
  let page_results = await fetch(url)
    .then(res => handleError(res));    
  let pages = page_results.total_pages;
  let numPages = pages < 10 ? pages : 10;
  for(let i = 1; i <= numPages; i++) {
    promises.push(fetch(`${url}&page=${i}`)
    .then(res => handleError(res)))
  }    
  return Promise.all(promises);
}
  