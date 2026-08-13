/* ============================================================
   DARLING JACKSON PORTFOLIO
   TECH-FORWARD INTERACTIONS
   ============================================================ */


document.addEventListener("DOMContentLoaded", () => {


    /* ========================================================
       01. ELEMENT REFERENCES
    ======================================================== */

    const root =
        document.documentElement;

    const body =
        document.body;

    const siteHeader =
        document.getElementById("siteHeader");

    const themeToggle =
        document.getElementById("themeToggle");

    const themeColorMeta =
        document.getElementById("themeColorMeta");

    const menuToggle =
        document.getElementById("menuToggle");

    const mobileNavigation =
        document.getElementById("mobileNavigation");

    const pageProgressBar =
        document.getElementById("pageProgressBar");

    const typingText =
        document.getElementById("typingText");

    const visibleProjectCount =
        document.getElementById("visibleProjectCount");

    const backToTop =
        document.getElementById("backToTop");

    const currentYear =
        document.getElementById("currentYear");


    /* Current Build Console */

    const currentBuildName =
        document.getElementById("currentBuildName");

    const currentBuildDescription =
        document.getElementById("currentBuildDescription");

    const currentBuildPercentage =
        document.getElementById("currentBuildPercentage");

    const currentBuildCount =
        document.getElementById("currentBuildCount");

    const currentBuildProgress =
        document.getElementById("currentBuildProgress");

    const currentBuildProgressFill =
        document.getElementById("currentBuildProgressFill");


    /* Groups */

    const navLinks =
        document.querySelectorAll(".nav-link");

    const revealElements =
        document.querySelectorAll(".reveal");

    const filterButtons =
        document.querySelectorAll(".filter-button");

    const projectCards =
        document.querySelectorAll(".project-card");

    const stackTabs =
        document.querySelectorAll(".stack-tab");

    const stackPanels =
        document.querySelectorAll("[data-stack-panel]");

    const experienceTabs =
        document.querySelectorAll(".experience-tab");

    const experiencePanels =
        document.querySelectorAll("[data-experience-panel]");


    const reduceMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;



    /* ========================================================
       02. CURRENT YEAR
    ======================================================== */

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }



    /* ========================================================
       03. LIGHT / DARK THEME
    ======================================================== */

    function updateThemeInterface() {

        const currentTheme =
            root.dataset.theme || "dark";

        const nextTheme =
            currentTheme === "dark"
                ? "light"
                : "dark";


        if (themeToggle) {

            themeToggle.setAttribute(
                "aria-label",
                `Switch to ${nextTheme} mode`
            );

            themeToggle.setAttribute(
                "title",
                `Switch to ${nextTheme} mode`
            );

        }


        if (themeColorMeta) {

            themeColorMeta.setAttribute(
                "content",
                currentTheme === "dark"
                    ? "#070912"
                    : "#f5f7fb"
            );

        }

    }


    function toggleTheme() {

        const currentTheme =
            root.dataset.theme || "dark";

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


        updateThemeInterface();

    }


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            toggleTheme
        );

    }


    updateThemeInterface();



    /* ========================================================
       04. MOBILE NAVIGATION
    ======================================================== */

    function openMobileNavigation() {

        if (
            !menuToggle ||
            !mobileNavigation
        ) {
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


    function closeMobileNavigation() {

        if (
            !menuToggle ||
            !mobileNavigation
        ) {
            return;
        }


        menuToggle.classList.remove(
            "is-active"
        );

        mobileNavigation.classList.remove(
            "is-open"
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


    function toggleMobileNavigation() {

        if (!mobileNavigation) {
            return;
        }


        const isOpen =
            mobileNavigation.classList.contains(
                "is-open"
            );


        if (isOpen) {

            closeMobileNavigation();

        } else {

            openMobileNavigation();

        }

    }


    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            toggleMobileNavigation
        );

    }


    if (mobileNavigation) {

        mobileNavigation
            .querySelectorAll("a")
            .forEach((link) => {

                link.addEventListener(
                    "click",
                    closeMobileNavigation
                );

            });

    }



    /* ========================================================
       05. SMOOTH INTERNAL SCROLLING
    ======================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]:not([href="#"])'
        );


    internalLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const selector =
                    link.getAttribute("href");


                if (!selector) {
                    return;
                }


                const target =
                    document.querySelector(
                        selector
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior:
                        reduceMotion
                            ? "auto"
                            : "smooth",

                    block: "start"
                });


                closeMobileNavigation();

            }
        );

    });



    /* ========================================================
       06. STICKY HEADER
    ======================================================== */

    function updateHeader() {

        if (!siteHeader) {
            return;
        }


        siteHeader.classList.toggle(
            "is-scrolled",
            window.scrollY > 20
        );

    }



    /* ========================================================
       07. PAGE PROGRESS BAR
    ======================================================== */

    function updatePageProgress() {

        if (!pageProgressBar) {
            return;
        }


        const scrollTop =
            window.scrollY;

        const scrollHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;


        const progress =
            scrollHeight > 0
                ? (
                    scrollTop /
                    scrollHeight
                ) * 100
                : 0;


        pageProgressBar.style.width =
            `${Math.min(
                Math.max(
                    progress,
                    0
                ),
                100
            )}%`;

    }



    /* ========================================================
       08. ACTIVE DESKTOP NAVIGATION
    ======================================================== */

    const trackedSections = [
        "home",
        "projects",
        "stack",
        "development",
        "experience"
    ]
        .map((id) => {

            return document.getElementById(
                id
            );

        })
        .filter(Boolean);


    function updateActiveNavigation() {

        if (
            trackedSections.length === 0
        ) {
            return;
        }


        let currentId =
            trackedSections[0].id;


        const triggerPoint =
            window.innerHeight * 0.32;


        trackedSections.forEach(
            (section) => {

                const rect =
                    section.getBoundingClientRect();


                if (
                    rect.top <=
                    triggerPoint
                ) {

                    currentId =
                        section.id;

                }

            }
        );


        navLinks.forEach(
            (link) => {

                const href =
                    link.getAttribute("href");


                link.classList.toggle(
                    "is-active",
                    href ===
                    `#${currentId}`
                );

            }
        );

    }



    /* ========================================================
       09. ENGINEERING CONSOLE FOCUS TYPING
    ======================================================== */

    const typingMessages = [
        "Cloud Infrastructure",
        "Platform Engineering",
        "Identity & Access Management",
        "Enterprise Security",
        "Infrastructure Automation"
    ];


    let messageIndex = 0;
    let characterIndex = 0;
    let deleting = false;


    function runTypingEffect() {

        if (!typingText) {
            return;
        }


        if (reduceMotion) {

            typingText.textContent =
                typingMessages[0];

            return;

        }


        const message =
            typingMessages[
                messageIndex
            ];


        if (!deleting) {

            characterIndex += 1;


            typingText.textContent =
                message.slice(
                    0,
                    characterIndex
                );


            if (
                characterIndex ===
                message.length
            ) {

                deleting = true;


                window.setTimeout(
                    runTypingEffect,
                    1500
                );

                return;

            }

        } else {

            characterIndex -= 1;


            typingText.textContent =
                message.slice(
                    0,
                    characterIndex
                );


            if (
                characterIndex === 0
            ) {

                deleting = false;


                messageIndex =
                    (
                        messageIndex + 1
                    ) %
                    typingMessages.length;

            }

        }


        window.setTimeout(
            runTypingEffect,
            deleting
                ? 32
                : 58
        );

    }


    runTypingEffect();



    /* ========================================================
       10. CURRENT BUILD ROTATION
    ======================================================== */

    const activeBuilds = [

        {
            name:
                "Enterprise Security Compliance Lab",

            description:
                "RMF documentation, authorization artifacts, and Blue Fox Defense case study.",

            progress:
                42
        },

        {
            name:
                "Kubernetes Platform Lab",

            description:
                "Containers, Docker, Kubernetes, troubleshooting, and platform engineering practice.",

            progress:
                45
        }

    ];


    let currentBuildIndex = 0;


    function updateCurrentBuild() {

        if (
            !currentBuildName ||
            !currentBuildDescription ||
            !currentBuildPercentage ||
            !currentBuildProgressFill
        ) {
            return;
        }


        const build =
            activeBuilds[
                currentBuildIndex
            ];


        /*
         * Fade the text out first.
         */

        currentBuildName.style.opacity =
            "0";

        currentBuildDescription.style.opacity =
            "0";

        currentBuildPercentage.style.opacity =
            "0";


        window.setTimeout(
            () => {

                currentBuildName.textContent =
                    build.name;


                currentBuildDescription.textContent =
                    build.description;


                currentBuildPercentage.textContent =
                    `${build.progress}%`;


                currentBuildProgressFill.style.width =
                    `${build.progress}%`;


                if (currentBuildProgress) {

                    currentBuildProgress.setAttribute(
                        "aria-valuenow",
                        String(
                            build.progress
                        )
                    );

                }


                if (currentBuildCount) {

                    const currentNumber =
                        String(
                            currentBuildIndex + 1
                        ).padStart(
                            2,
                            "0"
                        );

                    const totalNumber =
                        String(
                            activeBuilds.length
                        ).padStart(
                            2,
                            "0"
                        );


                    currentBuildCount.textContent =
                        `${currentNumber} / ${totalNumber}`;

                }


                /*
                 * Fade the updated text back in.
                 */

                currentBuildName.style.opacity =
                    "1";

                currentBuildDescription.style.opacity =
                    "1";

                currentBuildPercentage.style.opacity =
                    "1";

            },
            reduceMotion
                ? 0
                : 250
        );

    }


    function rotateCurrentBuild() {

        currentBuildIndex =
            (
                currentBuildIndex + 1
            ) %
            activeBuilds.length;


        updateCurrentBuild();

    }


    updateCurrentBuild();


    if (
        !reduceMotion &&
        activeBuilds.length > 1
    ) {

        window.setInterval(
            rotateCurrentBuild,
            5000
        );

    }



    /* ========================================================
       11. PROJECT FILTERS
    ======================================================== */

    function updateProjectCount() {

        if (!visibleProjectCount) {
            return;
        }


        const visibleCards =
            Array
                .from(projectCards)
                .filter((card) => {

                    return !card
                        .classList
                        .contains(
                            "is-hidden"
                        );

                });


        visibleProjectCount.textContent =
            String(
                visibleCards.length
            );

    }


    function filterProjects(
        selectedFilter
    ) {

        projectCards.forEach(
            (card) => {

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

            }
        );


        updateProjectCount();

    }


    filterButtons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    const filter =
                        (
                            button.dataset.filter ||
                            "all"
                        )
                            .toLowerCase();


                    filterButtons.forEach(
                        (filterButton) => {

                            const active =
                                filterButton ===
                                button;


                            filterButton
                                .classList
                                .toggle(
                                    "is-active",
                                    active
                                );


                            filterButton
                                .setAttribute(
                                    "aria-pressed",
                                    String(active)
                                );

                        }
                    );


                    filterProjects(
                        filter
                    );

                }
            );

        }
    );


    updateProjectCount();



    /* ========================================================
       12. PROJECT POINTER GLOW
    ======================================================== */

    if (
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        projectCards.forEach(
            (card) => {

                card.addEventListener(
                    "pointermove",
                    (event) => {

                        const rect =
                            card.getBoundingClientRect();


                        const x =
                            event.clientX -
                            rect.left;


                        const y =
                            event.clientY -
                            rect.top;


                        card.style.setProperty(
                            "--mouse-x",
                            `${x}px`
                        );


                        card.style.setProperty(
                            "--mouse-y",
                            `${y}px`
                        );

                    }
                );

            }
        );

    }



    /* ========================================================
       13. ENGINEERING STACK TABS
    ======================================================== */

    function activateStack(
        stackName
    ) {

        stackTabs.forEach(
            (tab) => {

                const active =
                    tab.dataset.stack ===
                    stackName;


                tab.classList.toggle(
                    "is-active",
                    active
                );


                tab.setAttribute(
                    "aria-selected",
                    String(active)
                );

            }
        );


        stackPanels.forEach(
            (panel) => {

                panel.classList.toggle(
                    "is-active",
                    panel.dataset.stackPanel ===
                    stackName
                );

            }
        );

    }


    stackTabs.forEach(
        (tab, index) => {

            tab.addEventListener(
                "click",
                () => {

                    activateStack(
                        tab.dataset.stack
                    );

                }
            );


            tab.addEventListener(
                "keydown",
                (event) => {

                    if (
                        ![
                            "ArrowDown",
                            "ArrowUp",
                            "ArrowRight",
                            "ArrowLeft"
                        ].includes(event.key)
                    ) {
                        return;
                    }


                    event.preventDefault();


                    const direction =
                        (
                            event.key ===
                            "ArrowDown" ||
                            event.key ===
                            "ArrowRight"
                        )
                            ? 1
                            : -1;


                    const nextIndex =
                        (
                            index +
                            direction +
                            stackTabs.length
                        ) %
                        stackTabs.length;


                    const nextTab =
                        stackTabs[
                            nextIndex
                        ];


                    activateStack(
                        nextTab.dataset.stack
                    );


                    nextTab.focus();

                }
            );

        }
    );



    /* ========================================================
       14. EXPERIENCE TABS
    ======================================================== */

    function activateExperience(
        experienceName
    ) {

        experienceTabs.forEach(
            (tab) => {

                const active =
                    tab.dataset.experience ===
                    experienceName;


                tab.classList.toggle(
                    "is-active",
                    active
                );


                tab.setAttribute(
                    "aria-selected",
                    String(active)
                );

            }
        );


        experiencePanels.forEach(
            (panel) => {

                panel.classList.toggle(
                    "is-active",
                    panel.dataset.experiencePanel ===
                    experienceName
                );

            }
        );

    }


    experienceTabs.forEach(
        (tab, index) => {

            tab.addEventListener(
                "click",
                () => {

                    activateExperience(
                        tab.dataset.experience
                    );

                }
            );


            tab.addEventListener(
                "keydown",
                (event) => {

                    if (
                        ![
                            "ArrowDown",
                            "ArrowUp",
                            "ArrowRight",
                            "ArrowLeft"
                        ].includes(event.key)
                    ) {
                        return;
                    }


                    event.preventDefault();


                    const direction =
                        (
                            event.key ===
                            "ArrowDown" ||
                            event.key ===
                            "ArrowRight"
                        )
                            ? 1
                            : -1;


                    const nextIndex =
                        (
                            index +
                            direction +
                            experienceTabs.length
                        ) %
                        experienceTabs.length;


                    const nextTab =
                        experienceTabs[
                            nextIndex
                        ];


                    activateExperience(
                        nextTab.dataset.experience
                    );


                    nextTab.focus();

                }
            );

        }
    );



    /* ========================================================
       15. SCROLL REVEAL
    ======================================================== */

    function initializeReveal() {

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
                        "is-visible"
                    );

                }
            );

            return;

        }


        const observer =
            new IntersectionObserver(
                (
                    entries,
                    revealObserver
                ) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            entry.target
                                .classList
                                .add(
                                    "is-visible"
                                );


                            revealObserver
                                .unobserve(
                                    entry.target
                                );

                        }
                    );

                },
                {
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -5% 0px"
                }
            );


        revealElements.forEach(
            (element) => {

                observer.observe(
                    element
                );

            }
        );

    }


    initializeReveal();



    /* ========================================================
       16. BACK TO TOP
    ======================================================== */

    function updateBackToTop() {

        if (!backToTop) {
            return;
        }


        backToTop.classList.toggle(
            "is-visible",
            window.scrollY > 650
        );

    }


    if (backToTop) {

        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,

                    behavior:
                        reduceMotion
                            ? "auto"
                            : "smooth"
                });

            }
        );

    }



    /* ========================================================
       17. ESCAPE KEY
    ======================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape"
            ) {

                closeMobileNavigation();

            }

        }
    );



    /* ========================================================
       18. RESIZE
    ======================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 900
            ) {

                closeMobileNavigation();

            }

        }
    );



    /* ========================================================
       19. SHARED SCROLL HANDLER
    ======================================================== */

    let ticking = false;


    function handleScroll() {

        if (ticking) {
            return;
        }


        ticking = true;


        requestAnimationFrame(
            () => {

                updateHeader();

                updatePageProgress();

                updateActiveNavigation();

                updateBackToTop();


                ticking = false;

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



    /* ========================================================
       20. INITIAL PAGE STATE
    ======================================================== */

    updateHeader();

    updatePageProgress();

    updateActiveNavigation();

    updateBackToTop();

});

