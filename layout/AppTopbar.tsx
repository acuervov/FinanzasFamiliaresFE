'use client';

import React, { forwardRef, useImperativeHandle, useContext, useRef, useEffect, useState } from 'react';

import Link from 'next/link';
import AppBreadCrumb from './AppBreadCrumb';
import { LayoutContext } from './context/layoutcontext';
import AppSidebar from './AppSidebar';
import { StyleClass } from 'primereact/styleclass';
import { Ripple } from 'primereact/ripple';
import { getCurrentUser, signOut } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import { useFinanzasStore } from '../store';
import { client } from '../amplify/data/resource';
import { getAccountsByUserGroups, getUser } from '../graphql/queries';
import AssignUserFamily from '../components/widgets/newUserFamily';
import { Dialog } from 'primereact/dialog';
import CreateAccountForm from '../components/forms/createAccount';
import { useMountEffect } from 'primereact/hooks';

const getCurrentUserInfo = async () => {
    const { username } = await getCurrentUser();
    const res = await client.graphql({
        query: getUser,
        variables: {
            id: username
        }
    });
    return res?.data?.getUser;
};

const getAccountsInfo = async (ids) => {
    const res = await client.graphql({
        query: getAccountsByUserGroups,
        variables: {
            ids
        }
    });

    return res?.data?.getAccountsByUserGroups;
};

const AppTopbar = forwardRef((props: { sidebarRef: React.RefObject<HTMLDivElement> }, ref) => {
    const router = useRouter(); // eslint-disable-next-line react-hooks/rules-of-hooks
    const { user, setUser, setFamily, family, setAccounts } = useFinanzasStore((state) => state);

    const [showCreateFamily, setShowCreateFamily] = useState(false);
    const [showCreateAccount, setShowCreateAccount] = useState(false);

    useMountEffect(() => {
        const setUserInfoInStore = async () => {
            const userInfo = await getCurrentUserInfo();
            setUser(userInfo);
            if (userInfo.family) {
                setFamily(userInfo.family);
            } else {
                setShowCreateFamily(true);
            }
        };
        setUserInfoInStore();
    });

    useEffect(() => {
        const setAccountsInfo = async () => {
            const users = family?.users?.map((user) => user.id) || [];

            if (users.length) {
                const accounts = await getAccountsInfo(users);
                setAccounts(accounts);
            }
        };

        setAccountsInfo();
    }, [family, setAccounts, user]);

    const btnRef1 = useRef(null);
    const btnRef2 = useRef(null);
    const menubuttonRef = useRef(null);

    const { onMenuToggle, toggleSearch, showRightSidebar, layoutConfig } = useContext(LayoutContext);

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current
    }));

    const handleLogOut = async () => {
        await signOut();
        router.push('/auth/login');
    };

    return (
        <div className="layout-topbar">
            <AssignUserFamily visible={showCreateFamily} onHide={() => setShowCreateFamily(false)} />
            <Dialog visible={showCreateAccount} header="Cree una nueva cuenta" className="sm:w-10 lg:w-4" modal onHide={() => setShowCreateAccount(false)}>
                <CreateAccountForm onSuccess={() => setShowCreateAccount(false)} />
            </Dialog>
            <div className="topbar-left">
                <button ref={menubuttonRef} type="button" className="menu-button p-link" onClick={onMenuToggle}>
                    <i className="pi pi-chevron-left"></i>
                </button>

                <Link href="/" className="horizontal-logo">
                    <img id="logo-horizontal" src={`/layout/images/logo-${layoutConfig.menuTheme === 'white' || layoutConfig.menuTheme === 'orange' ? 'dark' : 'white'}.svg`} alt="diamond-layout" />
                </Link>

                <span className="topbar-separator"></span>

                <AppBreadCrumb />
                <img id="logo-mobile" className="mobile-logo" src={`/layout/images/logo-${layoutConfig.colorScheme == 'light' ? 'dark' : 'white'}.svg`} alt="diamond-layout" />
            </div>
            <div className="layout-topbar-menu-section">
                <AppSidebar sidebarRef={props.sidebarRef} />
                <div className="hidden lg:block">
                    <h1 className="mb-0 text-900 font-bold text-3xl">{family.name}</h1>
                </div>
            </div>
            <div className="layout-mask modal-in"></div>

            <div className="topbar-right">
                <ul className="topbar-menu">
                    <li className="static sm:relative">
                        <StyleClass nodeRef={btnRef1} selector="@next" enterClassName="hidden" enterActiveClassName="scalein" leaveToClassName="hidden" leaveActiveClassName="fadeout" hideOnOutsideClick>
                            <a tabIndex={0} ref={btnRef1}>
                                <i className="pi pi-th-large"></i>
                            </a>
                        </StyleClass>
                        <ul className="list-none p-3 m-0 border-round shadow-2 absolute surface-overlay hidden origin-top w-full sm:w-19rem mt-2 right-0 z-5 top-auto">
                            <li>
                                <a onClick={() => setShowCreateAccount(true)} className="p-ripple flex p-2 border-round align-items-center hover:surface-hover transition-colors transition-duration-150 cursor-pointer">
                                    <i className="pi pi-wallet mr-3"></i>
                                    <span className="flex flex-column">
                                        <span className="font-semibold">Crear cuenta nueva</span>
                                    </span>
                                    <Ripple />
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="profile-item static sm:relative">
                        <StyleClass nodeRef={btnRef2} selector="@next" enterClassName="hidden" enterActiveClassName="scalein" leaveToClassName="hidden" leaveActiveClassName="fadeout" hideOnOutsideClick={true}>
                            <a tabIndex={1} ref={btnRef2}>
                                <span className="white-space-nowrap flex w-3rem h-3rem align-items-center justify-content-center border-round-xl" style={{ backgroundColor: 'rgba(77, 182, 172, 0.1)' }}>
                                    <i className="text-2xl text-color pi pi-user" />
                                </span>

                                <span className="profile-name mr-3 pl-2">{user?.name}</span>
                            </a>
                        </StyleClass>
                        <ul className="list-none p-3 m-0 border-round shadow-2 absolute surface-overlay hidden origin-top w-full sm:w-19rem mt-2 right-0 z-5 top-auto">
                            <li>
                                <a className="p-ripple flex p-2 border-round align-items-center hover:surface-hover transition-colors transition-duration-150 cursor-pointer" onClick={handleLogOut}>
                                    <i className="pi pi-power-off mr-3"></i>
                                    <span className="flex flex-column">
                                        <span className="font-semibold">Logout</span>
                                    </span>
                                    <Ripple />
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
});

export default AppTopbar;

AppTopbar.displayName = 'AppTopbar';
