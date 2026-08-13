"use strict";


/* ==============================================================
   RMF PHASE ORDER
============================================================== */

const RMF_PHASES = [

    "prepare",
    "categorize",
    "select",
    "implement",
    "assess",
    "authorize",
    "monitor"

];



/* ==============================================================
   PAGE INITIALIZATION
============================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeTheme();

        initializeMobileNavigation();

        initializeStickyHeader();

        initializeSectionNavigation();

        initializeScrollReveal();

        initializeLifecycle();

        initializeBackToTop();

        updateCurrentYear();

    }
);



/* ==============================================================
   THEME
============================================================== */

function initializeTheme() {


    const root =
        document.documentElement;


    const themeToggle =
        document.querySelector(
            "[data-theme-toggle]"
        );


    if (!themeToggle) {
        return;
    }



    const savedTheme =
        localStorage.getItem(
            "bfd-theme"
        );


    const systemPrefersLight =
        window.matchMedia(
            "(prefers-color-scheme: light)"
        ).matches;


    const initialTheme =
        savedTheme ||
        root.getAttribute(
            "data-theme"
        ) ||
        (
            systemPrefersLight
                ? "light"
                : "dark"
        );


    applyTheme(
        initialTheme,
        themeToggle
    );



    /* Toggle Theme */

    themeToggle.addEventListener(
        "click",
        () => {


            const currentTheme =
                root.getAttribute(
                    "data-theme"
                );


            const nextTheme =
                currentTheme === "light"
                    ? "dark"
                    : "light";


            applyTheme(
                nextTheme,
                themeToggle
            );


            localStorage.setItem(
                "bfd-theme",
                nextTheme
            );

        }
    );



    /* Follow System Theme Until Visitor Makes A Choice */

    const systemThemeQuery =
        window.matchMedia(
            "(prefers-color-scheme: light)"
        );


    systemThemeQuery.addEventListener(
        "change",
        (event) => {


            const hasSavedTheme =
                localStorage.getItem(
                    "bfd-theme"
                );


            if (hasSavedTheme) {
                return;
            }


            applyTheme(
                event.matches
                    ? "light"
                    : "dark",
                themeToggle
            );

        }
    );

}



/* ==============================================================
   APPLY THEME
============================================================== */

function applyTheme(
    theme,
    themeToggle
) {


    const root =
        document.documentElement;


    const isLightTheme =
        theme === "light";


    root.setAttribute(
        "data-theme",
        theme
    );


    themeToggle.setAttribute(
        "aria-pressed",
        String(
            isLightTheme
        )
    );


    themeToggle.setAttribute(
        "aria-label",
        isLightTheme
            ? "Switch to dark mode"
            : "Switch to light mode"
    );


    updateThemeColor(
        theme
    );

}



/* ==============================================================
   BROWSER THEME COLOR
============================================================== */

function updateThemeColor(
    theme
) {


    const themeColorMeta =
        document.querySelector(
            'meta[name="theme-color"]'
        );


    if (!themeColorMeta) {
        return;
    }


    themeColorMeta.setAttribute(
        "content",
        theme === "light"
            ? "#eef5fb"
            : "#030712"
    );

}



/* ==============================================================
   MOBILE NAVIGATION
============================================================== */

