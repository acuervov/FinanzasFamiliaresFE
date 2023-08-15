'use client';

import React, { forwardRef, useImperativeHandle, useContext, useRef } from 'react';

import Link from 'next/link';
import AppBreadCrumb from './AppBreadCrumb';
import { LayoutContext } from './context/layoutcontext';
import AppSidebar from './AppSidebar';
import { StyleClass } from 'primereact/styleclass';
import { Ripple } from 'primereact/ripple';

const AppTopbar = forwardRef((props: { sidebarRef: React.RefObject<HTMLDivElement> }, ref) => {
    const btnRef1 = useRef(null);
    const btnRef2 = useRef(null);
    const menubuttonRef = useRef(null);

    const { onMenuToggle, toggleSearch, showRightSidebar, layoutConfig } = useContext(LayoutContext);

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current
    }));

    return (
        <div className="layout-topbar">
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
            </div>
            <div className="layout-mask modal-in"></div>

            <div className="topbar-right">
                <ul className="topbar-menu">
                    <li className="search-item">
                        <a type="button" onClick={toggleSearch}>
                            <i className="pi pi-search"></i>
                        </a>
                    </li>
                    <li className="static sm:relative">
                        <StyleClass nodeRef={btnRef1} selector="@next" enterClassName="hidden" enterActiveClassName="scalein" leaveToClassName="hidden" leaveActiveClassName="fadeout" hideOnOutsideClick>
                            <a tabIndex={0} ref={btnRef1}>
                                <i className="pi pi-bell"></i>
                                <span className="topbar-badge">5</span>
                            </a>
                        </StyleClass>
                        <ul className="list-none p-3 m-0 border-round shadow-2 absolute surface-overlay hidden origin-top w-full sm:w-19rem mt-2 right-0 z-5 top-auto">
                            <li>
                                <a className="p-ripple flex p-2 border-round align-items-center hover:surface-hover transition-colors transition-duration-150 cursor-pointer">
                                    <i className="pi pi-shopping-cart mr-3"></i>
                                    <span className="flex flex-column">
                                        <span className="font-semibold">New Order</span>
                                        <span className="text-color-secondary">
                                            You have <strong>3</strong> new orders.
                                        </span>
                                    </span>
                                    <Ripple />
                                </a>
                                <a className="p-ripple flex p-2 border-round align-items-center hover:surface-hover transition-colors transition-duration-150 cursor-pointer">
                                    <i className="pi pi-check-square mr-3"></i>
                                    <span className="flex flex-column">
                                        <span className="font-semibold">Withdrawn Completed</span>
                                        <span className="text-color-secondary">Funds are on their way.</span>
                                    </span>
                                    <Ripple />
                                </a>
                                <a className="p-ripple flex p-2 border-round align-items-center hover:surface-hover transition-colors transition-duration-150 cursor-pointer">
                                    <i className="pi pi-chart-line mr-3"></i>
                                    <span className="flex flex-column">
                                        <span className="font-semibold">Monthly Reports</span>
                                        <span className="text-color-secondary">Monthly Reports are ready.</span>
                                    </span>
                                    <Ripple />
                                </a>
                                <a className="p-ripple flex p-2 border-round align-items-center hover:surface-hover transition-colors transition-duration-150 cursor-pointer">
                                    <i className="pi pi-comments mr-3"></i>
                                    <span className="flex flex-column">
                                        <span className="font-semibold">Comments</span>
                                        <span className="text-color-secondary">
                                            <strong>2</strong> new comments.
                                        </span>
                                    </span>
                                    <Ripple />
                                </a>
                                <a className="p-ripple flex p-2 border-round align-items-center hover:surface-hover transition-colors transition-duration-150 cursor-pointer">
                                    <i className="pi pi-exclamation-circle mr-3"></i>
                                    <span className="flex flex-column">
                                        <span className="font-semibold">Chargeback Request</span>
                                        <span className="text-color-secondary">
                                            <strong>1</strong> to review.
                                        </span>
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </li>

                    <li className="profile-item static sm:relative">
                        <StyleClass nodeRef={btnRef2} selector="@next" enterClassName="hidden" enterActiveClassName="scalein" leaveToClassName="hidden" leaveActiveClassName="fadeout" hideOnOutsideClick={true}>
                            <a tabIndex={1} ref={btnRef2}>
                                <img src={`/demo/images/avatar/profile.jpg`} alt="diamond-layout" className="profile-image" />
                                <span className="profile-name">Amelia Stone</span>
                            </a>
                        </StyleClass>
                        <ul className="list-none p-3 m-0 border-round shadow-2 absolute surface-overlay hidden origin-top w-full sm:w-19rem mt-2 right-0 z-5 top-auto">
                            <li>
                                <a className="p-ripple flex p-2 border-round align-items-center hover:surface-hover transition-colors transition-duration-150 cursor-pointer">
                                    <i className="pi pi-user mr-3"></i>
                                    <span className="flex flex-column">
                                        <span className="font-semibold">Profile</span>
                                    </span>
                                    <Ripple />
                                </a>
                                <a className="p-ripple flex p-2 border-round align-items-center hover:surface-hover transition-colors transition-duration-150 cursor-pointer">
                                    <i className="pi pi-cog mr-3"></i>
                                    <span className="flex flex-column">
                                        <span className="font-semibold">Settings</span>
                                    </span>
                                    <Ripple />
                                </a>
                                <a className="p-ripple flex p-2 border-round align-items-center hover:surface-hover transition-colors transition-duration-150 cursor-pointer">
                                    <i className="pi pi-calendar mr-3"></i>
                                    <span className="flex flex-column">
                                        <span className="font-semibold">Calendar</span>
                                    </span>
                                    <Ripple />
                                </a>
                                <a className="p-ripple flex p-2 border-round align-items-center hover:surface-hover transition-colors transition-duration-150 cursor-pointer">
                                    <i className="pi pi-inbox mr-3"></i>
                                    <span className="flex flex-column">
                                        <span className="font-semibold">Inbox</span>
                                    </span>
                                    <Ripple />
                                </a>
                                <a className="p-ripple flex p-2 border-round align-items-center hover:surface-hover transition-colors transition-duration-150 cursor-pointer">
                                    <i className="pi pi-power-off mr-3"></i>
                                    <span className="flex flex-column">
                                        <span className="font-semibold">Logout</span>
                                    </span>
                                    <Ripple />
                                </a>
                            </li>
                        </ul>
                    </li>

                    <li className="right-sidebar-item">
                        <a onClick={showRightSidebar}>
                            <i className="pi pi-align-right"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
});

export default AppTopbar;

AppTopbar.displayName = 'AppTopbar';
