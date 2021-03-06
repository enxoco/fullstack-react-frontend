import React, {InputHTMLAttributes} from 'react'
import {useField} from 'formik'
import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'

type inputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label: string
}

export const InputField: React.FC<inputFieldProps> = ({label, size:_, ...props}) => {
    const [field, { error, }] = useField(props)
        return (
            <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            <Input {...field} {...props} id={field.name} placeholder={props.placeholder} />
            <FormErrorMessage>{error}</FormErrorMessage>
          </FormControl>
        );
}