function initializeMobileNavigation() {


    const menuToggle =
        document.querySelector(
            "[data-menu-toggle]"
        );


    const mobileNavigation =
        document.querySelector(
            "[data-mobile-nav]"
        );


    if (
        !menuToggle ||
        !mobileNavigation
    ) {
        return;
    }



    const mobileLinks =
        mobileNavigation
            .querySelectorAll(
                "a"
            );



    /* Open / Close */

    menuToggle.addEventListener(
        "click",
        () => {


            const isOpen =
                menuToggle
                    .getAttribute(
                        "aria-expanded"
                    ) === "true";


            setMobileNavigationState(
                !isOpen,
                menuToggle,
                mobileNavigation
            );

        }
    );



    /* Close When Link Selected */

    mobileLinks.forEach(
        (link) => {


            link.addEventListener(
                "click",
                () => {


                    setMobileNavigationState(
                        false,
                        menuToggle,
                        mobileNavigation
                    );

                }
            );

        }
    );



    /* Escape Key */

    document.addEventListener(
        "keydown",
        (event) => {


            if (
                event.key !==
                "Escape"
            ) {
                return;
            }


            setMobileNavigationState(
                false,
                menuToggle,
                mobileNavigation
            );


            menuToggle.focus();

        }
    );



    /* Click Outside Navigation */

    document.addEventListener(
        "click",
        (event) => {


            const isOpen =
                menuToggle
                    .getAttribute(
                        "aria-expanded"
                    ) === "true";


            if (!isOpen) {
                return;
            }


            const clickedMenuToggle =
                menuToggle.contains(
                    event.target
                );


            const clickedMobileNavigation =
                mobileNavigation.contains(
                    event.target
                );


            if (
                !clickedMenuToggle &&
                !clickedMobileNavigation
            ) {


                setMobileNavigationState(
                    false,
                    menuToggle,
                    mobileNavigation
                );

            }

        }
    );



    /* Desktop Resize */

    window.addEventListener(
        "resize",
        () => {


            if (
                window.innerWidth <=
                900
            ) {
                return;
            }


            setMobileNavigationState(
                false,
                menuToggle,
                mobileNavigation
            );

        }
    );

}



/* ==============================================================
   SET MOBILE MENU STATE
============================================================== */

function setMobileNavigationState(
    shouldOpen,
    menuToggle,
    mobileNavigation
) {


    menuToggle.setAttribute(
        "aria-expanded",
        String(
            shouldOpen
        )
    );


    menuToggle.setAttribute(
        "aria-label",
        shouldOpen
            ? "Close navigation menu"
            : "Open navigation menu"
    );


    mobileNavigation
        .classList
        .toggle(
            "is-open",
            shouldOpen
        );


    document.body
        .classList
        .toggle(
            "menu-is-open",
            shouldOpen
        );

}



/* ==============================================================
   STICKY HEADER
============================================================== */

function initializeStickyHeader() {


    const siteHeader =
        document.querySelector(
            "[data-site-header]"
        );


    if (!siteHeader) {
        return;
    }



    const updateHeaderState =
        () => {


            siteHeader
                .classList
                .toggle(
                    "is-scrolled",
                    window.scrollY > 18
                );

        };


    updateHeaderState();


    window.addEventListener(
        "scroll",
        updateHeaderState,
        {
            passive: true
        }
    );

}



/* ==============================================================
   ACTIVE HEADER NAVIGATION
============================================================== */

function initializeSectionNavigation() {


    const desktopLinks =
        Array.from(
            document.querySelectorAll(
                '.site-nav__link[href^="#"]'
            )
        );


    const mobileLinks =
        Array.from(
            document.querySelectorAll(
                '.mobile-nav__link[href^="#"]'
            )
        );


    const navigationLinks = [
        ...desktopLinks,
        ...mobileLinks
    ];


    if (
        !navigationLinks.length
    ) {
        return;
    }



    const sections =
        navigationLinks
            .map(
                (link) => {


                    const targetId =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return null;
                    }


                    return document
                        .querySelector(
                            targetId
                        );

                }
            )
            .filter(Boolean);


    if (!sections.length) {
        return;
    }



    const updateActiveLink =
        () => {


            const triggerPoint =
                window.innerHeight *
                0.34;


            let activeSection =
                sections[0];


            sections.forEach(
                (section) => {


                    const rect =
                        section
                            .getBoundingClientRect();


                    if (
                        rect.top <=
                        triggerPoint
                    ) {

                        activeSection =
                            section;

                    }

                }
            );


            navigationLinks.forEach(
                (link) => {


                    const isActive =
                        link.getAttribute(
                            "href"
                        ) ===
                        `#${activeSection.id}`;


                    link
                        .classList
                        .toggle(
                            "is-active",
                            isActive
                        );

                }
            );

        };


    updateActiveLink();


    window.addEventListener(
        "scroll",
        updateActiveLink,
        {
            passive: true
        }
    );

}



/* ==============================================================
   SCROLL REVEAL
============================================================== */

