import { useState , useEffect} from 'react';
import './styles.css'
/*async function getallEpisodes (){

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
   const result = await Promise.all(parallelArray)
   return result
  }
  

function RickNMortyApp() {
  const [data, setData] = useState([]);
  getALLCharactersByURL()
  useEffect(() =>{
    getALLCharactersByURL().then((data)=>{
        setData(data)
    })
    
  },[])
  return (
    <div>
      <h1>ricardo y mortimer</h1>
      {data.map((character) => (
        <li key={character.id} className="contact-list__item">
            <p>{character.name}</p>
            <p>{character.episode}</p>
            <p>{character.species}</p>
            <img src={character.image} alt="Contact" className="contact-card__photo" />

        </li>
        
        
      ))}
    </div>
  )
}

export default RickNMortyApp*/

const getAllEpisodes = async () => {
    const url = 'https://rickandmortyapi.com/api/episode'
    const res = await fetch(url);
    return res.json();
  }
  
  const getAllCharacters = async (url) => {
    const res = await fetch(url);
    return res.json();
  }
  
  const getAllCharfacters = async (urlCharacters) => {
    const urlCharacterSet = new Set();
    urlCharacters.forEach((url) => {
      urlCharacterSet.add(url);
    });
  
      const promisesCharacters = Array.from(urlCharacterSet).map((urlCharacter) => {
      const promiseCharacter = getAllCharacters(urlCharacter);
      return promiseCharacter;
    })
    const dataCharacters = await Promise.all(promisesCharacters);
    return dataCharacters;
  }
  
  const createNewData = (episodes, characters) => {
    const newData = episodes.map((episode) => {
      return {
        title: `${episode.name} - ${episode.episode}`,
        dateOnAir: episode.air_date,
        characters: episode.characters.slice(0, 10).map((url) => {
          return characters.find((item) => url === item.url)
        })
      }
    })
  
    return newData;
  }
  
  function RickNMortyApp() {
  
    const [allData, setAllData] = useState([]);
  
  
    useEffect(() => {
      const getData = async () => {
        const episodesData = await getAllEpisodes();
        const episodesList = episodesData.results
  
        let listCharacters = [];
        episodesList.map((episode) => {
  
          episode.characters.map((urlCharacter, index) => {
            if (index <10) {
              listCharacters.push(urlCharacter);
            }
          })
        })
  
        const charactersData = await getAllCharfacters(listCharacters);
  
        const data = createNewData(episodesList, charactersData);
        console.log(data);
        setAllData(data);
      }
  
      getData();
  
    }, [])
    return (
        <>
          <h1>PETICIONES RICK AND MORTY</h1>
          <br />
          <h2>LISTADO DE CAPITULOS</h2>
          <br />
          {allData.map((episode, index) => {
            return (
              <div key={index} className='c-episode'>
                <p><strong>{episode.title}</strong></p>            
                <p>Fecha al aire: {episode.dateOnAir}</p>            
                <p>Personajes:</p>
                <div className='c-characters'>
                  <ul>
                    {episode.characters.map((character, index) => {
                      return <div>
                        <img src={character.image} alt="Contact" className="contact-card__photo" />
                        <li key={index}>{`${character.name} - ${character.species}`}</li>
                        </div>
                    })}
                  </ul>
                </div>
              </div>
            )
          })}
          <br />
        </>
      )
    }
    
    export default RickNMortyApp