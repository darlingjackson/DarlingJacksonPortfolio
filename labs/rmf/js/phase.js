"use strict";


/* ==============================================================
   BLUE FOX DEFENSE
   SHARED RMF PHASE JAVASCRIPT

   security-lab.js still controls:
   - Theme
   - Mobile menu
   - Header
   - Reveal animations
   - RMF lifecycle
   - Back to top
   - Footer year

   phase.js controls:
   - Timeline accordion
   - Dashboard progress
   - Optional phase section navigation
   - Artifact cards
============================================================== */



/* ==============================================================
   INITIALIZATION
============================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeTimelineAccordion();

        initializeDashboardProgress();

        initializePhaseSectionNavigation();

        initializeArtifactCards();

    }
);



/* ==============================================================
   TIMELINE ACCORDION
============================================================== */

function initializeTimelineAccordion() {


    const timeline =
        document.querySelector(
            ".phase-timeline"
        );


    if (!timeline) {
        return;
    }


    const detailElements =
        Array.from(
            timeline.querySelectorAll(
                ".timeline-entry__details"
            )
        );


    if (!detailElements.length) {
        return;
    }



    detailElements.forEach(
        (detailsElement) => {


            detailsElement.addEventListener(
                "toggle",
                () => {


                    if (
                        !detailsElement.open
                    ) {
                        return;
                    }


                    closeOtherTimelineDetails(
                        detailElements,
                        detailsElement
                    );


                    scrollOpenTimelineEntryIntoView(
                        detailsElement
                    );

                }
            );

        }
    );

}



/* ==============================================================
   CLOSE OTHER TIMELINE ITEMS
============================================================== */

function closeOtherTimelineDetails(
    detailElements,
    activeDetails
) {


    detailElements.forEach(
        (detailsElement) => {


            if (
                detailsElement ===
                activeDetails
            ) {
                return;
            }


            detailsElement.open =
                false;

        }
    );

}



/* ==============================================================
   MOBILE TIMELINE SCROLL
============================================================== */

function scrollOpenTimelineEntryIntoView(
    detailsElement
) {


    if (
        window.innerWidth >
        900
    ) {
        return;
    }


    const timelineEntry =
        detailsElement.closest(
            ".timeline-entry"
        );


    if (!timelineEntry) {
        return;
    }


    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;



    window.setTimeout(
        () => {


            timelineEntry.scrollIntoView({

                behavior:
                    prefersReducedMotion
                        ? "auto"
                        : "smooth",

                block:
                    "start"

            });

        },
        120
    );

}



/* ==============================================================
   DASHBOARD PROGRESS
============================================================== */

function initializeDashboardProgress() {


    const progressBars =
        document.querySelectorAll(
            ".phase-dashboard__progress-value"
        );


    if (!progressBars.length) {
        return;
    }


    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;



    progressBars.forEach(
        (progressBar) => {


            const targetWidth =
                progressBar.style.width ||
                "0%";


            if (
                prefersReducedMotion
            ) {

                progressBar.style.width =
                    targetWidth;

                return;

            }


            progressBar.style.width =
                "0%";


            requestAnimationFrame(
                () => {


                    requestAnimationFrame(
                        () => {


                            progressBar.style.width =
                                targetWidth;

                        }
                    );

                }
            );

        }
    );

}



/* ==============================================================
   OPTIONAL PHASE SECTION NAVIGATION
============================================================== */

function initializePhaseSectionNavigation() {


    const sectionNavigation =
        document.querySelector(
            "[data-phase-section-nav]"
        );


    if (!sectionNavigation) {
        return;
    }


    const navigationLinks =
        Array.from(
            sectionNavigation.querySelectorAll(
                'a[href^="#"]'
            )
        );


    if (!navigationLinks.length) {
        return;
    }



    const sectionEntries =
        navigationLinks
            .map(
                (link) => {


                    const sectionId =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !sectionId ||
                        sectionId === "#"
                    ) {
                        return null;
                    }


                    const section =
                        document.querySelector(
                            sectionId
                        );


                    if (!section) {
                        return null;
                    }


                    return {
                        link,
                        section
                    };

                }
            )
            .filter(Boolean);



    if (
        !sectionEntries.length
    ) {
        return;
    }


    initializeSectionLinkClicks(
        sectionEntries
    );


    observePhaseSections(
        sectionEntries
    );

}



