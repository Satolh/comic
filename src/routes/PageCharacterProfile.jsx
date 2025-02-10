import { useEffect, useState } from "react";
import  Header from "../componentes/header";
import Footer from "../componentes/Footer"
import {useNavigate, useLocation } from 'react-router-dom';
import ComicRelatedApp from "../ComicRelated";
import md5 from "md5";
// import { FunctionComicSelected } from "../componentes/functionComicSelected";
import { Link } from "react-router-dom";
export default function PageCharacterProfile() {

  const navigate = useNavigate();

const publicKey = 'cc1ea1c40eb534f495ed2cd238a9b858'; // Usa tu clave pública
const privateKey = '96fdcd63888c1aebc7920bdd3f688c46e7f25473';
const ts = Date.now();
const hash = md5(ts + privateKey + publicKey);
 

    const [characterSelected, setCharacterSelected] = useState(null);
    const [takeImage, setTakeImage] = useState([]);
    const [loading, setLoading] = useState()
      const location = useLocation();
      const charSelected = location.state?.newArrayComicRelated;
      const charInfo = location.state?.characterInfo
      console.log(charSelected)



   useEffect(() => {
    setLoading(true)
    if (charSelected[0]) {

      charSelected.forEach((item)=>{
        if(item.length >= 3 && (item[1] && item[2])){

        }
        setLoading(false)
      })
      const promises = charSelected.map(([title, year, issueNumber]) => {
        if(!isNaN(year) && !isNaN(issueNumber)){
          const apiUrl = `https://gateway.marvel.com/v1/public/comics?title=${title}&startYear=${year}&issueNumber=${issueNumber}&limit=6&ts=${ts}&apikey=${publicKey}&hash=${hash}`;  
          return fetch(apiUrl)
          .then((res) => res.json())
          .then((data) => {
            if ( data.data.results) {
                return data.data.results;
              } else {
                throw new Error(`No se encontraron datos válidos para el cómic ${title}`);
              }
            })
            .catch((error) => {
              console.error(`Error al obtener los datos del cómic ${title}`, error);
              return null;
            });
          }
      });
  
      Promise.all(promises)
        .then((comicDataList) => {
          const FilterComicDataList = comicDataList.filter((comicData) => comicData !== null && comicData !== undefined)
          setTakeImage(FilterComicDataList);
          console.log(FilterComicDataList)
        })
        .catch((error) =>{
          console.error('Error en alguna de las solicitudes:', error)
        })
    }
  }, [characterSelected]);

  const handleSelectComic = (comic) => {
    const fechaAPI = comic[0].dates[1].date ;
    const fecha = new Date(fechaAPI);
    const opcionesDeFecha = { year: 'numeric', month: 'long', day: 'numeric' };
    const formatDate = fecha.toLocaleDateString('en-EN', opcionesDeFecha);

    let  characters = []; // Array temporal para almacenar los nombres
    comic[0].characters.items.forEach((item) => {
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
    comic[0].creators.items.forEach((item) => {
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
  
    // Navegamos a la página de detalles y pasamos los datos en el estado
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
  console.log(takeImage)


//   {(comic.images || (Array.isArray(comic) && comic[0]?.images)) && (
//     <img  src={
//           Array.isArray(comic) && comic[0]?.images 
//           ? `${comic[0].images[0].path}.jpg`
//           : `${comic.images[0].path}.jpg`} 
//           alt="selected comic image" className="img-comic-info"/>
// )}
    return (

        <>
        <Header/>

            { charInfo &&
            <div className="container-profile">
                <div className="img-profile">
                  {
                    <img src={Array.isArray(charInfo) && charInfo[0].thumbnail 
                      ?  `${charInfo[0].thumbnail.path}.${charInfo[0].thumbnail.extension} `
                      :  `${charInfo.thumbnail.path}.${charInfo.thumbnail.extension}`
                    } alt="Imagen Particular de un Personaje de Marvel" />
                  }
                </div>
                <h2 className="name">{Array.isArray(charInfo) && charInfo[0].name
                      ?  `${charInfo[0].name}`
                      :  `${charInfo.name}`}</h2>
                <p className="paragraph-description">{charInfo.description || "Description not Found"}</p>
            
                <p className='title-comic-related'>Comic Related: </p>
             
            <div className="container-comic-related" >

                { takeImage &&
                  takeImage.map((comicImg, index) =>(
                    comicImg[0]?.images[0]?.path ?  
                    <div key={index} 
                    onClick={() => handleSelectComic(comicImg)}
                    >
                    <img src={comicImg[0].images[0].path + "." +comicImg[0].images[0].extension} alt="imagen de comic realacionado con el personaje selecionado del comic" className="img-comic-related" loading="lazy" />
                    </div>
                    : ""
                  ))
                  }
            </div>
            {loading && <div className="spinner"></div>}
            {
                takeImage.length === 0 &&
                <div className="container-comic-related-not-found">
                  <p className="p-comic-related-not-found" >Comic Related Not found</p>
                </div>
              }

            </div>
            }
        
        <Footer/>
        </>
    );
}

