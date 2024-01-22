import { useContext } from "react";
import { GlobalContext } from "../../context";
import RecipeItem from "../../components/recipe-item";

export default function Favorites() {
  const {  favoriteList } = useContext(GlobalContext);


  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {favoriteList && favoriteList.length > 0 ? (
        favoriteList.map((item) => <RecipeItem item={item} />
        )
      ) : (
        <div>
          <p className="lg:text-4xl text-xl text-center text-black font-extrabold">
            Favorite is empty! Add Recipe.
          </p>
        </div>
      )}
    </div>
  );
}
