/* ==============================================================
   BLUE FOX DEFENSE — ENTERPRISE SECURITY COMPLIANCE LAB
   SHARED RMF PHASE JAVASCRIPT

   Used by:
   - Prepare
   - Categorize
   - Select
   - Implement
   - Assess
   - Authorize
   - Monitor

   This file controls interactions that are specific to the RMF
   phase pages.

   The main security-lab.js file continues to control:
   - Theme switching
   - Mobile navigation
   - Sticky header behavior
   - Scroll reveal
   - RMF lifecycle navigation
   - Back-to-top button
   - Current footer year
============================================================== */

"use strict";


/* ==============================================================
   01. PAGE INITIALIZATION

   Each function checks whether its required HTML exists before
   running. This allows the same JavaScript file to be reused on
   every RMF phase page, even when some pages use different
   sections or components.
============================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initializeTimelineAccordion();
    initializeDashboardProgress();
    initializePhaseSectionNavigation();
    initializeArtifactCards();
});


/* ==============================================================
   02. TIMELINE ACCORDION

   The meeting details already use the native HTML details element,
   so they still work when JavaScript is unavailable.

   This enhancement keeps only one timeline meeting open at a time.
   When another meeting is opened, the previously opened meeting
   closes automatically.
============================================================== */

function initializeTimelineAccordion() {
    const timeline = document.querySelector(
        ".phase-timeline"
    );

    if (!timeline) {
        return;
    }

    const detailElements = Array.from(
        timeline.querySelectorAll(
            ".timeline-entry__details"
        )
    );

    if (!detailElements.length) {
        return;
    }

    detailElements.forEach((detailsElement) => {
        detailsElement.addEventListener("toggle", () => {
            if (!detailsElement.open) {
                return;
            }

            closeOtherTimelineDetails(
                detailElements,
                detailsElement
            );

            scrollOpenTimelineEntryIntoView(
                detailsElement
            );
        });
    });
}


/*
   Close every timeline detail except the one that was just opened.
*/

function closeOtherTimelineDetails(
    detailElements,
    activeDetails
) {
    detailElements.forEach((detailsElement) => {
        if (detailsElement === activeDetails) {
            return;
        }

        detailsElement.open = false;
    });
}


/*
   On smaller screens, opening a long meeting section may move the
   heading partly above the viewport. This keeps the selected
   timeline entry visible without creating unnecessary movement on
   larger screens.
*/

function scrollOpenTimelineEntryIntoView(
    detailsElement
) {
    if (window.innerWidth > 900) {
        return;
    }

    const timelineEntry = detailsElement.closest(
        ".timeline-entry"
    );

    if (!timelineEntry) {
        return;
    }

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    window.setTimeout(() => {
        timelineEntry.scrollIntoView({
            behavior: prefersReducedMotion
                ? "auto"
                : "smooth",
            block: "start"
        });
    }, 120);
}


/* ==============================================================
   03. DASHBOARD PROGRESS

   The dashboard progress percentage comes from the width already
   written in the HTML.

   Example:

   <span
       class="phase-dashboard__progress-value"
       style="width: 100%;"
   ></span>

   JavaScript temporarily resets the bar and then animates it to
   the value written in the HTML.
============================================================== */

function initializeDashboardProgress() {
    const progressBars = document.querySelectorAll(
        ".phase-dashboard__progress-value"
    );

    if (!progressBars.length) {
        return;
    }

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    progressBars.forEach((progressBar) => {
        const targetWidth =
            progressBar.style.width || "0%";

        if (prefersReducedMotion) {
            progressBar.style.width = targetWidth;
            return;
        }

        progressBar.style.width = "0%";

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                progressBar.style.width = targetWidth;
            });
        });
    });
}


