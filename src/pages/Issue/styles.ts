import styled from 'styled-components'

export const Container = styled.div``

export const Content = styled.main`
    max-width: 1120px;
    margin: 64px auto;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
`

export const IssueContainer = styled.div`
    width: 100%;
    margin: 8px auto;

    display: flex;
    flex-direction: row;

    div {
        margin-left: 8px;
    }

    div + div {
        margin-left: auto;
        margin-top: 12px;

        a {
            text-decoration: none;
            color: #fff;
            margin-left: auto;
            margin-top: 16px;
            align-items: center;
            display: flex;
            flex-direction: column;

            transition: 0.3s ease;

            &:hover {
                opacity: 0.65;
            }
        }
    }
`

export const Title = styled.p`
    flex-basis: 100%;
    font-size: 48px;
    margin: 8px 0 8px 0;
`

export const BackTo = styled.div`

    cursor: pointer;
    a {
        text-decoration: none;

        p {
            color: #ff9000;

            &:hover {
                opacity: 0.8;
            }
        }
    }
`

export const IssueTitle = styled.p`
    flex-basis: 100%;
    font-size: 36px;
    margin: 64px 0 8px 0;
`

export const CommentContainer = styled.div`
    margin-top: 16px;
`

export const Comment = styled.div`
    display: flex;
    flex-direction: column;
    border-width: 2px;
    border-color: #ddd;
    border-style: solid;
    border-radius: 8px;

    padding: 4px;

    & + & {
        margin-top: 16px;
    }

    strong {
        font-size: 20px;
        color: #ff9000;
        padding: 4px 0;

    }

    p {
        margin: 2px 0;
    }
`
