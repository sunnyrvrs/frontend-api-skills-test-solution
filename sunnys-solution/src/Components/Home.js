import React, { useEffect, useState } from 'react';
import "../Home.css";

function Home() {

  let [data, setData] = useState([]);
  let [specials, setSpecials] = useState([]);
  let [specialids, setSpecialids] = useState([]);

  const setSpecialIds = () => {
    let array = [];
    for (let i = 0; i < specials.length; i++) {
      array.push(specials[i]["ingredientId"]);
      // console.log(specials[i]["uuid"])
    }
    setSpecialids(array);
    // console.log(specialids);
  }

  const fetchData = async () => {
    const data = await fetch('http://localhost:3001/recipes');
    const json = await data.json();
    setData(json);
    const specialsData = await fetch('http://localhost:3001/specials');
    const jsonSpecials = await specialsData.json();
    setSpecials(jsonSpecials);
  }

  useEffect(() => {
    fetchData()
      .catch(console.error);
    setSpecialIds();
  }, []);

  // console.log(data);
  // console.log(specials);
  

  return (
    <div>
      <h1 className="recipes__title">Recipes</h1>
      <ul className="recipe__list">
        {data.map((recipe) => (
          <div className="recipe__item--container">
            <li className="recipe__item" key={recipe["uuid"]}>
              <h3>{recipe["title"]}</h3>
              <p>{recipe["description"]}</p>
              <h4>Ingredients:</h4>
              <ul>
                {/* {recipe["ingredients"].map((ingredient) => {
                  return <li key={ingredient["uuid"]}>{ingredient["name"]}</li>
              })} */}

              {recipe["ingredients"].map((ingredient) => {
                  for (let i = 0; i < specialids.length; i++) {
                    if (specialids[i] === ingredient["uuid"]) {
                      console.log(specialids[i]);
                      console.log(ingredient["uuid"]);

                      return (
                        <div>
                          <li key={ingredient["uuid"]}>{ingredient["name"]}</li>
                          <ul>
                            <li>{specials[i]["title"]}</li>
                            <li>{specials[i]["type"]}</li>
                            <li>{specials[i]["text"]}</li>
                          </ul>
                        </div>
                        
                      );

                    }
                  }
              })}

              </ul>
              <h4>Directions</h4>
              <ol>
                {recipe["directions"].map((direction) => (
                  <li>{direction["instructions"]}</li>
                ))}
              </ol>
            </li>
          </div>
        ))}
      </ul>  
    </div>
  )
}

export default Home;