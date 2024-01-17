import React from "react";
import { CreateAccountModal } from "../CreateAccount/CreateAccountModal";
import {Formik, Form, Field} from 'formik'

export function LoginForm() {
    return(
        <div>
            LoginForm
            <Formik initialValues={{email: '', password: ''}} onSubmit={() => {'Submitted Login Info!'}}>
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
                            type='text'
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