/* ==============================================================
   04. PHASE SECTION NAVIGATION

   This watches the main phase sections as the visitor scrolls.

   When a matching navigation link exists, the active section link
   receives the is-active class and aria-current="location".

   This is optional. The Prepare page does not currently require a
   section navigation menu, but adding the support now lets future
   phase pages reuse it.

   Expected HTML example:

   <nav class="phase-section-nav" data-phase-section-nav>
       <a href="#phase-overview">Overview</a>
       <a href="#phase-objectives">Objectives</a>
   </nav>
============================================================== */

function initializePhaseSectionNavigation() {
    const sectionNavigation = document.querySelector(
        "[data-phase-section-nav]"
    );

    if (!sectionNavigation) {
        return;
    }

    const navigationLinks = Array.from(
        sectionNavigation.querySelectorAll(
            'a[href^="#"]'
        )
    );

    if (!navigationLinks.length) {
        return;
    }

    const sectionEntries = navigationLinks
        .map((link) => {
            const sectionId = link.getAttribute("href");

            if (
                !sectionId ||
                sectionId === "#"
            ) {
                return null;
            }

            const section = document.querySelector(
                sectionId
            );

            if (!section) {
                return null;
            }

            return {
                link,
                section
            };
        })
        .filter(Boolean);

    if (!sectionEntries.length) {
        return;
    }

    initializeSectionLinkClicks(
        sectionEntries
    );

    observePhaseSections(
        sectionEntries
    );
}


/*
   Smoothly move to a selected page section while respecting the
   visitor's reduced-motion preference.
*/

function initializeSectionLinkClicks(
    sectionEntries
) {
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    sectionEntries.forEach(({ link, section }) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();

            section.scrollIntoView({
                behavior: prefersReducedMotion
                    ? "auto"
                    : "smooth",
                block: "start"
            });

            window.history.replaceState(
                null,
                "",
                `#${section.id}`
            );
        });
    });
}


/*
   Observe sections and update the navigation as each section
   becomes the main visible area.
*/

function observePhaseSections(
    sectionEntries
) {
    if (!("IntersectionObserver" in window)) {
        return;
    }

    const sectionObserver = new IntersectionObserver(
        (entries) => {
            const visibleEntries = entries
                .filter((entry) => entry.isIntersecting)
                .sort(
                    (firstEntry, secondEntry) =>
                        secondEntry.intersectionRatio -
                        firstEntry.intersectionRatio
                );

            if (!visibleEntries.length) {
                return;
            }

            const activeSectionId =
                visibleEntries[0].target.id;

            updateActiveSectionLink(
                sectionEntries,
                activeSectionId
            );
        },
        {
            rootMargin: "-22% 0px -58% 0px",
            threshold: [0.1, 0.3, 0.55]
        }
    );

    sectionEntries.forEach(({ section }) => {
        sectionObserver.observe(section);
    });
}


/*
   Apply the active state to the navigation link connected to the
   section currently in view.
*/

function updateActiveSectionLink(
    sectionEntries,
    activeSectionId
) {
    sectionEntries.forEach(({ link, section }) => {
        const isActive =
            section.id === activeSectionId;

        link.classList.toggle(
            "is-active",
            isActive
        );

        if (isActive) {
            link.setAttribute(
                "aria-current",
                "location"
            );
        } else {
            link.removeAttribute(
                "aria-current"
            );
        }
    });
}


/* ==============================================================
   05. ARTIFACT CARD KEYBOARD SUPPORT

   Some artifact cards may become links later when we create the
   documentation pages.

   This enhancement lets an artifact card act like its internal
   link when the visitor clicks anywhere on the card.

   It does nothing when the card does not contain a link, so the
   current Prepare page continues to work normally.
============================================================== */

function initializeArtifactCards() {
    const artifactCards = document.querySelectorAll(
        ".artifact-card"
    );

    if (!artifactCards.length) {
        return;
    }

    artifactCards.forEach((artifactCard) => {
        const artifactLink = artifactCard.querySelector(
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
            artifactLink.textContent.trim();

        if (accessibleName) {
            artifactCard.setAttribute(
                "aria-label",
                accessibleName
            );
        }

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
    });
}