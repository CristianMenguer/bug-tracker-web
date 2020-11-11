import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { Link } from 'react-router-dom'

import { Container, Content, Title, Label, ProjectCard } from './styles'

import api from '../../services/api'

const Dashboard: React.FC = () => {

    const [projects, setProjects] = useState<Project[]>([])

    useEffect(() => {
        api
            .get<Project[]>('/projects')
            .then((response) => {
                if (response.data && response.data.length > 0)
                    setProjects(response.data)
            })
    }, [])

    return (
        <Container>
            <Header />
            <Content>
                <Title >Projects</Title>
                {projects.length === 0 && (
                    <p>No project found!</p>
                )}

                {projects.length > 0 && (
                    projects.map((project) => (
                        <ProjectCard key={project._id} >
                            <Link to={`/project/${project.slug}`} >
                                <Label isSlug >{project.slug}</Label>
                                <Label isName >Name: {project.name}</Label>
                                <Label isDescription >Description: {project.description}</Label>
                            </Link>
                        </ProjectCard>
                    ))

                )}
            </Content>
        </Container>
    )
}

export default Dashboard
