import React from 'react'

import { FiPower, FiUser } from 'react-icons/fi'
import { useAuth } from '../../hooks/auth'
import logoImg from '../../assets/logo.jpg'

import { Container, HeaderContent, Profile, Info } from './styles'

const Header: React.FC = () => {
    const { signOut, user } = useAuth()

    return (
        <Container>
            <HeaderContent>
                <img src={logoImg} alt="logo" style={{ borderRadius: 12 }} />

                <Profile>
                    <FiUser size={48} />
                    <Info>
                        <span>Welcome, </span>
                        <p><strong>{user.name}</strong></p>
                    </Info>
                </Profile>

                <button onClick={signOut} type="button">
                    <FiPower />
                </button>
            </HeaderContent>
        </Container>
    )
}

export default Header
