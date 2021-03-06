import React from 'react';
import styled, {css} from 'styled-components';
import palette from '../../lib/styles/palette';
import { withRouter , Link} from 'react-router-dom';


const ButtonStyle = css`
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.35em 1rem;
    color: white;
    outline: none;
    cursor: pointer;
    background: ${palette.gray[8]};
    &:hover{
        background: ${palette.gray[6]};
    }
    ${props => props.fullWidth && css`
        padding-top: 0.75em;
        padding-bottom: 0.75rem;
        width: 100%;
        font-size: 1.125rem;
    `}
    ${props => props.cyan && css`
        background: ${palette.cyan[5]};
        &:hover{
            background: ${palette.cyan[4]};
        }
    `}
`

const StyledButton = styled.button`
    ${ButtonStyle}
`

const LinkButton = styled(Link)`
    ${ButtonStyle}
`
const Button =  props => {

    return props.to ? 
        <LinkButton {...props} />
        :
        <StyledButton {...props} />
}

export default Button;
