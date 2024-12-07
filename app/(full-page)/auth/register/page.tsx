'use client';

import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';
import { Page } from '../../../../types/layout';
import { fetchAuthSession, signUp } from 'aws-amplify/auth';

const Register: Page = () => {
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isConfirmationValid, setIsConfirmationValid] = useState(true);

    useEffect(() => {
        password === confirmPassword ? setIsConfirmationValid(true) : setIsConfirmationValid(false);
    }, [password, confirmPassword]);

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!isConfirmationValid) {
            return;
        }
        const { nextStep } = await signUp({
            username: email,
            password: password,
            options: {
                userAttributes: {
                    name: username
                }
            }
        });
        console.log('isSignUpComplete', nextStep);
        if (nextStep.signUpStep === 'DONE') {
            router.push('/dashboard/money');
        }

        if (nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
            router.push('/auth/verification/' + email);
        }
    };

    return (
        <>
            <div className="flex h-screen">
                <div className="w-full lg:w-4 h-full text-center px-6 py-6 flex flex-column justify-content-between">
                    <img src={`/layout/images/logo-dark.svg`} className="h-4rem mt-4" alt="diamond-layout" />

                    <div className="flex flex-column align-items-center gap-4">
                        <div className="mb-3">
                            <h2>Register</h2>
                            <p>Let&lsquo;s get started</p>
                        </div>

                        <div className="flex flex-column gap-4">
                            <span className="p-input-icon-left w-full">
                                <i className="pi pi-user"></i>
                                <InputText
                                    id="username"
                                    type="text"
                                    className="w-full md:w-25rem"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                    }}
                                />
                            </span>
                            <span className="p-input-icon-left w-full">
                                <i className="pi pi-envelope"></i>
                                <InputText
                                    id="email"
                                    type="text"
                                    className="w-full md:w-25rem"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                />
                            </span>
                            <span className="p-input-icon-left w-full">
                                <i className="pi pi-lock z-2"></i>
                                <Password
                                    id="password"
                                    type="password"
                                    className="w-full"
                                    inputClassName="w-full md:w-25rem"
                                    inputStyle={{ paddingLeft: '2.5rem' }}
                                    placeholder="Password"
                                    toggleMask
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                />
                            </span>
                            <span className="p-input-icon-left w-full">
                                <i className="pi pi-lock z-2"></i>
                                <Password
                                    id="confirmPassword"
                                    type="password"
                                    className={`w-full ${isConfirmationValid ? '' : 'p-invalid'}`}
                                    inputClassName="w-full md:w-25rem"
                                    inputStyle={{ paddingLeft: '2.5rem' }}
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                    }}
                                />
                            </span>
                            <Button label="SIGN UP" className="w-full mb-4" onClick={handleSignUp}></Button>
                            <span className="font-semibold text-color-secondary">
                                Already have an account? <a className="font-semibold cursor-pointer primary-color">Login</a>
                            </span>
                        </div>
                    </div>

                    <p className="text-color-secondary font-semibold">
                        A problem? <a className="text-primary hover:underline cursor-pointer font-medium">Click here</a> and let us help you.
                    </p>
                </div>
                <div className="w-8 hidden lg:flex flex-column justify-content-between align-items-center px-6 py-6 bg-cover bg-norepeat" style={{ backgroundImage: "url('/demo/images/auth/bg-login.jpg')" }}>
                    <div className="mt-auto mb-auto">
                        <span className="block text-white text-7xl font-semibold">
                            Create a<br />
                            Diamond
                            <br />
                            Account
                        </span>
                        <span className="block text-white text-3xl mt-4">
                            Lorem ipsum dolor sit amet, consectetur
                            <br /> adipiscing elit. Donec posuere velit nec enim
                            <br /> sodales, nec placerat erat tincidunt.{' '}
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
