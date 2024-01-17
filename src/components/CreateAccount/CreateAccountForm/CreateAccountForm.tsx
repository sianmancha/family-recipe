import React from "react";
import {Formik, Form, Field} from 'formik'

interface Props {
    onClose: () => void
}

export function CreateAccountForm({onClose}: Props) {
    return (
        <div>
            <Formik
                initialValues={{name: '', email: '', password: '', confirmPassword: ''}}
                onSubmit={() => {console.log('Submitted!')}}
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
                            type="text"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            placeholder='Password'
                        />
                        <Field 
                            className='border-2'
                            type="text"
                            name="confirmPSassword"
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