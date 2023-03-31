import React, { useContext } from 'react';
import Link from 'next/link';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useRouter } from 'next/router';
import { LayoutContext } from '../../../layout/context/layoutcontext';
import AppConfig from '../../../layout/AppConfig';

function NewPassword() {
    const router = useRouter();
    const { layoutConfig } = useContext(LayoutContext);
    const dark = layoutConfig.colorScheme !== 'light';

    return (
        <>
            <div className="flex h-screen">
                <div className="w-full lg:w-4 h-full text-center px-6 py-6 flex flex-column justify-content-between">
                    <img src={`/layout/images/logo-dark.svg`} className="h-4rem mt-4" alt="diamond-layout" />

                    <div className="flex flex-column align-items-center gap-4">
                        <div className="mb-3">
                            <h2>Create a new password</h2>
                            <p>Lorem ipsum dolor sit amet</p>
                        </div>

                        <div className="flex flex-column gap-4">
                            <span className="p-input-icon-left w-full">
                                <i className="pi pi-lock z-2"></i>
                                <Password id="password" type="password" className="w-full" inputClassName="w-full md:w-25rem" inputStyle={{ paddingLeft: '2.5rem' }} placeholder="Password" toggleMask />
                            </span>
                            <span className="p-input-icon-left w-full">
                                <i className="pi pi-lock z-2"></i>
                                <Password id="password" type="password" className="w-full" inputClassName="w-full md:w-25rem" inputStyle={{ paddingLeft: '2.5rem' }} placeholder="Repeat Password" toggleMask />
                            </span>
                            <div className="flex flex-wrap gap-2 justify-content-between">
                                <Button outlined label="Cancel" className="flex-auto justify-content-center" onClick={() => router.push('/')}></Button>
                                <Button label="Submit" className="flex-auto justify-content-center" onClick={() => router.push('/')}></Button>
                            </div>
                        </div>
                    </div>

                    <p className="text-color-secondary font-semibold">
                        A problem?{' '}
                        <Link href="#" className="primary-color">
                            Click here
                        </Link>{' '}
                        and let us help you.
                    </p>
                </div>

                <div className="w-8 hidden lg:flex flex-column justify-content-between align-items-center px-6 py-6 bg-cover bg-norepeat" style={{ backgroundImage: "url('/demo/images/auth/bg-login.jpg')" }}>
                    <div className="mt-auto mb-auto">
                        <span className="block text-white text-7xl font-semibold">
                            Change your
                            <br />
                            Password
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
}

NewPassword.getLayout = function getLayout(page) {
    return (
        <React.Fragment>
            {page}
            <AppConfig minimal />
        </React.Fragment>
    );
};

export default NewPassword;
