"use strict";


/* ==========================================================================
   BLUE FOX DEFENSE
   RMF PHASE PAGE

   Shared portfolio behavior remains in:
   ../../js/script.js

   This file handles:
   - Current RMF phase highlighting
   - Prepare working sessions
   - Prepare documentation
   - Prepare decision log
   ========================================================================== */


document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* ==================================================================
           01. CURRENT RMF PHASE
           ================================================================== */

        const currentPhase =
            document.body.dataset.currentPhase;


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



        /* ==================================================================
           02. PREPARE WORKING SESSIONS
           ================================================================== */

        const prepareSessions = [

            {
                number:
                    "01",

                type:
                    "Project Meeting",

                title:
                    "Authorization Kickoff",

                summary:
                    "The team introduced the Foxhole Portal, confirmed the need for authorization, identified the initial participants, and established the purpose of the security effort.",

                details: [

                    {
                        title:
                            "Meeting Purpose",

                        content: [
                            "Launch the authorization effort and make sure the business, security, and technical teams understand why the Foxhole Portal is entering the RMF process."
                        ]
                    },

                    {
                        title:
                            "Participants",

                        content: [
                            "System Owner",
                            "ISSM",
                            "ISSO",
                            "Technical Lead",
                            "Business Representative"
                        ]
                    },

                    {
                        title:
                            "Key Decisions",

                        content: [
                            "The Foxhole Portal requires a formal authorization effort.",
                            "The ISSO will coordinate the security documentation.",
                            "Weekly working sessions will support the Prepare phase."
                        ]
                    },

                    {
                        title:
                            "Outputs",

                        content: [
                            "Initial Project Charter",
                            "Meeting Minutes",
                            "Initial Stakeholder List"
                        ]
                    }

                ]
            },


            {
                number:
                    "02",

                type:
                    "Discovery Session",

                title:
                    "Business and Mission Discovery",

                summary:
                    "Business stakeholders explained how employees, HR personnel, and managers use the portal and which organizational processes depend on it.",

                details: [

                    {
                        title:
                            "Meeting Purpose",

                        content: [
                            "Understand the business functions supported by the Foxhole Portal and document why the system is needed."
                        ]
                    },

                    {
                        title:
                            "Processes Discussed",

                        content: [
                            "Employee access to HR resources",
                            "Required training assignments",
                            "Internal policy distribution",
                            "Company announcements",
                            "Employee service requests"
                        ]
                    },

                    {
                        title:
                            "Key Decision",

                        content: [
                            "The Foxhole Portal is considered an important internal business system because multiple departments depend on it for employee services and organizational communication."
                        ]
                    },

                    {
                        title:
                            "Outputs",

                        content: [
                            "Business Process Notes",
                            "System Purpose Statement",
                            "Initial User Groups"
                        ]
                    }

                ]
            },


            {
                number:
                    "03",

                type:
                    "Technical Session",

                title:
                    "Architecture and Environment Review",

                summary:
                    "The technical team reviewed the portal architecture, hosting environment, identity services, data connections, administrative access, and external dependencies.",

                details: [

                    {
                        title:
                            "Meeting Purpose",

                        content: [
                            "Document the technical environment and identify the major components that support the Foxhole Portal."
                        ]
                    },

                    {
                        title:
                            "Areas Reviewed",

                        content: [
                            "Application hosting",
                            "Identity and access management",
                            "Database services",
                            "Network connections",
                            "Administrative access",
                            "Logging and monitoring services"
                        ]
                    },

                    {
                        title:
                            "Key Decision",

                        content: [
                            "Shared enterprise services used by the portal will be documented as system dependencies and reviewed during boundary development."
                        ]
                    },

                    {
                        title:
                            "Outputs",

                        content: [
                            "Technical Architecture Notes",
                            "Dependency Inventory",
                            "Initial Component List"
                        ]
                    }

                ]
            },


            {
                number:
                    "04",

                type:
                    "Security Working Session",

                title:
                    "Authorization Boundary Review",

                summary:
                    "Security and technical personnel worked together to identify which components, services, interfaces, and responsibilities belong inside the authorization boundary.",

                details: [

                    {
                        title:
                            "Meeting Purpose",

                        content: [
                            "Establish a clear initial boundary for the Foxhole Portal and identify where shared or external services connect to the system."
                        ]
                    },

                    {
                        title:
                            "Boundary Considerations",

                        content: [
                            "Portal application components",
                            "Portal databases",
                            "Identity service connections",
                            "Administrative interfaces",
                            "Logging connections",
                            "External enterprise services"
                        ]
                    },

                    {
                        title:
                            "Key Decision",

                        content: [
                            "Components directly managed by the Foxhole Portal team will remain inside the boundary. Shared services will be documented as dependencies with clearly assigned responsibilities."
                        ]
                    },

                    {
                        title:
                            "Outputs",

                        content: [
                            "Initial Boundary Diagram",
                            "Boundary Narrative",
                            "External Service List"
                        ]
                    }

                ]
            },


            {
                number:
                    "05",

                type:
                    "Information Review",

                title:
                    "Information Types Discovery",

                summary:
                    "The team identified the kinds of information created, stored, processed, and transmitted by the Foxhole Portal.",

                details: [

                    {
                        title:
                            "Meeting Purpose",

                        content: [
                            "Create an initial inventory of the information handled by the system before determining its security impact during Categorize."
                        ]
                    },

                    {
                        title:
                            "Information Discussed",

                        content: [
                            "Employee profile information",
                            "Training records",
                            "Internal policy documents",
                            "Company announcements",
                            "Employee service requests",
                            "System audit information"
                        ]
                    },

                    {
                        title:
                            "Key Decision",

                        content: [
                            "The information inventory will be reviewed during the Categorize phase to determine confidentiality, integrity, and availability impact."
                        ]
                    },

                    {
                        title:
                            "Outputs",

                        content: [
                            "Information Type Inventory",
                            "Data Flow Notes",
                            "Initial Information Owners"
                        ]
                    }

                ]
            },


            {
                number:
                    "06",

                type:
                    "Governance Session",

                title:
                    "Roles and Authorization Strategy",

                summary:
                    "Leadership confirmed security responsibilities, documentation ownership, communication methods, and the overall approach for moving the portal through authorization.",

                details: [

                    {
                        title:
                            "Meeting Purpose",

                        content: [
                            "Establish how the team will manage the authorization effort and confirm who is responsible for decisions, documentation, and technical work."
                        ]
                    },

                    {
                        title:
                            "Decisions Confirmed",

                        content: [
                            "The System Owner remains accountable for the portal.",
                            "The ISSM provides security oversight.",
                            "The ISSO coordinates RMF activities and documentation.",
                            "The Technical Lead coordinates engineering support.",
                            "The Authorizing Official makes the final risk decision."
                        ]
                    },

                    {
                        title:
                            "Outputs",

                        content: [
                            "Responsibility Matrix",
                            "Authorization Strategy",
                            "Communication Plan",
                            "Document Control Process"
                        ]
                    }

                ]
            },


            {
                number:
                    "07",

                type:
                    "Phase Review",

                title:
                    "Prepare Phase Closeout",

                summary:
                    "The team reviewed the Prepare documentation, confirmed open items, and agreed that the Foxhole Portal was ready to enter the Categorize phase.",

                details: [

                    {
                        title:
                            "Meeting Purpose",

                        content: [
                            "Confirm that the authorization team has enough organizational, business, technical, and governance information to move into security categorization."
                        ]
                    },

                    {
                        title:
                            "Final Review",

                        content: [
                            "Stakeholders confirmed",
                            "Roles assigned",
                            "System purpose documented",
                            "Boundary drafted",
                            "Information types identified",
                            "Authorization strategy documented"
                        ]
                    },

                    {
                        title:
                            "Outcome",

                        content: [
                            "The Prepare phase was accepted as complete. The authorization team approved the Foxhole Portal to move into Categorize."
                        ]
                    },

                    {
                        title:
                            "Outputs",

                        content: [
                            "Prepare Phase Summary",
                            "Open Action Item Register",
                            "Categorize Meeting Agenda"
                        ]
                    }

                ]
            }

        ];



        /* ==================================================================
           03. PREPARE DOCUMENTATION
           ================================================================== */

        const prepareArtifacts = [

            {
                id:
                    "BFD-PRE-001",

                type:
                    "Governance",

                status:
                    "Approved",

                title:
                    "Project Charter",

                href:
                    "documentation/prepare/prepare-library.html",

                summary:
                    "Defines the purpose, scope, participants, and expected outcomes of the Foxhole Portal authorization effort."
            },


            {
                id:
                    "BFD-PRE-002",

                type:
                    "Governance",

                status:
                    "Approved",

                title:
                    "Stakeholder Register",

                href:
                    "documentation/prepare/stakeholder-register.html",

                summary:
                    "Identifies the personnel involved in the authorization effort and documents their roles, responsibilities, and communication needs."
            },


            {
                id:
                    "BFD-PRE-003",

                type:
                    "System",

                status:
                    "Drafted",

                title:
                    "System Description",

                href:
                    "documentation/prepare/system-description.html",

                summary:
                    "Documents the portal mission, supported users, business processes, major components, services, and operating environment."
            },


            {
                id:
                    "BFD-PRE-004",

                type:
                    "Architecture",

                status:
                    "Drafted",

                title:
                    "Authorization Boundary Diagram",

                href:
                    "documentation/prepare/authorization-boundary.html",

                summary:
                    "Shows the primary components, interfaces, dependencies, and external services associated with the Foxhole Portal."
            },


            {
                id:
                    "BFD-PRE-005",

                type:
                    "Information",

                status:
                    "Complete",

                title:
                    "Information Type Inventory",

                href:
                    "documentation/prepare/information-type-inventory.html",

                summary:
                    "Lists the information created, stored, processed, and transmitted by the Foxhole Portal before the impact analysis begins."
            },


            {
                id:
                    "BFD-PRE-006",

                type:
                    "Governance",

                status:
                    "Approved",

                title:
                    "Responsibility Matrix",

                href:
                    "documentation/prepare/responsibility-matrix.html",

                summary:
                    "Defines who is responsible, accountable, consulted, and informed for the major authorization activities."
            },


            {
                id:
                    "BFD-PRE-007",

                type:
                    "Strategy",

                status:
                    "Approved",

                title:
                    "Authorization Strategy",

                href:
                    "documentation/prepare/authorization-strategy.html",

                summary:
                    "Describes the authorization approach, team responsibilities, expected milestones, and the overall path toward an authorization decision."
            },


            {
                id:
                    "BFD-PRE-008",

                type:
                    "Project Record",

                status:
                    "Complete",

                title:
                    "Meeting Minutes",

                href:
                    "documentation/prepare/meeting-minutes.html",

                summary:
                    "Records the discussions, decisions, participants, action items, and outputs from each Prepare phase working session."
            }

        ];



        /* ==================================================================
           04. PREPARE DECISION LOG
           ================================================================== */

        const prepareDecisions = [

            {
                id:
                    "PRE-DEC-01",

                decision:
                    "The Foxhole Portal will complete a formal RMF authorization effort before deployment.",

                owner:
                    "Authorizing Official",

                status:
                    "Approved"
            },


            {
                id:
                    "PRE-DEC-02",

                decision:
                    "The ISSO will coordinate the authorization package and maintain the project records.",

                owner:
                    "ISSM",

                status:
                    "Approved"
            },


            {
                id:
                    "PRE-DEC-03",

                decision:
                    "Components managed directly by the portal team will remain inside the authorization boundary.",

                owner:
                    "System Owner",

                status:
                    "Approved"
            },


            {
                id:
                    "PRE-DEC-04",

                decision:
                    "Shared enterprise services will be documented as dependencies with assigned responsibilities.",

                owner:
                    "Technical Lead",

                status:
                    "Approved"
            },


            {
                id:
                    "PRE-DEC-05",

                decision:
                    "The initial information inventory will be used as the starting point for the Categorize phase impact analysis.",

                owner:
                    "ISSO",

                status:
                    "Approved"
            }

        ];



        /* ==================================================================
           05. RENDER HELPERS
           ================================================================== */

        function renderDetailContent(
            items
        ) {

            if (
                !items ||
                !items.length
            ) {
                return "";
            }


            if (
                items.length === 1
            ) {

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



        /* ==================================================================
           06. RENDER WORKING SESSIONS
           ================================================================== */

        const sessionContainer =
            document.getElementById(
                "prepareSessions"
            );


        if (sessionContainer) {

            sessionContainer.innerHTML =
                prepareSessions
                    .map(
                        session => `
                            <details class="prepare-session reveal">

                                <summary class="prepare-session__summary">

                                    <span class="prepare-session__number">
                                        ${session.number}
                                    </span>

                                    <span class="prepare-session__identity">

                                        <span class="prepare-session__type">
                                            ${session.type}
                                        </span>

                                        <strong>
                                            ${session.title}
                                        </strong>

                                    </span>

                                    <span
                                        class="prepare-session__toggle"
                                        aria-hidden="true"
                                    >
                                        +
                                    </span>

                                </summary>


                                <div class="prepare-session__body">

                                    <p class="prepare-session__lead">
                                        ${session.summary}
                                    </p>


                                    <div class="prepare-session__details">

                                        ${session.details
                                            .map(
                                                detail => `
                                                    <div class="prepare-session__detail">

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



        /* ==================================================================
           07. RENDER ARTIFACTS
           ================================================================== */

        const artifactContainer =
            document.getElementById(
                "prepareArtifacts"
            );


        if (artifactContainer) {

            artifactContainer.innerHTML =
                prepareArtifacts
                    .map(
                        artifact => `
                            <a
                                class="prepare-artifact reveal"
                                href="${artifact.href}"
                            >

                                <div class="prepare-artifact__top">

                                    <span class="prepare-artifact__type">
                                        ${artifact.type.toUpperCase()}
                                    </span>

                                    <span class="prepare-artifact__status">
                                        ${artifact.status.toUpperCase()}
                                    </span>

                                </div>


                                <h3>
                                    ${artifact.title}
                                </h3>


                                <p>
                                    ${artifact.summary}
                                </p>


                                <div class="prepare-artifact__footer">

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



        /* ==================================================================
           08. RENDER DECISION LOG
           ================================================================== */

        const decisionLog =
            document.getElementById(
                "prepareDecisionLog"
            );


        if (decisionLog) {

            decisionLog.innerHTML =
                prepareDecisions
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



        /* ==================================================================
           09. LIFECYCLE KEYBOARD NAVIGATION
           ================================================================== */

        const rmfPhaseLinks =
            [
                ...document.querySelectorAll(
                    "[data-rmf-phase]"
                )
            ];


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
);