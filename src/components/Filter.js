import React, { useState, useEffect } from 'react'
import Characters from './Character'
import './FilterBox.css'

const filmsUrl = 'https://swapi.dev/api/films'

var selectedFilmId = '';
var filmsObject = '';

const defaultBoxColors = {
    1: '#000000',
    2: '#000000',
    3: '#000000',
    4: '#000000',
    5: '#000000',
    6: '#000000'
}

const Filter = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false)
    const [films, setFilms] = useState([]);
    const [boxColor, setBoxColor] = useState(defaultBoxColors)

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

    const selectFilterBox = (id) => {

        let newBoxColors = {...defaultBoxColors, [id]: '#7b787d'}
        setBoxColor(newBoxColors)
        selectedFilmId = id;
    }

    if (isLoading === true) { 
        return (<>
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            <h4>It may take a while, intergalactic internet is still slow...</h4>
        </>
        )
    }

    if (isError) { 
        return <>
            <p>Refresh your page and try again! </p>
        </>
    }

    return <>
    <h2 style={{color: '#ffff00', letterSpacing: '1.7px'}}><strong>Star Wars Characters Info</strong></h2>
    <h4>Click in a movie to search for the characters | See on <a href="">Github </a></h4>
    <div className='filter-box-container'>
        {
            films.map((film) => {
                let { episode_id } = film;
                return (
                    <FilterBox key={episode_id} {...film} boxColor={boxColor} clickFunction={selectFilterBox}/>
                )
            })
        }
    </div> <br/>
    <Characters/>
    </>
}

const FilterBox = ({ episode_id, title, boxColor , clickFunction, release_date}) => { 
    let releaseYear = release_date.split('-')[0];
    return (
        <h4 className='filter-box' style={{background: boxColor[episode_id]}} onClick={() => clickFunction(episode_id)}>{title} <br/> <span>{releaseYear}</span></h4> 
    )
}

export default Filter;
export { selectedFilmId , filmsObject};