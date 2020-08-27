import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import '../../App.css'

export const NavBar = () => {
   
    const isAutrenticeted = true;

    const guestLinks = (
        <Fragment>
            <li>
                <h2>
                    <a href="/" className='sm-hiden'>Kontakt</a>
                </h2>
            </li>
            <li>
                    <h2>
                        <a href="/" className='sm-hiden'><i className="fas fa-sign-in-alt"></i>
                        Zaloguj</a>
                    </h2>
                </li>   
        </Fragment>
    );
    const userLinks = (
        <Fragment>
           <li>
                <h2>
                    <a href="/" className='sm-hiden'>Planer</a>
                </h2>
            </li>
            <li>
                <h2>
                    <a href="/" className='sm-hiden'>Rezerwacja</a>
                </h2>
            </li>
            <li>
                    <h2>
                        <a href="/" className='sm-hiden'><i className="fas fa-sign-out-alt"></i>
                        Wyloguj</a>
                    </h2>
                </li>   
            </Fragment>
    )
    return (
        <nav className='navbar'>
            <ul className="menu-left">
                <li>
                    <h2>
                        <a href="/">
                        <i className="fas fa-bars"></i>
                     </a>
                    </h2>
                </li>
            </ul>
            <ul className='menu-right'>
                <li> 
                    <h2>
                        <a href="/" className='sm-hiden'>Główna</a>
                    </h2>
                </li> 
                <li>
                    <h2>                    
                        <a href="/" className='sm-hiden'>Galeria</a>
                    </h2>
                </li>
                {<Fragment>{isAutrenticeted?userLinks:guestLinks}</Fragment>}
                                 
            </ul>
        </nav>
    )
}