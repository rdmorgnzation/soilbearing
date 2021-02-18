// Fetch with cache so, data is stored after fetch
// Customized fetch function
function storedFetch(url){
  if(url in _SB.cache){
    return 
  }
  fetch()
}
