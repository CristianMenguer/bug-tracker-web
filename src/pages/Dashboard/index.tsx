import React, { } from 'react'
import Header from '../../components/Header'

import {
    Container,
    Content
} from './styles'

import { useAuth } from '../../hooks/auth'

const Dashboard: React.FC = () => {

    const { user } = useAuth()

    return (
        <Container>
            <Header />
            <Content>

            </Content>
        </Container>
    )
}

export default Dashboard
