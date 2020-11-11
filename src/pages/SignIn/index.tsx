import React, { useRef, useCallback } from 'react'

import { FiUser, FiLock, FiLogIn } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import { Link, useHistory } from 'react-router-dom'
import * as Yup from 'yup'

import { useAuth } from '../../hooks/auth'
import { useToast } from '../../hooks/toast'
import logoImg from '../../assets/logo.jpg'
import Input from '../../components/Input'
import Button from '../../components/Button'
import getValidationErrors from '../../utils/getValidationErros'

import { Container, Content, AnimationContainer, Background } from './styles'

interface SignInFormData {
    username: string
    password: string
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null)
    const history = useHistory()

    const { signIn } = useAuth()
    const { addToast } = useToast()

    const handleSubmit = useCallback(
        async (data: SignInFormData) => {

            try {
                formRef.current?.setErrors({})
                const schema = Yup.object().shape({
                    username: Yup.string()
                        .required('You must type your username'),
                    password: Yup.string().required('You must type your password'),
                })

                await schema.validate(data, {
                    abortEarly: false,
                })

                await signIn({
                    username: data.username,
                    password: data.password,
                })

                history.push('/dashboard')
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err)

                    formRef.current?.setErrors(errors)

                    return
                }

                addToast({
                    type: 'error',
                    title: 'Authentication error',
                    description:
                        'Error trying to log on, please, check your username and password',
                })
            }
        },
        [signIn, addToast, history],
    )

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="logo" style={{ borderRadius: 12 }} />
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Faça seu logon</h1>
                        <Input
                            name="username"
                            icon={FiUser}
                            type="text"
                            placeholder="Username"
                        />
                        <Input
                            name="password"
                            icon={FiLock}
                            type="password"
                            placeholder="Password"
                        />
                        <Button type="submit">Log on</Button>

                    </Form>

                    <Link to="/signup">
                        <FiLogIn />
                        Create Account
                    </Link>
                </AnimationContainer>
            </Content>
            <Background />
        </Container>
    )
}
export default SignIn
