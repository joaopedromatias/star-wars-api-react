
import React from "react";

const FilterBox = ({ episode_id, title, boxColor , clickFunction, release_date}) => { 
    let releaseYear = release_date.split('-')[0];
    return (
        <h4 className='filter-box' style={{background: boxColor[episode_id]}} onClick={() => clickFunction(episode_id)}>{title} <br/> <span>{releaseYear}</span></h4> 
    )
}

export default FilterBox;