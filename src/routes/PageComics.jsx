import { useState, useEffect } from "react";
import Header from "../componentes/header";
import { useNavigate } from "react-router-dom";
import Footer from "../componentes/Footer"
import { Link } from "react-router-dom";

export default function PageCharacter() {
    
    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState("");
    const [arrayCharacter, setArrayCharacter] = useState([]);
    const [characterSelected, setCharacterSelected] = useState(null);
    const [comicRelated, setComicRelated] = useState([]);
    useEffect(() => {
        if (inputValue.trim() === '') {
            return;
        }
            if (inputValue.length >= 3) { // Solo busca si tiene 3 o más caracteres
                fetch(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${inputValue}&apikey=cc1ea1c40eb534f495ed2cd238a9b858`)
                .then(res => res.json())
                .then(data => {
                    if (data.data && data.data.results) {
                        const arrayData = data.data.results;
                        console.log(arrayData)
                        const filterData = arrayData.filter((result) => !result.thumbnail.path.includes("available") )
                        setArrayCharacter(filterData);
                        
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
            }
        }, [inputValue]);
        
        
        const handleSelectedCharacter = (characterInfo) => {
            const comicsRelatedNames = characterInfo.comics.items.map((comic) => comic.name);
            const arrayComicRelated = comicsRelatedNames.map((comicName) => comicName.split(/\(|\)/));

                const newArrayComicRelated = arrayComicRelated.map((comicInfo) => {
                    comicInfo[2] = comicInfo[2].replace("#", "");
                    return comicInfo;
                }).slice(0,6)
        
            setComicRelated(newArrayComicRelated);
            setCharacterSelected(characterInfo);
        
            console.log(newArrayComicRelated);

            navigate("/PageCharacterProfile", {
                state: { newArrayComicRelated,characterInfo}
              });
        }
        const valueInputSend = (e) => {
            setInputValue(e.target.value);
        };
    return (
        <>
            <Header />
            <section className="section-characters">
                <input type="text" className='input-find' placeholder='Spider Man, X men, Ant Man...' onChange={valueInputSend} />
                <div className="div-characters">


                    {arrayCharacter.map((character, index) => (
                        <div className="link-character" key={index} onClick={() => handleSelectedCharacter(character)}>
                        <div className='box-character' >
                                <img src={character.thumbnail.path + "." + character.thumbnail.extension } alt="imagen de un personaje de Marvel" className="img-character" />
                                <span className='span-name'> {character.name} </span>
                            </div>
                    </div>
                    ))}
                </div>
            </section>
            <Footer/>
        </>
    );
}
