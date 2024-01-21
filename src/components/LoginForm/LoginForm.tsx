import React from "react";
import {Formik, Form, Field} from 'formik'
import { signIn } from "next-auth/react";
import * as Yup from 'yup'
import { useRouter } from "next/router";

interface Values {
    email: string,
    password: string,
}

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email').required('Email is Required'),
    password: Yup.string().required('Password is Required')
}); 

export function LoginForm() {
    const router = useRouter();
    
    const handleLogin = async (values: Values) => {
        try {
            const response = await signIn('credentials', {
                redirect: false,
                username:values.email,
                password: values.password,
            });

            if(response?.error) {
                console.error('Login failed:, response.error');
            } else {
                console.log('Login Successful');
                router.push('/profile')
            }
        } catch (error) {
            console.error("Error:", error)
        }
    }

    return(
        <div>
            LoginForm
            <Formik initialValues={{email: '', password: ''}} validationSchema={LoginSchema} onSubmit={handleLogin}>
                {({values, touched, errors, handleChange, handleBlur, handleSubmit, isValid, dirty}) => (
                    <Form onSubmit={handleSubmit}>
                        <Field
                            className='border-2'
                            type='email'
                            name='email'
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
                            type='password'
                            name='password'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            placeholder='Password'
                        />
                        {errors.password && touched.password ? (
                            <div>{errors.password}</div>
                        ) : null}
                        <button disabled={!isValid || !dirty} type='submit'>Sign In</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}