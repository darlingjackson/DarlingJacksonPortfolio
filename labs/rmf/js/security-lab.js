/* ==============================================================
   BLUE FOX DEFENSE — ENTERPRISE SECURITY COMPLIANCE LAB
   Shared JavaScript

   Used for:
   - Theme switching
   - Mobile navigation
   - Sticky header behavior
   - Scroll reveal animations
   - RMF lifecycle phase states
   - RMF lifecycle progress
   - RMF keyboard navigation
   - Back-to-top button
   - Current footer year
============================================================== */

"use strict";


/* ==============================================================
   01. RMF PHASE ORDER

   The order must match the lifecycle links in the HTML.

   Each RMF phase page can identify its current phase by adding
   data-current-phase to the body element.

   Example:

   <body data-current-phase="prepare">
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
   02. PAGE INITIALIZATION
============================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initializeTheme();
    initializeMobileNavigation();
    initializeStickyHeader();
    initializeScrollReveal();
    initializeLifecycle();
    initializeBackToTop();
    updateCurrentYear();
});


/* ==============================================================
   03. THEME SWITCHER

   The selected theme is saved in localStorage. When no saved
   theme exists, the site follows the visitor's system preference.
============================================================== */

function initializeTheme() {
    const root = document.documentElement;
    const themeToggle = document.querySelector(
        "[data-theme-toggle]"
    );

    if (!themeToggle) {
        return;
    }

    const savedTheme = localStorage.getItem("bfd-theme");

    const systemPrefersLight = window.matchMedia(
        "(prefers-color-scheme: light)"
    ).matches;

    const initialTheme =
        savedTheme ||
        root.getAttribute("data-theme") ||
        (systemPrefersLight ? "light" : "dark");

    applyTheme(initialTheme, themeToggle);

    themeToggle.addEventListener("click", () => {
        const currentTheme = root.getAttribute("data-theme");

        const nextTheme =
            currentTheme === "light"
                ? "dark"
                : "light";

        applyTheme(nextTheme, themeToggle);

        localStorage.setItem(
            "bfd-theme",
            nextTheme
        );
    });


    /*
       Continue following system theme changes until the visitor
       manually saves a theme preference.
    */

    const systemThemeQuery = window.matchMedia(
        "(prefers-color-scheme: light)"
    );

    systemThemeQuery.addEventListener("change", (event) => {
        const hasSavedTheme =
            localStorage.getItem("bfd-theme");

        if (hasSavedTheme) {
            return;
        }

        applyTheme(
            event.matches ? "light" : "dark",
            themeToggle
        );
    });
}


/*
   Apply the selected theme and update the accessibility state of
   the theme button.
*/

function applyTheme(theme, themeToggle) {
    const root = document.documentElement;
    const isLightTheme = theme === "light";

    root.setAttribute(
        "data-theme",
        theme
    );

    themeToggle.setAttribute(
        "aria-pressed",
        String(isLightTheme)
    );

    themeToggle.setAttribute(
        "aria-label",
        isLightTheme
            ? "Switch to dark mode"
            : "Switch to light mode"
    );

    updateThemeColor(theme);
}


/*
   Update the browser interface color on supported devices.
*/

function updateThemeColor(theme) {
    const themeColorMeta = document.querySelector(
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
   04. MOBILE NAVIGATION
============================================================== */

function initializeMobileNavigation() {
    const menuToggle = document.querySelector(
        "[data-menu-toggle]"
    );

    const mobileNavigation = document.querySelector(
        "[data-mobile-nav]"
    );

    if (!menuToggle || !mobileNavigation) {
        return;
    }

    const mobileLinks =
        mobileNavigation.querySelectorAll("a");


    /*
       Open or close the navigation when the menu button is used.
    */

    menuToggle.addEventListener("click", () => {
        const isOpen =
            menuToggle.getAttribute("aria-expanded") === "true";

        setMobileNavigationState(
            !isOpen,
            menuToggle,
            mobileNavigation
        );
    });


    /*
       Close the menu after a navigation link is selected.
    */

    mobileLinks.forEach((link) => {
        link.addEventListener("click", () => {
            setMobileNavigationState(
                false,
                menuToggle,
                mobileNavigation
            );
        });
    });


    /*
       Close the menu when Escape is pressed.
    */

    document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") {
            return;
        }

        setMobileNavigationState(
            false,
            menuToggle,
            mobileNavigation
        );

        menuToggle.focus();
    });


    /*
       Close the menu when the visitor clicks outside the header.
    */

    document.addEventListener("click", (event) => {
        const isOpen =
            menuToggle.getAttribute("aria-expanded") === "true";

        if (!isOpen) {
            return;
        }

        const clickedMenuToggle =
            menuToggle.contains(event.target);

        const clickedMobileNavigation =
            mobileNavigation.contains(event.target);

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
    });


    /*
       Reset the menu when the screen returns to desktop width.
    */

    window.addEventListener("resize", () => {
        if (window.innerWidth <= 900) {
            return;
        }

        setMobileNavigationState(
            false,
            menuToggle,
            mobileNavigation
        );
    });
}


