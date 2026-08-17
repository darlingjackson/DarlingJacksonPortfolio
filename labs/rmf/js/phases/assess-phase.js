"use strict";


/* ==========================================================================
   BLUE FOX DEFENSE
   RMF ASSESS PHASE — PHASE-SPECIFIC DATA

   LOCATION:
   labs/rmf/js/phases/assess-phase.js

   PURPOSE:
   This file contains ONLY Assess-specific data.

   Shared rendering and lifecycle behavior lives in:
   js/phases/phase.js

   Shared portfolio behavior remains in:
   ../../js/script.js
   ========================================================================== */


(() => {

    /* ======================================================================
       01. ASSESS ACTIVITIES

       NIST SP 800-37 Rev. 2 mapping:
       A-1 Assessor Selection
       A-2 Assessment Plan
       A-3 Control Assessments
       A-4 Assessment Reports
       A-5 Remediation Actions
       A-6 Plan of Action and Milestones

       The visible interface intentionally uses plain-language activity names.
       Task identifiers remain in source comments and can also be documented
       inside the authorization records.
       ====================================================================== */

    const assessActivities = [

        {
            number: "01",
            type: "Assessment Governance",
            title: "Select the Assessment Team",
            summary:
                "Blue Fox Defense identifies the assessor or assessment team and establishes the level of independence appropriate for evaluating the Foxhole Portal controls.",
            details: [
                {
                    title: "Selection Focus",
                    content: [
                        "Assessment knowledge and technical competency",
                        "Understanding of the Foxhole Portal environment",
                        "Ability to evaluate system-specific, hybrid, and inherited controls",
                        "Appropriate independence from control implementation activities"
                    ]
                },
                {
                    title: "Primary Inputs",
                    content: [
                        "System Security Plan",
                        "Control Implementation Record",
                        "Configuration & Evidence Register",
                        "Architecture and boundary documentation"
                    ]
                },
                {
                    title: "Case-Study Decision",
                    content: [
                        "The assessment team is established separately from the personnel responsible for implementing the controls being evaluated."
                    ]
                },
                {
                    title: "Output",
                    content: [
                        "Assessment Team & Independence Record"
                    ]
                }
            ]
        },


        {
            number: "02",
            type: "Assessment Planning",
            title: "Develop & Approve the Assessment Plan",
            summary:
                "The assessor defines the assessment scope, procedures, methods, evidence requirements, depth, coverage, schedule, and expectations before testing begins.",
            details: [
                {
                    title: "Plan Content",
                    content: [
                        "Controls and control enhancements in scope",
                        "Assessment procedures",
                        "Examine, interview, and test methods",
                        "Assessment objects and evidence requirements",
                        "Assessment depth and coverage",
                        "Schedule and coordination requirements"
                    ]
                },
                {
                    title: "Procedure Source",
                    content: [
                        "NIST SP 800-53A procedures are used as the starting point and tailored to the Foxhole Portal assessment."
                    ]
                },
                {
                    title: "Approval",
                    content: [
                        "The assessment plan is reviewed and approved before formal control assessment activities begin."
                    ]
                },
                {
                    title: "Output",
                    content: [
                        "Security Assessment Plan"
                    ]
                }
            ]
        },


        {
            number: "03",
            type: "Control Assessment",
            title: "Execute Assessment Procedures",
            summary:
                "The assessment team evaluates implemented controls in accordance with the approved plan and records evidence-based determinations.",
            details: [
                {
                    title: "Assessment Methods",
                    content: [
                        "Examine documentation, records, configurations, and other artifacts",
                        "Interview personnel responsible for implementation and operation",
                        "Test technical and operational mechanisms"
                    ]
                },
                {
                    title: "Evidence Rule",
                    content: [
                        "Assessment conclusions are supported by objective evidence rather than implementation statements alone."
                    ]
                },
                {
                    title: "Efficiency Considerations",
                    content: [
                        "Reusable prior results may be considered when appropriate.",
                        "Automation is used when it improves assessment speed, consistency, or coverage."
                    ]
                },
                {
                    title: "Output",
                    content: [
                        "Control-level assessment results and evidence"
                    ]
                }
            ]
        },


        {
            number: "04",
            type: "Assessment Reporting",
            title: "Document Findings & Recommendations",
            summary:
                "Assessment results are analyzed and documented so system leadership can understand deficiencies, supporting evidence, risk context, and recommended corrective actions.",
            details: [
                {
                    title: "Report Content",
                    content: [
                        "Assessment scope and methodology",
                        "Results and evidence",
                        "Control deficiencies",
                        "Risk-relevant observations",
                        "Recommendations for corrective action"
                    ]
                },
                {
                    title: "Case-Study Findings",
                    content: [
                        "A secure configuration deviation is identified.",
                        "One implementation statement lacks sufficient evidence traceability."
                    ]
                },
                {
                    title: "Reporting Goal",
                    content: [
                        "Provide a clear assessment record that can support remediation and the later authorization risk decision."
                    ]
                },
                {
                    title: "Output",
                    content: [
                        "Security Assessment Report"
                    ]
                }
            ]
        },


        {
            number: "05",
            type: "Remediation",
            title: "Remediate & Retest Deficiencies",
            summary:
                "The team performs appropriate initial remediation, updates affected implementation information, and retests corrected safeguards when needed.",
            details: [
                {
                    title: "Initial Remediation",
                    content: [
                        "The configuration deviation identified during assessment is corrected and retested."
                    ]
                },
                {
                    title: "Documentation Update",
                    content: [
                        "Security plan and implementation records are updated when remediation changes how a control is implemented."
                    ]
                },
                {
                    title: "Retest Rule",
                    content: [
                        "Corrective actions are reassessed when necessary to verify that the deficiency was addressed."
                    ]
                },
                {
                    title: "Output",
                    content: [
                        "Remediation & Retest Record"
                    ]
                }
            ]
        },


        {
            number: "06",
            type: "Corrective Action Tracking",
            title: "Develop the POA&M",
            summary:
                "Remaining deficiencies that are not fully resolved during initial remediation are documented with planned corrective actions, ownership, milestones, and target completion information.",
            details: [
                {
                    title: "Remaining Item",
                    content: [
                        "The evidence-traceability deficiency remains open and is carried into the case-study POA&M."
                    ]
                },
                {
                    title: "Tracking Content",
                    content: [
                        "Deficiency description",
                        "Planned corrective action",
                        "Responsible owner",
                        "Milestones",
                        "Target completion information"
                    ]
                },
                {
                    title: "Authorization Purpose",
                    content: [
                        "The POA&M makes unresolved deficiencies visible so they can be considered during the Authorize phase risk decision."
                    ]
                },
                {
                    title: "Output",
                    content: [
                        "Plan of Action & Milestones"
                    ]
                }
            ]
        }

    ];


    /* ======================================================================
       02. ASSESS AUTHORIZATION RECORDS

       The document set is deliberately consolidated. NIST defines required
       tasks and outcomes; these Blue Fox Defense records organize the case
       study without implying that NIST requires one PDF per task.
       ====================================================================== */

    const assessArtifacts = [

        {
            id: "BFD-ASS-001",
            type: "Assessment Team",
            status: "Approved",
            title: "Assessment Team & Independence Record",
            href: "documentation/assess-library.html?doc=BFD-ASS-001",
            summary:
                "Identifies the assessor or assessment team, relevant competencies, responsibilities, and the level of independence established for the Foxhole Portal assessment."
        },

        {
            id: "BFD-ASS-002",
            type: "Assessment Plan",
            status: "Approved",
            title: "Security Assessment Plan",
            href: "documentation/assess-library.html?doc=BFD-ASS-002",
            summary:
                "Defines the assessment scope, procedures, methods, objects, evidence needs, depth, coverage, schedule, and expectations for evaluating implemented controls."
        },

        {
            id: "BFD-ASS-003",
            type: "Assessment Report",
            status: "Complete",
            title: "Security Assessment Report",
            href: "documentation/assess-library.html?doc=BFD-ASS-003",
            summary:
                "Documents assessment results, supporting evidence, control findings, observations, and recommendations produced from the Foxhole Portal control assessment."
        },

        {
            id: "BFD-ASS-004",
            type: "Remediation",
            status: "Complete",
            title: "Remediation & Retest Record",
            href: "documentation/assess-library.html?doc=BFD-ASS-004",
            summary:
                "Records corrective actions taken during Assess, associated implementation updates, and retest results used to verify resolved deficiencies."
        },

        {
            id: "BFD-ASS-005",
            type: "Corrective Action",
            status: "Open",
            title: "Plan of Action & Milestones",
            href: "documentation/assess-library.html?doc=BFD-ASS-005",
            summary:
                "Tracks remaining assessment deficiencies, planned corrective actions, responsible owners, milestones, and target completion information for authorization risk review."
        }

    ];


    /* ======================================================================
       03. ASSESS DECISION LOG
       ====================================================================== */

    const assessDecisions = [

        {
            id: "ASS-DEC-01",
            decision:
                "The Foxhole Portal assessment team will maintain appropriate independence from the personnel responsible for implementing the controls under review.",
            owner: "Authorizing Official",
            status: "Approved"
        },

        {
            id: "ASS-DEC-02",
            decision:
                "The approved Security Assessment Plan will define the scope, methods, evidence expectations, depth, and coverage used during the control assessment.",
            owner: "Control Assessor",
            status: "Approved"
        },

        {
            id: "ASS-DEC-03",
            decision:
                "The identified secure-configuration deviation will be corrected and retested before the assessment record is finalized.",
            owner: "System Owner",
            status: "Complete"
        },

        {
            id: "ASS-DEC-04",
            decision:
                "The remaining evidence-traceability deficiency will be tracked in the POA&M and presented as part of the authorization risk package.",
            owner: "ISSO",
            status: "Approved"
        }

    ];


    /* ======================================================================
       04. ASSESS GOVERNING REFERENCES
       ====================================================================== */

    const assessReferences = [

        {
            code: "NIST SP 800-37 Rev. 2",
            title: "Risk Management Framework",
            focus: "RMF lifecycle + Assess tasks and outcomes",
            href: "https://csrc.nist.gov/pubs/sp/800/37/r2/final"
        },

        {
            code: "NIST SP 800-53A Rev. 5",
            title: "Assessing Security and Privacy Controls",
            focus: "Assessment plans + procedures + analysis",
            href: "https://csrc.nist.gov/pubs/sp/800/53/a/r5/final"
        },

        {
            code: "NIST SP 800-53 Rev. 5",
            title: "Security and Privacy Controls",
            focus: "Control requirements being assessed",
            href: "https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final"
        },

        {
            code: "NIST SP 800-115",
            title: "Technical Guide to Information Security Testing and Assessment",
            focus: "Technical testing + examination methods",
            href: "https://csrc.nist.gov/pubs/sp/800/115/final"
        },

        {
            code: "NIST IR 8011",
            title: "Automation Support for Security Control Assessments",
            focus: "Automated assessment concepts",
            href: "https://csrc.nist.gov/pubs/ir/8011/v1/final"
        },

        {
            code: "DoDI 8510.01",
            title: "Risk Management Framework for DoD Systems",
            focus: "DoD RMF implementation",
            href: "https://www.esd.whs.mil/Directives/issuances/dodi/"
        }

    ];


    /* ======================================================================
       05. ASSESS DATA NAMESPACE
       ====================================================================== */

    window.BlueFoxRMF =
        window.BlueFoxRMF || {};

    window.BlueFoxRMF.Assess = {

        activities:
            assessActivities,

        artifacts:
            assessArtifacts,

        decisions:
            assessDecisions,

        references:
            assessReferences

    };


    /* ======================================================================
       06. RENDER ASSESS CONTENT WITH SHARED PHASE COMPONENTS
       ====================================================================== */

    function initializeAssessPhase() {

        const Phase =
            window.BlueFoxRMF.Phase;

        if (!Phase) {

            console.error(
                "BlueFoxRMF.Phase is unavailable. Load js/phases/phase.js before assess-phase.js."
            );

            return;

        }


        Phase.renderActivities(
            assessActivities
        );


        Phase.renderArtifacts(
            assessArtifacts
        );


        Phase.renderDecisions(
            assessDecisions
        );


        if (typeof Phase.renderReferences === "function") {

            Phase.renderReferences(
                assessReferences
            );

        } else {

            console.error(
                "BlueFoxRMF.Phase.renderReferences is unavailable. Add the shared governing-reference renderer to js/phases/phase.js."
            );

        }

    }


    /* ======================================================================
       07. START ASSESS-SPECIFIC RENDERING
       ====================================================================== */

    document.addEventListener(
        "DOMContentLoaded",
        initializeAssessPhase
    );

})();