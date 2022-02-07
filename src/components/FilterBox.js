
import React from "react";

const FilterBox = ({ episode_id, title, opacity , clickFunction, release_date}) => { 
    let releaseYear = release_date.split('-')[0];
    return (
        <h4 className='filter-box' style={{opacity: opacity[episode_id]}} onClick={() => clickFunction(episode_id)}>{title} <br/> <span>{releaseYear}</span></h4> 
    )
}

export default FilterBox;