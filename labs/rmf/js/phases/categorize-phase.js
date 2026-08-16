"use strict";


/* ==========================================================================
   BLUE FOX DEFENSE
   RMF CATEGORIZE PHASE — PHASE-SPECIFIC DATA

   LOCATION:
   labs/rmf/js/phases/categorize-phase.js

   PURPOSE:
   This file contains ONLY Categorize-specific data.

   Shared rendering and lifecycle behavior lives in:
   js/phases/phase.js
   ========================================================================== */


(() => {

    /* ======================================================================
       01. CATEGORIZE ACTIVITIES
       ====================================================================== */

    const categorizeActivities = [

        {
            number: "01",
            type: "System Review",
            title: "System Description Review",
            summary:
                "The authorization team reviews the Foxhole Portal description to confirm that its purpose, users, components, environment, interfaces, and dependencies are current before impact analysis begins.",
            details: [
                {
                    title: "Inputs Reviewed",
                    content: [
                        "Prepare authorization record",
                        "Authorization boundary",
                        "Asset inventory",
                        "Architecture and allocation information"
                    ]
                },
                {
                    title: "Review Focus",
                    content: [
                        "System purpose and supported business functions",
                        "User populations and administrative roles",
                        "Major components and hosting environment",
                        "External interfaces and shared dependencies"
                    ]
                },
                {
                    title: "Decision",
                    content: [
                        "The system description is accepted as current after incorporating clarifications identified during the Categorize review."
                    ]
                },
                {
                    title: "Output",
                    content: [
                        "System Description Review"
                    ]
                }
            ]
        },

        {
            number: "02",
            type: "Information Analysis",
            title: "Information Type Confirmation",
            summary:
                "The team reviews the information identified during Prepare and confirms the information types that will be evaluated for confidentiality, integrity, and availability impact.",
            details: [
                {
                    title: "Information Reviewed",
                    content: [
                        "Employee profile information",
                        "Training records",
                        "Internal policy documents",
                        "Employee service requests",
                        "System audit information"
                    ]
                },
                {
                    title: "Analysis Goal",
                    content: [
                        "Confirm what information the portal processes, stores, or transmits and make sure each relevant information type is represented in the impact analysis."
                    ]
                },
                {
                    title: "Decision",
                    content: [
                        "Five information groupings are retained for the Foxhole Portal case-study impact analysis."
                    ]
                },
                {
                    title: "Output",
                    content: [
                        "Confirmed information-type set used by the CIA analysis"
                    ]
                }
            ]
        },

        {
            number: "03",
            type: "Impact Analysis",
            title: "CIA Impact Analysis",
            summary:
                "Each confirmed information type is evaluated for the potential impact of losing confidentiality, integrity, or availability.",
            details: [
                {
                    title: "Security Objectives",
                    content: [
                        "Confidentiality",
                        "Integrity",
                        "Availability"
                    ]
                },
                {
                    title: "Impact Levels",
                    content: [
                        "Low",
                        "Moderate",
                        "High"
                    ]
                },
                {
                    title: "Case-Study Result",
                    content: [
                        "The highest supported impact across the analyzed Foxhole Portal information is Moderate for confidentiality, integrity, and availability."
                    ]
                },
                {
                    title: "Outputs",
                    content: [
                        "Information Type & CIA Analysis",
                        "FIPS 199 Worksheet"
                    ]
                }
            ]
        },

        {
            number: "04",
            type: "Categorization",
            title: "Security Categorization",
            summary:
                "The documented impact analysis is consolidated into the Foxhole Portal security categorization and its supporting rationale.",
            details: [
                {
                    title: "Categorization Inputs",
                    content: [
                        "Confirmed information types",
                        "CIA impact determinations",
                        "FIPS 199 worksheet",
                        "System mission and business context"
                    ]
                },
                {
                    title: "Result",
                    content: [
                        "Confidentiality: Moderate",
                        "Integrity: Moderate",
                        "Availability: Moderate"
                    ]
                },
                {
                    title: "Overall Determination",
                    content: [
                        "Foxhole Portal is documented as a Moderate-impact system for this fictional case study."
                    ]
                },
                {
                    title: "Output",
                    content: [
                        "Categorization Results"
                    ]
                }
            ]
        },

        {
            number: "05",
            type: "Governance Review",
            title: "Categorization Review & Approval",
            summary:
                "The categorization rationale is reviewed, discrepancies are resolved, and the final security categorization is approved before the system moves into Select.",
            details: [
                {
                    title: "Review Participants",
                    content: [
                        "Authorizing Official",
                        "System Owner",
                        "ISSM",
                        "ISSO",
                        "Technical Lead"
                    ]
                },
                {
                    title: "Review Focus",
                    content: [
                        "Impact rationale is supported",
                        "Information types are complete",
                        "System description is current",
                        "Final categorization is consistent with the documented analysis"
                    ]
                },
                {
                    title: "Outcome",
                    content: [
                        "The Moderate categorization is approved for use as the basis for security and privacy control selection."
                    ]
                },
                {
                    title: "Output",
                    content: [
                        "Categorization Approval"
                    ]
                }
            ]
        }

    ];


    /* ======================================================================
       02. CATEGORIZE AUTHORIZATION RECORDS

       Visible interface intentionally uses short record labels. RMF task
       traceability can remain in the source comments and the actual PDFs.
       ====================================================================== */

    const categorizeArtifacts = [

        {
            id: "BFD-CAT-001",
            type: "Review / Update",
            status: "Complete",
            title: "System Description Review",
            href: "documentation/categorize-library.html?doc=BFD-CAT-001",
            summary:
                "Reviews the Foxhole Portal description and records updates needed to keep system characteristics current for categorization."
        },

        {
            id: "BFD-CAT-002",
            type: "Impact Analysis",
            status: "Complete",
            title: "Information Type & CIA Analysis",
            href: "documentation/categorize-library.html?doc=BFD-CAT-002",
            summary:
                "Documents the confidentiality, integrity, and availability impact analysis for the information handled by the Foxhole Portal."
        },

        {
            id: "BFD-CAT-003",
            type: "Working Artifact",
            status: "Complete",
            title: "FIPS 199 Worksheet",
            href: "documentation/categorize-library.html?doc=BFD-CAT-003",
            summary:
                "Captures the working categorization analysis used to translate documented information impacts into the system security category."
        },

        {
            id: "BFD-CAT-004",
            type: "Categorization",
            status: "Approved",
            title: "Categorization Results",
            href: "documentation/categorize-library.html?doc=BFD-CAT-004",
            summary:
                "Records the resulting Foxhole Portal security categorization and the rationale supporting the final impact determination."
        },

        {
            id: "BFD-CAT-005",
            type: "Approval",
            status: "Approved",
            title: "Categorization Approval",
            href: "documentation/categorize-library.html?doc=BFD-CAT-005",
            summary:
                "Records review and approval of the documented security categorization before the authorization effort moves into Select."
        }

    ];


    /* ======================================================================
       03. CATEGORIZE DECISION LOG
       ====================================================================== */

    const categorizeDecisions = [

        {
            id: "CAT-DEC-01",
            decision:
                "The Foxhole Portal system description is accepted as current after the Categorize review and documented updates.",
            owner: "System Owner",
            status: "Approved"
        },

        {
            id: "CAT-DEC-02",
            decision:
                "The information-type set used for CIA impact analysis is confirmed as complete for the defined Foxhole Portal scope.",
            owner: "ISSO",
            status: "Approved"
        },

        {
            id: "CAT-DEC-03",
            decision:
                "The case-study impact analysis results in Moderate confidentiality, Moderate integrity, and Moderate availability impact levels.",
            owner: "ISSM",
            status: "Approved"
        },

        {
            id: "CAT-DEC-04",
            decision:
                "The Foxhole Portal Moderate security categorization is approved as the basis for the Select phase.",
            owner: "Authorizing Official",
            status: "Approved"
        }

    ];


    /* ======================================================================
       04. CATEGORIZE GOVERNING REFERENCES
       ====================================================================== */

    const categorizeReferences = [

        {
            code: "NIST SP 800-37 Rev. 2",
            title: "Risk Management Framework",
            focus: "RMF lifecycle + Categorize guidance",
            href: "https://csrc.nist.gov/pubs/sp/800/37/r2/final"
        },

        {
            code: "FIPS 199",
            title: "Standards for Security Categorization",
            focus: "Impact levels + system categorization",
            href: "https://csrc.nist.gov/pubs/fips/199/final"
        },

        {
            code: "NIST SP 800-60 Vol. 1 Rev. 1",
            title: "Information Type Mapping Guide",
            focus: "Categorization methodology",
            href: "https://csrc.nist.gov/pubs/sp/800/60/v1/r1/final"
        },

        {
            code: "NIST SP 800-60 Vol. 2 Rev. 1",
            title: "Information Type Recommendations",
            focus: "Information-type guidance",
            href: "https://csrc.nist.gov/pubs/sp/800/60/v2/r1/final"
        },

        {
            code: "DoDI 8510.01",
            title: "Risk Management Framework for DoD Systems",
            focus: "DoD RMF implementation",
            href: "https://www.esd.whs.mil/Portals/54/Documents/DD/issuances/dodi/851001p.pdf"
        }

    ];


    /* ======================================================================
       05. CATEGORIZE DATA NAMESPACE
       ====================================================================== */

    window.BlueFoxRMF =
        window.BlueFoxRMF || {};

    window.BlueFoxRMF.Categorize = {

        activities:
            categorizeActivities,

        artifacts:
            categorizeArtifacts,

        decisions:
            categorizeDecisions,

        references:
            categorizeReferences

    };


    /* ======================================================================
       06. RENDER CATEGORIZE CONTENT WITH SHARED PHASE COMPONENTS
       ====================================================================== */

    function initializeCategorizePhase() {

        const Phase =
            window.BlueFoxRMF.Phase;

        if (!Phase) {

            console.error(
                "BlueFoxRMF.Phase is unavailable. Load js/phases/phase.js before categorize-phase.js."
            );

            return;
        }

        Phase.renderActivities(
            categorizeActivities
        );

        Phase.renderArtifacts(
            categorizeArtifacts
        );

        Phase.renderDecisions(
            categorizeDecisions
        );

        Phase.renderReferences(
            categorizeReferences
        );

    }


    /* ======================================================================
       07. START CATEGORIZE-SPECIFIC RENDERING
       ====================================================================== */

    document.addEventListener(
        "DOMContentLoaded",
        initializeCategorizePhase
    );

})();
