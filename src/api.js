import { KEY } from './movie-locker.config';
const APIURL = 'https://api.themoviedb.org/3/';
const GENRESURL = `${APIURL}genre/movie/list?api_key=${KEY}&language=en-US&include_adult=false&page=1`;
const GENREURL = `${APIURL}discover/movie?api_key=${KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=`;
const POPULARURL = `${APIURL}discover/movie?api_key=${KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=`;
const INNOWURL = `${APIURL}discover/movie?api_key=${KEY}&language=en-US&page=2&primary_release_date.gte=2020-02-05&primary_release_date.lte=2020-03-04`;
const TOPRATEDURL = `${APIURL}movie/top_rated?api_key=${KEY}&language=en-US&page=1`


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
// export async function getGenres(id) {  
//   return fetch(`${GENREURL}&with_genres=${id}`)    
//     .then(res => handleError(res))
// }
export async function getGenres(id) {
  let promises = [];
  for(let i = 1; i <= 5; i++) { // loop through 5 pages
    // console.log(i);
    // console.log(`${GENREURL}${i}&with_genres=${id}`)
 promises.push(fetch(`${GENREURL}${i}&with_genres=${id}`)
    .then(res => handleError(res)))
  }
  return Promise.all(promises);
}

// Get a number of pages of popular movies
export async function getPopular(num) {
  let promises = [];
  for(let i = 1; i <= num; i++) { // loop through 10 pages
    promises.push(fetch(POPULARURL + i )
      .then(res => handleError(res)))
  }
  return Promise.all(promises);  
}

export async function getInTheCinemaNow() {
  return fetch(INNOWURL)
    .then(res => handleError(res))
}

export async function getTopRated() {
  return fetch(TOPRATEDURL)
    .then(res => handleError(res))
}