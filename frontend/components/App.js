import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Character from './Character'

const urlPlanets = 'http://localhost:9009/api/planets'
const urlPeople = 'http://localhost:9009/api/people'

function App() {
  const [charHomeworlds, setcharHomeworlds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get(urlPeople),
      axios.get(urlPlanets)
    ])
      .then(([charsresponse, planetsResponse]) => {
        const characters = charsresponse.data;
        const planets = planetsResponse.data;

        // Combine the data based on a common attribute (homeworld ID)
        const combinedData = characters.map(character => {
          const homeworld = planets.find(planet => planet.id === character.homeworld);
          return { ...character, homeworldName: homeworld ? homeworld.name : 'Unknown' };
        });

        setcharHomeworlds(combinedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Star Wars Characters</h2>
      <p>See the README of the project for instructions on completing this challenge</p>
      {charHomeworlds.map(character => {
        return <Character key={character.id} name={character.name} planet={character.homeworldName} />
      })}
    </div>
  )
}

export default App

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = App
