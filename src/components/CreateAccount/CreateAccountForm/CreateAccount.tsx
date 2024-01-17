import React from "react";
import {Formik, Form, Field} from 'formik'


export function CreateAccountForm() {
    return (
        <div>
            <Formik
                initialValues={{firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}}
                onSubmit={() => {}}
            >
                {({values, touched, handleChange, handleBlur, handleSubmit}) => (
                    <Form onSubmit={handleSubmit}>
                        <Field 
                            className='border-2'
                            type="text"
                            name="firstName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.firstName}
                            placeholder='First Name'
                        />
                        <Field 
                            className='border-2'
                            type="text"
                            name="lastName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.lastName}
                            placeholder='Last Name'
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
                        <button>Cancel</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}