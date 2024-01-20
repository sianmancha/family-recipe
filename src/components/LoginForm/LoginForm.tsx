import React from "react";
import { CreateAccountModal } from "../CreateAccount/CreateAccountModal";
import {Formik, Form, Field} from 'formik'
import { signIn } from "next-auth/react";

interface Values {
    email: string,
    password: string,
}

export function LoginForm() {
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
            }
        } catch (error) {
            console.error("Error:", error)
        }
    }

    return(
        <div>
            LoginForm
            <Formik initialValues={{email: '', password: ''}} onSubmit={handleLogin}>
                {({values, touched, handleChange, handleBlur, handleSubmit}) => (
                    <Form>
                        <Field
                            className='border-2'
                            type='email'
                            name='email'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            placeholder='Email'
                        />
                        <Field
                            className='border-2'
                            type='password'
                            name='password'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            placeholder='Password'
                        />
                        <button type='submit'>Sign In</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}