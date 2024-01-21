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
            <Formik
                initialValues={{name: '', email: '', password: '', confirmPassword: ''}}
                validationSchema={SignUpSchema}
                onSubmit={handleCreateAccount}
            >
                {({values, touched, errors, handleChange, handleBlur, handleSubmit, isValid, dirty}) => (
                    <Form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-3 max-w-96 mx-auto">
                            <Field 
                                className='w-full p-4 rounded-lg font-medium bg-[#FAF9F6] border border-[#D4AC97] placeholder-[#654236] placeholder-opacity-80 text-sm text-[#772604] focus:outline-none focus:border-[#e36414]'
                                type="text"
                                name="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                placeholder='Name'
                            />
                        {errors.name && touched.name ? (
                            <div className="text-[#c32f27]">{errors.name}</div>
                        ) : null}
                            <Field 
                                className='w-full p-4 rounded-lg font-medium bg-[#FAF9F6] border border-[#D4AC97]  placeholder-[#654236] placeholder-opacity-80 text-sm text-[#772604] focus:outline-none focus:border-[#e36414]'
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                placeholder='Email'
                            />
                            {errors.email && touched.email ? (
                                <div className="text-[#c32f27]">{errors.email}</div>
                            ) : null}
                            <Field 
                                className='w-full p-4 rounded-lg font-medium bg-[#FAF9F6] border border-[#D4AC97]  placeholder-[#654236] placeholder-opacity-80 text-sm text-[#772604] focus:outline-none focus:border-[#e36414]'
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                placeholder='Password'
                            />
                            {errors.password && touched.password ? (
                                <div className="text-[#c32f27]">{errors.password}</div>
                            ) : null}
                            <Field 
                                className='w-full p-4 rounded-lg font-medium bg-[#FAF9F6] border border-[#D4AC97]  placeholder-[#654236] placeholder-opacity-80 text-sm text-[#772604] focus:outline-none focus:border-[#e36414]'
                                type="password"
                                name="confirmPassword"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.confirmPassword}
                                placeholder='Confirm Password'
                            />
                            {errors.confirmPassword && touched.confirmPassword ? (
                                <div className="text-[#c32f27]">{errors.confirmPassword}</div>
                            ) : null}
                            <div className="flex flex-wrap lg:justify-end lg:flex-row gap-3 mt-4 justify-center">
                                <button className="border-2 border-[#c32f27] rounded-full p-2 uppercase text-[#c32f27] font-semibold" onClick={onClose}>
                                    Cancel
                                </button>
                                <button className="border-2 border-[#968E5A] bg-[#968E5A] disabled:bg-opacity-30 disabled:border-opacity-10 disabled:text-[#968E5A] disabled:text-opacity-80 text-[#FAF9F6] rounded-full p-2" disabled={!isValid || !dirty} type="submit">
                                    Create Account
                                </button>
                            </div>
                    </div>
                    </Form>
                )}
            </Formik>
        
    )
}