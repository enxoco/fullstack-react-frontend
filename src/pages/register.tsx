import React from 'react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button,
    Box
  } from "@chakra-ui/react"
  import {Formik, Form} from 'formik'
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/inputField'
import { useMutation } from 'urql'
import {RegisterMutation, useRegisterMutation} from '../generated/graphql'
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/dist/client/router';
// const REGISTER_MUTATION = `
// mutation Register($username: String!, $password: String!){
//     register(options: {username: $username, password: $password}) {
//       errors {
//         field,
//         message
//       },
//       user {
//         id,
//         username,
//         createdAt
//       }
//     }
//   }
//   `
interface registerProps {

}

export const Register: React.FC<registerProps> = ({}) => {
    const router = useRouter()
    const [,register] = useRegisterMutation()
        return (
            <Wrapper>

            <Formik initialValues={{username: "", password: ""}}
            onSubmit={async (values, {setErrors}) => {
                const response = await register(values)
                if (response.data?.register.errors){
                    setErrors(toErrorMap(response.data.register.errors))
                } else if (response.data.register.user) {
                    // worked
                    router.push("/")
                    
                }
            }}>
                {({values, handleChange, isSubmitting}) => (
                    <Form>
                        <InputField name="username" placeholder="username" label="Username" />
                        <Box mt={4}>
                        <InputField name="password" placeholder="password" label="Password" type="password" />
                        <Button mt={4} type="submit" isLoading={isSubmitting} colorScheme="teal">Register</Button>
                        </Box>
                    </Form>
                )}
            </Formik>
            </Wrapper>
        );
}

export default Register