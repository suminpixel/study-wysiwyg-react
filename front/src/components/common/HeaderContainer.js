import React from 'react';
import Styled from 'styled-components';
import {useSelector} from 'react-redux';
import Responsive from './Responsive';
import Button from './Button';
import { Link } from 'react-router-dom'
import Header from './Header';


const HeaderContainer = () => {
 
    const {user} = useSelector(({user}) => ({ user: user.user}));

    return(
        <>
            <Header user={user} />
        </>
    )
}


const HeaderBlock = Styled.div`
    position: fixed;
    width: 100%;
    background: white;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);

`

const Wrapper = Styled(Responsive)`
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo{
        font-size: 1.125rem;
        font-weight: 800;
        letter-spacing: 2px;
    
    }
    .right{
        display: flex;
        align-items: center;
    }

`

const Spacer = Styled.div`
    height: 4rem;

    
`

export default HeaderContainer;