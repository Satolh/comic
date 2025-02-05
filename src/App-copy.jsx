// import { useState,useEffect } from 'react'
// import Marvel from './Marvel'
// import PageCharacter from './routes/PageCharacters';
// import { TiPencil, TiThMenu,TiTimes,TiHeartFullOutline } from "react-icons/ti";
// import PageCharacterProfile from './routes/PageCharacterProfile';
// import ComicRelatedApp from './ComicRelated';
// import PageComicInfo from './routes/PageComicInfo';
// import { Header } from './componentes/header';
// import { FunctionComicSelected } from './componentes/functionComicSelected';
// import { Link } from 'react-router-dom';
// // key : cc1ea1c40eb534f495ed2cd238a9b858


// let randomNumber = Math.floor(Math.random()*100);
// let i = Math.floor(Math.random()*4);
// // let vowels = ["a","e","i","o","u"];


// function App() {

//   const [loadingImage, setLoadingImage] = useState(0);
//   const [hoverName, setHoverName] = useState(false);
//   const [writers, setWriters] = useState([])
//   const [pencilers, setPencilers] = useState([])
//   const [editors, setEditors] = useState([])
//   const [colorists, setColorists] = useState([]);
//   const [date, setdate] = useState();
//   const [likeOn,setLikeOn] = useState(false)
  
  
//   const [comicsRelated, setComicsRelated] = useState([])
//   const [arrayMarvelComic, setArrayMarvelComic] = useState([]);
//   const [takeImage, setTakeImage] = useState([]);
//   const [ComicSelectedCharacters, setComicSelectedCharacters] = useState(null)
//   const [takeImageComic, setTakeImageComic] = useState([])
//   const [characterSelected, setCharacterSelected] = useState(null)
//   const [ComicSelected, setComicSelected] = useState(null);
//   const [openCharacters, setOpenCharacters] = useState(true)
//   const [closeMain, setCloseMain] = useState(true)
//   const [closeCharacterSelected, setCloseCharacterSelected] = useState(false)
//   const [changeClassSectionComicInfo, setChangeSectionClassComicInfo] = useState(false);


//   const classContainerCharacter = openCharacters ? "container-character-find" : "container-character-find display-block"
//   const classContainerComics = closeMain ? "main" : "main display-none"
//   const classCharacterSelected = closeCharacterSelected ? "container-character-profile " : "container-character-profile display-none" ;
//   const classComicRelated = closeCharacterSelected ? "container-comic-related" : "container-comic-related display-none"
//   const classSectionComicInfo = changeClassSectionComicInfo ? "section-comic-info" : "section-comic-info display-none"
//   const classContainerImagenCharacter = hoverName ? "container-imagen-character" : "container-imagen-character display-none" ;
//   const classIconLike = likeOn ? "icon-like" : "icon-like icon-like-on";
  
  
//   const handleCLassCharacter = ()=>{
//     setOpenCharacters(false)
//     setCloseMain(false)
//     setCloseCharacterSelected(false)
//     setHoverName(false)
//     setChangeSectionClassComicInfo(false)
//     setOpenMenu(true)
//   }
//   const handleClassComic = ()=>{
//     setCloseMain(true)
//     setOpenCharacters(true)
//     setCloseCharacterSelected(false)
//     setHoverName(false)
//     setChangeSectionClassComicInfo(false)
//     setWriters([])
//     setEditors([])
//     setPencilers([])
//     setColorists([])
//   }

//   const handleLike = ()=>{
//     setLikeOn(!likeOn)
//   }
//   const handleMenuOff = ()=>{
//     setOpenMenu(true)
//   }
//   // const handleImageLoad = ()=>{
//   //   setLoadingImage(loadingImage + 1);
//   // }
  
//   useEffect(()=>{
//     fetch(`https://gateway.marvel.com:443/v1/public/comics?issueNumber=${randomNumber}&apikey=cc1ea1c40eb534f495ed2cd238a9b858`)
//     .then(res => res.json())
//     .then(data => {
//       const comic = data.data.results;
//       if(comic){
//         setArrayMarvelComic(comic)
//       }
//     })
//   },[])



    
    
    
//   // useEffect(() => {
//   //   if (comicsRelated[0]) {

//   //     comicsRelated.forEach((item)=>{
//   //       if(item.length >= 3 && (item[1] && item[2])){

