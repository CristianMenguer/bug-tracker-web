import React, { useCallback, useRef } from 'react'

import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { Link, useHistory } from 'react-router-dom'
import logoImg from '../../assets/logo.jpg'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { useToast } from '../../hooks/toast'

import getValidationErrors from '../../utils/getValidationErros'
import api from '../../services/api'

import { Container, Content, AnimationContainer, Background } from './styles'

interface SignUpFormData {
    name: string
    email: string
    password: string
}

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null)
    const { addToast } = useToast()
    const history = useHistory()

    const handleSubmit = useCallback(
        async (data: SignUpFormData) => {
            try {
                formRef.current?.setErrors({})
                const schema = Yup.object().shape({
                    name: Yup.string().required('Please, type the name'),
                    email: Yup.string()
                        .email('Please, type a valid email')
                        .required('Please, type the email'),
                    password: Yup.string().min(6, 'Password at least 6 characters'),
                })

                await schema.validate(data, {
                    abortEarly: false,
                })

            } catch (err) {
                const errors = getValidationErrors(err)

                formRef.current?.setErrors(errors)

                addToast({
                    type: 'error',
                    title: 'Error registering',
                    description: 'Something went wrong, please try again in a few minutes!',
                })

                return
            }

            try {
                const response = await api.post('/users', { ...data, usertype: 'user' })
                console.log(response.statusText)

            } catch (err) {
                if (err.response.data.message) {
                    addToast({
                        type: 'error',
                        title: 'Error registering',
                        description: err.response.data.message,
                    })
                } else {
                    addToast({
                        type: 'error',
                        title: 'Error registering',
                        description: 'Something went wrong, please try again in a few minutes!',
                    })
                }

                return
            }

            addToast({
                type: 'success',
                title: 'User registered.',
                description: 'You can logon now!',
            })

            history.push('/')

        },
        [addToast, history],
    )

    return (
        <Container>
            <Background />
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="logo" style={{ borderRadius: 12 }} />
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Faça seu cadastro</h1>
                        <Input name="name" icon={FiUser} type="text" placeholder="Name" />
                        <Input name="username" icon={FiUser} type="text" placeholder="Username" />
                        <Input
                            name="email"
                            icon={FiMail}
                            type="email"
                            placeholder="E-mail"
                        />
                        <Input
                            name="password"
                            icon={FiLock}
                            type="password"
                            placeholder="Password"
                        />
                        <Button type="submit">Register</Button>
                    </Form>

                    <Link to="/">
                        <FiArrowLeft />
                        Back to Logon
                    </Link>
                </AnimationContainer>
            </Content>
        </Container>
    )
}
export default SignUp
