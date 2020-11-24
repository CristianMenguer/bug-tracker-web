import styled from 'styled-components'

export const Container = styled.div``

export const Content = styled.main`
    max-width: 1120px;
    margin: 64px auto;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    a {
        text-decoration: none;
        color: #ff9000;
        display: flex;

        &:hover {
            opacity: 0.8;
        }

        svg {
            margin-top: 2px;
        }

        p {
            margin-left: 4px;
        }
    }

    form {
        margin: 16px;

        h1 {
            margin: 16px 0;
        }

    }
`