//   //       }
//   //     })
//   //     const promises = comicsRelated.map(([title, year, issueNumber]) => {
//   //       if(!isNaN(year) && !isNaN(issueNumber)){
//   //         const apiUrl = `https://gateway.marvel.com:443/v1/public/comics?title=${title}&startYear=${year}&issueNumber=${issueNumber}&apikey=cc1ea1c40eb534f495ed2cd238a9b858`;  
//   //         return fetch(apiUrl)
//   //         .then((res) => res.json())
//   //         .then((data) => {
//   //           if ( data.data.results) {
//   //               return data.data.results;
//   //             } else {
//   //               throw new Error(`No se encontraron datos válidos para el cómic ${title}`);
//   //             }
//   //           })
//   //           .catch((error) => {
//   //             console.error(`Error al obtener los datos del cómic ${title}`, error);
//   //             return null;
//   //           });
//   //         }
//   //     });
  
//   //     Promise.all(promises)
//   //       .then((comicDataList) => {
//   //         const FilterComicDataList = comicDataList.filter((comicData) => comicData !== null && comicData !== undefined)
//   //         setTakeImage(FilterComicDataList);
//   //       })
//   //       .catch((error) =>{
//   //         console.error('Error en alguna de las solicitudes:', error)
//   //       })
//   //   }
//   //   setWriters([])
//   //   setEditors([])
//   //   setPencilers([])
//   //   setColorists([])
//   // }, [characterSelected]);

//   useEffect(()=>{
//     if(ComicSelected){
//       const promises = ComicSelectedCharacters.map((character) => {
//         const apiUrlCharacters = `https://gateway.marvel.com:443/v1/public/characters?name=${character}&apikey=cc1ea1c40eb534f495ed2cd238a9b858`
//         return fetch(apiUrlCharacters)
//         .then(res => res.json())
//         .then(data => {
//           if ( data.data.results.length) {
//             return data.data.results;
//           } else {
//             console.error(`No se encontraron datos válidos para el cómic ${character}`);
//             return null;
//           }
//         })
//         .catch((error)=> {
//           console.error(" Error al obtener los datos del comic", error)
//           return null;
//         });
//       })

//       Promise.all(promises)
//       .then((comicCharaterList) =>{
//         const filterComicCharacterList = comicCharaterList.filter((comicCharaterList) => comicCharaterList !== null && comicCharaterList !== undefined)
//         setTakeImageComic(filterComicCharacterList)
//       })
//     }
//   },[ComicSelected])
  
  


//     const handleSelectedCharacter = (characterInfo) => {
//     setOpenCharacters(true)
//     setCloseMain(false)
//     setCloseCharacterSelected(true)
//     setChangeSectionClassComicInfo(false)
//     setCharacterSelected(characterInfo)
//     const comicsRelatedNames = characterInfo.comics.items.map((comic) => comic.name);
//     const arrayComicRelated = comicsRelatedNames.map((comicName) => comicName.split(/\(|\)/));
//     const newArrayComicRelated = arrayComicRelated.map((comicInfo)=>{
//       comicInfo[2] = comicInfo[2].replace("#", "");
//       return comicInfo;
//     })
//     setComicsRelated(newArrayComicRelated)
//     console.log(characterInfo)
//     console.log(characterSelected)
//   }
  

//   const handleSelectComic = (comicInfo) =>{
//     FunctionComicSelected(comicInfo, setComicSelected,setComicSelectedCharacters, setWriters, setPencilers, setEditors, setColorists, setdate);
//     console.log(ComicSelected)
//   }
  



//   return (
//     <>

//     <div className='container'>

//         <Header/>
//       {/* <header className='header'>

//          <TiThMenu className={classIconOpen} onClick={()=> setOpenMenu(!openMenu)} />
//          <TiTimes className={classIconCLose} onClick={()=> setOpenMenu(!openMenu)}/>
//         <div className={classMenu} >
//           <Link className='link-header' to={"/pages/PageCharacters.jsx"} onClick={handleCLassCharacter}>Characters</Link>
//           <Link className='link-header' to={""} onClick={handleMenuOff}>News</Link>
//           <Link className='link-header' to={""} onClick={handleMenuOff}>Series</Link>
//           <Link className='link-header' to={""} onClick={handleMenuOff}>Likes</Link>
//         </div>
        
