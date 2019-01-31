import React from 'react';
import './ImageLink.css';

const ImageLink = ({onChange, onSubmit}) => {
    return(
            <div>
                <div><p className='f3 '>
                    Place an URL to recognize the celebrity
                </p></div>
                <div className='form pa4 br3 center shadow-5'>
                    <input id='inputField' className='f4 pa1 w-90' type="text" onChange={onChange}/>
                    <button onClick={onSubmit} className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'>Detect</button>
                </div>
            </div>
    );
};

export default ImageLink;