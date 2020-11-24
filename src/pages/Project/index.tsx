import React, { useEffect, useState } from 'react'
import { useRouteMatch, Link } from 'react-router-dom'
import { format } from 'date-fns'
import { AiOutlineFolderOpen, AiFillCloseCircle } from 'react-icons/ai'
import { ImBlocked } from 'react-icons/im'
import { GrInProgress } from 'react-icons/gr'
import { BiAddToQueue } from 'react-icons/bi'

import { Container, Content, Title, BackTo, IssueTitle, Table, LinkComment, IssueDescription, ProjectContainer } from './styles'

import api from '../../services/api'
import Header from '../../components/Header'
import { useAuth } from '../../hooks/auth'

interface ProjectParams {
    slug: string
}

const Project: React.FC = () => {

    const { signOut } = useAuth()

    const { params } = useRouteMatch<ProjectParams>()

    const [project, setProject] = useState<Project>()
    const [errorMessage, setErrorMessage] = useState('Loading project ' + params.slug)

    async function loadProjects(): Promise<void> {

        let response

        try {
            response = await api.get<Project>(`/projects/${params.slug}`)
        } catch (err) {
            if (err.response.data.message === 'Project not found!')
                setErrorMessage(`Project '${params.slug}' not found!`)
            else if (err.response.status === 401) {
                signOut()
            } else
                setErrorMessage(`Error loading project '${params.slug}'!`)
            return
        }

        if (response.data) {
            const newProject = response.data
            setProject(newProject)
        }
    }

    useEffect(() => {
        loadProjects()
        // eslint-disable-next-line
    }, [params.slug])

    async function handleChangeIssueStatus(issue: Issue, newStatus: string): Promise<void> {
        if (window.confirm(`Are you sure you wish to change issue status to '${newStatus}'?`)) {
            try {
                await api.put(`/issues/${params.slug}-${issue.number}/${newStatus}`)
            } catch (err) {
                console.log('Error: ' + err.response)
                alert('Something did not go well, please, try again!')
                return
            }
            //
            const newProject = Object.assign({}, project)
            newProject?.issues.map(element => {
                if (element._id === issue._id)
                    element.status = newStatus
            })
            setProject(newProject)
        }
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
                    <ProjectContainer >
                        <div>
                            <Title >Slug: {project.slug}</Title>
                            <p>Name: {project.name}</p>
                            <p>Description: {project.description}</p>
                        </div>
                        <div>
                            <Link to={`/project/${params.slug}/new`} title='Add an Issue' >
                                <BiAddToQueue size={36} />
                                <p>Add an Issue</p>
                            </Link>
                        </div>
                    </ProjectContainer>
                )) || (
                        <Title >{errorMessage}</Title>
                    )}

                {
                    (project && project.issues && project.issues.length > 0) ? (
                        <>
                            <IssueTitle>Issues</IssueTitle>
                            <IssueDescription>Click on the number of comments to see them</IssueDescription>
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
                                        <th>Open</th>
                                        <th>Wip</th>
                                        <th>Block</th>
                                        <th>Close</th>
                                    </tr>
                                    {project.issues.map((issue) => (
                                        <tr key={issue._id} >
                                            <td>{issue.number}</td>
                                            <td>{issue.title}</td>
                                            <td>{issue.description}</td>
                                            <td>{format(new Date(issue.created_at), 'dd/MM/yyyy')}</td>
                                            <td>{issue.due_date ? format(new Date(issue.due_date), 'dd/MM/yyyy') : 'No due date'}</td>
                                            <td>{issue.status}</td>
                                            <td>
                                                <LinkComment >
                                                    <Link to={`/issue/${params.slug}-${issue.number}`} >
                                                        {(issue.comments && issue.comments?.length) ? issue.comments?.length : 0}
                                                    </Link>
                                                </LinkComment>
                                            </td>
                                            <td>
                                                {issue.status !== 'open' && (
                                                    <AiOutlineFolderOpen
                                                        style={{ cursor: 'pointer' }}
                                                        size={18}
                                                        onClick={() => handleChangeIssueStatus(issue, 'open')}
                                                    />
                                                )}
                                            </td>
                                            <td>
                                                {issue.status !== 'wip' && (
                                                    <GrInProgress
                                                        style={{ cursor: 'pointer' }}
                                                        size={18}
                                                        onClick={() => handleChangeIssueStatus(issue, 'wip')}
                                                    />
                                                )}
                                            </td>
                                            <td>
                                                {issue.status !== 'blocked' && (
                                                    <ImBlocked
                                                        style={{ cursor: 'pointer' }}
                                                        size={17}
                                                        onClick={() => handleChangeIssueStatus(issue, 'blocked')}
                                                    />
                                                )}
                                            </td>
                                            <td>
                                                {issue.status !== 'closed' && (
                                                    <AiFillCloseCircle
                                                        style={{ cursor: 'pointer' }}
                                                        size={18}
                                                        onClick={() => handleChangeIssueStatus(issue, 'closed')}
                                                    />
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </>
                    ) :
                        (<IssueTitle>No issue found to this project!</IssueTitle>)
                }
            </Content >
        </Container >
    )
}

export default Project
