import React from "react";
import { CreateAccountModal } from "../CreateAccount/CreateAccountModal";
import {Formik, Form, Field} from 'formik'

interface Values {
    email: string,
    password: string,
}

export function LoginForm() {
    const handleLogin = async (values: Values) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            const data = await response.json();

            if (data.success) {
                console.log("Login Successful");
            } else {
                console.error("Login failed:", data.error);
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
                        <CreateAccountModal />
                    </Form>
                )}
            </Formik>
        </div>
    )
}