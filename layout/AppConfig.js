import React, { useState } from "react";
import { classNames } from "primereact/utils";
import PrimeReact from "primereact/api";
import { RadioButton } from "primereact/radiobutton";
import { InputSwitch } from "primereact/inputswitch";
import { Button } from "primereact/button";
import { LayoutContext } from "./context/layoutcontext";

import { Sidebar } from "primereact/sidebar";

import { useContext, useEffect } from "react";

const AppConfig = (props) => {
  const scales = [12, 13, 14, 15, 16];
  const menuThemes = [
    {
      name: "white",
      color: "#ffffff",
      logoColor: "dark",
      componentTheme: "dark",
    },
    {
      name: "darkgray",
      color: "#343a40",
      logoColor: "white",
      componentTheme: "white",
    },
    {
      name: "blue",
      color: "#1976d2",
      logoColor: "white",
      componentTheme: "blue",
    },
    {
      name: "bluegray",
      color: "#455a64",
      logoColor: "white",
      componentTheme: "lightgreen",
    },
    {
      name: "brown",
      color: "#5d4037",
      logoColor: "white",
      componentTheme: "cyan",
    },
    {
      name: "cyan",
      color: "#0097a7",
      logoColor: "white",
      componentTheme: "cyan",
    },
    {
      name: "green",
      color: "#388e3C",
      logoColor: "white",
      componentTheme: "green",
    },
    {
      name: "indigo",
      color: "#303f9f",
      logoColor: "white",
      componentTheme: "indigo",
    },
    {
      name: "deeppurple",
      color: "#512da8",
      logoColor: "white",
      componentTheme: "deeppurple",
    },
    {
      name: "orange",
      color: "#F57c00",
      logoColor: "dark",
      componentTheme: "orange",
    },
    {
      name: "pink",
      color: "#c2185b",
      logoColor: "white",
      componentTheme: "pink",
    },
    {
      name: "purple",
      color: "#7b1fa2",
      logoColor: "white",
      componentTheme: "purple",
    },
    {
      name: "teal",
      color: "#00796b",
      logoColor: "white",
      componentTheme: "teal",
    },
  ];

  const componentThemes = [
    { name: "blue", color: "#42A5F5" },
    { name: "green", color: "#66BB6A" },
    { name: "lightgreen", color: "#9CCC65" },
    { name: "purple", color: "#AB47BC" },
    { name: "deeppurple", color: "#7E57C2" },
    { name: "indigo", color: "#5C6BC0" },
    { name: "orange", color: "#FFA726" },
    { name: "cyan", color: "#26C6DA" },
    { name: "pink", color: "#EC407A" },
    { name: "teal", color: "#26A69A" },
  ];

  const {
    layoutConfig,
    setLayoutConfig,
    layoutState,
    setLayoutState,
    isSlim,
    isHorizontal,
  } = useContext(LayoutContext);

  useEffect(() => {
    if (isSlim() || isHorizontal()) {
      setLayoutState((prevState) => ({ ...prevState, resetMenu: true }));
    }
  }, [layoutConfig.menuMode]);

  const onConfigButtonClick = (event) => {
    props.setConfigActive((prevConfigActive) => !prevConfigActive);
    event.preventDefault();
    setLayoutState((prevState) => ({
      ...prevState,
      configSidebarVisible: true,
    }));
  };

  const onConfigSidebarHide = () => {
    setLayoutState((prevState) => ({
      ...prevState,
      configSidebarVisible: false,
    }));
  };

  const changeInputStyle = (e) => {
    setLayoutConfig((prevState) => ({ ...prevState, inputStyle: e.value }));
  };

  const changeRipple = (e) => {
    PrimeReact.ripple = e.value;
    setLayoutConfig((prevState) => ({ ...prevState, ripple: e.value }));
  };

  const changeMenuMode = (e) => {
    setLayoutConfig((prevState) => ({ ...prevState, menuMode: e.value }));
  };

  const changeMenuTheme = (theme) => {
    setLayoutConfig((prevState) => ({ ...prevState, menuTheme: theme.name }));
  };

  const changeStyleSheetUrl = (id, value, from) => {
    const element = document.getElementById(id);
    const urlTokens = element.getAttribute("href").split("/");

    if (from === 1) {
      // which function invoked this function
      urlTokens[urlTokens.length - 1] = value;
    } else if (from === 2) {
      // which function invoked this function
      if (value !== null) {
        urlTokens[urlTokens.length - 2] = value;
      }
    } else if (from === 3) {
      // which function invoked this function
      urlTokens[urlTokens.length - 2] = value;
    }

    const newURL = urlTokens.join("/");

    replaceLink(element, newURL);
  };

  const changeColorScheme = (colorScheme) => {
    const themeLink = document.getElementById("theme-link");
    const themeLinkHref = themeLink.getAttribute("href");
    const currentColorScheme = "theme-" + layoutConfig.colorScheme.toString();
    const newColorScheme = "theme-" + colorScheme;
    const newHref = themeLinkHref.replace(currentColorScheme, newColorScheme);

    replaceLink(themeLink, newHref, () => {
      setLayoutConfig((prevState) => ({ ...prevState, colorScheme }));
    });
  };

  const changeTheme = (theme) => {
    const themeLink = document.getElementById("theme-link");
    const themeHref = themeLink.getAttribute("href");
    const newHref = themeHref.replace(layoutConfig.theme, theme);
    replaceLink(themeLink, newHref, () => {
      setLayoutConfig((prevState) => ({ ...prevState, theme }));
    });
  };

  const replaceLink = (linkElement, href, onComplete) => {
    if (!linkElement || !href) {
      return;
    }

    const id = linkElement.getAttribute("id");
    const cloneLinkElement = linkElement.cloneNode(true);

    cloneLinkElement.setAttribute("href", href);
    cloneLinkElement.setAttribute("id", id + "-clone");

    linkElement.parentNode.insertBefore(
      cloneLinkElement,
      linkElement.nextSibling
    );

    cloneLinkElement.addEventListener("load", () => {
      linkElement.remove();

      const element = document.getElementById(id); // re-check
      element && element.remove();

      cloneLinkElement.setAttribute("id", id);
      onComplete && onComplete();
    });
  };

  const getComponentThemes = () => {
    return (
      <div className="layout-themes flex flex-wrap gap-3">
        {componentThemes.map((theme) => {
          return (
            <div key={theme.name}>
              <a
                className="w-2rem h-2rem cursor-pointer hover:shadow-4 border-round transition-duration-150 flex align-items-center justify-content-center"
                style={{ cursor: "pointer", backgroundColor: theme.color }}
                onClick={() => changeTheme(theme.name)}
              >
                {layoutConfig.theme === theme.name && (
                  <span className="check flex align-items-center justify-content-center">
                    <i className="pi pi-check" style={{ color: "white" }}></i>
                  </span>
                )}
              </a>
            </div>
          );
        })}
      </div>
    );
  };

  const getMenuThemes = () => {
    if (layoutConfig.colorScheme === "light") {
      return (
        <div className="flex flex-wrap gap-3">
          {menuThemes.map((theme) => {
            const checkStyle = theme.name === "white" ? "black" : "white";
            return (
              <div key={theme.name}>
                <a
                  className="w-2rem h-2rem cursor-pointer hover:shadow-4 border-round transition-duration-150 flex align-items-center justify-content-center"
                  style={{ cursor: "pointer", backgroundColor: theme.color }}
                  onClick={() => changeMenuTheme(theme)}
                >
                  {layoutConfig.menuTheme === theme.name && (
                    <span className="check flex align-items-center justify-content-center">
                      <i
                        className="pi pi-check"
                        style={{ color: checkStyle }}
                      ></i>
                    </span>
                  )}
                </a>
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div>
        <p>
          Menu themes are only available in light mode and static, slim, overlay
          menu modes by design as large surfaces can emit too much brightness in
          dark mode.
        </p>
      </div>
    );
  };

  const componentThemesElement = getComponentThemes();
  const menuThemesElement = getMenuThemes();

  const decrementScale = () => {
    setLayoutConfig((prevState) => ({
      ...prevState,
      scale: prevState.scale - 1,
    }));
  };

  const incrementScale = () => {
    setLayoutConfig((prevState) => ({
      ...prevState,
      scale: prevState.scale + 1,
    }));
  };

  const applyScale = () => {
    document.documentElement.style.fontSize = layoutConfig.scale + "px";
  };

  useEffect(() => {
    applyScale();
  }, [layoutConfig.scale]);

  return (
    <div id="layout-config">
      <a
        className="layout-config-button"
        onClick={() =>
          setLayoutState((prevState) => ({ ...prevState, configActive: true }))
        }
      >
        <i className="pi pi-cog"></i>
      </a>

      <Sidebar
        visible={layoutState.configActive}
        position="right"
        transitionOptions="'.3s cubic-bezier(0, 0, 0.2, 1)'"
        onHide={() =>
          setLayoutState((prevState) => ({ ...prevState, configActive: false }))
        }
      >
        <div
          className={`w-full sm:w-18rem`}
          style={{ transition: ".3s cubic-bezier(0, 0, 0.2, 1)" }}
        >
          <h5>Color Scheme</h5>
          <div className="flex">
            <div className="field-radiobutton flex-auto">
              <RadioButton
                name="colorScheme"
                value="light"
                checked={layoutConfig.colorScheme === "light"}
                inputId="theme3"
                onChange={(e) => changeColorScheme(e.value)}
              ></RadioButton>
              <label htmlFor="theme3">Light</label>
            </div>
            <div className="field-radiobutton flex-auto">
              <RadioButton
                name="colorScheme"
                value="dim"
                checked={layoutConfig.colorScheme === "dim"}
                inputId="theme2"
                onChange={(e) => changeColorScheme(e.value)}
              ></RadioButton>
              <label htmlFor="theme2">Dim</label>
            </div>
            <div className="field-radiobutton flex-auto">
              <RadioButton
                name="colorScheme"
                value="dark"
                checked={layoutConfig.colorScheme === "dark"}
                inputId="theme1"
                onChange={(e) => changeColorScheme(e.value)}
              ></RadioButton>
              <label htmlFor="theme1">Dark</label>
            </div>
          </div>

          <hr />
          <h5>Menu Type</h5>
          <div className="flex flex-wrap row-gap-3">
            <div className="flex align-items-center gap-2 w-6">
              <RadioButton
                name="menuMode"
                value="static"
                checked={layoutConfig.menuMode === "static"}
                inputId="mode1"
                onChange={(e) => changeMenuMode(e)}
              ></RadioButton>
              <label htmlFor="mode1">Static</label>
            </div>
            <div className="flex align-items-center gap-2 w-6">
              <RadioButton
                name="menuMode"
                value="overlay"
                checked={layoutConfig.menuMode === "overlay"}
                inputId="mode2"
                onChange={(e) => changeMenuMode(e)}
              ></RadioButton>
              <label htmlFor="mode2">Overlay</label>
            </div>
            <div className="flex align-items-center gap-2 w-6">
              <RadioButton
                name="menuMode"
                value="slim"
                checked={layoutConfig.menuMode === "slim"}
                inputId="mode3"
                onChange={(e) => changeMenuMode(e)}
              ></RadioButton>
              <label htmlFor="mode3">Slim</label>
            </div>
            <div className="flex align-items-center gap-2 w-6">
              <RadioButton
                name="menuMode"
                value="compact"
                checked={layoutConfig.menuMode === "compact"}
                inputId="mode4"
                onChange={(e) => changeMenuMode(e)}
              ></RadioButton>
              <label htmlFor="mode4">Compact</label>
            </div>
            <div className="flex align-items-center gap-2 w-6">
              <RadioButton
                name="menuMode"
                value="horizontal"
                checked={layoutConfig.menuMode === "horizontal"}
                inputId="mode4"
                onChange={(e) => changeMenuMode(e)}
              ></RadioButton>
              <label htmlFor="mode4">Horizontal</label>
            </div>
            <div className="flex align-items-center gap-2 w-6">
              <RadioButton
                name="menuMode"
                value="reveal"
                checked={layoutConfig.menuMode === "reveal"}
                inputId="mode5"
                onChange={(e) => changeMenuMode(e)}
              ></RadioButton>
              <label htmlFor="mode5">Reveal</label>
            </div>
            <div className="flex align-items-center gap-2 w-6">
              <RadioButton
                name="menuMode"
                value="drawer"
                checked={layoutConfig.menuMode === "drawer"}
                inputId="mode6"
                onChange={(e) => changeMenuMode(e)}
              ></RadioButton>
              <label htmlFor="mode6">Drawer</label>
            </div>
          </div>
          <hr />
          <h5>Menu Themes</h5>
          {menuThemesElement}
          <hr />

          <h5>Component Themes</h5>
          {componentThemesElement}
          <hr />

          <h5>Scale</h5>
          <div className="flex align-items-center">
            <Button
              text
              rounded
              icon="pi pi-minus"
              onClick={decrementScale}
              className=" w-2rem h-2rem mr-2"
              disabled={layoutConfig.scale === scales[0]}
            ></Button>
            <div className="flex gap-2 align-items-center">
              {scales.map((s, i) => {
                return (
                  <i
                    key={i}
                    className={classNames("pi pi-circle-fill text-300", {
                      "text-primary-500": s === layoutConfig.scale,
                    })}
                  ></i>
                );
              })}
            </div>
            <Button
              text
              rounded
              icon="pi pi-plus"
              onClick={incrementScale}
              className=" w-2rem h-2rem ml-2"
              disabled={layoutConfig.scale === scales[scales.length - 1]}
            ></Button>
          </div>

          <hr />

          <h5>Input Style</h5>
          <div className="flex">
            <div className="field-radiobutton flex-1">
              <RadioButton
                inputId="input_outlined"
                name="inputstyle"
                value="outlined"
                checked={layoutConfig.inputStyle === "outlined"}
                onChange={(e) => changeInputStyle(e)}
              />
              <label htmlFor="input_outlined">Outlined</label>
            </div>
            <div className="field-radiobutton flex-1">
              <RadioButton
                inputId="input_filled"
                name="inputstyle"
                value="filled"
                checked={layoutConfig.inputStyle === "filled"}
                onChange={(e) => changeInputStyle(e)}
              />
              <label htmlFor="input_filled">Filled</label>
            </div>
          </div>
          <hr />

          <h5>Ripple Effect</h5>
          <InputSwitch
            checked={layoutConfig.ripple}
            onChange={(e) => changeRipple(e)}
          />
        </div>
      </Sidebar>
    </div>
  );
};

export default AppConfig;