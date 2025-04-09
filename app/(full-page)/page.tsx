'use client';

import React, { useRef, useState } from 'react';
import { Ripple } from 'primereact/ripple';
import { StyleClass } from 'primereact/styleclass';
import { classNames } from 'primereact/utils';
import { Page } from '../../types/layout';

const LandingPage: Page = () => {
    const [isHidden, setIsHidden] = useState(false);
    const menuRef = useRef();

    const toggleMenuItemClick = () => {
        setIsHidden((prevState) => !prevState);
    };

    return (
        <div className="relative overflow-hidden flex flex-column justify-content-center">
            <div className="absolute top-0 bg-shape-top bg-no-repeat bg-cover w-full"></div>
            <div id="home" className="pages-wrapper z-1">
                <div className="px-4 md:px-8 flex align-items-center justify-content-between relative lg:static" style={{ minHeight: '80px' }}>
                    <div className="flex gap-2 align-items-center text-white mr-0 lg:mr-6 select-none">
                        <img src={`/layout/images/logonegro.png`} className="w-5rem" alt="Cuervo Logo" />
                        <span className="font-bold text-3xl">Cuervo</span>
                    </div>

                    <StyleClass nodeRef={menuRef} selector="@next" enterActiveClassName="px-fadein" enterClassName="hidden" leaveToClassName="hidden" hideOnOutsideClick>
                        <a ref={menuRef} href="#home" className="cursor-pointer lg:hidden flex text-white">
                            <i className="pi pi-bars text-4xl"></i>
                        </a>
                    </StyleClass>

                    <div id="menu" className={classNames('align-items-center flex-grow-1 justify-content-between hidden lg:flex absolute lg:static w-full left-0 top-100 z-1 shadow-2 lg:shadow-none md:bg-transparent', { hidden: isHidden })}>
                        <ul className="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row">
                            <li className="lg:relative">
                                <a
                                    href="#features"
                                    onClick={toggleMenuItemClick}
                                    className="p-ripple flex px-6 p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer transition-colors transition-duration-150 lg:text-white text-lg white-space-nowrap"
                                >
                                    <span>Nuestro trabajo</span>
                                    <Ripple />
                                </a>
                            </li>
                            <li>
                                <a
                                    onClick={toggleMenuItemClick}
                                    href="#contact"
                                    className="p-ripple flex px-6 p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer transition-colors transition-duration-150 lg:text-white text-lg white-space-nowrap"
                                >
                                    <span>Contacto</span>
                                    <Ripple />
                                </a>
                            </li>
                        </ul>
                        <ul className="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row border-top-1 surface-border lg:border-top-none">
                            <li>
                                <a
                                    href="/dashboard/money"
                                    onClick={toggleMenuItemClick}
                                    className="p-ripple flex px-6 p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer transition-colors transition-duration-150 lg:text-white text-lg white-space-nowrap"
                                >
                                    <span>PANEL</span>
                                    <Ripple />
                                </a>
                            </li>
                            <li>
                                <a aria-label="Chat on WhatsApp" href="https://wa.me/573134738561" target="_blank">
                                    <i className="pi pi-whatsapp text-xl px-6 p-3 lg:px-3 lg:py-2 align-items-center text-white hover:text-900 hover:surface-100 font-medium border-round cursor-pointer transition-colors transition-duration-150"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="px-4 md:px-8 z-2">
                    <div className="grid justify-content-between mb-6 md:mb-8 mt-5">
                        <div className="col-12 lg:col-6 text-center lg:text-left flex flex-column gap-3">
                            <span className="font-bold text-4xl text-white text-center md:text-left w-full md:w-9">Optimizamos tus procesos con soluciones tecnológicas a la medida</span>
                            <p className="w-full md:w-9 text-center md:text-left font-semibold text-white">Ahorra tiempo, reduce costos y mejora la eficiencia de tu operación con nuestras plataformas de gestión, monitoreo y control.</p>
                        </div>
                        <div className="col-12 text-center md:text-right lg:col-6">
                            <img src={`/layout/images/pages/landing/header-image.png`} className="w-full sm:w-auto animation-duration-200 fadeinright" alt="Diamond Dashboard" />
                        </div>
                    </div>

                    <div id="features" className="my-6 md:my-8 py-4">
                        <div className="w-full text-center">
                            <span className="block font-bold text-5xl mb-2">Optimiza tu flujo de trabajo</span>
                            <span className="block font-bold text-lg text-color-secondary">Soluciones personalizadas para hacer tu trabajo más fácil</span>
                        </div>
                        <div className="grid mt-8">
                            <div className="col-12 md:col-6 lg:col-3 text-center px-5">
                                <img src={`/layout/images/pages/landing/icon-devices.svg`} alt="Devices" className="w-3rem h-3rem mb-4 animation-duration-200 fadeinleft" />
                                <span className="text-2xl font-bold block">Múltiples plataformas</span>
                                <span className="font-bold block mt-3 text-color-secondary">Soluciones tecnológicas multiplataforma a tu medida</span>
                            </div>
                            <div className="col-12 md:col-6 lg:col-3 text-center px-5">
                                <img src={`/layout/images/pages/landing/icon-design.svg`} alt="Devices" className="w-3rem h-3rem mb-4 animation-duration-200 fadeindown" />
                                <span className="text-2xl font-bold block">Diseño moderno</span>
                                <span className="font-bold block mt-3 text-color-secondary">Plataformas intuitivas y faciles de usar</span>
                            </div>
                            <div className="col-12 md:col-6 lg:col-3 text-center px-5">
                                <img src={`/layout/images/pages/landing/icon-document.svg`} alt="Devices" className="w-3rem h-3rem mb-4 animation-duration-200 fadeindown" />
                                <span className="text-2xl font-bold block">Documentación y registro</span>
                                <span className="font-bold block mt-3 text-color-secondary">Lleva un registro de tus procesos para que no te pierdas de nada</span>
                            </div>
                            <div className="col-12 md:col-6 lg:col-3 text-center px-5">
                                <img src={`/layout/images/pages/landing/icon-diamond.svg`} alt="Devices" className="w-3rem h-3rem mb-4 animation-duration-200 fadeinright" />
                                <span className="text-2xl font-bold block">Inteligencia artificial</span>
                                <span className="font-bold block mt-3 text-color-secondary">Implementación de herramientas de IA para hacer tu vida más fácil</span>
                            </div>
                        </div>
                    </div>

                    <div id="theming" className="grid row-gap-8 my-6 md:my-8 py-4 justify-content-between align-items-center">
                        <div className="col-12 md:col-5 flex-order-0">
                            <div className="w-5rem bg-primary mb-2 border-round" style={{ height: '4px' }}></div>
                            <span className="text-2xl font-bold block mb-4">Automatización y eficiencia operativa</span>
                            <span className="block font-semibold">
                                Digitalizamos y optimizamos tus procesos para que tu equipo trabaje mejor y más rápido. Desde la gestión de empleados hasta el control de inventario, eliminamos tareas repetitivas y reducimos errores para que te
                                enfoques en lo importante.
                            </span>
                        </div>
                        <div className="col-12 md:col-6 flex-order-1">
                            <img src={`/layout/images/pages/landing/feature-image-1.png`} className="w-full animation-duration-200 fadeinright" alt="Theming" />
                        </div>

                        <div className="col-12 md:col-6 flex-order-3 md:flex-order-2">
                            <img src={`/layout/images/pages/landing/feature-image-2.png`} className="w-full animation-duration-200 fadeinleft" alt="Theming" />
                        </div>
                        <div className="col-12 md:col-5 text-right h-full flex-order-2 md:flex-order-3">
                            <div className="w-5rem bg-primary mb-2 border-round ml-auto" style={{ height: '4px' }}></div>
                            <span className="text-2xl font-bold block mb-4">Soluciones integrales para tu negocio</span>
                            <span className="block font-semibold">
                                Ofrecemos plataformas de contabilidad, e-commerce, páginas web personalizadas y sistemas de monitoreo para todos tus procesos. Todo está conectado para que tengas control total y en tiempo real de tu operación, sin
                                complicaciones.
                            </span>
                        </div>

                        <div className="col-12 md:col-5 flex-order-4">
                            <div className="w-5rem bg-primary mb-2 border-round" style={{ height: '4px' }}></div>
                            <span className="text-2xl font-bold block mb-4">Tecnología inteligente al servicio del cliente</span>
                            <span className="block font-semibold">
                                Integramos herramientas de inteligencia artificial y bots para mejorar la atención al cliente y acelerar la toma de decisiones. Automatiza respuestas, analiza datos clave y mantén una experiencia fluida para tus
                                usuarios, sin esfuerzo extra.
                            </span>
                        </div>
                        <div className="col-12 md:col-6 flex-order-5">
                            <img src={`/layout/images/pages/landing/feature-image-3.png`} className="w-full animation-duration-200 fadeinright" alt="Theming" />
                        </div>
                    </div>

                    <div id="contact" className="grid justify-content-center lg:justify-content-evenly mt-6 md:mt-8 pt-4">
                        <div className="col-12 text-center text-white">
                            <span className="block text-5xl font-bold mb-3">Pongámonos en contacto</span>
                            <span className="block text-xl font-bold">Escribenos en whatsapp</span>
                        </div>
                        <a aria-label="Chat on WhatsApp" href="https://wa.me/573134738561" target="_blank">
                            <i className="pi pi-whatsapp" style={{ fontSize: '2.5rem', color: '#25D366' }}></i>
                        </a>
                        <div className="col-12 text-center h-15rem text-white">
                            <span className="block lg:text-5xl xl:text-6xl font-bold white-space-nowrap">
                                No dude en ponerte en contacto con nosotros <br /> y nos comunicaremos de vuelta lo antes posible.
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex align-items-center justify-content-between px-4 md:px-8 py-4 mt-5">
                    <div className="flex gap-2 align-items-center text-white select-none">
                        <img src={`/layout/images/logonegro.png`} className="w-2rem h-2rem" alt="Cuervo inc" />
                        <span className="font-bold text-3xl">Cuervo inc</span>
                    </div>
                    <div className="flex">
                        <a aria-label="Chat on WhatsApp" href="https://wa.me/573134738561" target="_blank">
                            <i className="pi pi-whatsapp text-xl px-6 p-3 lg:px-3 lg:py-2 align-items-center text-white hover:text-900 hover:surface-100 font-medium border-round cursor-pointer transition-colors transition-duration-150"></i>
                        </a>
                    </div>
                </div>

                <div className="absolute bottom-0 bg-shape-bottom bg-no-repeat bg-cover w-full"></div>
            </div>
        </div>
    );
};

export default LandingPage;
