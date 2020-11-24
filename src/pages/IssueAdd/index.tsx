import React, { useCallback, useRef } from 'react'

import Header from '../../components/Header'
import { FiArrowLeft } from 'react-icons/fi'
import { MdShortText, MdDescription, MdCreditCard } from 'react-icons/md'
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
    description: string
    daysDueDate: number
}

interface IssueParams {
    slug: string
}

const IssueAdd: React.FC = () => {

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
                    description: Yup.string()
                        .required('Please, type the description')
                    ,
                    daysDueDate: Yup.number()
                        .required('Please, type the number of days to expire')
                        .round('round')
                        .min(1, 'Please, type the number of days to expire (minimum 1)')
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
                            title: 'Error adding an Issue',
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
                const response = await api.post(`/issues/${params.slug}`, { ...data, status: 'open' })
                console.log(response)

            } catch (err) {
                addToast({
                    type: 'error',
                    title: 'Error creating new Issue!',
                    description: err.response.data.error ? err.response.data.error : 'Something went wrong, please try again in a few minutes!',
                })

                return
            }

            addToast({
                type: 'success',
                title: `Issue '${data.title}' added!`,
            })

            history.push(`/project/${params.slug}`)

        },
        [addToast, history, params.slug],
    )

    return (
        <Container>
            <Header />
            <Content>
                <Link to={`/project/${params.slug}`}>
                    <FiArrowLeft color='#ff9000' />
                    <p>Back to Issues</p>
                </Link>
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Create a New Issue to {params.slug}</h1>
                    <Input name="title" icon={MdCreditCard} type="text" placeholder="Title" />
                    <Input name="description" icon={MdDescription} type="text" placeholder="Description" maxLength={100} />
                    <Input name="daysDueDate" icon={MdShortText} type="number" placeholder="Days to expire" step={1} />
                    <Button type="submit">Create</Button>
                </Form>

            </Content>
        </Container>
    )
}
export default IssueAdd
