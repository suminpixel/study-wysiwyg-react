import React from 'react';
import Styled from 'styled-components';


const ResponsiveBlock = Styled.div`
    padding-left: 1rem;
    padding-right: 1rem;
    width: 1200px;
    margin: 0 auto;

    @media(max-width: 1100px){
        width: 768px;
    }
    @media(max-width: 768px){
        width: 100%;
    }

`

const Responsive =  ({children, ...rest}) => {

    return (
        <ResponsiveBlock {...rest}>
            {children}
        </ResponsiveBlock>
    )
}

export default Responsive