"use strict";


/* ==========================================================================
   BLUE FOX DEFENSE
   RMF AUTHORIZE PHASE — PHASE-SPECIFIC DATA

   LOCATION:
   labs/rmf/js/phases/authorize-phase.js

   PURPOSE:
   This file contains ONLY Authorize-specific data.

   Shared rendering and lifecycle behavior lives in:
   js/phases/phase.js

   Shared portfolio behavior remains in:
   ../../js/script.js
   ========================================================================== */


(() => {

    /* ======================================================================
       01. AUTHORIZE ACTIVITIES

       NIST SP 800-37 Rev. 2 mapping:
       R-1 Authorization Package
       R-2 Risk Analysis and Determination
       R-3 Risk Response
       R-4 Authorization Decision
       R-5 Authorization Reporting

       The visible interface intentionally uses plain-language activity names.
       Task identifiers remain in source comments and can also be documented
       inside the authorization records.
       ====================================================================== */

    const authorizeActivities = [

        {
            number: "01",
            type: "Authorization Package",
            title: "Assemble & Review the Authorization Package",
            summary:
                "Blue Fox Defense assembles the information the Authorizing Official needs to understand the Foxhole Portal, its implemented safeguards, assessment results, remaining deficiencies, and overall risk posture.",
            details: [
                {
                    title: "Core Package Content",
                    content: [
                        "Executive Summary",
                        "System Security Plan",
                        "Security Assessment Report",
                        "Plan of Action & Milestones"
                    ]
                },
                {
                    title: "Package Quality",
                    content: [
                        "The package is reviewed for completeness, consistency, currency, and enough traceability to support an accountable risk decision."
                    ]
                },
                {
                    title: "Case-Study Context",
                    content: [
                        "The package reflects one remaining evidence-traceability deficiency that is being tracked through the POA&M."
                    ]
                },
                {
                    title: "Output",
                    content: [
                        "Authorization Package Summary"
                    ]
                }
            ]
        },


        {
            number: "02",
            type: "Risk Determination",
            title: "Analyze Residual Risk",
            summary:
                "The Authorizing Official reviews the authorization package and relevant organizational risk context to determine the security and privacy risk associated with operating the Foxhole Portal.",
            details: [
                {
                    title: "Risk Inputs",
                    content: [
                        "Approved system categorization",
                        "Implemented control set",
                        "Security Assessment Report",
                        "Resolved and unresolved assessment findings",
                        "POA&M information",
                        "Mission and business impact",
                        "Organizational risk tolerance"
                    ]
                },
                {
                    title: "Case-Study Determination",
                    content: [
                        "The corrected secure-configuration finding no longer contributes to the open deficiency set.",
                        "The remaining evidence-traceability issue is evaluated as manageable through corrective-action tracking and ongoing monitoring."
                    ]
                },
                {
                    title: "Decision Focus",
                    content: [
                        "Determine whether the residual risk associated with system operation is acceptable to Blue Fox Defense."
                    ]
                },
                {
                    title: "Output",
                    content: [
                        "Risk Determination & Response Record"
                    ]
                }
            ]
        },


        {
            number: "03",
            type: "Risk Response",
            title: "Define the Risk Response",
            summary:
                "Blue Fox Defense determines how identified residual risk will be handled and records the actions needed to keep that risk within the organization's accepted tolerance.",
            details: [
                {
                    title: "Response Options",
                    content: [
                        "Accept",
                        "Mitigate",
                        "Avoid",
                        "Share or transfer",
                        "Monitor"
                    ]
                },
                {
                    title: "Case-Study Response",
                    content: [
                        "The residual risk associated with the remaining documentation and evidence-traceability deficiency is accepted for operation while corrective action continues through the POA&M."
                    ]
                },
                {
                    title: "Ongoing Requirement",
                    content: [
                        "The open item remains visible and subject to milestone tracking, status reporting, and reassessment during Monitor."
                    ]
                },
                {
                    title: "Output",
                    content: [
                        "Documented residual-risk response"
                    ]
                }
            ]
        },


        {
            number: "04",
            type: "Authorization Decision",
            title: "Record the Authorization Decision",
            summary:
                "The Authorizing Official makes and records the formal decision to approve or deny authorization based on the completed risk determination.",
            details: [
                {
                    title: "Case-Study Decision",
                    content: [
                        "The Foxhole Portal is approved for operation in this fictional case study."
                    ]
                },
                {
                    title: "Decision Basis",
                    content: [
                        "The implemented safeguards and assessment results provide sufficient confidence for operation.",
                        "The remaining deficiency is documented, assigned, and tracked.",
                        "Residual risk is accepted by the Authorizing Official."
                    ]
                },
                {
                    title: "Important Note",
                    content: [
                        "This portfolio decision is fictional and does not represent an actual government authorization or ATO."
                    ]
                },
                {
                    title: "Output",
                    content: [
                        "Authorization Decision Record"
                    ]
                }
            ]
        },


        {
            number: "05",
            type: "Authorization Reporting",
            title: "Report Status & Transition to Monitor",
            summary:
                "The authorization decision and relevant status information are communicated to the appropriate stakeholders and the system transitions into ongoing monitoring.",
            details: [
                {
                    title: "Reporting Content",
                    content: [
                        "Authorization status",
                        "Decision date and responsible official",
                        "Open POA&M information",
                        "Residual-risk conditions",
                        "Monitoring and reporting expectations"
                    ]
                },
                {
                    title: "Transition Focus",
                    content: [
                        "The authorization decision becomes the starting risk context for the Monitor phase."
                    ]
                },
                {
                    title: "Ongoing Accountability",
                    content: [
                        "Changes, assessments, vulnerabilities, POA&M progress, and risk responses will be tracked after authorization."
                    ]
                },
                {
                    title: "Output",
                    content: [
                        "Authorization Reporting Record"
                    ]
                }
            ]
        }

    ];


    /* ======================================================================
       02. AUTHORIZE AUTHORIZATION RECORDS

       This document set is deliberately consolidated. The visible records
       organize the case study without implying that NIST requires one
       separately named PDF for every Authorize task.
       ====================================================================== */

    const authorizeArtifacts = [

        {
            id: "BFD-AUT-001",
            type: "Package",
            status: "Complete",
            title: "Authorization Package Summary",
            href: "documentation/authorize-library.html?doc=BFD-AUT-001",
            summary:
                "Provides the executive-level package summary and identifies the security plan, assessment report, POA&M, risk information, and other material presented for the authorization decision."
        },

        {
            id: "BFD-AUT-002",
            type: "Risk",
            status: "Approved",
            title: "Risk Determination & Response",
            href: "documentation/authorize-library.html?doc=BFD-AUT-002",
            summary:
                "Documents the Authorizing Official's residual-risk analysis, the determination of risk acceptability, and the response established for remaining risk."
        },

        {
            id: "BFD-AUT-003",
            type: "Decision",
            status: "Approved",
            title: "Authorization Decision",
            href: "documentation/authorize-library.html?doc=BFD-AUT-003",
            summary:
                "Records the formal case-study authorization decision, decision basis, responsible official, and the accepted residual-risk conditions for Foxhole Portal operation."
        },

        {
            id: "BFD-AUT-004",
            type: "Reporting",
            status: "Complete",
            title: "Authorization Reporting Record",
            href: "documentation/authorize-library.html?doc=BFD-AUT-004",
            summary:
                "Records how the authorization status, open POA&M information, residual-risk conditions, and monitoring expectations are communicated for the Monitor phase."
        }

    ];


    /* ======================================================================
       03. AUTHORIZE DECISION LOG
       ====================================================================== */

    const authorizeDecisions = [

        {
            id: "AUT-DEC-01",
            decision:
                "The authorization package is sufficiently complete and current to support the Foxhole Portal authorization decision.",
            owner: "Authorizing Official",
            status: "Approved"
        },

        {
            id: "AUT-DEC-02",
            decision:
                "The remaining evidence-traceability deficiency is manageable through the existing POA&M and ongoing monitoring process.",
            owner: "Authorizing Official",
            status: "Approved"
        },

        {
            id: "AUT-DEC-03",
            decision:
                "Residual risk associated with operation of the Foxhole Portal is accepted for this fictional case study.",
            owner: "Authorizing Official",
            status: "Approved"
        },

        {
            id: "AUT-DEC-04",
            decision:
                "The Foxhole Portal is approved for operation and will transition into the Monitor phase with one open POA&M item.",
            owner: "Authorizing Official",
            status: "Approved"
        }

    ];


    /* ======================================================================
       04. AUTHORIZE GOVERNING REFERENCES
       ====================================================================== */

    const authorizeReferences = [

        {
            code: "NIST SP 800-37 Rev. 2",
            title: "Risk Management Framework",
            focus: "Authorize tasks + risk-based decision process",
            href: "https://csrc.nist.gov/pubs/sp/800/37/r2/final"
        },

        {
            code: "NIST RMF Authorize Step",
            title: "Authorize Step Overview",
            focus: "Current NIST purpose + Authorize outcomes",
            href: "https://csrc.nist.gov/Projects/risk-management/about-rmf/authorize-step"
        },

        {
            code: "NIST SP 800-39",
            title: "Managing Information Security Risk",
            focus: "Organization-wide risk management context",
            href: "https://csrc.nist.gov/pubs/sp/800/39/final"
        },

        {
            code: "NIST SP 800-30 Rev. 1",
            title: "Guide for Conducting Risk Assessments",
            focus: "Risk analysis + assessment concepts",
            href: "https://csrc.nist.gov/pubs/sp/800/30/r1/final"
        },

        {
            code: "OMB Circular A-130",
            title: "Managing Information as a Strategic Resource",
            focus: "Federal security + authorization policy context",
            href: "https://www.whitehouse.gov/omb/information-for-agencies/circulars/"
        },

        {
            code: "DoDI 8510.01",
            title: "Risk Management Framework for DoD Systems",
            focus: "DoD RMF implementation",
            href: "https://www.esd.whs.mil/Directives/issuances/dodi/"
        }

    ];


    /* ======================================================================
       05. AUTHORIZE DATA NAMESPACE
       ====================================================================== */

    window.BlueFoxRMF =
        window.BlueFoxRMF || {};

    window.BlueFoxRMF.Authorize = {

        activities:
            authorizeActivities,

        artifacts:
            authorizeArtifacts,

        decisions:
            authorizeDecisions,

        references:
            authorizeReferences

    };


    /* ======================================================================
       06. RENDER AUTHORIZE CONTENT WITH SHARED PHASE COMPONENTS
       ====================================================================== */

    function initializeAuthorizePhase() {

        const Phase =
            window.BlueFoxRMF.Phase;

        if (!Phase) {

            console.error(
                "BlueFoxRMF.Phase is unavailable. Load js/phases/phase.js before authorize-phase.js."
            );

            return;

        }


        Phase.renderActivities(
            authorizeActivities
        );


        Phase.renderArtifacts(
            authorizeArtifacts
        );


        Phase.renderDecisions(
            authorizeDecisions
        );


        if (typeof Phase.renderReferences === "function") {

            Phase.renderReferences(
                authorizeReferences
            );

        } else {

            console.error(
                "BlueFoxRMF.Phase.renderReferences is unavailable. Add the shared governing-reference renderer to js/phases/phase.js."
            );

        }

    }


    /* ======================================================================
       07. START AUTHORIZE-SPECIFIC RENDERING
       ====================================================================== */

    document.addEventListener(
        "DOMContentLoaded",
        initializeAuthorizePhase
    );

})();
