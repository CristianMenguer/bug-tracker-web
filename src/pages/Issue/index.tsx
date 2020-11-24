import React, { useEffect, useState } from 'react'
import { useRouteMatch, useHistory, Link } from 'react-router-dom'
import { format } from 'date-fns'
import { BiAddToQueue } from 'react-icons/bi'

import { Container, Content, Title, BackTo, IssueTitle, CommentContainer, Comment, IssueContainer } from './styles'

import api from '../../services/api'
import Header from '../../components/Header'
import { useAuth } from '../../hooks/auth'

interface IssueParams {
    slugNumber: string
}

const Issue: React.FC = () => {

    const { signOut } = useAuth()

    const { params } = useRouteMatch<IssueParams>()
    const history = useHistory()

    const [issue, setIssue] = useState<Issue>()
    const [users, setUsers] = useState<User[]>()
    const [slug, setSlug] = useState('')
    const [errorMessage, setErrorMessage] = useState('Loading issue ' + params.slugNumber)

    async function loadIssue() {

        let newUsers = users

        if (!newUsers || newUsers.length === 0) {
            const response = await api.get<User[]>('/users')
            newUsers = response.data
            setUsers(newUsers)
        }

        if (!newUsers || newUsers.length === 0)
            return
        //

        let response

        try {
            response = await api.get<Issue[]>(`/issues/${params.slugNumber}`)
        } catch (err) {
            if (err.response.data.message === 'Issue not found!')
                setErrorMessage(`Issue '${params.slugNumber}' not found!`)
            else if (err.response.status === 401) {
                signOut()
            } else
                setErrorMessage(`Error loading issue '${params.slugNumber}'!`)
            return
        }

        if (response.data && response.data.length && response.data.length > 0) {
            const newIssue = response.data[0]
            setIssue({ ...newIssue })
            if (newIssue.comments && newIssue.comments.length > 0) {
                newIssue.comments.map(comment => {
                    if (newUsers && newUsers.length > 0) {
                        const newUser = newUsers.filter(user => user._id === comment.user_id)
                        comment.user = newUser[0]
                    }
                    return comment
                })
            }
            //
            setIssue({ ...newIssue })
        }
    }

    useEffect(() => {
        const { slugNumber } = params

        const splitString = slugNumber.split('-')
        //
        if (splitString.length !== 2)
            setErrorMessage(`Issue '${slugNumber}' not found!`)
        //
        setSlug(splitString[0])
        loadIssue()
        // eslint-disable-next-line
    }, [params.slugNumber])

    return (
        <Container>
            <Header />
            <Content>
                <BackTo>
                    <Link to={`/project/${slug}`} >
                        <p >Back to issues</p>
                    </Link>
                </BackTo>

                {(issue && issue.title) ? (
                    <IssueContainer >
                        <div>
                            <Title >{params.slugNumber}: {issue.title}</Title>
                            <p>Description: {issue.description}</p>
                        </div>
                        <div>
                            <Link to={`/issue/${params.slugNumber}/new`} title='Add a Comment' >
                                <BiAddToQueue size={36} />
                                <p>Add a Comment</p>
                            </Link>
                        </div>
                    </IssueContainer>
                ) : (
                        <Title >{errorMessage}</Title>
                    )}

                {(!!issue && issue.comments && issue.comments.length > 0) ? (
                    <CommentContainer >
                        {issue.comments.map((comment) =>
                            <Comment key={comment._id} >
                                <strong >{comment.user?.name} commented at {format(new Date(comment.created_at), 'hh:mm dd/MM/yyyy')}</strong>
                                <p>Title: {comment.title}</p>
                                <p>Text: {comment.text}</p>
                                <p>Number: {comment.number}</p>
                            </Comment>
                        )}
                    </CommentContainer>
                )
                    :
                    (
                        (<IssueTitle>No comment found to this issue!</IssueTitle>)
                    )}

            </Content >
        </Container >
    )
}

export default Issue
