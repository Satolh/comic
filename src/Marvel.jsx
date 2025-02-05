import { useState } from "react";
import App from "./App";
import { TiHeartFullOutline, } from "react-icons/ti";



function Marvel ({ img,functionComic}){

    if(img && img.length > 0){

        const imageUrl = img[0].path + ".jpg"
        return( 
            <section className="container-comic" onClick={functionComic} >
            <img src={imageUrl} alt="Poster de un comic" className="img-comic" loading="lazy" />
        </section>
    )
}
    
}  

export default Marvel


