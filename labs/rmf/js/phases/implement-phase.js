"use strict";


/* ==========================================================================
   BLUE FOX DEFENSE
   RMF IMPLEMENT PHASE — PHASE-SPECIFIC DATA

   LOCATION:
   labs/rmf/js/phases/implement-phase.js

   PURPOSE:
   This file contains ONLY Implement-specific data.

   Shared rendering and lifecycle behavior lives in:
   js/phases/phase.js

   Shared portfolio behavior remains in:
   ../../js/script.js
   ========================================================================== */


(() => {

    /* ======================================================================
       01. IMPLEMENT ACTIVITIES

       NIST SP 800-37 Rev. 2 mapping:
       I-1 Control Implementation
       I-2 Update Control Implementation Information

       The visible interface intentionally uses plain-language activity names.
       Task identifiers remain in source comments and can be documented inside
       the actual authorization records.
       ====================================================================== */

    const implementActivities = [

        {
            number: "01",
            type: "Implementation Planning",
            title: "Translate Controls into Engineering Work",
            summary:
                "The approved control set and planned implementation statements are translated into concrete technical and operational implementation tasks for the Foxhole Portal.",
            details: [
                {
                    title: "Primary Inputs",
                    content: [
                        "Approved tailored control set",
                        "System Security Plan",
                        "Control Allocation Matrix",
                        "Architecture and authorization boundary",
                        "Continuous Monitoring Strategy"
                    ]
                },
                {
                    title: "Planning Focus",
                    content: [
                        "Confirm implementation ownership",
                        "Identify configuration dependencies",
                        "Sequence system and shared-service work",
                        "Identify evidence that should be captured during implementation"
                    ]
                },
                {
                    title: "Implementation Rule",
                    content: [
                        "The team implements the controls as described in the approved plans or documents justified changes when the deployed solution differs from the planned approach."
                    ]
                },
                {
                    title: "Output",
                    content: [
                        "Implementation work plan and updated control tracking"
                    ]
                }
            ]
        },


        {
            number: "02",
            type: "Technical Implementation",
            title: "Configure System-Specific Safeguards",
            summary:
                "The technical team configures the safeguards assigned directly to the Foxhole Portal and applies applicable secure configuration guidance to in-scope technologies.",
            details: [
                {
                    title: "Representative Work",
                    content: [
                        "Access and privilege configuration",
                        "Authentication integration",
                        "Audit and logging configuration",
                        "Secure system and application settings",
                        "Protected communications",
                        "Vulnerability and integrity protections"
                    ]
                },
                {
                    title: "Configuration Guidance",
                    content: [
                        "Applicable secure configuration checklists, hardening guidance, and DoD STIG or SRG requirements are considered for technologies used in the fictional system."
                    ]
                },
                {
                    title: "Change Control",
                    content: [
                        "Security-relevant configuration changes are tracked so implementation details can be reflected in the authorization records."
                    ]
                },
                {
                    title: "Output",
                    content: [
                        "Implemented system-specific safeguards"
                    ]
                }
            ]
        },


        {
            number: "03",
            type: "Shared Services",
            title: "Integrate Hybrid & Inherited Controls",
            summary:
                "The portal team connects enterprise services that provide common or shared portions of the selected control set and documents how those dependencies support the system.",
            details: [
                {
                    title: "Enterprise Dependencies",
                    content: [
                        "Enterprise identity and authentication services",
                        "Centralized logging and monitoring",
                        "Shared infrastructure protections",
                        "Backup and recovery services",
                        "Enterprise vulnerability management"
                    ]
                },
                {
                    title: "Responsibility Check",
                    content: [
                        "System-specific, hybrid, and common-control responsibilities remain consistent with the allocation decisions approved during Select."
                    ]
                },
                {
                    title: "Inheritance Record",
                    content: [
                        "The implementation record identifies the common-control provider or shared service and describes what the Foxhole Portal inherits or must implement locally."
                    ]
                },
                {
                    title: "Output",
                    content: [
                        "Documented hybrid and inherited implementations"
                    ]
                }
            ]
        },


        {
            number: "04",
            type: "Evidence Capture",
            title: "Capture Implementation Evidence",
            summary:
                "Implementation artifacts are collected and indexed so the next phase can evaluate the safeguards without relying only on narrative statements.",
            details: [
                {
                    title: "Evidence Examples",
                    content: [
                        "Configuration exports",
                        "Screenshots",
                        "System settings",
                        "Logs and event examples",
                        "Architecture or data-flow updates",
                        "Administrative records"
                    ]
                },
                {
                    title: "Evidence Quality",
                    content: [
                        "Evidence is tied to the relevant implementation statement and identifies the system component, service, or responsible provider it represents."
                    ]
                },
                {
                    title: "Important Boundary",
                    content: [
                        "This activity organizes implementation evidence; it does not replace the independent control assessment performed during Assess."
                    ]
                },
                {
                    title: "Output",
                    content: [
                        "Configuration & Evidence Register"
                    ]
                }
            ]
        },


        {
            number: "05",
            type: "Documentation Update",
            title: "Update the Security Plan & Handoff",
            summary:
                "The team updates control implementation information to reflect the deployed system and prepares the authorization record for the Assess phase.",
            details: [
                {
                    title: "Security Plan Update",
                    content: [
                        "Replace planned language with actual implementation details",
                        "Record implementation responsibility",
                        "Document inherited and hybrid services",
                        "Update relevant architecture and configuration references",
                        "Link supporting evidence where appropriate"
                    ]
                },
                {
                    title: "Review Focus",
                    content: [
                        "Implementation statements accurately describe the deployed Foxhole Portal and are sufficiently detailed to support assessment."
                    ]
                },
                {
                    title: "Handoff",
                    content: [
                        "The updated security plan and supporting implementation evidence are prepared for the control assessment process."
                    ]
                },
                {
                    title: "Output",
                    content: [
                        "Updated System Security Plan",
                        "Implementation Review"
                    ]
                }
            ]
        }

    ];


    /* ======================================================================
       02. IMPLEMENT AUTHORIZATION RECORDS

       NIST requires the controls to be implemented and the security/privacy
       plans to be updated to reflect implementation. The additional records
       below are supporting Blue Fox Defense case-study artifacts.
       ====================================================================== */

    const implementArtifacts = [

        {
            id: "BFD-IMP-001",
            type: "Implementation",
            status: "Complete",
            title: "Control Implementation Record",
            href: "documentation/implement-library.html?doc=BFD-IMP-001",
            summary:
                "Tracks how the selected safeguards were implemented, who owns each implementation, and where system-specific, hybrid, and inherited responsibilities apply."
        },

        {
            id: "BFD-IMP-002",
            type: "Security Plan",
            status: "Updated",
            title: "Updated System Security Plan",
            href: "documentation/implement-library.html?doc=BFD-IMP-002",
            summary:
                "Updates the Foxhole Portal security plan so control implementation statements reflect the system and supporting services as actually deployed."
        },

        {
            id: "BFD-IMP-003",
            type: "Evidence",
            status: "Complete",
            title: "Configuration & Evidence Register",
            href: "documentation/implement-library.html?doc=BFD-IMP-003",
            summary:
                "Indexes the configuration records, screenshots, logs, exports, and other implementation artifacts prepared to support later control assessment."
        },

        {
            id: "BFD-IMP-004",
            type: "Handoff",
            status: "Approved",
            title: "Implementation Review",
            href: "documentation/implement-library.html?doc=BFD-IMP-004",
            summary:
                "Records the phase review confirming that implementation information is current, supporting evidence is organized, and the system is ready to enter Assess."
        }

    ];


    /* ======================================================================
       03. IMPLEMENT DECISION LOG
       ====================================================================== */

    const implementDecisions = [

        {
            id: "IMP-DEC-01",
            decision:
                "The approved tailored control set and System Security Plan remain the implementation baseline for the Foxhole Portal.",
            owner: "System Owner",
            status: "Approved"
        },

        {
            id: "IMP-DEC-02",
            decision:
                "System-specific safeguards will be configured within the authorization boundary using applicable secure configuration and hardening guidance.",
            owner: "Technical Lead",
            status: "Approved"
        },

        {
            id: "IMP-DEC-03",
            decision:
                "Hybrid and inherited safeguards will identify the responsible enterprise provider and the portion of implementation retained by the portal team.",
            owner: "ISSO",
            status: "Approved"
        },

        {
            id: "IMP-DEC-04",
            decision:
                "The System Security Plan will be updated to reflect actual implementation details before the authorization record is handed to Assess.",
            owner: "ISSM",
            status: "Approved"
        }

    ];


    /* ======================================================================
       04. IMPLEMENT GOVERNING REFERENCES
       ====================================================================== */

    const implementReferences = [

        {
            code: "NIST SP 800-37 Rev. 2",
            title: "Risk Management Framework",
            focus: "RMF lifecycle + Implement guidance",
            href: "https://csrc.nist.gov/pubs/sp/800/37/r2/final"
        },

        {
            code: "NIST SP 800-53 Rev. 5",
            title: "Security and Privacy Controls",
            focus: "Control requirements + implementation context",
            href: "https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final"
        },

        {
            code: "NIST SP 800-128",
            title: "Security-Focused Configuration Management",
            focus: "Secure configuration management",
            href: "https://csrc.nist.gov/pubs/sp/800/128/final"
        },

        {
            code: "NIST SP 800-70 Rev. 5",
            title: "National Checklist Program",
            focus: "Security configuration checklists",
            href: "https://csrc.nist.gov/publications/detail/sp/800-70/rev-5/final"
        },

        {
            code: "DISA STIG / SRG",
            title: "Security Technical Implementation Guides",
            focus: "DoD technology hardening guidance",
            href: "https://public.cyber.mil/stigs/"
        },

        {
            code: "DoDI 8510.01",
            title: "Risk Management Framework for DoD Systems",
            focus: "DoD RMF implementation",
            href: "https://www.esd.whs.mil/Directives/issuances/dodi/"
        }

    ];


    /* ======================================================================
       05. IMPLEMENT DATA NAMESPACE
       ====================================================================== */

    window.BlueFoxRMF =
        window.BlueFoxRMF || {};

    window.BlueFoxRMF.Implement = {

        activities:
            implementActivities,

        artifacts:
            implementArtifacts,

        decisions:
            implementDecisions,

        references:
            implementReferences

    };


    /* ======================================================================
       06. RENDER IMPLEMENT CONTENT WITH SHARED PHASE COMPONENTS
       ====================================================================== */

    function initializeImplementPhase() {

        const Phase =
            window.BlueFoxRMF.Phase;

        if (!Phase) {

            console.error(
                "BlueFoxRMF.Phase is unavailable. Load js/phases/phase.js before implement-phase.js."
            );

            return;

        }


        Phase.renderActivities(
            implementActivities
        );


        Phase.renderArtifacts(
            implementArtifacts
        );


        Phase.renderDecisions(
            implementDecisions
        );


        if (typeof Phase.renderReferences === "function") {

            Phase.renderReferences(
                implementReferences
            );

        } else {

            console.error(
                "BlueFoxRMF.Phase.renderReferences is unavailable. Add the shared governing-reference renderer to js/phases/phase.js."
            );

        }

    }


    /* ======================================================================
       07. START IMPLEMENT-SPECIFIC RENDERING
       ====================================================================== */

    document.addEventListener(
        "DOMContentLoaded",
        initializeImplementPhase
    );

})();