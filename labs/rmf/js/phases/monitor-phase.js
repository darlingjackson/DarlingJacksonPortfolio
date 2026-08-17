"use strict";

/* ========================================================================== 
   BLUE FOX DEFENSE
   RMF MONITOR PHASE — PHASE-SPECIFIC DATA

   LOCATION:
   labs/rmf/js/phases/monitor-phase.js

   PURPOSE:
   This file contains ONLY Monitor-specific data.

   Shared rendering and lifecycle behavior lives in:
   js/phases/phase.js

   Shared portfolio behavior remains in:
   ../../js/script.js
   ========================================================================== */

(() => {

    /* ====================================================================== 
       01. MONITOR ACTIVITIES

       NIST SP 800-37 Rev. 2 mapping:
       M-1 System and Environment Changes
       M-2 Ongoing Assessments
       M-3 Ongoing Risk Response
       M-4 Authorization Package Updates
       M-5 Security and Privacy Reporting
       M-6 Ongoing Authorization
       M-7 System Disposal

       Task identifiers remain in source comments rather than the visible UI.
       ====================================================================== */

    const monitorActivities = [

        {
            number: "01",
            type: "Change Monitoring",
            title: "Monitor System & Environment Changes",
            summary:
                "Blue Fox Defense monitors the Foxhole Portal and its environment for changes that could affect the system's security or privacy posture.",
            details: [
                {
                    title: "Change Sources",
                    content: [
                        "Application releases",
                        "Architecture or infrastructure changes",
                        "Identity and shared-service changes",
                        "New interfaces or dependencies",
                        "Changes in information processing",
                        "Emerging threats and vulnerabilities"
                    ]
                },
                {
                    title: "Case-Study Event",
                    content: [
                        "A fictional Foxhole Portal application release is reviewed for authorization-boundary, information-type, control-implementation, and risk impact."
                    ]
                },
                {
                    title: "Case-Study Result",
                    content: [
                        "The change does not materially alter the approved Moderate categorization or authorization boundary."
                    ]
                },
                {
                    title: "Output",
                    content: [
                        "Change & Impact Register"
                    ]
                }
            ]
        },

        {
            number: "02",
            type: "Ongoing Assessment",
            title: "Reassess Control Effectiveness",
            summary:
                "Selected controls are reassessed at frequencies established by the continuous monitoring strategy to determine whether they remain implemented and effective.",
            details: [
                {
                    title: "Assessment Focus",
                    content: [
                        "Access and privileged administration",
                        "Audit and logging",
                        "Secure configuration",
                        "Vulnerability management",
                        "Contingency and recovery",
                        "Evidence and documentation traceability"
                    ]
                },
                {
                    title: "Assessment Methods",
                    content: [
                        "Automated monitoring and scanning where appropriate",
                        "Targeted examination of records and configurations",
                        "Focused interviews",
                        "Technical validation and testing"
                    ]
                },
                {
                    title: "Case-Study Result",
                    content: [
                        "Representative safeguards remain effective and no critical or high case-study findings are identified during the current monitoring cycle."
                    ]
                },
                {
                    title: "Output",
                    content: [
                        "Ongoing Assessment Record"
                    ]
                }
            ]
        },

        {
            number: "03",
            type: "Risk Response",
            title: "Analyze Results & Respond to Risk",
            summary:
                "Monitoring results, vulnerability information, system changes, risk assessments, and outstanding corrective actions are analyzed and addressed.",
            details: [
                {
                    title: "Risk Inputs",
                    content: [
                        "Ongoing assessment results",
                        "Vulnerability scan results",
                        "System and environment changes",
                        "Threat information",
                        "POA&M status",
                        "Operational incidents and observations"
                    ]
                },
                {
                    title: "Case-Study POA&M Update",
                    content: [
                        "The prior evidence-traceability deficiency is corrected, supporting evidence is linked, and the corrective action is validated."
                    ]
                },
                {
                    title: "Current Vulnerability Response",
                    content: [
                        "Two fictional medium vulnerabilities remain within established remediation timelines and continue to be tracked for mitigation."
                    ]
                },
                {
                    title: "Output",
                    content: [
                        "Risk Response & POA&M Update"
                    ]
                }
            ]
        },

        {
            number: "04",
            type: "Authorization Records",
            title: "Update the Authorization Package",
            summary:
                "Risk-management records are updated when continuous monitoring produces information that changes the documented system posture.",
            details: [
                {
                    title: "Records Reviewed",
                    content: [
                        "System Security Plan",
                        "Security Assessment Report information",
                        "POA&M",
                        "Risk determination and response records",
                        "Supporting architecture and implementation information"
                    ]
                },
                {
                    title: "Update Rule",
                    content: [
                        "Records are updated when monitoring results or system changes make the current authorization documentation incomplete, inaccurate, or outdated."
                    ]
                },
                {
                    title: "Case-Study Update",
                    content: [
                        "The POA&M is updated to show closure of the evidence-traceability item and the current posture report reflects the reviewed application change."
                    ]
                },
                {
                    title: "Output",
                    content: [
                        "Authorization Package Update Log"
                    ]
                }
            ]
        },

        {
            number: "05",
            type: "Posture Reporting",
            title: "Report Security & Privacy Posture",
            summary:
                "The current Foxhole Portal posture is reported to the Authorizing Official and other appropriate organizational stakeholders according to the monitoring strategy.",
            details: [
                {
                    title: "Reporting Content",
                    content: [
                        "Significant system and environment changes",
                        "Control assessment results",
                        "Vulnerability and threat information",
                        "POA&M status",
                        "Risk responses",
                        "Authorization status"
                    ]
                },
                {
                    title: "Reporting Goal",
                    content: [
                        "Give decision-makers timely information that supports ongoing risk management."
                    ]
                },
                {
                    title: "Case-Study Posture",
                    content: [
                        "The system remains authorized, the prior POA&M item is closed, and current monitored risk remains within the accepted case-study tolerance."
                    ]
                },
                {
                    title: "Output",
                    content: [
                        "Security & Privacy Posture Report"
                    ]
                }
            ]
        },

        {
            number: "06",
            type: "Ongoing Authorization",
            title: "Review Whether Risk Remains Acceptable",
            summary:
                "The Authorizing Official uses current monitoring information to determine whether the Foxhole Portal's security and privacy risk remains acceptable.",
            details: [
                {
                    title: "Decision Inputs",
                    content: [
                        "Current posture report",
                        "System and environment changes",
                        "Ongoing assessment results",
                        "POA&M status",
                        "Risk responses",
                        "Organizational risk tolerance"
                    ]
                },
                {
                    title: "Case-Study Decision",
                    content: [
                        "The reviewed changes and monitoring results do not materially increase system risk, and the authorization remains active."
                    ]
                },
                {
                    title: "Decision Condition",
                    content: [
                        "A future material change or unacceptable risk condition could trigger additional RMF activity or a revised authorization decision."
                    ]
                },
                {
                    title: "Output",
                    content: [
                        "Ongoing Authorization Record"
                    ]
                }
            ]
        },

        {
            number: "07",
            type: "Lifecycle Condition",
            title: "Execute System Disposal When Required",
            summary:
                "If the Foxhole Portal is eventually removed from operation, Blue Fox Defense executes the appropriate system-disposal actions and updates the risk-management record.",
            details: [
                {
                    title: "Current State",
                    content: [
                        "System disposal is not initiated because the Foxhole Portal remains operational in the current case study."
                    ]
                },
                {
                    title: "Future Disposal Considerations",
                    content: [
                        "Information retention and sanitization",
                        "Account and credential removal",
                        "Component or service decommissioning",
                        "Asset disposition",
                        "Records retention",
                        "Authorization-record closure"
                    ]
                },
                {
                    title: "Trigger",
                    content: [
                        "This activity becomes applicable when the system is removed from operation."
                    ]
                },
                {
                    title: "Output",
                    content: [
                        "System Disposal Record when applicable"
                    ]
                }
            ]
        }

    ];


    /* ====================================================================== 
       02. MONITOR AUTHORIZATION RECORDS
       ====================================================================== */

    const monitorArtifacts = [

        {
            id: "BFD-MON-001",
            type: "Changes",
            status: "Current",
            title: "Change & Impact Register",
            href: "documentation/monitor-library.html?doc=BFD-MON-001",
            summary:
                "Tracks significant system and environmental changes and records their potential impact on the Foxhole Portal authorization boundary, categorization, controls, and risk."
        },

        {
            id: "BFD-MON-002",
            type: "Assessment",
            status: "Current",
            title: "Ongoing Assessment Record",
            href: "documentation/monitor-library.html?doc=BFD-MON-002",
            summary:
                "Documents recurring assessment activities, evidence reviewed, control-effectiveness determinations, vulnerabilities, and monitoring observations from the current cycle."
        },

        {
            id: "BFD-MON-003",
            type: "Risk Response",
            status: "Updated",
            title: "Risk Response & POA&M Update",
            href: "documentation/monitor-library.html?doc=BFD-MON-003",
            summary:
                "Records ongoing risk responses, vulnerability actions, corrective-action progress, and updates to POA&M items resulting from continuous monitoring."
        },

        {
            id: "BFD-MON-004",
            type: "Package",
            status: "Updated",
            title: "Authorization Package Update Log",
            href: "documentation/monitor-library.html?doc=BFD-MON-004",
            summary:
                "Tracks changes made to security plans, assessment information, POA&M data, risk records, and other authorization documentation based on monitoring results."
        },

        {
            id: "BFD-MON-005",
            type: "Posture",
            status: "Current",
            title: "Security & Privacy Posture Report",
            href: "documentation/monitor-library.html?doc=BFD-MON-005",
            summary:
                "Summarizes significant changes, ongoing assessments, vulnerability posture, corrective actions, current risk, and authorization status for organizational reporting."
        },

        {
            id: "BFD-MON-006",
            type: "Authorization",
            status: "Active",
            title: "Ongoing Authorization Record",
            href: "documentation/monitor-library.html?doc=BFD-MON-006",
            summary:
                "Records the ongoing review of system risk and the determination that the Foxhole Portal authorization remains active based on current monitoring information."
        }

    ];


    /* ====================================================================== 
       03. MONITOR DECISION LOG
       ====================================================================== */

    const monitorDecisions = [

        {
            id: "MON-DEC-01",
            decision:
                "The reviewed application release does not materially change the Foxhole Portal authorization boundary or Moderate security categorization.",
            owner: "ISSM",
            status: "Approved"
        },

        {
            id: "MON-DEC-02",
            decision:
                "The prior evidence-traceability POA&M item is closed after corrective action and validation of the supporting evidence linkage.",
            owner: "System Owner",
            status: "Complete"
        },

        {
            id: "MON-DEC-03",
            decision:
                "Two fictional medium vulnerabilities remain within established remediation timelines and will continue to be mitigated and monitored.",
            owner: "ISSO",
            status: "Tracking"
        },

        {
            id: "MON-DEC-04",
            decision:
                "Current continuous-monitoring results support continued operation, and the Foxhole Portal authorization remains active.",
            owner: "Authorizing Official",
            status: "Approved"
        }

    ];


    /* ====================================================================== 
       04. MONITOR GOVERNING REFERENCES
       ====================================================================== */

    const monitorReferences = [

        {
            code: "NIST SP 800-37 Rev. 2",
            title: "Risk Management Framework",
            focus: "Monitor tasks + ongoing authorization",
            href: "https://csrc.nist.gov/pubs/sp/800/37/r2/final"
        },

        {
            code: "NIST RMF Monitor Step",
            title: "Monitor Step Overview",
            focus: "Current NIST purpose + Monitor outcomes",
            href: "https://csrc.nist.gov/projects/risk-management/about-rmf/monitor-step"
        },

        {
            code: "NIST SP 800-137",
            title: "Information Security Continuous Monitoring",
            focus: "ISCM strategy + ongoing risk awareness",
            href: "https://csrc.nist.gov/pubs/sp/800/137/final"
        },

        {
            code: "NIST SP 800-137A",
            title: "Assessing ISCM Programs",
            focus: "Continuous-monitoring program assessment",
            href: "https://csrc.nist.gov/pubs/sp/800/137/a/final"
        },

        {
            code: "NIST SP 800-53A Rev. 5",
            title: "Assessing Security and Privacy Controls",
            focus: "Ongoing control-assessment methodology",
            href: "https://csrc.nist.gov/pubs/sp/800/53/a/r5/final"
        },

        {
            code: "DoDI 8510.01",
            title: "Risk Management Framework for DoD Systems",
            focus: "DoD RMF implementation",
            href: "https://www.esd.whs.mil/Directives/issuances/dodi/"
        }

    ];


    /* ====================================================================== 
       05. MONITOR DATA NAMESPACE
       ====================================================================== */

    window.BlueFoxRMF =
        window.BlueFoxRMF || {};

    window.BlueFoxRMF.Monitor = {

        activities:
            monitorActivities,

        artifacts:
            monitorArtifacts,

        decisions:
            monitorDecisions,

        references:
            monitorReferences

    };


    /* ====================================================================== 
       06. RENDER MONITOR CONTENT WITH SHARED PHASE COMPONENTS
       ====================================================================== */

    function initializeMonitorPhase() {

        const Phase =
            window.BlueFoxRMF.Phase;

        if (!Phase) {

            console.error(
                "BlueFoxRMF.Phase is unavailable. Load js/phases/phase.js before monitor-phase.js."
            );

            return;

        }

        Phase.renderActivities(
            monitorActivities
        );

        Phase.renderArtifacts(
            monitorArtifacts
        );

        Phase.renderDecisions(
            monitorDecisions
        );

        if (typeof Phase.renderReferences === "function") {

            Phase.renderReferences(
                monitorReferences
            );

        } else {

            console.error(
                "BlueFoxRMF.Phase.renderReferences is unavailable. Add the shared governing-reference renderer to js/phases/phase.js."
            );

        }

    }


    /* ====================================================================== 
       07. START MONITOR-SPECIFIC RENDERING
       ====================================================================== */

    document.addEventListener(
        "DOMContentLoaded",
        initializeMonitorPhase
    );

})();
