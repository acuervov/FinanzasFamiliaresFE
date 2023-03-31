import Head from 'next/head';
import React, { useState } from 'react';

export const LayoutContext = React.createContext();

export const LayoutProvider = (props) => {
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    const [layoutConfig, setLayoutConfig] = useState({
        ripple: false,
        inputStyle: 'outlined',
        menuMode: 'compact',
        menuTheme: 'darkgray',
        colorScheme: 'light',
        theme: 'blue',
        scale: 14
    });

    const [layoutState, setLayoutState] = useState({
        staticMenuDesktopInactive: false,
        overlayMenuActive: false,
        overlaySubmenuActive: false,
        profileSidebarVisible: false,
        configSidebarVisible: false,
        staticMenuMobileActive: false,
        menuHoverActive: false,
        resetMenu: false,
        searchActive: false,
        notificationMenuActive: false,
        userMenuActive: false,
        rightMenuActive: false,
        menuClick: false,
        sidebarActive: false,
        anchored: false,
        configActive: false
    });

    const onMenuButtonClick = (event) => {
        if (isOverlay()) {
            setLayoutState((prevLayoutState) => ({
                ...prevLayoutState,
                overlayMenuActive: !prevLayoutState.overlayMenuActive
            }));
        }
        if (isDesktop()) {
            setLayoutState((prevLayoutState) => ({
                ...prevLayoutState,
                staticMenuDesktopInactive: !prevLayoutState.staticMenuDesktopInactive
            }));
        } else {
            setLayoutState((prevLayoutState) => ({
                ...prevLayoutState,
                staticMenuMobileActive: !prevLayoutState.staticMenuMobileActive,
                menuClick: true
            }));

            event.preventDefault();
        }
    };

    const onTopbarNotificationMenuButtonClick = (event) => {
        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            notificationMenuActive: !layoutState.notificationMenuActive
        }));

        hideOverlayMenu();

        event.preventDefault();
    };

    const hideOverlayMenu = () => {
        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            overlayMenuActive: false,
            staticMenuMobileActive: false
        }));
    };

    const toggleSearch = () => {
        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            searchActive: !layoutState.searchActive
        }));
    };

    const onSearchHide = () => {
        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            searchActive: false
        }));
    };

    const onTopbarUserMenuButtonClick = (event) => {
        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            userMenuActive: !layoutState.userMenuActive
        }));
        hideOverlayMenu();

        event.preventDefault();
    };

    const onRightMenuButtonClick = (event) => {
        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            rightMenuActive: !layoutState.rightMenuActive
        }));
        hideOverlayMenu();

        event.preventDefault();
    };

    const showProfileSidebar = () => {
        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            profileSidebarVisible: !prevLayoutState.profileSidebarVisible
        }));
    };

    const isOverlay = () => {
        return layoutConfig.menuMode === 'overlay';
    };

    const isSlim = () => {
        return layoutConfig.menuMode === 'slim';
    };

    const isCompact = () => {
        return layoutConfig.menuMode === 'compact';
    };

    const isHorizontal = () => {
        return layoutConfig.menuMode === 'horizontal';
    };

    const isDesktop = () => {
        return window.innerWidth > 991;
    };

    const value = {
        layoutConfig,
        setLayoutConfig,
        layoutState,
        setLayoutState,
        showProfileSidebar,
        isSlim,
        isCompact,
        isHorizontal,
        isDesktop,
        onMenuButtonClick,
        toggleSearch,
        onSearchHide,
        onTopbarNotificationMenuButtonClick,
        onTopbarUserMenuButtonClick,
        onRightMenuButtonClick,
        breadcrumbs,
        setBreadcrumbs
    };

    return (
        <LayoutContext.Provider value={value}>
            <>
                <Head>
                    <title>PrimeReact - DIAMOND</title>
                    <meta charSet="UTF-8" />
                    <meta name="description" content="The ultimate collection of design-agnostic, flexible and accessible React UI Components." />
                    <meta name="robots" content="index, follow" />
                    <meta name="viewport" content="initial-scale=1, width=device-width" />
                    <meta property="og:type" content="website"></meta>
                    <meta property="og:title" content="Diamond by PrimeReact for NextJS"></meta>
                    <meta property="og:url" content="https://www.primefaces.org/diamond-react"></meta>
                    <meta property="og:description" content="The ultimate collection of design-agnostic, flexible and accessible React UI Components." />
                    <meta property="og:image" content="https://www.primefaces.org/static/social/diamond-react.png"></meta>
                    <meta property="og:ttl" content="604800"></meta>
                    <link rel="icon" href={`/layout/images/favicon.ico`} type="image/x-icon"></link>
                </Head>
                {props.children}
            </>
        </LayoutContext.Provider>
    );
};
