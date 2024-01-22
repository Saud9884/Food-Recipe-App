import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [favoriteList, setFavoriteList] = useState([]);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );
      const data = await res.json();
      if (data?.data?.recipes) {
        setRecipeList(data?.data?.recipes);
        setLoading(false);
        setSearchParam("");
        navigate('/')
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setSearchParam("");
      
    }
  }

  function handleAddToFavorite(getCurrentItem) {
    console.log(getCurrentItem);
    let cpyFavotite = [...favoriteList];
    const index = cpyFavotite.findIndex((item) => item.id === getCurrentItem.id);

    if (index === -1) {
      cpyFavotite.push(getCurrentItem);
    } else {
      cpyFavotite.splice(index);
    }

    setFavoriteList(cpyFavotite);
  }

  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        setSearchParam,
        handleSubmit,
        loading,
        recipeList,
        recipeDetails,
        setRecipeDetails,
        favoriteList,
        setFavoriteList,
        handleAddToFavorite,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
