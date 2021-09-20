import React from 'react'
import {
    Button,
    Box
  } from "@chakra-ui/react"
  import {Formik, Form} from 'formik'
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/inputField'
import { useLoginMutation } from '../generated/graphql'
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/dist/client/router';

interface loginProps {

}

export const Login: React.FC<loginProps> = ({}) => {
    const router = useRouter()
    const [,login] = useLoginMutation()
        return (
            <Wrapper>

            <Formik initialValues={{username: "", password: ""}}
            onSubmit={async (values, {setErrors}) => {
                const response = await login({options: values})
                if (response.data?.login.errors){
                    setErrors(toErrorMap(response.data.login.errors))
                } else if (response.data?.login.user) {
                    // worked
                    router.push("/")
                    
                }
            }}>
                {({values, handleChange, isSubmitting}) => (
                    <Form>
                        <InputField name="username" placeholder="username" label="Username" />
                        <Box mt={4}>
                        <InputField name="password" placeholder="password" label="Password" type="password" />
                        <Button mt={4} type="submit" isLoading={isSubmitting} colorScheme="teal">Login</Button>
                        </Box>
                    </Form>
                )}
            </Formik>
            </Wrapper>
        );
}

export default Login