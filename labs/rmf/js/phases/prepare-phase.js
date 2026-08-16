"use strict";


/* ==========================================================================
   BLUE FOX DEFENSE
   RMF PREPARE PHASE — PHASE-SPECIFIC DATA

   LOCATION:
   labs/rmf/js/phases/prepare-phase.js

   PURPOSE:
   This file contains ONLY Prepare-specific data.

   Shared rendering and lifecycle behavior lives in:
   js/phases/phase.js

   Shared portfolio behavior remains in:
   ../../js/script.js
   ========================================================================== */


(() => {

    /* ======================================================================
       01. PREPARE ACTIVITIES / WORKING SESSIONS
       ====================================================================== */

const prepareActivities = [

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



    /* ======================================================================
       02. PREPARE AUTHORIZATION RECORDS
       ====================================================================== */

const prepareArtifacts = [


    /* ==============================================================
       001 — PROJECT CHARTER
       P-8 // MISSION & BUSINESS CONTEXT
       ============================================================== */


    {
        id: "BFD-PRE-001",
        type: "Mission",
        status: "Approved",
        title: "Project Charter",
        href: "documentation/prepare-library.html?doc=BFD-PRE-001",
        summary:
            "Defines the Foxhole Portal mission and business purpose, authorization scope, objectives, assumptions, and expected outcomes."
    },



    /* ==============================================================
       002 — STAKEHOLDER REGISTER
       P-9 // SYSTEM STAKEHOLDERS
       ============================================================== */

    {
        id: "BFD-PRE-002",
        type: "Stakeholders",
        status: "Approved",
        title: "Stakeholder Register",
        href: "documentation/prepare-library.html?doc=BFD-PRE-002",
        summary:
            "Identifies the system stakeholders, owners, security personnel, supporting roles, decision-makers, and their responsibilities."
    },


    /* ==============================================================
       003 — ASSET INVENTORY
       P-10 // ASSET IDENTIFICATION
       ============================================================== */

    {
       id: "BFD-PRE-003",
        type: "Assets",
        status: "Complete",
        title: "Asset Inventory",
        href: "documentation/prepare-library.html?doc=BFD-PRE-003",
        summary:
            "Identifies and organizes the major system assets, components, services, infrastructure, and supporting resources associated with the Foxhole Portal."
    },


    /* ==============================================================
       004 — AUTHORIZATION BOUNDARY
       P-11 // AUTHORIZATION BOUNDARY
       ============================================================== */

    {
        id: "BFD-PRE-004",
        type: "Boundary",
        status: "Approved",
        title: "Authorization Boundary",
        href: "documentation/prepare-library.html?doc=BFD-PRE-004",
        summary:
            "Defines the components, services, interfaces, dependencies, and supporting technology included within the Foxhole Portal authorization boundary."
    },



    /* ==============================================================
       005 — INFORMATION TYPES & LIFE CYCLE
       P-12 / P-13
       ============================================================== */

    {
        id: "BFD-PRE-005",
        type: "Information",
        status: "Complete",
        title: "Information Types & Life Cycle",
        href: "documentation/prepare-library.html?doc=BFD-PRE-005",
        summary:
            "Identifies the information processed, stored, and transmitted by the Foxhole Portal and documents how that information is created, used, shared, retained, and disposed."
    },


    /* ==============================================================
       006 — RISK & REQUIREMENTS REGISTER
       P-14 / P-15
       ============================================================== */

    {
        id: "BFD-PRE-006",
        type: "Risk",
        status: "Approved",
        title: "Risk & Requirements Register",
        href: "documentation/prepare-library.html?doc=BFD-PRE-006",
        summary:
            "Captures initial system risk considerations and the security and privacy requirements established for the Foxhole Portal."
    },




    /* ==============================================================
       007 — ARCHITECTURE & ALLOCATION
       P-16 / P-17
       ============================================================== */

    {
       id: "BFD-PRE-007",
        type: "Architecture",
        status: "Approved",
        title: "Architecture & Allocation",
        href: "documentation/prepare-library.html?doc=BFD-PRE-007",
        summary:
            "Documents how the Foxhole Portal fits within the enterprise architecture and where security and privacy requirements are allocated."
    },



    /* ==============================================================
       008 — SYSTEM REGISTRATION
       P-18 // SYSTEM REGISTRATION
       ============================================================== */

    {
         id: "BFD-PRE-008",
        type: "Registration",
        status: "Complete",
        title: "System Registration",
        href: "documentation/prepare-library.html?doc=BFD-PRE-008",
        summary:
            "Records the Foxhole Portal for organizational tracking, management, accountability, and security authorization oversight."
    }

];



    /* ======================================================================
       03. PREPARE DECISION LOG
       ====================================================================== */

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





    /* ======================================================================
       04. PREPARE GOVERNING REFERENCES

       Task identifiers remain documented in the project source and PDFs,
       while the visible interface uses shorter record labels.
       ====================================================================== */

    const prepareReferences = [

        {
            code: "NIST SP 800-37 Rev. 2",
            title: "Risk Management Framework",
            focus: "RMF lifecycle + Prepare guidance",
            href: "https://csrc.nist.gov/pubs/sp/800/37/r2/final"
        },

        {
            code: "NIST SP 800-30 Rev. 1",
            title: "Guide for Conducting Risk Assessments",
            focus: "System risk assessment guidance",
            href: "https://csrc.nist.gov/pubs/sp/800/30/r1/final"
        },

        {
            code: "NIST SP 800-39",
            title: "Managing Information Security Risk",
            focus: "Organization + mission risk context",
            href: "https://csrc.nist.gov/pubs/sp/800/39/final"
        },

        {
            code: "NIST SP 800-53 Rev. 5",
            title: "Security and Privacy Controls",
            focus: "Security + privacy requirements context",
            href: "https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final"
        },

        {
            code: "DoDI 8510.01",
            title: "Risk Management Framework for DoD Systems",
            focus: "DoD RMF implementation",
            href: "https://www.esd.whs.mil/Portals/54/Documents/DD/issuances/dodi/851001p.pdf"
        }

    ];


    /* ======================================================================
       05. PREPARE DATA NAMESPACE

       Keeping the Prepare data under BlueFoxRMF.Prepare makes it easy to
       inspect and keeps phase-specific information out of unrelated globals.
       ====================================================================== */

    window.BlueFoxRMF =
        window.BlueFoxRMF || {};

    window.BlueFoxRMF.Prepare = {

        activities:
            prepareActivities,

        artifacts:
            prepareArtifacts,

        decisions:
            prepareDecisions,

        references:
            prepareReferences

    };



    /* ======================================================================
       06. RENDER PREPARE CONTENT WITH SHARED PHASE COMPONENTS
       ====================================================================== */

    function initializePreparePhase() {

        const Phase =
            window.BlueFoxRMF.Phase;

        if (!Phase) {

            console.error(
                "BlueFoxRMF.Phase is unavailable. Load js/phases/phase.js before prepare-phase.js."
            );

            return;

        }


        Phase.renderActivities(
            prepareActivities
        );


        Phase.renderArtifacts(
            prepareArtifacts
        );


        Phase.renderDecisions(
            prepareDecisions
        );

        Phase.renderReferences(
            prepareReferences
        );

    }



    /* ======================================================================
       07. START PREPARE-SPECIFIC RENDERING
       ====================================================================== */

    document.addEventListener(
        "DOMContentLoaded",
        initializePreparePhase
    );

})();
