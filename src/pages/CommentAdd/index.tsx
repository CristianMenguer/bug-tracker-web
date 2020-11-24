import React, { useCallback, useRef } from 'react'

import Header from '../../components/Header'
import { FiArrowLeft } from 'react-icons/fi'
import { MdDescription, MdCreditCard } from 'react-icons/md'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { useToast } from '../../hooks/toast'

import getValidationErrors from '../../utils/getValidationErros'
import api from '../../services/api'

import { Container, Content } from './styles'

interface SignUpFormData {
    title: string
    text: string
}

interface IssueParams {
    slugNumber: string
}

const CommentAdd: React.FC = () => {

    const formRef = useRef<FormHandles>(null)

    const { params } = useRouteMatch<IssueParams>()

    const { addToast } = useToast()
    const history = useHistory()

    const handleSubmit = useCallback(
        async (data: SignUpFormData) => {
            try {
                formRef.current?.setErrors({})

                const schema = Yup.object().shape({
                    title: Yup.string().required('Please, type the title'),
                    text: Yup.string().required('Please, type the text'),
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
                    title: 'Error adding a comment',
                    description: 'Something went wrong, please try again in a few minutes!',
                })

                return
            }

            try {
                const response = await api.post(`/comments/${params.slugNumber}`, { ...data })
                console.log(response)

            } catch (err) {
                addToast({
                    type: 'error',
                    title: 'Error creating new Comment!',
                    description: err.response.data.error ? err.response.data.error : 'Something went wrong, please try again in a few minutes!',
                })

                return
            }

            addToast({
                type: 'success',
                title: `Comment '${data.title}' added!`,
            })

            history.push(`/issue/${params.slugNumber}`)

        },
        [addToast, history, params.slugNumber],
    )

    return (
        <Container>
            <Header />
            <Content>
                <Link to={`/issue/${params.slugNumber}`}>
                    <FiArrowLeft color='#ff9000' />
                    <p>Back to Comments</p>
                </Link>
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Create a New Comment to the Issue '{params.slugNumber}'</h1>
                    <Input name="title" icon={MdCreditCard} type="text" placeholder="Title" />
                    <Input name="text" icon={MdDescription} type="text" placeholder="Text" maxLength={100} />
                    <Button type="submit">Create</Button>
                </Form>

            </Content>
        </Container>
    )
}
export default CommentAdd
