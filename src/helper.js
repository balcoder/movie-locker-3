// returns an array of movies given an array of objs and a page num
export default function getPage(pageNum, arr) {  
  console.log('helper', pageNum, arr)
  let pageResult = arr.find(val => val.page === parseInt(pageNum, 10)); 
  
  return pageResult.results;
}