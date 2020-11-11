import React, { createContext, useCallback, useState, useContext } from 'react'

import api from '../services/api'

interface User {
    id: string
    name: string
    email: string
    avatar_url: string
}

interface AuthState {
    token: string
    user: User
}

interface SignInCredentials {
    username: string
    password: string
}

interface AuthContextData {
    user: User
    signIn(credentials: SignInCredentials): Promise<void>
    signOut(): void
    updateUser(user: User): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem('@CristianMenguer:token')
        const user = localStorage.getItem('@CristianMenguer:user')

        if (token && user) {
            api.defaults.headers.authorization = `Bearer ${token}`

            return { token, user: JSON.parse(user) }
        }

        return {} as AuthState
    })

    const signIn = useCallback(async ({ username, password }) => {

        const response = await api.post('/session', {
            username,
            password,
        })

        console.log('response')
        console.log(response)

        const { token, user } = response.data

        localStorage.setItem('@CristianMenguer:token', token)
        localStorage.setItem('@CristianMenguer:user', JSON.stringify(user))

        api.defaults.headers.authorization = `Bearer ${token}`

        setData({ token, user })
    }, [])

    const signOut = useCallback(() => {
        localStorage.removeItem('@CristianMenguer:token')
        localStorage.removeItem('@CristianMenguer:user')

        setData({} as AuthState)
    }, [])

    const updateUser = useCallback(
        (user: User) => {
            setData({
                token: data.token,
                user,
            })

            localStorage.setItem('@CristianMenguer:user', JSON.stringify(user))
        },

        [data.token],
    )

    return (
        <AuthContext.Provider
            value={{ user: data.user, signIn, signOut, updateUser }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(): AuthContextData {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return context
}
