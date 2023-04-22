import { useEffect, useState } from "react";
import Navbar from "./componentes/Navbar.jsx";
import Pagination from "./componentes/Pagination.jsx";
import CharacterList from "./componentes/CharacterList.jsx";

function App() {
  const [character, setCharacter] = useState([]);
  const [info, setinfo] = useState({});
  const initialUrl = "https://rickandmortyapi.com/api/character";
  //Para hacer una request de los personajes
  const fetchCharacters = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCharacter(data.results);
        setinfo(data.info);
      })
      .catch((err) => console.log(err));
  };
  const onPrevious = () => {
    fetchCharacters(info.prev);
    window.scroll(0,0);
  };
  const onNext = () => {
    fetchCharacters(info.next);
    window.scroll(0,0);
  };
  useEffect(() => {
    fetchCharacters(initialUrl);
  }, []);

  return (
    <>
      <Navbar brand={"RICK AND MORTY"}/>
      <div className="container mt-5">
        <Pagination
          prev={info.prev}
          next={info.next}
          onPrevious={onPrevious}
          onNext={onNext}
         />
        <CharacterList characters={character}  />
        <Pagination prev={info.prev}
          next={info.next}

          onPrevious={onPrevious}
          onNext={onNext} />
      </div>
    </>
  );
}

export default App;
