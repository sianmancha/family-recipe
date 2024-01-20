import React from "react";
import {Formik, Form, Field} from 'formik'
import { signIn } from "next-auth/react";

interface Values {
    name: string
    email: string
    password: string
}

interface Props {
    onClose: () => void
}

export function CreateAccountForm({onClose}: Props) {
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
            }
        } catch (error) {
            console.log('Error:', error);
        }
    }

    return (
        <div>
            <Formik
                initialValues={{name: '', email: '', password: '', confirmPassword: ''}}
                onSubmit={handleCreateAccount}
            >
                {({values, touched, handleChange, handleBlur, handleSubmit}) => (
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
                       
                        <Field 
                            className='border-2'
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            placeholder='Email'
                        />
                        <Field 
                            className='border-2'
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            placeholder='Password'
                        />
                        <Field 
                            className='border-2'
                            type="password"
                            name="confirmPassword"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.confirmPassword}
                            placeholder='Confirm Password'
                        />
                        <button type="submit">Create Account</button>
                        <button onClick={onClose}>Cancel</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}