import React, { useEffect } from 'react'

import { RiArrowGoBackLine } from 'react-icons/ri'

import { Link } from 'react-router-dom'

import { useToast } from '../../hooks/toast'
import logoImg from '../../assets/logo.jpg'

import { Container, Content, AnimationContainer, Label } from './styles'

const NotFound: React.FC = () => {

    const { addToast } = useToast()

    useEffect(() => {
        addToast({
            type: 'error',
            title: 'Page not Found!',
            description:
                'It looks like you are lost...',
        })
    }, [addToast])

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <Label >Page not Found!</Label>
                    <img src={logoImg} alt="logo" style={{ borderRadius: 12 }} />
                    <Link to="/">
                        <RiArrowGoBackLine />
                        Go Back Home
                    </Link>
                </AnimationContainer>
            </Content>
        </Container>
    )
}
export default NotFound
