import React from 'react';
import './NameHolder.css';

const NameHolder = ({printName, urlState}) => {

    while(urlState !== '' && !printName.length){
        return(
            <div className='name'>
                <h2>Recognizing...</h2>
            </div>
        );

    }
    return(
            <div>
                <h2 className='name'>{printName}</h2>
            </div>
    );





};

export default NameHolder;