/* ==============================================================
   SECTION LINK CLICKS
============================================================== */

function initializeSectionLinkClicks(
    sectionEntries
) {


    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;



    sectionEntries.forEach(
        ({
            link,
            section
        }) => {


            link.addEventListener(
                "click",
                (event) => {


                    event.preventDefault();


                    section.scrollIntoView({

                        behavior:
                            prefersReducedMotion
                                ? "auto"
                                : "smooth",

                        block:
                            "start"

                    });


                    window.history.replaceState(
                        null,
                        "",
                        `#${section.id}`
                    );

                }
            );

        }
    );

}



/* ==============================================================
   OBSERVE PHASE SECTIONS
============================================================== */

function observePhaseSections(
    sectionEntries
) {


    if (
        !(
            "IntersectionObserver"
            in window
        )
    ) {
        return;
    }



    const sectionObserver =
        new IntersectionObserver(
            (entries) => {


                const visibleEntries =
                    entries
                        .filter(
                            (entry) =>
                                entry.isIntersecting
                        )
                        .sort(
                            (
                                firstEntry,
                                secondEntry
                            ) =>

                                secondEntry.intersectionRatio -
                                firstEntry.intersectionRatio

                        );


                if (
                    !visibleEntries.length
                ) {
                    return;
                }


                const activeSectionId =
                    visibleEntries[0]
                        .target
                        .id;


                updateActiveSectionLink(
                    sectionEntries,
                    activeSectionId
                );

            },
            {

                rootMargin:
                    "-22% 0px -58% 0px",

                threshold:
                    [
                        0.1,
                        0.3,
                        0.55
                    ]

            }
        );



    sectionEntries.forEach(
        ({
            section
        }) => {


            sectionObserver.observe(
                section
            );

        }
    );

}



/* ==============================================================
   UPDATE ACTIVE SECTION LINK
============================================================== */

function updateActiveSectionLink(
    sectionEntries,
    activeSectionId
) {


    sectionEntries.forEach(
        ({
            link,
            section
        }) => {


            const isActive =
                section.id ===
                activeSectionId;


            link.classList.toggle(
                "is-active",
                isActive
            );


            if (
                isActive
            ) {

                link.setAttribute(
                    "aria-current",
                    "location"
                );

            } else {

                link.removeAttribute(
                    "aria-current"
                );

            }

        }
    );

}



/* ==============================================================
   ARTIFACT CARDS
============================================================== */

function initializeArtifactCards() {


    const artifactCards =
        document.querySelectorAll(
            ".artifact-card"
        );


    if (!artifactCards.length) {
        return;
    }



    artifactCards.forEach(
        (artifactCard) => {


            const artifactLink =
                artifactCard.querySelector(
                    "a[href]"
                );


            if (!artifactLink) {
                return;
            }



            artifactCard.classList.add(
                "artifact-card--interactive"
            );


            artifactCard.setAttribute(
                "tabindex",
                "0"
            );


            artifactCard.setAttribute(
                "role",
                "link"
            );



            const accessibleName =
                artifactLink
                    .textContent
                    .trim();


            if (
                accessibleName
            ) {

                artifactCard.setAttribute(
                    "aria-label",
                    accessibleName
                );

            }



            /* Click anywhere on card */

            artifactCard.addEventListener(
                "click",
                (event) => {


                    if (
                        event.target.closest(
                            "a, button, input, select, textarea"
                        )
                    ) {
                        return;
                    }


                    artifactLink.click();

                }
            );



            /* Keyboard */

            artifactCard.addEventListener(
                "keydown",
                (event) => {


                    if (
                        event.key !== "Enter" &&
                        event.key !== " "
                    ) {
                        return;
                    }


                    event.preventDefault();


                    artifactLink.click();

                }
            );

        }
    );

}