import styled, { css } from 'styled-components'

interface LabelProps {
    isSlug?: boolean;
    isName?: boolean;
    isDescription?: boolean;
}

export const Container = styled.div``

export const Content = styled.main`
    max-width: 1120px;
    margin: 64px auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`

export const Title = styled.div`
    flex-basis: 100%;
    margin: 8px auto;
    display: flex;

    p {
        font-size: 48px;
    }

    a {
        text-decoration: none;
        color: #fff;
        margin-left: auto;
        margin-top: 16px;

        display: flex;
        flex-direction: column;
        align-items: center;

        transition: 0.3s ease;

        &:hover {
            opacity: 0.75;
        }

        p {
            font-size: 16px;
            text-align: center;
        }
    }

`

export const ProjectCard = styled.div`
    width: 250px;
    height: 225px;
    background: #ff9000;
    margin: 8px;
    padding: 20px;
    border-radius: 16px;
    box-shadow: 4px 8px 8px #00000055;
    cursor: pointer;
    transition: 0.3s ease;

    &:hover {
        transform-origin: center;
        transform: scale(1.02);
        box-shadow: 4px 8px 16px #000000FF;
    }

    &:active {
        transform-origin: center;
        transform: scale(0.98);
        box-shadow: 4px 8px 16px #00000055;
    }

    a {
        text-decoration: none;
    }
`

export const Label = styled.p<LabelProps>`

    ${(props) =>
        props.isSlug &&
        css`
            background-color: #FFFFFF44;
            color: #312e38;
            font-size: 22px;
            font-weight: 700;
            border-radius: 8px;
            margin: -8px 0 2px -8px;
            padding: 2px;
            padding-bottom: 4px;

        `
    }

    ${(props) =>
        props.isName &&
        css`
            margin-top: 8px;
            font-size: 18px;
            font-weight: 500;
            color: #312e38;
        `
    }

    ${(props) =>
        props.isDescription &&
        css`
            margin-top: 12px;
            font-size: 15px;
            font-weight: 500;
            color: #312e38cc;
        `
    }
`
