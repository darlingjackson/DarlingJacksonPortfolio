"use strict";


/* ========================================================================== 
   BLUE FOX DEFENSE
   RMF SELECT PHASE — PHASE-SPECIFIC DATA

   LOCATION:
   labs/rmf/js/phases/select-phase.js

   PURPOSE:
   This file contains ONLY Select-specific data.

   Shared rendering and lifecycle behavior lives in:
   js/phases/phase.js

   Shared portfolio behavior remains in:
   ../../js/script.js
   ========================================================================== */


(() => {

    /* ====================================================================== 
       01. SELECT ACTIVITIES

       NIST SP 800-37 Rev. 2 mapping:
       S-1 Control Selection
       S-2 Control Tailoring
       S-3 Control Allocation
       S-4 Documentation of Planned Control Implementations
       S-5 Continuous Monitoring Strategy — System
       S-6 Plan Review and Approval

       Task numbers remain in source comments rather than the visible UI.
       ====================================================================== */

    const selectActivities = [

        {
            number: "01",
            type: "Baseline Selection",
            title: "Select the Control Baseline",
            summary:
                "The approved Moderate categorization is used as the starting point for selecting the security and privacy controls needed to protect the Foxhole Portal.",
            details: [
                {
                    title: "Primary Inputs",
                    content: [
                        "Approved Moderate security categorization",
                        "System-level risk assessment context",
                        "Security and privacy requirements",
                        "Authorization boundary and architecture information"
                    ]
                },
                {
                    title: "Selection Goal",
                    content: [
                        "Establish a defensible starting control set that is commensurate with the documented Foxhole Portal risk and impact level."
                    ]
                },
                {
                    title: "Case-Study Decision",
                    content: [
                        "The Moderate control baseline is selected as the starting baseline for the Foxhole Portal case study."
                    ]
                },
                {
                    title: "Output",
                    content: [
                        "Control Baseline"
                    ]
                }
            ]
        },


        {
            number: "02",
            type: "Tailoring",
            title: "Tailor the Baseline",
            summary:
                "The starting baseline is reviewed against the Foxhole Portal mission, environment, architecture, threats, dependencies, and requirements so tailoring decisions can be documented.",
            details: [
                {
                    title: "Tailoring Considerations",
                    content: [
                        "Scoping considerations",
                        "Organization-defined parameters",
                        "Applicable overlays",
                        "Technology and environment considerations",
                        "Supplementary controls when justified by risk"
                    ]
                },
                {
                    title: "Documentation Rule",
                    content: [
                        "Every case-study tailoring decision is recorded with enough rationale to explain why the resulting control set remains appropriate for the Foxhole Portal risk context."
                    ]
                },
                {
                    title: "Review Focus",
                    content: [
                        "Tailoring remains consistent with the approved categorization and does not weaken protection solely for convenience."
                    ]
                },
                {
                    title: "Output",
                    content: [
                        "Tailoring Record"
                    ]
                }
            ]
        },


        {
            number: "03",
            type: "Allocation",
            title: "Allocate Control Responsibility",
            summary:
                "Selected controls are designated as system-specific, hybrid, or common and responsibility is assigned to the appropriate system or environmental elements.",
            details: [
                {
                    title: "Designations",
                    content: [
                        "System-specific",
                        "Hybrid",
                        "Common"
                    ]
                },
                {
                    title: "Allocation Goal",
                    content: [
                        "Make implementation responsibility visible so the portal team knows what it must implement directly, what is shared, and what may be inherited from common-control providers."
                    ]
                },
                {
                    title: "Dependencies",
                    content: [
                        "Enterprise identity services",
                        "Shared infrastructure services",
                        "Enterprise logging and monitoring",
                        "Other authorized common services used by the portal"
                    ]
                },
                {
                    title: "Output",
                    content: [
                        "Control Allocation Matrix"
                    ]
                }
            ]
        },


        {
            number: "04",
            type: "Documentation",
            title: "Document Planned Implementations",
            summary:
                "The selected and tailored controls are documented in the system security plan with planned implementation information, ownership, inheritance, dependencies, and control-specific context.",
            details: [
                {
                    title: "Plan Content",
                    content: [
                        "Selected controls and enhancements",
                        "Tailoring decisions",
                        "Implementation responsibility",
                        "Inherited and shared-control dependencies",
                        "Planned implementation approach"
                    ]
                },
                {
                    title: "Primary Record",
                    content: [
                        "System Security Plan"
                    ]
                },
                {
                    title: "Quality Check",
                    content: [
                        "Planned implementations must be detailed enough to guide engineering work during Implement and later support assessment activities."
                    ]
                },
                {
                    title: "Output",
                    content: [
                        "System Security Plan"
                    ]
                }
            ]
        },


        {
            number: "05",
            type: "Monitoring Strategy",
            title: "Develop the Monitoring Strategy",
            summary:
                "The team defines how the Foxhole Portal control set and system risk will be monitored over time in alignment with organizational risk management and monitoring expectations.",
            details: [
                {
                    title: "Strategy Elements",
                    content: [
                        "Controls and indicators to monitor",
                        "Assessment and review frequencies based on risk",
                        "Reporting responsibilities",
                        "Change and vulnerability awareness",
                        "Escalation and risk-response expectations"
                    ]
                },
                {
                    title: "Purpose",
                    content: [
                        "Establish the monitoring approach early so implementation and assessment decisions support the later Monitor phase."
                    ]
                },
                {
                    title: "Alignment",
                    content: [
                        "The system-level strategy reflects the broader organizational risk-management and continuous-monitoring approach."
                    ]
                },
                {
                    title: "Output",
                    content: [
                        "Continuous Monitoring Strategy"
                    ]
                }
            ]
        },


        {
            number: "06",
            type: "Governance Review",
            title: "Plan Review & Approval",
            summary:
                "The selected controls, tailoring decisions, allocation, planned implementations, and monitoring strategy are reviewed before the Foxhole Portal moves into Implement.",
            details: [
                {
                    title: "Review Participants",
                    content: [
                        "Authorizing Official",
                        "System Owner",
                        "ISSM",
                        "ISSO",
                        "Security and technical stakeholders"
                    ]
                },
                {
                    title: "Review Focus",
                    content: [
                        "Control set is commensurate with risk",
                        "Tailoring rationale is documented",
                        "Responsibilities are assigned",
                        "Planned implementations are sufficiently described",
                        "Monitoring strategy is established"
                    ]
                },
                {
                    title: "Outcome",
                    content: [
                        "The security and privacy plan set is approved as the basis for Foxhole Portal control implementation."
                    ]
                },
                {
                    title: "Output",
                    content: [
                        "Approved System Security Plan and supporting Select records"
                    ]
                }
            ]
        }

    ];


    /* ====================================================================== 
       02. SELECT AUTHORIZATION RECORDS

       The interface uses short record labels for readability.
       RMF task traceability remains in source comments and can also be
       documented inside the actual records.
       ====================================================================== */

    const selectArtifacts = [

        {
            id: "BFD-SEL-001",
            type: "Baseline",
            status: "Approved",
            title: "Control Baseline",
            href: "documentation/select-library.html?doc=BFD-SEL-001",
            summary:
                "Records the starting security and privacy control baseline selected for the Moderate-impact Foxhole Portal."
        },

        {
            id: "BFD-SEL-002",
            type: "Tailoring",
            status: "Approved",
            title: "Tailoring Record",
            href: "documentation/select-library.html?doc=BFD-SEL-002",
            summary:
                "Documents the case-study tailoring decisions, parameters, overlays, supplementary controls, and rationale applied to the starting baseline."
        },

        {
            id: "BFD-SEL-003",
            type: "Allocation",
            status: "Complete",
            title: "Control Allocation Matrix",
            href: "documentation/select-library.html?doc=BFD-SEL-003",
            summary:
                "Identifies system-specific, hybrid, and common controls and records where implementation responsibility is assigned."
        },

        {
            id: "BFD-SEL-004",
            type: "Security Plan",
            status: "Approved",
            title: "System Security Plan",
            href: "documentation/select-library.html?doc=BFD-SEL-004",
            summary:
                "Documents the selected controls, tailoring decisions, planned implementations, ownership, inheritance, and system-specific security context."
        },

        {
            id: "BFD-SEL-005",
            type: "Monitoring",
            status: "Approved",
            title: "Continuous Monitoring Strategy",
            href: "documentation/select-library.html?doc=BFD-SEL-005",
            summary:
                "Defines the system-level approach for monitoring control implementation, system changes, vulnerabilities, and risk over time."
        }

    ];


    /* ====================================================================== 
       03. SELECT DECISION LOG
       ====================================================================== */

    const selectDecisions = [

        {
            id: "SEL-DEC-01",
            decision:
                "The Moderate control baseline is selected as the starting point for the Foxhole Portal control set.",
            owner: "System Owner",
            status: "Approved"
        },

        {
            id: "SEL-DEC-02",
            decision:
                "Tailoring decisions will be documented with rationale and reviewed against the approved system risk and categorization context.",
            owner: "ISSM",
            status: "Approved"
        },

        {
            id: "SEL-DEC-03",
            decision:
                "Selected controls are designated as system-specific, hybrid, or common and allocated to the responsible system or environmental elements.",
            owner: "ISSO",
            status: "Approved"
        },

        {
            id: "SEL-DEC-04",
            decision:
                "The system security plan and continuous monitoring strategy are approved as the basis for the Implement phase.",
            owner: "Authorizing Official",
            status: "Approved"
        }

    ];


    /* ====================================================================== 
       04. SELECT GOVERNING REFERENCES
       ====================================================================== */

    const selectReferences = [

        {
            code: "NIST SP 800-37 Rev. 2",
            title: "Risk Management Framework",
            focus: "RMF lifecycle + Select guidance",
            href: "https://csrc.nist.gov/pubs/sp/800/37/r2/final"
        },

        {
            code: "NIST SP 800-53 Rev. 5",
            title: "Security and Privacy Controls",
            focus: "Control catalog + implementation context",
            href: "https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final"
        },

        {
            code: "NIST SP 800-53B",
            title: "Control Baselines",
            focus: "Baselines + tailoring guidance",
            href: "https://csrc.nist.gov/pubs/sp/800/53/b/upd1/final"
        },

        {
            code: "FIPS 200",
            title: "Minimum Security Requirements",
            focus: "Minimum requirements + risk-based control selection",
            href: "https://csrc.nist.gov/pubs/fips/200/final"
        },

        {
            code: "NIST SP 800-137",
            title: "Information Security Continuous Monitoring",
            focus: "System monitoring strategy guidance",
            href: "https://csrc.nist.gov/pubs/sp/800/137/final"
        },

        {
            code: "DoDI 8510.01",
            title: "Risk Management Framework for DoD Systems",
            focus: "DoD RMF implementation",
            href: "https://www.esd.whs.mil/Directives/issuances/dodi/"
        }

    ];


    /* ====================================================================== 
       05. SELECT DATA NAMESPACE
       ====================================================================== */

    window.BlueFoxRMF =
        window.BlueFoxRMF || {};

    window.BlueFoxRMF.Select = {

        activities:
            selectActivities,

        artifacts:
            selectArtifacts,

        decisions:
            selectDecisions,

        references:
            selectReferences

    };


    /* ====================================================================== 
       06. RENDER SELECT CONTENT WITH SHARED PHASE COMPONENTS
       ====================================================================== */

    function initializeSelectPhase() {

        const Phase =
            window.BlueFoxRMF.Phase;

        if (!Phase) {

            console.error(
                "BlueFoxRMF.Phase is unavailable. Load js/phases/phase.js before select-phase.js."
            );

            return;

        }


        Phase.renderActivities(
            selectActivities
        );


        Phase.renderArtifacts(
            selectArtifacts
        );


        Phase.renderDecisions(
            selectDecisions
        );


        if (typeof Phase.renderReferences === "function") {

            Phase.renderReferences(
                selectReferences
            );

        } else {

            console.error(
                "BlueFoxRMF.Phase.renderReferences is unavailable. Add the shared governing-reference renderer to js/phases/phase.js."
            );

        }

    }


    /* ====================================================================== 
       07. START SELECT-SPECIFIC RENDERING
       ====================================================================== */

    document.addEventListener(
        "DOMContentLoaded",
        initializeSelectPhase
    );

})();