/*
   Control the visual and accessibility states of the mobile menu.
*/

function setMobileNavigationState(
    shouldOpen,
    menuToggle,
    mobileNavigation
) {
    menuToggle.setAttribute(
        "aria-expanded",
        String(shouldOpen)
    );

    menuToggle.setAttribute(
        "aria-label",
        shouldOpen
            ? "Close navigation menu"
            : "Open navigation menu"
    );

    mobileNavigation.classList.toggle(
        "is-open",
        shouldOpen
    );

    document.body.classList.toggle(
        "menu-is-open",
        shouldOpen
    );
}


/* ==============================================================
   05. STICKY HEADER
============================================================== */

function initializeStickyHeader() {
    const siteHeader = document.querySelector(
        "[data-site-header]"
    );

    if (!siteHeader) {
        return;
    }

    const updateHeaderState = () => {
        siteHeader.classList.toggle(
            "is-scrolled",
            window.scrollY > 18
        );
    };

    updateHeaderState();

    window.addEventListener(
        "scroll",
        updateHeaderState,
        { passive: true }
    );
}


/* ==============================================================
   06. SCROLL REVEAL
============================================================== */

function initializeScrollReveal() {
    const revealElements = document.querySelectorAll(
        "[data-reveal]"
    );

    if (!revealElements.length) {
        return;
    }

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
        prefersReducedMotion ||
        !("IntersectionObserver" in window)
    ) {
        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });

        return;
    }

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("is-visible");

                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.14,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
}


/* ==============================================================
   07. RMF LIFECYCLE

   The introduction page does not mark a phase as active.

   On each RMF page, add its phase to the body:

   <body data-current-phase="prepare">
============================================================== */

