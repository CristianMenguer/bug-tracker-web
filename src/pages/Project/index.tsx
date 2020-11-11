import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { useRouteMatch, Link } from 'react-router-dom'

import {
    Container,
    Content,
    Title,
    BackTo
} from './styles'

import api from '../../services/api'

interface ProjectParams {
    slug: string
}

const Project: React.FC = () => {

    const { params } = useRouteMatch<ProjectParams>()
    const [project, setProject] = useState<Project>()
    const [users, setUsers] = useState<User[]>()

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

        const response = await api.get<Project>(`/projects/${params.slug}`)

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
                    <Title >{/**Loading project {params.slug} */}</Title>
                )}

                {(project && project.issues && project.issues.length > 0 && (
                    <div style={{ marginTop: '32px' }} >
                        <strong>Issues</strong>
                        {project.issues.map((issue) =>
                            <div key={issue._id} style={{ marginTop: '16px', padding: 4, borderStyle: 'solid', borderWidth: 1, borderColor: '#FFF', borderRadius: 8 }} >
                                <p>Title: {issue.title}</p>
                                <p>Number: {project.slug + '-' + issue.number}</p>
                                <p>Status: {issue.status}</p>
                                <p>Description: {issue.description}</p>


                                {(issue.comments && issue.comments.length > 0 && (
                                    <div style={{ marginTop: '8px' }} >
                                        <strong>Comments</strong>
                                        <hr />
                                        {issue.comments.map((comment) =>
                                            <div key={comment._id} style={{ marginTop: '4px' }} >
                                                <p>Title: {comment.title}</p>
                                                <p>Text: {comment.text}</p>
                                                <p>Number: {comment.number}</p>
                                                <p>User: {comment.user?.name}</p>
                                                <hr />
                                            </div>
                                        )}
                                    </div>
                                ))}


                            </div>
                        )}
                    </div>
                ))}

            </Content>
        </Container>
    )
}

export default Project
