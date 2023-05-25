import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('a');
  const [cocktails, setCocktails] = useState([]);

  const fetchDrinks = useCallback(async () => {
    setLoading(true);//before every fetch, loading should be always true.
    //WHY?
    // Because we are not just fetching once
    try {
      const response = await fetch(`${url}${searchTerm}`)
      const data = await response.json();
      //after the fetch, the drink object in the data is actuallly present. But it's either null or not empty
      const {drinks} = data;
      
      if (drinks) {
        const newCocktails = drinks.map(item => {
           const {
             idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass, } = item;

           return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          }
        });
        
        setCocktails(newCocktails);
      }
      else {
        setCocktails([]);// if drinks is null, set cocktail back to an empty array
      }

      setLoading(false);
      }

     catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [searchTerm])

  useEffect(() => {
    fetchDrinks();
  }, [searchTerm, fetchDrinks])

  return <AppContext.Provider value={{
    loading, 
    cocktails, 
    setSearchTerm
  }}>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
