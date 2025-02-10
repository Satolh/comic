import { useState, useEffect } from "react";
import App from "../App";
import  Header  from "../componentes/header";
import Footer from "../componentes/Footer"
import md5 from "md5";
import { useLocation, useNavigate } from "react-router-dom";


const PageComicInfo = () => {

const publicKey = 'cc1ea1c40eb534f495ed2cd238a9b858'; // Usa tu clave pública
const privateKey = '96fdcd63888c1aebc7920bdd3f688c46e7f25473';
const ts = Date.now();
const hash = md5(ts + privateKey + publicKey);

    const navigate = useNavigate()
    const [takeImageComic,setTakeImageComic] = useState([])

    const location = useLocation();
    const comic = location.state?.comic; // Obtener los datos del cómic de la ubicación
    const data = location.state?.date;
    const writers = location.state?.writers;
    const editors = location.state?.editors;
    const pencilers = location.state?.pencilers;
    const colorist = location.state?.colorists;
    const character = location.state?.character;
    console.log(editors)
    
  useEffect(() => {
    if (character && character.length > 0) {
      const promises = character.map((character) => {
        const apiUrlCharacters = `https://gateway.marvel.com/v1/public/characters?name=${character}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
        return fetch(apiUrlCharacters)
          .then((res) => res.json())
          .then((data) => {
            if (data.data.results.length) {
              return data.data.results;
            } else {
              console.error(`No se encontraron datos válidos para el personaje ${character}`);
              return null; //
            }
          })
          .catch((error) => {
            console.error(`Error al obtener los datos del personaje ${character}`, error);
            return null;
          });
      });
  
      Promise.all(promises)
        .then((comicCharacterList) => {
          const filteredComicCharacterList = comicCharacterList.filter((result) => result !== null && result !== undefined && !result[0].thumbnail.path.includes("available"));
          setTakeImageComic(filteredComicCharacterList);
          console.log(takeImageComic)
        });
    }
  }, [character]);


  const handleSelectedCharacter = (characterInfo) => {
    console.log(characterInfo)
    const comicsRelatedNames = characterInfo[0].comics.items.map((comic) => comic.name);
    const arrayComicRelated = comicsRelatedNames.map((comicName) => comicName.split(/\(|\)/));

        const newArrayComicRelated = arrayComicRelated.map((comicInfo) => {
            comicInfo[2] = comicInfo[2].replace("#", "");
            return comicInfo;
        }).slice(0,6)

    console.log(newArrayComicRelated);

    navigate("/PageCharacterProfile", {
        state: { newArrayComicRelated,characterInfo}
      });
}
    
    return (
        <> 
            <Header/>

                <section className="section-comic-info">
                    {comic && (
                        <div className="container-comic-info">
                             {(comic.images || (Array.isArray(comic) && comic[0]?.images)) && (
                                <img  src={
                                      Array.isArray(comic) && comic[0]?.images 
                                      ? `${comic[0].images[0].path}.jpg`
                                      : `${comic.images[0].path}.jpg`} 
                                      alt="selected comic image" className="img-comic-info"/>
                        )}
                        <div className="container-comic-info-selected">
                            <h2 className="title-comic">{comic.title}</h2>
                            <div className="div-comic-info">
                                <div className="divisor-comic-info">
                                    <p className="paragraph-published paragraph-info">Published:</p>
                                    <span className="span-comic-info"> {data} </span>
                                </div>
                                <div className="divisor-comic-info">
                                    <p className="paragraph-writer paragraph-info">Writer:</p>
                                    {writers.map((writer, index) => (
                                        <span className="span-comic-info" key={index}>{writer}</span>
                                    ))}
                                    {   writers.length < 1 &&
                                        <span className="rol-not-found">Not Found</span>
                                    }
                                </div>
                                { comic.creators &&(
                                <div className="divisor-comic-info">
                                    <p className="paragraph-editor paragraph-info">Editor: </p>
                                    {editors.map((editor, index) => (
                                            <span className="span-comic-info" key={index}>{editor}</span>
                                    ))}
                                    {   editors.length < 1 &&
                                        <span className="rol-not-found">Not Found</span>
                                    }
                                </div>
                                    )
                                }
                                <div className="divisor-comic-info">
                                    <p className="paragraph-penciler paragraph-info">Penciller:</p>
                                {pencilers.map((pen, index) => (
                                        <span className="span-comic-info" key={index}>{pen}</span>
                                    ))}
                                    {   pencilers.length < 1 &&
                                        <span className="rol-not-found">Not Found</span>
                                    }
                                </div>
                                <div className="divisor-comic-info">
                                    <p className="paragraph-colorist paragraph-info">Colorist:</p>
                                {colorist.map((colorist, index) => (
                                        <span className="span-comic-info" key={index}>{colorist}</span>
                                    ))}
                                    {   colorist.length < 1 &&
                                        <span className="rol-not-found">Not Found</span>
                                    }
                                </div>
                            </div>
                            <div className="divisor-comic-description">
                                <p className="paragraph-comic">{comic.description || "Description Not Found"}</p>
                            </div>
                           
                        </div> 
                    </div>  
                )}
                <div className="container-character">
                                { takeImageComic &&
                                    takeImageComic.map((char, index) =>(
                                        <div className="box-mini-character" key={index} onClick={() => handleSelectedCharacter(char)}>
                                            <img src={char[0].thumbnail.path +"." + char[0].thumbnail.extension } alt="" className="image-character"/>
                                            <p className="name-character"> {char[0].name} </p>
                                        </div>
                                    ))
                                }
                            </div>
            </section>
            <Footer/>
         </>
    );           
}

export default PageComicInfo;