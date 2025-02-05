import { useState } from "react";
import App from "./App";





function ComicRelatedApp ({imagen,functionComicInfo,loadImage}){
    return (
        <div onClick={functionComicInfo}>
            <img src={imagen} alt="imagen de comic realacionado con el personaje selecionado del comic" className="img-comic-related" loading="lazy" />
        </div>
    )
            
}

export default ComicRelatedApp
