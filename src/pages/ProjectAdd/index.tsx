import React, { useCallback, useRef } from 'react'

import Header from '../../components/Header'
import { FiArrowLeft } from 'react-icons/fi'
import { MdShortText, MdDescription, MdCreditCard } from 'react-icons/md'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { Link, useHistory } from 'react-router-dom'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { useToast } from '../../hooks/toast'

import getValidationErrors from '../../utils/getValidationErros'
import api from '../../services/api'

import { Container, Content } from './styles'

interface SignUpFormData {
    slug: string
    name: string
    description: string
}

const ProjectAdd: React.FC = () => {
    const formRef = useRef<FormHandles>(null)
    const { addToast } = useToast()
    const history = useHistory()

    const handleSubmit = useCallback(
        async (data: SignUpFormData) => {
            try {
                formRef.current?.setErrors({})

                const schema = Yup.object().shape({
                    name: Yup.string().required('Please, type the name'),
                    slug: Yup.string()
                        .required('Please, type the slug')
                        .strict(true)
                        .uppercase('Please, type only uppercase letters to slug'),
                    description: Yup.string()
                        .required('Please, type the description')
                    ,
                })

                await schema.validate(data, {
                    abortEarly: false,
                })


            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err)

                    formRef.current?.setErrors(errors)

                    for (const error in errors)
                        addToast({
                            type: 'error',
                            title: 'Error registering',
                            description: errors[error],
                        })

                    return
                }

                addToast({
                    type: 'error',
                    title: 'Error registering',
                    description: 'Something went wrong, please try again in a few minutes!',
                })

                return
            }

            try {
                const response = await api.post('/projects', { ...data })
                console.log(response)

            } catch (err) {
                addToast({
                    type: 'error',
                    title: 'Error creating new project!',
                    description: err.response.data.message ? err.response.data.message : 'Something went wrong, please try again in a few minutes!',
                })

                return
            }

            addToast({
                type: 'success',
                title: `Project '${data.name}' created!`,
            })

            history.push('/')

        },
        [addToast, history],
    )

    return (
        <Container>
            <Header />
            <Content>
                <Link to="/">
                    <FiArrowLeft color='#ff9000' />
                    <p>Back to Projects</p>
                </Link>
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Create a New Project</h1>
                    <Input name="name" icon={MdCreditCard} type="text" placeholder="Name" />
                    <Input name="slug" icon={MdShortText} type="text" placeholder="Slug" />
                    <Input name="description" icon={MdDescription} type="text" placeholder="Description" maxLength={75} />
                    <Button type="submit">Create</Button>
                </Form>

            </Content>
        </Container>
    )
}
export default ProjectAdd
