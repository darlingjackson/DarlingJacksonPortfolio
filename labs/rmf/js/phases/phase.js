"use strict";


/* ==========================================================================
   BLUE FOX DEFENSE
   RMF PHASE — SHARED BEHAVIOR

   LOCATION:
   labs/rmf/js/phases/phase.js

   PURPOSE:
   This file contains behavior shared by every RMF phase page.

   It handles:
   - Current RMF phase highlighting
   - Shared activity/workflow rendering
   - Shared artifact/document rendering
   - Shared decision-log rendering
   - Shared governing-reference rendering
   - RMF lifecycle keyboard navigation

   Phase-specific data belongs in:
   js/phases/<phase>-phase.js

   Example:
   js/phases/prepare-phase.js
   js/phases/categorize-phase.js
   ========================================================================== */


(() => {

    /* ======================================================================
       01. NAMESPACE

       Keep all RMF phase functionality under one project namespace instead
       of creating unrelated global functions.
       ====================================================================== */

    window.BlueFoxRMF =
        window.BlueFoxRMF || {};

    const Phase =
        window.BlueFoxRMF.Phase || {};



    /* ======================================================================
       02. CURRENT RMF PHASE
       ====================================================================== */

    function highlightCurrentPhase() {

        const currentPhase =
            document.body.dataset.currentPhase;

        if (!currentPhase) {
            return;
        }

        const phaseLinks =
            document.querySelectorAll(
                "[data-rmf-phase]"
            );

        phaseLinks.forEach(
            link => {

                const isCurrent =
                    link.dataset.rmfPhase ===
                    currentPhase;

                link.classList.toggle(
                    "is-current",
                    isCurrent
                );

                if (isCurrent) {

                    link.setAttribute(
                        "aria-current",
                        "page"
                    );

                } else {

                    link.removeAttribute(
                        "aria-current"
                    );

                }

            }
        );

    }



    /* ======================================================================
       03. SHARED DETAIL RENDERER
       ====================================================================== */

    function renderDetailContent(items) {

        if (
            !Array.isArray(items) ||
            items.length === 0
        ) {
            return "";
        }

        if (items.length === 1) {

            return `
                <p>
                    ${items[0]}
                </p>
            `;

        }

        return `
            <ul>
                ${items
                    .map(
                        item => `
                            <li>
                                ${item}
                            </li>
                        `
                    )
                    .join("")
                }
            </ul>
        `;

    }



    /* ======================================================================
       04. SHARED PHASE ACTIVITIES / WORKFLOW

       Expected HTML target:

       <div
           class="phase-activity-timeline"
           id="phaseActivities"
       ></div>
       ====================================================================== */

    function renderActivities(
        activities,
        containerId = "phaseActivities"
    ) {

        const container =
            document.getElementById(
                containerId
            );

        if (
            !container ||
            !Array.isArray(activities)
        ) {
            return;
        }

        container.innerHTML =
            activities
                .map(
                    activity => `
                        <details class="phase-activity reveal">

                            <summary class="phase-activity__summary">

                                <span class="phase-activity__number">
                                    ${activity.number}
                                </span>

                                <span class="phase-activity__identity">

                                    <span class="phase-activity__type">
                                        ${activity.type}
                                    </span>

                                    <strong>
                                        ${activity.title}
                                    </strong>

                                </span>

                                <span
                                    class="phase-activity__toggle"
                                    aria-hidden="true"
                                >
                                    +
                                </span>

                            </summary>


                            <div class="phase-activity__body">

                                <p class="phase-activity__lead">
                                    ${activity.summary}
                                </p>


                                <div class="phase-activity__details">

                                    ${(activity.details || [])
                                        .map(
                                            detail => `
                                                <div class="phase-activity__detail">

                                                    <span>
                                                        ${detail.title.toUpperCase()}
                                                    </span>

                                                    ${renderDetailContent(
                                                        detail.content
                                                    )}

                                                </div>
                                            `
                                        )
                                        .join("")
                                    }

                                </div>

                            </div>

                        </details>
                    `
                )
                .join("");

    }



    /* ======================================================================
       05. SHARED PHASE ARTIFACTS / DOCUMENTATION

       Expected HTML target:

       <div
           class="phase-artifact-grid"
           id="phaseArtifacts"
       ></div>
       ====================================================================== */

    function renderArtifacts(
        artifacts,
        containerId = "phaseArtifacts"
    ) {

        const container =
            document.getElementById(
                containerId
            );

        if (
            !container ||
            !Array.isArray(artifacts)
        ) {
            return;
        }

        container.innerHTML =
            artifacts
                .map(
                    artifact => `
                        <a
                            class="phase-artifact reveal"
                            href="${artifact.href}"
                        >

                            <div class="phase-artifact__top">

                                <span class="phase-artifact__type">
                                    ${artifact.type.toUpperCase()}
                                </span>

                                <span class="phase-artifact__status">
                                    ${artifact.status.toUpperCase()}
                                </span>

                            </div>


                            <h3>
                                ${artifact.title}
                            </h3>


                            <p>
                                ${artifact.summary}
                            </p>


                            <div class="phase-artifact__footer">

                                <span>
                                    ${artifact.id}
                                </span>

                                <strong>
                                    OPEN DOCUMENT →
                                </strong>

                            </div>

                        </a>
                    `
                )
                .join("");

    }



    /* ======================================================================
       06. SHARED DECISION LOG

       Expected HTML target:

       <tbody id="phaseDecisionLog"></tbody>
       ====================================================================== */

    function renderDecisions(
        decisions,
        containerId = "phaseDecisionLog"
    ) {

        const container =
            document.getElementById(
                containerId
            );

        if (
            !container ||
            !Array.isArray(decisions)
        ) {
            return;
        }

        container.innerHTML =
            decisions
                .map(
                    decision => `
                        <tr>

                            <td>
                                ${decision.id}
                            </td>

                            <td>
                                ${decision.decision}
                            </td>

                            <td>
                                ${decision.owner}
                            </td>

                            <td>

                                <span class="phase-decision-status">
                                    ${decision.status.toUpperCase()}
                                </span>

                            </td>

                        </tr>
                    `
                )
                .join("");

    }





    /* ======================================================================
       07. SHARED GOVERNING REFERENCES

       Expected HTML target:

       <div
           class="phase-reference-list"
           id="phaseReferences"
       ></div>

       Each phase-specific file supplies its own references array.
       ====================================================================== */

    function renderReferences(
        references,
        containerId = "phaseReferences"
    ) {

        const container =
            document.getElementById(
                containerId
            );

        if (
            !container ||
            !Array.isArray(references)
        ) {
            return;
        }

        container.innerHTML =
            references
                .map(
                    reference => {

                        const content = `
                            <span class="phase-reference__top">

                                <span class="phase-reference__code">
                                    ${reference.code}
                                </span>

                                ${reference.href
                                    ? `
                                        <span
                                            class="phase-reference__arrow"
                                            aria-hidden="true"
                                        >
                                            ↗
                                        </span>
                                    `
                                    : ""
                                }

                            </span>

                            <span>

                                <strong>
                                    ${reference.title}
                                </strong>

                                ${reference.focus
                                    ? `
                                        <small>
                                            ${reference.focus}
                                        </small>
                                    `
                                    : ""
                                }

                            </span>
                        `;

                        if (reference.href) {

                            return `
                                <a
                                    class="phase-reference"
                                    href="${reference.href}"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Open ${reference.code}: ${reference.title}"
                                >
                                    ${content}
                                </a>
                            `;

                        }

                        return `
                            <div class="phase-reference">
                                ${content}
                            </div>
                        `;

                    }
                )
                .join("");

    }


    /* ======================================================================
       08. RMF LIFECYCLE KEYBOARD NAVIGATION

       ArrowRight / ArrowLeft:
       Move between RMF phase links.

       Home:
       Focus the first phase.

       End:
       Focus the final phase.
       ====================================================================== */

    function initializeLifecycleKeyboardNavigation() {

        const rmfPhaseLinks =
            [
                ...document.querySelectorAll(
                    "[data-rmf-phase]"
                )
            ];

        if (!rmfPhaseLinks.length) {
            return;
        }

        rmfPhaseLinks.forEach(
            (
                link,
                index
            ) => {

                link.addEventListener(
                    "keydown",
                    event => {

                        const supportedKeys = [
                            "ArrowRight",
                            "ArrowLeft",
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

                        let nextIndex =
                            index;

                        if (
                            event.key ===
                            "ArrowRight"
                        ) {

                            nextIndex =
                                (
                                    index + 1
                                ) %
                                rmfPhaseLinks.length;

                        }

                        if (
                            event.key ===
                            "ArrowLeft"
                        ) {

                            nextIndex =
                                (
                                    index - 1 +
                                    rmfPhaseLinks.length
                                ) %
                                rmfPhaseLinks.length;

                        }

                        if (
                            event.key ===
                            "Home"
                        ) {

                            nextIndex =
                                0;

                        }

                        if (
                            event.key ===
                            "End"
                        ) {

                            nextIndex =
                                rmfPhaseLinks.length - 1;

                        }

                        rmfPhaseLinks[
                            nextIndex
                        ]?.focus();

                    }
                );

            }
        );

    }



    /* ======================================================================
       09. SHARED INITIALIZATION
       ====================================================================== */

    function initialize() {

        highlightCurrentPhase();

        initializeLifecycleKeyboardNavigation();

    }



    /* ======================================================================
       10. PUBLIC PHASE API

       Phase-specific files call these functions.

       Example:

       BlueFoxRMF.Phase.renderActivities(
           prepareActivities
       );
       ====================================================================== */

    Phase.highlightCurrentPhase =
        highlightCurrentPhase;

    Phase.renderActivities =
        renderActivities;

    Phase.renderArtifacts =
        renderArtifacts;

    Phase.renderDecisions =
        renderDecisions;

    Phase.renderReferences =
        renderReferences;

    Phase.initializeLifecycleKeyboardNavigation =
        initializeLifecycleKeyboardNavigation;


    window.BlueFoxRMF.Phase =
        Phase;



    /* ======================================================================
       11. START SHARED PHASE BEHAVIOR
       ====================================================================== */

    document.addEventListener(
        "DOMContentLoaded",
        initialize
    );

})();