function initializeScrollReveal() {


    const revealElements =
        document.querySelectorAll(
            "[data-reveal]"
        );


    if (
        !revealElements.length
    ) {
        return;
    }



    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        prefersReducedMotion ||
        !(
            "IntersectionObserver"
            in window
        )
    ) {


        revealElements.forEach(
            (element) => {

                element
                    .classList
                    .add(
                        "is-visible"
                    );

            }
        );


        return;

    }



    const revealObserver =
        new IntersectionObserver(
            (
                entries,
                observer
            ) => {


                entries.forEach(
                    (entry) => {


                        if (
                            !entry
                                .isIntersecting
                        ) {
                            return;
                        }


                        entry.target
                            .classList
                            .add(
                                "is-visible"
                            );


                        observer
                            .unobserve(
                                entry.target
                            );

                    }
                );

            },
            {

                threshold:
                    0.14,

                rootMargin:
                    "0px 0px -40px 0px"

            }
        );


    revealElements.forEach(
        (element) => {

            revealObserver
                .observe(
                    element
                );

        }
    );

}



/* ==============================================================
   RMF LIFECYCLE
============================================================== */

function initializeLifecycle() {


    const lifecycle =
        document.querySelector(
            "[data-rmf-lifecycle]"
        );


    const lifecycleTrack =
        document.querySelector(
            "[data-lifecycle-track]"
        );


    if (
        !lifecycle ||
        !lifecycleTrack
    ) {
        return;
    }



    const phaseLinks =
        Array.from(
            lifecycleTrack
                .querySelectorAll(
                    "[data-phase]"
                )
        );


    const progressLine =
        lifecycleTrack
            .querySelector(
                "[data-lifecycle-progress]"
            );


    const currentPhase =
        document.body
            .dataset
            .currentPhase ||
        null;



    setLifecycleStates(
        phaseLinks,
        currentPhase,
        progressLine
    );


    initializeLifecyclePreview(
        lifecycle,
        phaseLinks,
        currentPhase
    );


    initializeLifecycleKeyboardNavigation(
        phaseLinks
    );


    centerActiveLifecyclePhase(
        lifecycle,
        phaseLinks,
        currentPhase
    );

}



/* ==============================================================
   RMF PHASE STATES
============================================================== */

function setLifecycleStates(
    phaseLinks,
    currentPhase,
    progressLine
) {


    const activePhaseIndex =
        RMF_PHASES
            .indexOf(
                currentPhase
            );


    phaseLinks.forEach(
        (link) => {


            const phase =
                link.dataset.phase;


            const phaseIndex =
                RMF_PHASES
                    .indexOf(
                        phase
                    );


            const isActive =
                activePhaseIndex !==
                -1 &&
                phaseIndex ===
                activePhaseIndex;


            const isComplete =
                activePhaseIndex !==
                -1 &&
                phaseIndex <
                activePhaseIndex;



            link
                .classList
                .toggle(
                    "is-active",
                    isActive
                );


            link
                .classList
                .toggle(
                    "is-complete",
                    isComplete
                );



            if (isActive) {


                link.setAttribute(
                    "aria-current",
                    "step"
                );


            } else {


                link.removeAttribute(
                    "aria-current"
                );

            }

        }
    );



    if (!progressLine) {
        return;
    }



    const progressPercentage =
        activePhaseIndex === -1
            ? 0
            : (
                (
                    activePhaseIndex +
                    1
                ) /
                RMF_PHASES.length
            ) *
            100;



    requestAnimationFrame(
        () => {


            progressLine
                .style
                .width =
                `${progressPercentage}%`;

        }
    );

}



/* ==============================================================
   RMF HOVER / FOCUS PREVIEW
============================================================== */

