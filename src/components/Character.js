
import React, { useEffect, useState } from "react";
import { selectedFilmId, filmsObject } from './Filter';
import CharacterBox from "./CharacterBox";
import './CharacterBox.css';

var selectedFilm = '';
var charactersInfoMemoArray = [];
var currentCharactersInfo = [];
var lastSelectedFilmId = 0;
var isSameFilmId = false;

const Characters = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false)
    const [characters, setCharacters] = useState([]);

    const fecthData = (selectedFilmId) => {

        filmsObject.forEach((film)=> { 
            if (film.episode_id === selectedFilmId) { 
                selectedFilm = film;
            }
        })

        let charactersUrls = selectedFilm.characters;
        let characterHomeWorld = '';
        let numberOfCharacters = charactersUrls.length;
        let currentLenght = 0;
        
        charactersUrls.forEach( async (characterUrl) => {
            
            let characterName = '';
            let indexOfCharacterId = 5;
            let characterId = characterUrl.split('/')[indexOfCharacterId];
            let isInMemo = false;

            charactersInfoMemoArray.forEach((memo) => { 

                if(memo[characterId]) { 
                    
                    characterName = memo['name'];
                    characterHomeWorld = memo['homeWorld'];
                    
                    currentCharactersInfo.push({
                        name: characterName,
                        homeWorld: characterHomeWorld
                    });
                    
                    isInMemo = true;

                    currentLenght = currentCharactersInfo.length;

                    if (currentLenght === numberOfCharacters) {     
                        setIsLoading(false);
                        setCharacters(() => currentCharactersInfo);
                    }

                }

            })

            if (!isInMemo) { 
                
                let res = await fetch(characterUrl);

                if (res.status < 200 || res.status >= 300) { 
                    setIsError(true)
                }

                let data = await res.json();    

                characterName = data.name;   
                
                let characterWorldRes = await fetch(data.homeworld);

                if (characterWorldRes.status < 200 || characterWorldRes.status >= 300) { 
                    setIsError(true)
                }

                let characterHomeWorldData = await characterWorldRes.json();

                characterHomeWorld = characterHomeWorldData.name;

                currentCharactersInfo.push({
                    name: characterName,
                    homeWorld: characterHomeWorld
                });

                charactersInfoMemoArray.push({
                    [characterId]: true,
                    name: characterName,
                    homeWorld: characterHomeWorld
                })

                currentLenght = currentCharactersInfo.length;

                if (currentLenght === numberOfCharacters) { 
                    setIsLoading(false);
                    setCharacters(() => currentCharactersInfo);
                }

            }

        })
        
    }

    useEffect(() => {

        if (lastSelectedFilmId === selectedFilmId) { 
            isSameFilmId = true;
        } else { 
            isSameFilmId = false;
        }

        lastSelectedFilmId = selectedFilmId; 

        if (!isSameFilmId && selectedFilmId > 0) {  
            setIsLoading(true);
            currentCharactersInfo = [];
            fecthData(selectedFilmId);
        } 
      
    })

    if (isLoading) { 
        return <>
            <div className="loading-container">
                <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                <h4>It may take a while, intergalactic internet is connecting... <br/>
                    <span className="load-message">Next loads will be much faster</span>
                </h4>
            </div>
        </>
    }

    if (isError) { 
        return <>
            <p>Refresh your page and try again! </p>
        </>
    }
  
    return <>
        <ul className="characters-list">
                {
                    characters.map((character, index) => {
                        return <CharacterBox key={index} {...character} />
                    })
                }
        </ul>
    </>
}

export default Characters;