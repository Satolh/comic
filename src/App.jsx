import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Marvel from './Marvel';
import Footer from "./componentes/Footer"
import PageCharacterProfile from './routes/PageCharacterProfile';
// import FunctionComicSelected from './componentes/functionComicSelected';
import  Header  from './componentes/header';

let randomNumber = Math.floor(Math.random() * 100);

const publicKey = 'cc1ea1c40eb534f495ed2cd238a9b858'; // Usa tu clave pública
const privateKey = '96fdcd63888c1aebc7920bdd3f688c46e7f25473';

function App() {

  const navigate = useNavigate();
  
  const [test, setTest] = useState([])
  const [charSelected, setCharSelected] = useState([])
  const [arrayMarvelComic, setArrayMarvelComic] = useState([]);
  const [characterSelected, setCharacterSelected] = useState(null);
  const [comicSelected, setComicSelected] = useState(null);
  const [openCharacters, setOpenCharacters] = useState(true);
  const [closeMain, setCloseMain] = useState(true);
  const [closeCharacterSelected, setCloseCharacterSelected] = useState(false);
  const [changeClassSectionComicInfo, setChangeSectionClassComicInfo] = useState(false);


  const classContainerCharacter = openCharacters ? "container-character-find" : "container-character-find display-block";
  const classContainerComics = closeMain ? "main" : "main display-none";
  const classCharacterSelected = closeCharacterSelected ? "container-character-profile " : "container-character-profile display-none";
  const classComicRelated = closeCharacterSelected ? "container-comic-related" : "container-comic-related display-none";
  const classSectionComicInfo = changeClassSectionComicInfo ? "section-comic-info" : "section-comic-info display-none";

useEffect(() => {
  const cachedComics = localStorage.getItem('marvelComics');
  if (cachedComics) {
    setArrayMarvelComic(JSON.parse(cachedComics));
  } else {
    const timestamp = Date.now();
    const hash = md5(timestamp + privateKey + publicKey)

    fetch(`https://gateway.marvel.com:443/v1/public/comics?issueNumber=${randomNumber}&limit=12&apikey=${publicKey}&ts=${timestamp}&hash=${hash}`)
      .then(res => res.json())
      .then(data => {
        const comics = data.data.results;
        if (comics) {
          setArrayMarvelComic(comics);
          localStorage.setItem('marvelComics', JSON.stringify(comics)); // Guardar en caché
        }
      });
    }
  }, []);


  const handleSelectComic = (comic) => {
    const fechaAPI = comic.dates[1].date;
    const fecha = new Date(fechaAPI);
    const opcionesDeFecha = { year: 'numeric', month: 'long', day: 'numeric' };
    const formatDate = fecha.toLocaleDateString('en-EN', opcionesDeFecha);

    let  characters = []; // Array temporal para almacenar los nombres
    comic.characters.items.forEach((item) => {
        const lola = item.name;
        characters.push(lola);
        console.log(lola) 
    });
  
    // Arrays temporales para acumular los creadores
    
    let tempWriters = [];
    let tempPencilers = [];
    let tempEditors = [];
    let tempColorists = [];
  
    // Recorremos los creadores y los agrupamos según su rol
    comic.creators.items.forEach((item) => {
      if (item.role === "writer") {
        tempWriters.push(item.name);
      }
      if (item.role === "penciller" || item.role === "penciler") {
        tempPencilers.push(item.name);
      }
      if (item.role === "editor") {
        tempEditors.push(item.name);
      }
      if (item.role === "colorist") {
        tempColorists.push(item.name);
      }
    });
    console.log(comic)

    navigate("/PageComicInfo", {
      state: {
        comic,
        date: formatDate,
        writers: tempWriters,
        pencilers: tempPencilers,
        editors: tempEditors,
        colorists: tempColorists,
        character: characters
      }
    });
  };
  


  return (
    <>
      <div className='container'>
        <Header />
        <main className={classContainerComics}>
          <div className="loading-spinner"></div>
          <section className='section-comics'>
            {arrayMarvelComic.map((comic, index) => (
              comic?.images[0]?.path && (
                <div
                  key={index}
                  onClick={() => handleSelectComic(comic)}
                >
                  <Marvel img={comic.images} nameComic={comic.title} />
                </div>
              )
            ))}
          </section>
          <section className='section-menu'>
            <img className='img-punisher' src="/assets/punisherWall.jpeg" alt="" />
          </section>
        </main>

        {/* <div className="container-character-find"></div>
        {characterSelected && (
          <div className={classCharacterSelected}>
            <PageCharacterProfile
              characterName={characterSelected.name || "Name not Found"}
              description={characterSelected.description || "Description not Found"}
              img={characterSelected.thumbnail.path + ".jpg" || "Img not Found"}
            />
            <p className='title-comic-related'>Comic Related: </p>
          </div>
        )} */}
        {/* <div className={classComicRelated}>
          {takeImage.map((comicImg, index) => (
            comicImg[0]?.images[0]?.path && (
              <div
                key={index}
                onClick={() => handleSelectComic(comicImg[0])}
              >
                <img
                  src={comicImg[0].images[0].path + ".jpg"}
                  alt="imagen de comic relacionado con el personaje seleccionado del comic"
                  className="img-comic-related"
                  loading="lazy"
                />
              </div>
            )
          ))}
        </div> */}
      </div>

     <Footer/>
    </>
  );
}

export default App;
