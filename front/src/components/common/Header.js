import React from 'react';
import Styled from 'styled-components';
import Responsive from './Responsive';
import Button from './Button';
import { Link } from 'react-router-dom'


const Header = () => {
    return(
        <>
            <HeaderBlock>
                <Wrapper>
                    <Link to="/" className={"logo"}>
                        REACTORS
                    </Link>
                    <div className={"right"}>
                        <Button to="/login" cyan>로그인</Button>
                    </div>
                </Wrapper>
            </HeaderBlock>
            <Spacer />
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

export default Header;