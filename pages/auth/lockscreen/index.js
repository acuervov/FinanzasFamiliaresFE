import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import React, { useContext } from 'react';
import AppConfig from '../../../layout/AppConfig';
import { LayoutContext } from '../../../layout/context/layoutcontext';

function LockScreen() {
    const router = useRouter();
    const { layoutConfig } = useContext(LayoutContext);

    const dark = layoutConfig.colorScheme !== 'light';

    return (
        <>
            <div className="flex h-screen">
                <div className="w-full lg:w-4 h-full text-center px-6 py-6 flex flex-column justify-content-between">
                    <img src={`/layout/images/logo-dark.svg`} alt="diamond-layout" className="h-4rem mt-4" />

                    <div className="flex flex-column align-items-center gap-4">
                        <div className="mb-3">
                            <h2>Screen Locked</h2>
                            <p>Please enter your password</p>
                        </div>

                        <span className="p-input-icon-left w-full md:w-25rem">
                            <i className="pi pi-lock"></i>
                            <InputText id="password" type="password" className="w-full" placeholder="Password" />
                        </span>
                        <Button className="w-full md:w-25rem" icon="pi pi-lock-open" onClick={() => router.push('/')} label="UNLOCK" />
                    </div>

                    <p className="text-color-secondary font-semibold">
                        A problem?{' '}
                        <a href="#" className="primary-color">
                            Click here
                        </a>{' '}
                        and let us help you.
                    </p>
                </div>
                <div className="w-8 hidden lg:flex flex-column justify-content-between align-items-center px-6 py-6 bg-cover bg-norepeat" style={{ backgroundImage: `url(/demo/images/auth/bg-login.jpg)` }}>
                    <div className="mt-auto mb-auto">
                        <span className="block text-white text-7xl font-semibold">
                            Enter your
                            <br />
                            Password for
                            <br /> Access
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

LockScreen.getLayout = function getLayout(page) {
    return (
        <React.Fragment>
            {page}
            <AppConfig minimal />
        </React.Fragment>
    );
};

export default LockScreen;
