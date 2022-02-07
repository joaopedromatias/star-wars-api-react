
import React from "react"

const CharacterBox = ({ name, homeWorld }) => { 
    return <li className="character-name">{name} <br /> <span>Homeworld: {homeWorld}</span>  </li>
}

export default CharacterBox;