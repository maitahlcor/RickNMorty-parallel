async function getallEpisodes (){

    const response = await fetch('https://rickandmortyapi.com/api/episode');
    const data = await response.json();
    return data.results
  }
  
  async function getaCharacterByURL (url)  {
    const response = await fetch(url);
    const data = await response.json();
    return data
  }
  async function getALLCharactersByURL () {
    const characterList = new Set();
    const episiodelist = await getallEpisodes();

    episiodelist.forEach(episode=>{
        episode.characters.slice(0, 10).forEach(charURL =>{
          characterList.add(charURL);
        });
  
    })
   
   const parallelArray = []; 
    for (const item of characterList) {
      parallelArray.push(getaCharacterByURL(item))
    
    }
    //console.log(parallelArray)
   const result = await Promise.all(parallelArray)
   console.log(result)
  }

  getALLCharactersByURL()