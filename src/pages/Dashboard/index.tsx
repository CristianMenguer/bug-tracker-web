import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { Link } from 'react-router-dom'
import { HiOutlineDocumentAdd } from 'react-icons/hi'

import { Container, Content, Title, Label, ProjectCard } from './styles'

import api from '../../services/api'
import { useAuth } from '../../hooks/auth'

const Dashboard: React.FC = () => {

    const { signOut } = useAuth()

    const [projects, setProjects] = useState<Project[]>([])

    useEffect(() => {
        api
            .get<Project[]>('/projects')
            .then((response) => {
                if (response.data && response.data.length > 0)
                    setProjects(response.data)
            })
            .catch(response => {
                if (response && response.response && response.response.status && response.response.status === 401)
                    signOut()
            })
    }, [signOut])

    return (
        <Container>
            <Header />
            <Content>
                <Title >
                    <p>Projects</p>
                    <Link to={'/newProject'} title='Add a Project' >
                        <HiOutlineDocumentAdd size={36} />
                        <p>Add a Project</p>
                    </Link>
                </Title>

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
