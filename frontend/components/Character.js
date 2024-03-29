import React, { useState } from 'react'

function Character(props) { // ❗ Add the props
  // ❗ Create a state to hold whether the homeworld is rendering or not
  const [homeworld, setHomeworld] = useState(false)
  // ❗ Create a "toggle" click handler to show or remove the homeworld
  const toggleHomeworld = () => {
    setHomeworld(!homeworld)
  }


  return (
    <div className='character-card' onClick={toggleHomeworld} style={{cursor: 'pointer'}} >
      <h3 className='character-name'>{props.name}</h3>
      {homeworld && (
      <p>
        Planet:
        <span className='character-planet'>{props.planet}</span>
      </p>
      )}
      {/* Use the same markup with the same attributes as in the mock */}
    </div>
  )
}

export default Character;
