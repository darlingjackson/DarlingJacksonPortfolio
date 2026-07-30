/* ==========================================================================

   DARLING JACKSON PORTFOLIO
   Main JavaScript

   Author: Darling Jackson
   Created: July 2026
   Last Updated: July 2026
   Version: 4.0

   DESCRIPTION
   --------------------------------------------------------------------------
   This file controls the interactive features throughout my portfolio.

   It is written to match the standardized HTML and CSS component system.

   FEATURES
   --------------------------------------------------------------------------
   01. Theme Toggle
   02. Sticky Header
   03. Mobile Navigation
   04. Page Progress Bar
   05. Active Navigation State
   06. Smooth Anchor Scrolling
   07. Typing Effect
   08. Project Filtering
   09. Experience Tabs
   10. Scroll Reveal Animations
   11. Back to Top Button
   12. Current Year
   13. Keyboard Accessibility

   ========================================================================== */


document.addEventListener("DOMContentLoaded", () => {

    /* ======================================================================
       01. ELEMENT REFERENCES
       ======================================================================

       I keep my main element references together so they are easier to find
       and update later.
    */

    const root = document.documentElement;
    const body = document.body;

    const siteHeader = document.querySelector(".site-header");

    const themeToggle = document.getElementById("themeToggle");

    const menuToggle = document.getElementById("menuToggle");
    const mobileNavigation = document.getElementById("mobileNavigation");

    const pageProgressBar = document.getElementById("pageProgressBar");

    const backToTop = document.getElementById("backToTop");

    const typingText = document.getElementById("typingText");

    const currentYear = document.getElementById("currentYear");

    const navigationLinks = document.querySelectorAll(
        ".site-navigation__link"
    );

    const projectFilterButtons = document.querySelectorAll(
        ".filter-button"
    );

    const projectCards = document.querySelectorAll(
        ".project-card"
    );

    const visibleProjectCount = document.getElementById(
        "visibleProjectCount"
    );

    const experienceTabs = document.querySelectorAll(
        ".experience-tab"
    );

    const experiencePanels = document.querySelectorAll(
        ".experience-panel"
    );

    const revealElements = document.querySelectorAll(
        ".reveal"
    );


    /* ======================================================================
       02. SMALL HELPER FUNCTIONS
       ====================================================================== */

    function setButtonState(button, isActive) {

        if (!button) {
            return;
        }

        button.classList.toggle(
            "is-active",
            isActive
        );

        button.setAttribute(
            "aria-pressed",
            String(isActive)
        );
    }


    function closeMobileNavigation() {

        if (!menuToggle || !mobileNavigation) {
            return;
        }

        menuToggle.classList.remove(
            "is-active",
            "active"
        );

        mobileNavigation.classList.remove(
            "is-open",
            "open"
        );

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        mobileNavigation.setAttribute(
            "aria-hidden",
            "true"
        );

        body.classList.remove(
            "menu-open"
        );
    }


    function openMobileNavigation() {

        if (!menuToggle || !mobileNavigation) {
            return;
        }

        menuToggle.classList.add(
            "is-active"
        );

        mobileNavigation.classList.add(
            "is-open"
        );

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        mobileNavigation.setAttribute(
            "aria-hidden",
            "false"
        );

        body.classList.add(
            "menu-open"
        );
    }


    function toggleMobileNavigation() {

        if (!mobileNavigation) {
            return;
        }

        const navigationIsOpen =
            mobileNavigation.classList.contains(
                "is-open"
            ) ||
            mobileNavigation.classList.contains(
                "open"
            );

        if (navigationIsOpen) {
            closeMobileNavigation();
        } else {
            openMobileNavigation();
        }
    }


    /* ======================================================================
       03. THEME TOGGLE
       ======================================================================

       The selected theme is saved in localStorage so the portfolio remembers
       the visitor's choice when they return.
    */

    const storedTheme = localStorage.getItem(
        "portfolio-theme"
    );

    const preferredTheme =
        window.matchMedia(
            "(prefers-color-scheme: light)"
        ).matches
            ? "light"
            : "dark";

    const startingTheme =
        storedTheme ||
        root.dataset.theme ||
        preferredTheme;

    root.dataset.theme = startingTheme;


    function updateThemeToggleLabel() {

        if (!themeToggle) {
            return;
        }

        const currentTheme =
            root.dataset.theme;

        const nextTheme =
            currentTheme === "dark"
                ? "light"
                : "dark";

        themeToggle.setAttribute(
            "aria-label",
            `Switch to ${nextTheme} theme`
        );

        themeToggle.setAttribute(
            "title",
            `Switch to ${nextTheme} theme`
        );
    }


    function toggleTheme() {

        const currentTheme =
            root.dataset.theme;

        const nextTheme =
            currentTheme === "dark"
                ? "light"
                : "dark";

        root.dataset.theme =
            nextTheme;

        localStorage.setItem(
            "portfolio-theme",
            nextTheme
        );

        updateThemeToggleLabel();
    }


    updateThemeToggleLabel();


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            toggleTheme
        );
    }


    /* ======================================================================
       04. STICKY HEADER
       ====================================================================== */

    function updateHeaderState() {

        if (!siteHeader) {
            return;
        }

        siteHeader.classList.toggle(
            "is-scrolled",
            window.scrollY > 24
        );

        /*
         * The previous CSS also supported the older "scrolled" class.
         * I keep both temporarily so the page remains stable while I finish
         * standardizing every file.
         */

        siteHeader.classList.toggle(
            "scrolled",
            window.scrollY > 24
        );
    }


    /* ======================================================================
       05. MOBILE NAVIGATION
       ====================================================================== */

    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            toggleMobileNavigation
        );
    }


    navigationLinks.forEach((link) => {

        link.addEventListener("click", () => {

            closeMobileNavigation();
        });
    });


    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeMobileNavigation();
        }
    });


    document.addEventListener("click", (event) => {

        if (
            !mobileNavigation ||
            !menuToggle ||
            !mobileNavigation.classList.contains(
                "is-open"
            )
        ) {
            return;
        }

        const clickedInsideNavigation =
            mobileNavigation.contains(
                event.target
            );

        const clickedMenuButton =
            menuToggle.contains(
                event.target
            );

        if (
            !clickedInsideNavigation &&
            !clickedMenuButton
        ) {
            closeMobileNavigation();
        }
    });


    window.addEventListener("resize", () => {

        if (window.innerWidth > 1024) {
            closeMobileNavigation();
        }
    });


    /* ======================================================================
       06. PAGE PROGRESS BAR
       ====================================================================== */

    function updatePageProgress() {

        if (!pageProgressBar) {
            return;
        }

        const scrollTop =
            window.scrollY ||
            document.documentElement.scrollTop;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const scrollPercentage =
            documentHeight > 0
                ? (
                    scrollTop /
                    documentHeight
                ) * 100
                : 0;

        const safePercentage =
            Math.min(
                Math.max(
                    scrollPercentage,
                    0
                ),
                100
            );

        pageProgressBar.style.width =
            `${safePercentage}%`;

        pageProgressBar.setAttribute(
            "aria-valuenow",
            String(
                Math.round(
                    safePercentage
                )
            )
        );
    }


    /* ======================================================================
       07. ACTIVE NAVIGATION STATE
       ======================================================================

       This highlights the navigation item that matches the section currently
       visible on the page.
    */

    const observedSections = [
        "home",
        "projects",
        "roadmap",
        "experience"
    ]
        .map((sectionId) => {
            return document.getElementById(
                sectionId
            );
        })
        .filter(Boolean);


    function updateActiveNavigation() {

        if (
            observedSections.length === 0 ||
            navigationLinks.length === 0
        ) {
            return;
        }

        const headerOffset =
            siteHeader
                ? siteHeader.offsetHeight + 80
                : 140;

        let activeSectionId =
            observedSections[0].id;

        observedSections.forEach((section) => {

            const sectionTop =
                section.offsetTop -
                headerOffset;

            if (
                window.scrollY >=
                sectionTop
            ) {
                activeSectionId =
                    section.id;
            }
        });


        navigationLinks.forEach((link) => {

            const linkTarget =
                link.getAttribute("href");

            const isActive =
                linkTarget ===
                `#${activeSectionId}`;

            link.classList.toggle(
                "is-active",
                isActive
            );

            link.classList.toggle(
                "active",
                isActive
            );

            if (isActive) {

                link.setAttribute(
                    "aria-current",
                    "page"
                );

            } else {

                link.removeAttribute(
                    "aria-current"
                );
            }
        });
    }


    /* ======================================================================
       08. SMOOTH ANCHOR SCROLLING
       ====================================================================== */

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]:not([href="#"])'
        );


    anchorLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetSelector =
                    link.getAttribute(
                        "href"
                    );

                if (!targetSelector) {
                    return;
                }

                const targetElement =
                    document.querySelector(
                        targetSelector
                    );

                if (!targetElement) {
                    return;
                }

                event.preventDefault();

                targetElement.scrollIntoView({
                    behavior:
                        window.matchMedia(
                            "(prefers-reduced-motion: reduce)"
                        ).matches
                            ? "auto"
                            : "smooth",

                    block: "start"
                });

                history.replaceState(
                    null,
                    "",
                    targetSelector
                );

                closeMobileNavigation();
            }
        );
    });


    /* ======================================================================
       09. TYPING EFFECT
       ======================================================================

       This rotates through the core technical areas shown inside the hero
       engineering console.
    */

    const typingMessages = [
        "Cloud Infrastructure",
        "Platform Engineering",
        "Identity and Access Management",
        "Enterprise Security",
        "Infrastructure Automation"
    ];

    let typingMessageIndex = 0;
    let typingCharacterIndex = 0;
    let typingIsDeleting = false;
    let typingTimer = null;


    function runTypingEffect() {

        if (!typingText) {
            return;
        }

        const currentMessage =
            typingMessages[
                typingMessageIndex
            ];

        if (!typingIsDeleting) {

            typingCharacterIndex += 1;

            typingText.textContent =
                currentMessage.slice(
                    0,
                    typingCharacterIndex
                );

            if (
                typingCharacterIndex ===
                currentMessage.length
            ) {

                typingIsDeleting = true;

                typingTimer =
                    window.setTimeout(
                        runTypingEffect,
                        1700
                    );

                return;
            }

        } else {

            typingCharacterIndex -= 1;

            typingText.textContent =
                currentMessage.slice(
                    0,
                    typingCharacterIndex
                );

            if (
                typingCharacterIndex === 0
            ) {

                typingIsDeleting = false;

                typingMessageIndex =
                    (
                        typingMessageIndex + 1
                    ) %
                    typingMessages.length;
            }
        }

        const typingSpeed =
            typingIsDeleting
                ? 38
                : 72;

        typingTimer =
            window.setTimeout(
                runTypingEffect,
                typingSpeed
            );
    }


    if (typingText) {

        const reduceMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

        if (reduceMotion) {

            typingText.textContent =
                typingMessages[0];

        } else {

            runTypingEffect();
        }
    }


    /* ======================================================================
       10. PROJECT FILTERING
       ====================================================================== */

    function updateVisibleProjectCount() {

        if (!visibleProjectCount) {
            return;
        }

        const visibleCards =
            Array.from(
                projectCards
            ).filter((card) => {
                return !card.classList.contains(
                    "is-hidden"
                );
            });

        visibleProjectCount.textContent =
            String(
                visibleCards.length
            );
    }


    function filterProjects(selectedFilter) {

        projectCards.forEach((card) => {

            const categories =
                (
                    card.dataset.category ||
                    ""
                )
                    .toLowerCase()
                    .split(/\s+/)
                    .filter(Boolean);

            const shouldShow =
                selectedFilter === "all" ||
                categories.includes(
                    selectedFilter
                );

            card.classList.toggle(
                "is-hidden",
                !shouldShow
            );

            card.setAttribute(
                "aria-hidden",
                String(!shouldShow)
            );
        });

        updateVisibleProjectCount();
    }


    projectFilterButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const selectedFilter =
                    (
                        button.dataset.filter ||
                        "all"
                    ).toLowerCase();

                projectFilterButtons.forEach(
                    (filterButton) => {

                        setButtonState(
                            filterButton,
                            filterButton === button
                        );
                    }
                );

                filterProjects(
                    selectedFilter
                );
            }
        );
    });


    updateVisibleProjectCount();


    /* ======================================================================
       11. EXPERIENCE TABS
       ====================================================================== */

    function activateExperienceTab(
        selectedTab
    ) {

        const selectedExperience =
            selectedTab.dataset.experience;

        if (!selectedExperience) {
            return;
        }


        experienceTabs.forEach((tab) => {

            const isSelected =
                tab === selectedTab;

            tab.classList.toggle(
                "is-active",
                isSelected
            );

            tab.classList.toggle(
                "active",
                isSelected
            );

            tab.setAttribute(
                "aria-selected",
                String(isSelected)
            );

            tab.setAttribute(
                "tabindex",
                isSelected
                    ? "0"
                    : "-1"
            );
        });


        experiencePanels.forEach(
            (panel) => {

                const panelMatches =
                    panel.dataset.panel ===
                    selectedExperience;

                panel.classList.toggle(
                    "is-active",
                    panelMatches
                );

                panel.classList.toggle(
                    "active",
                    panelMatches
                );

                panel.hidden =
                    !panelMatches;
            }
        );
    }


    experienceTabs.forEach(
        (tab, tabIndex) => {

            tab.addEventListener(
                "click",
                () => {

                    activateExperienceTab(
                        tab
                    );
                }
            );


            tab.addEventListener(
                "keydown",
                (event) => {

                    const supportedKeys = [
                        "ArrowRight",
                        "ArrowDown",
                        "ArrowLeft",
                        "ArrowUp",
                        "Home",
                        "End"
                    ];

                    if (
                        !supportedKeys.includes(
                            event.key
                        )
                    ) {
                        return;
                    }

                    event.preventDefault();

                    let nextTabIndex =
                        tabIndex;


                    if (
                        event.key ===
                        "ArrowRight" ||
                        event.key ===
                        "ArrowDown"
                    ) {

                        nextTabIndex =
                            (
                                tabIndex + 1
                            ) %
                            experienceTabs.length;
                    }


                    if (
                        event.key ===
                        "ArrowLeft" ||
                        event.key ===
                        "ArrowUp"
                    ) {

                        nextTabIndex =
                            (
                                tabIndex - 1 +
                                experienceTabs.length
                            ) %
                            experienceTabs.length;
                    }


                    if (
                        event.key === "Home"
                    ) {

                        nextTabIndex = 0;
                    }


                    if (
                        event.key === "End"
                    ) {

                        nextTabIndex =
                            experienceTabs.length - 1;
                    }


                    const nextTab =
                        experienceTabs[
                            nextTabIndex
                        ];

                    activateExperienceTab(
                        nextTab
                    );

                    nextTab.focus();
                }
            );
        }
    );


    /* ======================================================================
       12. SCROLL REVEAL ANIMATIONS
       ====================================================================== */

    function initializeRevealAnimations() {

        if (
            revealElements.length === 0
        ) {
            return;
        }

        const reduceMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

        if (
            reduceMotion ||
            !(
                "IntersectionObserver"
                in window
            )
        ) {

            revealElements.forEach(
                (element) => {

                    element.classList.add(
                        "is-visible",
                        "visible"
                    );
                }
            );

            return;
        }


        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }

                            entry.target.classList.add(
                                "is-visible",
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );
                        }
                    );
                },
                {
                    threshold: 0.14,

                    rootMargin:
                        "0px 0px -6% 0px"
                }
            );


        revealElements.forEach(
            (element) => {

                revealObserver.observe(
                    element
                );
            }
        );
    }


    initializeRevealAnimations();


    /* ======================================================================
       13. BACK TO TOP BUTTON
       ====================================================================== */

    function updateBackToTopButton() {

        if (!backToTop) {
            return;
        }

        const shouldShow =
            window.scrollY > 650;

        backToTop.classList.toggle(
            "is-visible",
            shouldShow
        );

        backToTop.classList.toggle(
            "visible",
            shouldShow
        );
    }


    if (backToTop) {

        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,

                    behavior:
                        window.matchMedia(
                            "(prefers-reduced-motion: reduce)"
                        ).matches
                            ? "auto"
                            : "smooth"
                });
            }
        );
    }


    /* ======================================================================
       14. CURRENT YEAR
       ====================================================================== */

    if (currentYear) {

        currentYear.textContent =
            String(
                new Date().getFullYear()
            );
    }


    /* ======================================================================
       15. GLOBAL SCROLL UPDATES
       ======================================================================

       These features all depend on the visitor's scroll position, so I update
       them together instead of creating several separate scroll listeners.
    */

    let scrollUpdateRequested = false;


    function handleScroll() {

        if (scrollUpdateRequested) {
            return;
        }

        scrollUpdateRequested = true;

        window.requestAnimationFrame(
            () => {

                updateHeaderState();

                updatePageProgress();

                updateActiveNavigation();

                updateBackToTopButton();

                scrollUpdateRequested = false;
            }
        );
    }


    window.addEventListener(
        "scroll",
        handleScroll,
        {
            passive: true
        }
    );


    /* ======================================================================
       16. INITIAL PAGE STATE
       ====================================================================== */

    updateHeaderState();

    updatePageProgress();

    updateActiveNavigation();

    updateBackToTopButton();

});