//         <img src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg" onClick={handleCLassComic} className='header-title'></img>
//         <div className="container-link-header" >
//           <Link className='link-header' to={"/pages/PageCharacters.jsx"} onClick={handleCLassCharacter}>Characters</Link>
//           <Link className='link-header' to={""} onClick={handleMenuOff}>News</Link>
//           <Link className='link-header' to={""} onClick={handleMenuOff}>Series</Link>
//           <Link className='link-header' to={""} onClick={handleMenuOff}>Likes</Link>
//         </div>

//         </header> */}

//       <main className={classContainerComics}>
//           {/* <div className="loading-spinner"></div> */}
//         <section className='section-comics'>
//         { 
//             arrayMarvelComic.map((comic,index) => (
//               comic?.images[0]?.path ?   
//               <Link key={index} onClick={() => handleSelectComic(comic)} to={"./routes/PageComicInfo.jsx"} >
//               <Marvel img={comic.images} nameComic={comic.title} /> 
//               </Link>
//               : ""
//               )) 
//             }
//         </section>

            

//         <section className='section-menu'>

//         {/* <input type="text" className='input-find' placeholder='Spider Man, X men, Ant Man...'/> */}

//         </section>

//       </main>

//       <div className={classContainerCharacter}>

//         {/* <input type="text" className='input-find' placeholder='Spider Man, X men, Ant Man...' onChange={valueInputSend}/>
        
//         <div className="container-characters">
//             {
//               arrayCharacter.map((character,index)=>(
//                 <PageCharacter img={character.thumbnail.path + ".jpg"} 
//                 key={index} 
//                 characterName={character.name}
//                 functionCharacterSelected={()=> handleSelectedCharacter(character)}
//                 />
//                 ))
//               }

//         </div> */}
//       </div>
//             {
//               characterSelected ? ( 
                
//                 <div className={classCharacterSelected}>

//                 <PageCharacterProfile characterName={characterSelected.name || "Name not Found"} 
//                 description={characterSelected.description || "Description not Found"}
//                 img={characterSelected.thumbnail.path + ".jpg" || "Img not Found"}
//                 />
//                   <p className='title-comic-related'>Comic Related: </p>

//               </div>
//        ) : "" }
//               { <div className={classComicRelated}>


//                 {
//                   takeImage.map((comicImg, index) =>(
//                     comicImg[0]?.images[0]?.path ?  
//                     <ComicRelatedApp key={index} 
//                     imagen={comicImg[0].images[0].path + ".jpg"}
//                     functionComicInfo={() => handleSelectComic(comicImg)}
//                     />  
//                     : ""
//                     )
//                     )
//                   }
//               </div> }
//               <section className={classSectionComicInfo}>
//               {
//               //   ComicSelected ? (
//               //     <div className="container-comic-selected-info">
//               //       <TiHeartFullOutline className={classIconLike} onClick={handleLike}/>
//               //     {
//               //       <PageComicInfo comicName={ComicSelected.title || "Title not Found"}
//               //       descriptionComic={ComicSelected.description || "Description not Found"}
//               //       imgComic={ComicSelected.images[0].path + ".jpg" || "Img not Found"}
//               //       writer={writers  ||  "not found"}
//               //       penciller={pencilers || "not found" } 
//               //       editor={editors || "not found"}
//               //       colorist={colorists || "not found"}
//               //       published={date || "not found"} />
//               //     }
//               //   </div>
//               // ) : ""
//             }
//                 <div className={classContainerImagenCharacter}>
//               {
//                 ComicSelectedCharacters ? (
//                   takeImageComic.map((imgCharacter,index) => (
//                     <div className='container-name-img-character' onClick={()=> handleSelectedCharacter(imgCharacter[0])} key={index}>
//                       <p className="name-character"> {imgCharacter[0].name} </p>
//                       <img src={imgCharacter[0].thumbnail.path + ".jpg"} alt="imagen de un personaje de marvel" className='image-character' />
//                     </div>
//                     ))
//                     ) : ""
                    
//                   }
                  
//                     </div>
//                   </section>
//     </div>

//     <footer className='footer'>
//       <p className='paragraph-footer'> created by satolh using marvel api </p>
//       <p className='paragraph-footer-autor'> Derechos de autor reservados, con excepcion de los hinchas del club Atletico River Plate   </p>
//     </footer>

//     </>
    
//   )
// }

// export default App;