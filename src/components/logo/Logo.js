import React from 'react'
import Tilt from 'react-tilt'
import brain from '../static/brain.png';
import './Logo.css';


const Logo = () => {
    return(
        <div className='logo-prop ma4 mt0'>
            <Tilt className="Tilt br2" options={{ max : 50 }} >
                <div className="Tilt-inner pa3">
                    <img alt='brain logo' src={brain}/>
                </div>
            </Tilt>
        </div>
    );
};

export default Logo;