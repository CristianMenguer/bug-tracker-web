import styled, { keyframes } from 'styled-components'
import { shade } from 'polished'

import NotFound from '../../assets/notFound.jpeg'

export const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: stretch;
    background: url(${NotFound}) no-repeat center;
    background-size: cover;
`

export const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    max-width: 700px;
`

const appearFromLeft = keyframes`
    from {
        opacity: 0;
        transform: translateX(-50px);

    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
`

export const AnimationContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    animation: ${appearFromLeft} 1s;

    border-radius: 24px;
    background-color: #22222288;
    padding: 96px 32px;

    > a {
        color: #ff9000;
        display: block;
        margin-top: 24px;
        text-decoration: none;
        transition: color 0.2s;

        display: flex;
        align-items: center;
        transition: color 0.2s;

        svg {
            margin-right: 16px;
        }

        &:hover {
            color: ${shade(0.2, '#ff9000')};
        }
    }
`

export const Label = styled.p`
    margin: 32px 0;
    font-size: 24px;
`
