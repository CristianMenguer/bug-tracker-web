import React, { useEffect, useState } from 'react'
import { useRouteMatch, Link } from 'react-router-dom'
import { format } from 'date-fns'
import { TiDelete } from 'react-icons/ti'

import { Container, Content, Title, BackTo, IssueTitle, Table } from './styles'

import api from '../../services/api'
import Header from '../../components/Header'

interface ProjectParams {
    slug: string
}

const Project: React.FC = () => {

    const { params } = useRouteMatch<ProjectParams>()

    const [project, setProject] = useState<Project>()
    const [issueSelected, setIssueSelected] = useState<Issue>()
    const [users, setUsers] = useState<User[]>()
    const [errorMessage, setErrorMessage] = useState('Loading project ' + params.slug)


    async function loadProjects(): Promise<void> {

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
            response = await api.get<Project>(`/projects/${params.slug}`)
        } catch (err) {
            if (err.response.data.message === 'Project not found!')
                setErrorMessage(`Project '${params.slug}' not found!`)
            else
                setErrorMessage(`Error loading project '${params.slug}'!`)
            return
        }


        if (response.data) {
            const newProject = response.data
            setProject(newProject)
            if (newProject.issues && newProject.issues.length > 0) {
                newProject.issues.map((issue) => {
                    if (issue.comments && issue.comments.length > 0) {
                        issue.comments.map(comment => {
                            if (newUsers && newUsers.length > 0) {
                                const newUser = newUsers.filter(user => user._id === comment.user_id)
                                comment.user = newUser[0]
                            }
                            return comment
                        })
                    }
                    return issue
                })
                setProject(newProject)
            }
        }
    }

    useEffect(() => {
        loadProjects()
        // eslint-disable-next-line
    }, [params.slug])

    function handleSelectIssue(issue: Issue) {
        if (issue && issue._id && issue._id !== '')
            setIssueSelected(issue)
    }

    return (
        <Container>
            <Header />
            <Content>
                <BackTo>
                    <Link to='/' >
                        <p>Back to projects</p>
                    </Link>
                </BackTo>

                {(project && project.slug && (
                    <div>
                        <Title >Slug: {project.slug}</Title>
                        <p>Name: {project.name}</p>
                        <p>Description: {project.description}</p>
                    </div>
                )) || (
                        <Title >{errorMessage}</Title>
                    )}

                {
                    (project && project.issues && project.issues.length > 0) ? (
                        <>
                            <IssueTitle>Issues</IssueTitle>
                            <Table >
                                <tbody>
                                    <tr>
                                        <th>Number</th>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Opened at</th>
                                        <th>Duo Date</th>
                                        <th>Status</th>
                                        <th>Comments</th>
                                        <th></th>
                                    </tr>
                                    {project.issues.map((issue) => (
                                        <tr key={issue._id} onClick={() => handleSelectIssue(issue)} >
                                            <td>{issue.number}</td>
                                            <td>{issue.title}</td>
                                            <td>{issue.description}</td>
                                            <td>{format(new Date(issue.created_at), 'dd/MM/yyyy')}</td>
                                            <td>{issue.due_date ? format(new Date(issue.due_date), 'dd/MM/yyyy') : 'No due date'}</td>
                                            <td>{issue.status}</td>
                                            <td>{(issue.comments && issue.comments?.length) ? issue.comments?.length : 0}</td>
                                            <td><TiDelete style={{cursor: 'pointer'}} size={32} /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </>
                    ) :
                        (<IssueTitle>No issue found to this project!</IssueTitle>)
                }



                {issueSelected && issueSelected._id && issueSelected._id !== '' &&

                    (issueSelected.comments && issueSelected.comments.length > 0 && (
                        <>
                            <IssueTitle>Comments for issue: "{issueSelected.title}" ({project?.slug}-{issueSelected.number})</IssueTitle>

                            <div style={{ marginTop: '8px' }} >
                                <hr />
                                {issueSelected.comments.map((comment) =>
                                    <div key={comment._id} style={{ marginTop: '4px' }} >
                                        <p style={{ backgroundColor: '#000', padding: 8 }} >{comment.user?.name} at {format(new Date(comment.created_at), 'dd/MM/yyyy')}</p>
                                        <p>Title: {comment.title}</p>
                                        <p>Text: {comment.text}</p>
                                        <p>Number: {comment.number}</p>
                                        <hr />
                                    </div>
                                )}
                            </div>
                        </>
                    ))}

            </Content >
        </Container >
    )
}

export default Project
