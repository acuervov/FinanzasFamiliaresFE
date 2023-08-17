'use client';
import React, { useCallback, useEffect, useRef, useContext } from 'react';
import { classNames, DomHandler } from 'primereact/utils';
import { usePathname, useSearchParams } from 'next/navigation';
import { LayoutContext } from './context/layoutcontext';
import { useEventListener, useMountEffect, useResizeListener, useUnmountEffect } from 'primereact/hooks';
import AppTopbar from './AppTopbar';
import AppFooter from './AppFooter';
import AppConfig from './AppConfig';
import AppSearch from './AppSearch';
import AppBreadCrumb from './AppBreadCrumb';
import AppRightMenu from './AppRightMenu';
import { PrimeReactContext } from 'primereact/api';
import { Tooltip } from 'primereact/tooltip';
import { ChildContainerProps } from '../types/types';

const Layout = (props: ChildContainerProps) => {
    const { layoutConfig, layoutState, setLayoutState, isSlim, isCompact, isHorizontal, isDesktop } = useContext(LayoutContext);
    const { setRipple } = useContext(PrimeReactContext);
    const topbarRef = useRef(null);
    const sidebarRef = useRef(null);
    const copyTooltipRef = useRef(null);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [bindMenuOutsideClickListener, unbindMenuOutsideClickListener] = useEventListener({
        type: 'click',
        listener: (event) => {
            const isOutsideClicked = !(sidebarRef.current.isSameNode(event.target) || sidebarRef.current.contains(event.target) || topbarRef.current.menubutton.isSameNode(event.target) || topbarRef.current.menubutton.contains(event.target));

            if (isOutsideClicked) {
                hideMenu();
            }
        }
    });

    const [bindDocumentResizeListener, unbindDocumentResizeListener] = useResizeListener({
        listener: () => {
            if (isDesktop() && !DomHandler.isTouchDevice()) {
                hideMenu();
            }
        }
    });

    const hideMenu = useCallback(() => {
        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            overlayMenuActive: false,
            overlaySubmenuActive: false,
            staticMenuMobileActive: false,
            menuHoverActive: false,
            menuClick: false,
            resetMenu: (isSlim() || isCompact() || isHorizontal()) && isDesktop()
        }));
    }, [isSlim, isHorizontal, isDesktop, setLayoutState]);

    const blockBodyScroll = () => {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        } else {
            document.body.className += ' blocked-scroll';
        }
    };

    const unblockBodyScroll = () => {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        } else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    };
    useMountEffect(() => {
        setRipple(layoutConfig.ripple);
    });

    useEffect(() => {
        if (layoutState.overlayMenuActive || layoutState.staticMenuMobileActive || layoutState.overlaySubmenuActive) {
            bindMenuOutsideClickListener();
        }

        if (layoutState.staticMenuMobileActive) {
            blockBodyScroll();
            (isSlim() || isCompact() || isHorizontal()) && bindDocumentResizeListener();
        }

        return () => {
            unbindMenuOutsideClickListener();
            unbindDocumentResizeListener();
            unblockBodyScroll();
        };
    }, [layoutState.overlayMenuActive, layoutState.staticMenuMobileActive, layoutState.overlaySubmenuActive]);

    useEffect(() => {
        const onRouteChange = () => {
            hideMenu();
        };
        onRouteChange();
    }, [pathname, searchParams]);

    useUnmountEffect(() => {
        unbindMenuOutsideClickListener();
    });

    const containerClassName = classNames(
        'layout-wrapper',
        {
            'layout-static': layoutConfig.menuMode === 'static',
            'layout-slim': layoutConfig.menuMode === 'slim',
            'layout-horizontal': layoutConfig.menuMode === 'horizontal',
            'layout-drawer': layoutConfig.menuMode === 'drawer',
            'layout-overlay': layoutConfig.menuMode === 'overlay',
            'layout-compact': layoutConfig.menuMode === 'compact',
            'layout-reveal': layoutConfig.menuMode === 'reveal',
            'layout-sidebar-dim': layoutConfig.colorScheme === 'dim',
            'layout-sidebar-dark': layoutConfig.colorScheme === 'dark',
            'layout-overlay-active': layoutState.overlayMenuActive,
            'layout-mobile-active': layoutState.staticMenuMobileActive,
            'layout-static-inactive': layoutState.staticMenuDesktopInactive && layoutConfig.menuMode === 'static',
            'p-input-filled': layoutConfig.inputStyle === 'filled',
            'p-ripple-disabled': !layoutConfig.ripple,
            'layout-sidebar-active': layoutState.sidebarActive,
            'layout-sidebar-anchored': layoutState.anchored
        },
        layoutConfig.colorScheme === 'light' ? 'layout-sidebar-' + layoutConfig.menuTheme : ''
    );

    return (
        <div className={containerClassName} data-theme={layoutConfig.colorScheme}>
            <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />

            <div className="layout-content-wrapper">
                <AppTopbar ref={topbarRef} sidebarRef={sidebarRef} />
                <div className="layout-content">
                    <AppBreadCrumb />

                    {props.children}
                </div>
                <AppFooter />
            </div>
            <AppConfig />

            <AppSearch />
            <AppRightMenu></AppRightMenu>
            <div className="layout-mask"></div>
        </div>
    );
};

export default Layout;
