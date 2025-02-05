import {TiThMenu,TiTimes } from "react-icons/ti";
import { useState } from "react";
import { Link } from 'react-router-dom';


 function Header() {

    const [openMenu, setOpenMenu] = useState(true);

    const classMenu = openMenu ? "ul" : "ul visible" ;
    const classIconOpen = openMenu ? "icon-open" :"icon-open hidden";
    const classIconCLose = openMenu ? "icon-close" : "icon-close visible";
    
    const handleMenuOff = ()=>{
        setOpenMenu(true)
      }

    return(

        <header className='header' >

        <Link to={"/"}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg" className='header-title'></img>
        </Link>

        <TiThMenu className={classIconOpen} onClick={()=> setOpenMenu(!openMenu)} />
        <TiTimes className={classIconCLose} onClick={()=> setOpenMenu(!openMenu)}/>
       <div className={classMenu} >
         <Link className='link-header' to={"/PageCharacters"} >Characters</Link>
         {/* <Link className='link-header' to={"/PageComics"} >Comics</Link> */}
         {/* <Link className='link-header' to={""} onClick={handleMenuOff}>News</Link>
         <Link className='link-header' to={""} onClick={handleMenuOff}>Series</Link>
         <Link className='link-header' to={""} onClick={handleMenuOff}>Likes</Link> */}
       </div>

       <div className="container-link-header" >
         <Link className='link-header' to={"/PageCharacters"}>Characters</Link>
         {/* <Link className='link-header' to={"/PageComics"}>Comics</Link> */}
         {/* <Link className='link-header' to={""} onClick={handleMenuOff}>News</Link>
         <Link className='link-header' to={""} onClick={handleMenuOff}>Series</Link>
         <Link className='link-header' to={""} onClick={handleMenuOff}>Likes</Link> */}
       </div>

       </header>

    )

}

export default Header;