function initializeLifecycle() {
    const lifecycle = document.querySelector(
        "[data-rmf-lifecycle]"
    );

    const lifecycleTrack = document.querySelector(
        "[data-lifecycle-track]"
    );

    if (!lifecycle || !lifecycleTrack) {
        return;
    }

    const phaseLinks = Array.from(
        lifecycleTrack.querySelectorAll("[data-phase]")
    );

    const progressLine = lifecycleTrack.querySelector(
        "[data-lifecycle-progress]"
    );

    const currentPhase =
        document.body.dataset.currentPhase || null;

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


/*
   Apply active and completed styles based on the phase identified
   on the body element.
*/

function setLifecycleStates(
    phaseLinks,
    currentPhase,
    progressLine
) {
    const activePhaseIndex =
        RMF_PHASES.indexOf(currentPhase);

    phaseLinks.forEach((link) => {
        const phase = link.dataset.phase;

        const phaseIndex =
            RMF_PHASES.indexOf(phase);

        const isActive =
            activePhaseIndex !== -1 &&
            phaseIndex === activePhaseIndex;

        const isComplete =
            activePhaseIndex !== -1 &&
            phaseIndex < activePhaseIndex;

        link.classList.toggle(
            "is-active",
            isActive
        );

        link.classList.toggle(
            "is-complete",
            isComplete
        );

        if (isActive) {
            link.setAttribute(
                "aria-current",
                "step"
            );
        } else {
            link.removeAttribute("aria-current");
        }
    });

    if (!progressLine) {
        return;
    }

    const progressPercentage =
        activePhaseIndex === -1
            ? 0
            : (
                (activePhaseIndex + 1) /
                RMF_PHASES.length
            ) * 100;

    requestAnimationFrame(() => {
        progressLine.style.width =
            `${progressPercentage}%`;
    });
}


/* ==============================================================
   08. RMF HOVER AND FOCUS PREVIEW

   Update the lifecycle status as visitors hover over or focus on
   each phase.
============================================================== */

function initializeLifecyclePreview(
    lifecycle,
    phaseLinks,
    currentPhase
) {
    const statusValue = lifecycle.querySelector(
        ".rmf-lifecycle__status-value"
    );

    if (!statusValue) {
        return;
    }

    const defaultStatus = currentPhase
        ? formatPhaseName(currentPhase)
        : "Case Study Introduction";

    phaseLinks.forEach((link) => {
        const phase = link.dataset.phase;

        const summary = link.querySelector(
            ".rmf-phase-link__summary"
        );

        const phaseName =
            formatPhaseName(phase);

        const phaseSummary = summary
            ? summary.textContent.trim()
            : "";

        const previewText = phaseSummary
            ? `${phaseName} — ${phaseSummary}`
            : phaseName;

        const showPreview = () => {
            statusValue.textContent = previewText;
        };

        const restoreStatus = () => {
            statusValue.textContent = defaultStatus;
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
    });
}


/* ==============================================================
   09. RMF KEYBOARD NAVIGATION

   Arrow Right: Move to the next phase
   Arrow Left:  Move to the previous phase
   Home:        Move to Prepare
   End:         Move to Monitor
============================================================== */

function initializeLifecycleKeyboardNavigation(
    phaseLinks
) {
    phaseLinks.forEach((link, index) => {
        link.addEventListener("keydown", (event) => {
            let nextIndex = null;

            switch (event.key) {
                case "ArrowRight":
                    nextIndex =
                        index === phaseLinks.length - 1
                            ? 0
                            : index + 1;
                    break;

                case "ArrowLeft":
                    nextIndex =
                        index === 0
                            ? phaseLinks.length - 1
                            : index - 1;
                    break;

                case "Home":
                    nextIndex = 0;
                    break;

                case "End":
                    nextIndex =
                        phaseLinks.length - 1;
                    break;

                default:
                    return;
            }

            event.preventDefault();

            phaseLinks[nextIndex].focus();
        });
    });
}


/* ==============================================================
   10. CENTER ACTIVE RMF PHASE

   On smaller screens, automatically scroll the lifecycle so the
   active phase is visible.
============================================================== */

function centerActiveLifecyclePhase(
    lifecycle,
    phaseLinks,
    currentPhase
) {
    if (!currentPhase) {
        return;
    }

    const activeLink = phaseLinks.find(
        (link) =>
            link.dataset.phase === currentPhase
    );

    const viewport = lifecycle.querySelector(
        ".rmf-lifecycle__viewport"
    );

    if (!activeLink || !viewport) {
        return;
    }

    requestAnimationFrame(() => {
        const targetScrollPosition =
            activeLink.offsetLeft -
            viewport.clientWidth / 2 +
            activeLink.clientWidth / 2;

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        viewport.scrollTo({
            left: targetScrollPosition,
            behavior: prefersReducedMotion
                ? "auto"
                : "smooth"
        });
    });
}


/* ==============================================================
   11. BACK TO TOP

   The button appears after the visitor moves farther down the
   page and returns them smoothly to the top.
============================================================== */

function initializeBackToTop() {
    const backToTopButton = document.querySelector(
        "[data-back-to-top]"
    );

    if (!backToTopButton) {
        return;
    }

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const updateBackToTopState = () => {
        backToTopButton.classList.toggle(
            "is-visible",
            window.scrollY > 600
        );
    };

    updateBackToTopState();

    window.addEventListener(
        "scroll",
        updateBackToTopState,
        { passive: true }
    );

    backToTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion
                ? "auto"
                : "smooth"
        });
    });
}


/* ==============================================================
   12. CURRENT YEAR
============================================================== */

function updateCurrentYear() {
    const yearElements = document.querySelectorAll(
        "[data-current-year]"
    );

    const currentYear =
        new Date().getFullYear();

    yearElements.forEach((element) => {
        element.textContent = currentYear;
    });
}


/* ==============================================================
   13. HELPERS
============================================================== */

/*
   Convert an internal phase value into a display name.

   Example:
   "prepare" becomes "Prepare"
*/

function formatPhaseName(phase) {
    if (!phase) {
        return "";
    }

    return phase
        .split("-")
        .map((word) => {
            return (
                word.charAt(0).toUpperCase() +
                word.slice(1)
            );
        })
        .join(" ");
}