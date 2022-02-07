import React, { useState, useEffect } from 'react'
import FilterBox from './FilterBox'
import Characters from './Character'
import './FilterBox.css'

const filmsUrl = 'https://swapi.dev/api/films'

var selectedFilmId = '';
var filmsObject = '';

const Filter = () => {

    const defaultOpacity = {
        1: 1,
        2: 1,
        3: 1,
        4: 1,
        5: 1,
        6: 1
    }

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false)
    const [films, setFilms] = useState([]);
    const [opacity, setOpacity] = useState(defaultOpacity);

    const fetchData = async () => { 
        
        const res = await fetch(filmsUrl);

        if (res.status < 200 || res.status >= 300) { 
            setIsError(true)
        }

        const data = await res.json();
        setIsLoading(false);
        setFilms(data.results);
        filmsObject = data.results;
    }

    useEffect(fetchData, [])

    const selectFilterBox = (id,  title) => {

        let newOpacity = {[id]: 1}

        for (let i = 1; i < 7; i++) { 

            if (i !== id) { 
                newOpacity[i] = 0.3
            } 
        }
        
        setOpacity(newOpacity)
        selectedFilmId = id;

        window.dataLayer.push({
            event: 'event',
            ec: 'selected-movie', 
            ea: title
        })
    }

    if (isLoading === true) { 
        return (<>
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            <h4>It may take a while, intergalactic internet is connecting...</h4>
        </>
        )
    }

    if (isError) { 
        return <>
            <p>Refresh your page and try again! </p>
        </>
    }

    return <>
    <h4 className='upper-text'>Click on a movie to search for the characters <br/> <span>See on <a href="https://github.com/joaopedromatias/star-wars-api-react" target='_blank' onClick={() => window.dataLayer.push({event: 'event', ec: 'link', ea: 'gh-link'})}>Github </a></span></h4>
    <div className='filter-box-container'>
        {
            films.map((film) => {
                let { episode_id } = film;
                return (
                    <FilterBox key={episode_id} {...film} opacity={opacity} clickFunction={selectFilterBox}/>
                )
            })
        }
    </div> <br/>
    <Characters/>
    </>
}

export default Filter;
export { selectedFilmId , filmsObject};