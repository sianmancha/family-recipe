import React from "react";
import {Formik, Form, Field} from 'formik'
import { signIn } from "next-auth/react";
import * as Yup from 'yup';
import { useRouter } from "next/router";

interface Values {
    name: string
    email: string
    password: string
}

interface Props {
    onClose: () => void
}

const SignUpSchema = Yup.object().shape({
    name: Yup.string().required('Name is Required'),
    email: Yup.string().email('Invalid Email').required('Email is required'),
    password: Yup.string().min(6, 'Minimum 6 Characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Please confirm your password.') 
})

export function CreateAccountForm({onClose}: Props) {
    const router = useRouter();

    const handleCreateAccount = async (values: Values) => {
        try {
            const response = await signIn('credentials', {
                redirect: false,
                username: values.email,
                password: values.password,
                name: values.name
            });

            if(response?.error) {
                console.log('Account Creation failed:', response.error);
            } else {
                console.log('Account created successfully');
                onClose();
                router.push('/profile')
            }
        } catch (error) {
            console.log('Error:', error);
        }
    }

    return (
        <div>
            <Formik
                initialValues={{name: '', email: '', password: '', confirmPassword: ''}}
                validationSchema={SignUpSchema}
                onSubmit={handleCreateAccount}
            >
                {({values, touched, errors, handleChange, handleBlur, handleSubmit, isValid, dirty}) => (
                    <Form onSubmit={handleSubmit}>
                        <Field 
                            className='border-2'
                            type="text"
                            name="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            placeholder='Name'
                        />
                       {errors.name && touched.name ? (
                        <div>{errors.name}</div>
                       ) : null}
                        <Field 
                            className='border-2'
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            placeholder='Email'
                        />
                        {errors.email && touched.email ? (
                            <div>{errors.email}</div>
                        ) : null}
                        <Field 
                            className='border-2'
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            placeholder='Password'
                        />
                        {errors.password && touched.password ? (
                            <div>{errors.password}</div>
                        ) : null}
                        <Field 
                            className='border-2'
                            type="password"
                            name="confirmPassword"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.confirmPassword}
                            placeholder='Confirm Password'
                        />
                        {errors.confirmPassword && touched.confirmPassword ? (
                            <div>{errors.confirmPassword}</div>
                        ) : null}
                        <button disabled={!isValid || !dirty} type="submit">Create Account</button>
                        <button onClick={onClose}>Cancel</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}