function initializeLifecyclePreview(
    lifecycle,
    phaseLinks,
    currentPhase
) {


    const statusValue =
        lifecycle.querySelector(
            ".rmf-lifecycle__status-value"
        );


    if (!statusValue) {
        return;
    }



    const defaultStatus =
        currentPhase
            ? formatPhaseName(
                currentPhase
            )
            : "Case Study Introduction";



    phaseLinks.forEach(
        (link) => {


            const phase =
                link.dataset.phase;


            const summary =
                link.querySelector(
                    ".rmf-phase-link__summary"
                );


            const phaseName =
                formatPhaseName(
                    phase
                );


            const phaseSummary =
                summary
                    ? summary
                        .textContent
                        .trim()
                    : "";


            const previewText =
                phaseSummary
                    ? `${phaseName} — ${phaseSummary}`
                    : phaseName;



            const showPreview =
                () => {

                    statusValue
                        .textContent =
                        previewText;

                };


            const restoreStatus =
                () => {

                    statusValue
                        .textContent =
                        defaultStatus;

                };



            link.addEventListener(
                "mouseenter",
                showPreview
            );


            link.addEventListener(
                "focus",
                showPreview
            );


            link.addEventListener(
                "mouseleave",
                restoreStatus
            );


            link.addEventListener(
                "blur",
                restoreStatus
            );

        }
    );

}



/* ==============================================================
   RMF KEYBOARD NAVIGATION
============================================================== */

function initializeLifecycleKeyboardNavigation(
    phaseLinks
) {


    phaseLinks.forEach(
        (
            link,
            index
        ) => {


            link.addEventListener(
                "keydown",
                (event) => {


                    let nextIndex =
                        null;



                    switch (
                        event.key
                    ) {


                        case "ArrowRight":

                            nextIndex =
                                index ===
                                phaseLinks.length -
                                1

                                    ? 0

                                    : index +
                                    1;

                            break;



                        case "ArrowLeft":

                            nextIndex =
                                index ===
                                0

                                    ? phaseLinks.length -
                                    1

                                    : index -
                                    1;

                            break;



                        case "Home":

                            nextIndex =
                                0;

                            break;



                        case "End":

                            nextIndex =
                                phaseLinks.length -
                                1;

                            break;



                        default:

                            return;

                    }



                    event
                        .preventDefault();



                    phaseLinks[
                        nextIndex
                    ].focus();

                }
            );

        }
    );

}



/* ==============================================================
   CENTER ACTIVE RMF PHASE
============================================================== */

function centerActiveLifecyclePhase(
    lifecycle,
    phaseLinks,
    currentPhase
) {


    if (!currentPhase) {
        return;
    }



    const activeLink =
        phaseLinks.find(
            (link) =>

                link
                    .dataset
                    .phase ===
                currentPhase

        );


    const viewport =
        lifecycle.querySelector(
            ".rmf-lifecycle__viewport"
        );


    if (
        !activeLink ||
        !viewport
    ) {
        return;
    }



    requestAnimationFrame(
        () => {


            const targetScrollPosition =
                activeLink.offsetLeft -
                viewport.clientWidth /
                2 +
                activeLink.clientWidth /
                2;



            const prefersReducedMotion =
                window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches;



            viewport.scrollTo({

                left:
                    targetScrollPosition,

                behavior:
                    prefersReducedMotion
                        ? "auto"
                        : "smooth"

            });

        }
    );

}



/* ==============================================================
   BACK TO TOP
============================================================== */

function initializeBackToTop() {


    const backToTopButton =
        document.querySelector(
            "[data-back-to-top]"
        );


    if (!backToTopButton) {
        return;
    }



    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;



    const updateBackToTopState =
        () => {


            backToTopButton
                .classList
                .toggle(
                    "is-visible",
                    window.scrollY >
                    600
                );

        };


    updateBackToTopState();



    window.addEventListener(
        "scroll",
        updateBackToTopState,
        {
            passive: true
        }
    );



    backToTopButton.addEventListener(
        "click",
        () => {


            window.scrollTo({

                top:
                    0,

                behavior:
                    prefersReducedMotion
                        ? "auto"
                        : "smooth"

            });

        }
    );

}



/* ==============================================================
   CURRENT YEAR
============================================================== */

function updateCurrentYear() {


    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );


    const currentYear =
        new Date()
            .getFullYear();



    yearElements.forEach(
        (element) => {


            element
                .textContent =
                currentYear;

        }
    );

}



/* ==============================================================
   HELPERS
============================================================== */

function formatPhaseName(
    phase
) {


    if (!phase) {
        return "";
    }


    return phase
        .split("-")
        .map(
            (word) => {

                return (
                    word
                        .charAt(0)
                        .toUpperCase() +
                    word.slice(1)
                );

            }
        )
        .join(" ");

}