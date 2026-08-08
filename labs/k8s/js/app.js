/* =========================================================
   KUBERNETES PLATFORM ENGINEERING LAB
   Interactive Mission Control
   ========================================================= */


/* =========================================================
   LAB PHASE DATA

   Change the "status" value as the lab progresses.

   Allowed values:

   complete
   current
   upcoming

   The progress dashboard automatically updates.
   ========================================================= */

const labPhases = [

    {
        number: 1,
        category: "FOUNDATIONS",
        title: "Kubernetes Foundations",
        status: "current",

        summary:
            "Build a working mental model of Kubernetes before creating platform resources.",

        objective:
            "Understand how the control plane, API server, scheduler, worker nodes, kubelet, container runtime, Pods, desired state, and reconciliation work together.",

        concepts: [
            "Cluster",
            "Control Plane",
            "Worker Node",
            "API Server",
            "Scheduler",
            "kubelet",
            "Desired State",
            "Reconciliation"
        ],

        tasks: [
            "Understand Kubernetes cluster architecture.",
            "Trace what happens when kubectl sends a request.",
            "Understand desired state versus actual state.",
            "Understand reconciliation.",
            "Document Kubernetes foundational concepts."
        ],

        evidence: [
            "Architecture learning notes.",
            "Control plane workflow documentation.",
            "Kubernetes architecture diagram.",
            "Git commit preserving foundational notes."
        ]
    },


    {
        number: 2,
        category: "CLUSTER",
        title: "Build the Cluster",
        status: "upcoming",

        summary:
            "Create and inspect a local multi-node Kubernetes environment.",

        objective:
            "Build the local Kubernetes environment with kind and understand nodes, namespaces, contexts, and Kubernetes system workloads.",

        concepts: [
            "kind",
            "kubectl",
            "Control Plane Node",
            "Worker Nodes",
            "Namespace",
            "Context"
        ],

        tasks: [
            "Verify Docker.",
            "Install and verify kubectl.",
            "Install kind.",
            "Create a multi-node cluster.",
            "Inspect nodes.",
            "Inspect Kubernetes system Pods."
        ],

        evidence: [
            "Cluster configuration.",
            "kubectl cluster-info output.",
            "kubectl get nodes output.",
            "Healthy cluster screenshot."
        ]
    },


    {
        number: 3,
        category: "WORKLOAD",
        title: "Deploy Podinfo",
        status: "upcoming",

        summary:
            "Deploy Podinfo and inspect the Kubernetes resources responsible for running it.",

        objective:
            "Understand Deployments, ReplicaSets, Pods, labels, selectors, container images, and reconciliation.",

        concepts: [
            "Pod",
            "Deployment",
            "ReplicaSet",
            "Image",
            "Labels",
            "Selectors",
            "Replicas"
        ],

        tasks: [
            "Create the Podinfo Deployment YAML.",
            "Deploy Podinfo.",
            "Inspect the Deployment.",
            "Inspect the ReplicaSet.",
            "Inspect Pod state.",
            "Delete a Pod and watch Kubernetes replace it."
        ],

        evidence: [
            "Deployment YAML.",
            "Running Pod output.",
            "ReplicaSet output.",
            "Self-healing demonstration."
        ]
    },


    {
        number: 4,
        category: "NETWORK",
        title: "Services & Ingress",
        status: "upcoming",

        summary:
            "Expose Podinfo and understand how traffic moves through Kubernetes networking.",

        objective:
            "Understand Services, endpoints, DNS, Ingress, and why Pods should not be addressed directly.",

        concepts: [
            "ClusterIP",
            "Service",
            "Endpoints",
            "DNS",
            "Ingress",
            "Ingress Controller"
        ],

        tasks: [
            "Create a ClusterIP Service.",
            "Inspect endpoints.",
            "Test internal connectivity.",
            "Install NGINX Ingress.",
            "Create an Ingress resource.",
            "Access Podinfo through a hostname."
        ],

        evidence: [
            "Service YAML.",
            "Ingress YAML.",
            "Endpoint validation.",
            "Working browser request."
        ]
    },


    {
        number: 5,
        category: "CONFIGURATION",
        title: "Configuration",
        status: "upcoming",

        summary:
            "Separate workload configuration from the application deployment.",

        objective:
            "Use ConfigMaps and Secrets to manage application configuration without baking environment-specific values into workloads.",

        concepts: [
            "ConfigMap",
            "Secret",
            "Environment Variables",
            "Mounted Configuration"
        ],

        tasks: [
            "Create a ConfigMap.",
            "Inject configuration into Podinfo.",
            "Create a safe Secret example.",
            "Protect local secret files from Git."
        ],

        evidence: [
            "ConfigMap YAML.",
            "Secret example YAML.",
            "Configured application output.",
            ".gitignore validation."
        ]
    },


    {
        number: 6,
        category: "RELIABILITY",
        title: "Health & Self-Healing",
        status: "upcoming",

        summary:
            "Teach Kubernetes how to determine whether Podinfo is alive and ready.",

        objective:
            "Configure health probes and observe how Kubernetes responds when the application becomes unhealthy.",

        concepts: [
            "Liveness Probe",
            "Readiness Probe",
            "Restart",
            "Self-Healing",
            "Traffic Removal"
        ],

        tasks: [
            "Configure liveness probes.",
            "Configure readiness probes.",
            "Trigger a liveness failure.",
            "Trigger a readiness failure.",
            "Observe Kubernetes response."
        ],

        evidence: [
            "Probe configuration.",
            "Pod restart evidence.",
            "Readiness failure.",
            "kubectl describe output."
        ]
    },


    {
        number: 7,
        category: "SCALING",
        title: "Resources & Autoscaling",
        status: "upcoming",

        summary:
            "Manage workload resources and automatically scale Podinfo under load.",

        objective:
            "Understand CPU and memory requests, limits, scheduling implications, and Horizontal Pod Autoscaling.",

        concepts: [
            "CPU",
            "Memory",
            "Requests",
            "Limits",
            "Metrics Server",
            "HPA"
        ],

        tasks: [
            "Configure resource requests.",
            "Configure limits.",
            "Install metrics support.",
            "Create an HPA.",
            "Generate load.",
            "Observe replicas scale."
        ],

        evidence: [
            "Resource configuration.",
            "HPA YAML.",
            "Metrics output.",
            "Autoscaling screenshot."
        ]
    },


    {
        number: 8,
        category: "SECURITY",
        title: "RBAC & Security",
        status: "upcoming",

        summary:
            "Apply Kubernetes least privilege and workload security controls.",

        objective:
            "Use ServiceAccounts, Roles, RoleBindings, and security contexts to control access to Kubernetes resources.",

        concepts: [
            "ServiceAccount",
            "Role",
            "RoleBinding",
            "ClusterRole",
            "Least Privilege",
            "Security Context"
        ],

        tasks: [
            "Create a ServiceAccount.",
            "Create a Role.",
            "Bind the Role.",
            "Test allowed access.",
            "Test denied access.",
            "Apply workload security settings."
        ],

        evidence: [
            "RBAC YAML.",
            "kubectl auth can-i output.",
            "Forbidden operation.",
            "Security context configuration."
        ]
    },


    {
        number: 9,
        category: "OBSERVABILITY",
        title: "Observability",
        status: "upcoming",

        summary:
            "Collect metrics and visualize Kubernetes workload behavior.",

        objective:
            "Use Prometheus and Grafana to understand cluster and workload health through metrics and dashboards.",

        concepts: [
            "Prometheus",
            "Grafana",
            "Metrics",
            "Logs",
            "Events",
            "Observability"
        ],

        tasks: [
            "Deploy Prometheus.",
            "Deploy Grafana.",
            "Validate metric collection.",
            "Explore Podinfo metrics.",
            "Build or configure dashboards."
        ],

        evidence: [
            "Prometheus targets.",
            "Grafana dashboard.",
            "Pod metrics.",
            "Observability screenshots."
        ]
    },


    {
        number: 10,
        category: "PACKAGING",
        title: "Helm",
        status: "upcoming",

        summary:
            "Convert understood Kubernetes resources into a reusable Helm deployment.",

        objective:
            "Package the Podinfo Kubernetes deployment into a Helm chart without hiding the resources underneath.",

        concepts: [
            "Chart",
            "Template",
            "values.yaml",
            "Release",
            "Upgrade",
            "Rollback"
        ],

        tasks: [
            "Install Helm.",
            "Create a Helm chart.",
            "Template existing YAML.",
            "Create values.yaml.",
            "Install the release.",
            "Upgrade the release.",
            "Test rollback."
        ],

        evidence: [
            "Helm chart.",
            "helm install output.",
            "Release history.",
            "Rollback test."
        ]
    },


    {
        number: 11,
        category: "AUTOMATION",
        title: "GitHub Actions",
        status: "upcoming",

        summary:
            "Automate validation after the manual deployment workflow is understood.",

        objective:
            "Use GitHub Actions to validate Kubernetes YAML and Helm configuration while keeping GitHub as the source of truth.",

        concepts: [
            "CI/CD",
            "GitHub Actions",
            "Workflow",
            "Validation",
            "Secrets"
        ],

        tasks: [
            "Create a workflow.",
            "Validate Kubernetes manifests.",
            "Validate Helm templates.",
            "Run automated checks.",
            "Protect workflow secrets."
        ],

        evidence: [
            "Workflow YAML.",
            "Successful workflow run.",
            "Validation output.",
            "GitHub Actions history."
        ]
    },


    {
        number: 12,
        category: "OPERATIONS",
        title: "Troubleshooting",
        status: "upcoming",

        summary:
            "Create controlled Kubernetes failures and diagnose them systematically.",

        objective:
            "Demonstrate operational understanding by investigating failures using logs, events, resource descriptions, and network inspection.",

        concepts: [
            "CrashLoopBackOff",
            "ImagePullBackOff",
            "Events",
            "Logs",
            "Service Failure",
            "RBAC Failure"
        ],

        tasks: [
            "Create ImagePullBackOff.",
            "Create CrashLoopBackOff.",
            "Break a Service selector.",
            "Break readiness.",
            "Trigger RBAC Forbidden.",
            "Document remediation."
        ],

        evidence: [
            "Failure screenshots.",
            "Troubleshooting commands.",
            "Root-cause analysis.",
            "Remediation validation."
        ]
    }

];


/* =========================================================
   ARCHITECTURE DATA
   ========================================================= */

const architectureData = {

    client: {

        category:
            "CLIENT",

        title:
            "User / Client",

        description:
            "The external client initiates the HTTP request that enters the Kubernetes environment.",

        purpose:
            "Every application request begins outside the cluster. The client represents the source of traffic before Kubernetes routing begins."

    },


    ingress: {

        category:
            "EDGE ROUTING",

        title:
            "Ingress",

        description:
            "Ingress defines HTTP routing rules that direct requests toward Services inside the cluster.",

        purpose:
            "Ingress provides a clean entry point for external HTTP traffic without exposing individual Pods directly."

    },


    service: {

        category:
            "NETWORKING",

        title:
            "Kubernetes Service",

        description:
            "The Service provides a stable network endpoint and sends requests to Pods that match its label selector.",

        purpose:
            "Pod IP addresses are temporary. The Service allows clients and other workloads to reach the application through a stable address."

    },


    deployment: {

        category:
            "WORKLOAD CONTROLLER",

        title:
            "Deployment",

        description:
            "The Deployment defines the desired application state and manages the ReplicaSet responsible for maintaining Pod replicas.",

        purpose:
            "The Deployment continuously works to maintain the requested number of application instances and supports controlled application updates."

    },


    pod: {

        category:
            "WORKLOAD",

        title:
            "Podinfo Pod",

        description:
            "Each Pod contains a running instance of the Podinfo workload.",

        purpose:
            "Pods are Kubernetes' smallest deployable units. They are disposable, which is why higher-level controllers and Services are required."

    }

};


/* =========================================================
   DOM REFERENCES
   ========================================================= */

const root =
    document.documentElement;

const siteHeader =
    document.getElementById(
        "siteHeader"
    );

const themeToggle =
    document.getElementById(
        "themeToggle"
    );

const mobileMenuButton =
    document.getElementById(
        "mobileMenuButton"
    );

const mobileNav =
    document.getElementById(
        "mobileNav"
    );

const backToTop =
    document.getElementById(
        "backToTop"
    );

const phaseGrid =
    document.getElementById(
        "phaseGrid"
    );

const phaseFilters =
    document.querySelectorAll(
        ".phase-filter"
    );

const phaseDrawer =
    document.getElementById(
        "phaseDrawer"
    );

const drawerOverlay =
    document.getElementById(
        "drawerOverlay"
    );

const drawerClose =
    document.getElementById(
        "drawerClose"
    );

const progressRing =
    document.getElementById(
        "progressRing"
    );

const progressPercentage =
    document.getElementById(
        "progressPercentage"
    );

const completedCount =
    document.getElementById(
        "completedCount"
    );

const totalCount =
    document.getElementById(
        "totalCount"
    );

const currentPhaseTitle =
    document.getElementById(
        "currentPhaseTitle"
    );

const currentPhaseSummary =
    document.getElementById(
        "currentPhaseSummary"
    );


/* =========================================================
   THEME
   ========================================================= */

function initializeTheme() {

    const savedTheme =
        localStorage.getItem(
            "k8s-lab-theme"
        );


    if (savedTheme) {

        root.dataset.theme =
            savedTheme;

        return;

    }


    const systemPrefersLight =
        window.matchMedia(
            "(prefers-color-scheme: light)"
        ).matches;


    root.dataset.theme =
        systemPrefersLight
            ? "light"
            : "dark";

}


function toggleTheme() {

    const currentTheme =
        root.dataset.theme;


    const newTheme =
        currentTheme === "dark"
            ? "light"
            : "dark";


    root.dataset.theme =
        newTheme;


    localStorage.setItem(
        "k8s-lab-theme",
        newTheme
    );

}


themeToggle.addEventListener(
    "click",
    toggleTheme
);


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

mobileMenuButton.addEventListener(
    "click",
    () => {

        const isOpen =
            mobileNav.classList.toggle(
                "open"
            );


        mobileMenuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    }
);


mobileNav
    .querySelectorAll("a")
    .forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                mobileNav.classList.remove(
                    "open"
                );


                mobileMenuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }
        );

    });


/* =========================================================
   HEADER + BACK TO TOP
   ========================================================= */

function updateScrollUI() {

    const scrollPosition =
        window.scrollY;


    siteHeader.classList.toggle(
        "scrolled",
        scrollPosition > 20
    );


    backToTop.classList.toggle(
        "visible",
        scrollPosition > 550
    );

}


window.addEventListener(
    "scroll",
    updateScrollUI
);


backToTop.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* =========================================================
   PHASE CARDS
   ========================================================= */

function renderPhases(
    filter = "all"
) {

    phaseGrid.innerHTML = "";


    const filteredPhases =
        labPhases.filter(
            (phase) => {

                if (filter === "all") {
                    return true;
                }


                return (
                    phase.status === filter
                );

            }
        );


    filteredPhases.forEach(
        (phase) => {

            const card =
                document.createElement(
                    "button"
                );


            card.type =
                "button";


            card.className =
                "phase-card";


            card.dataset.status =
                phase.status;


            const statusText =
                getStatusText(
                    phase.status
                );


            card.innerHTML = `

                <div class="phase-card-header">

                    <span class="phase-number">
                        PHASE ${String(
                            phase.number
                        ).padStart(
                            2,
                            "0"
                        )}
                    </span>

                    <span
                        class="phase-state ${phase.status}"
                        title="${statusText}"
                    ></span>

                </div>


                <div class="phase-card-content">

                    <span class="phase-category">
                        ${phase.category}
                    </span>

                    <h3>
                        ${phase.title}
                    </h3>

                    <p>
                        ${phase.summary}
                    </p>


                    <div class="phase-card-footer">

                        <span>
                            ${statusText}
                        </span>

                        <span>
                            →
                        </span>

                    </div>

                </div>

            `;


            card.addEventListener(
                "click",
                () => {

                    openPhaseDrawer(
                        phase
                    );

                }
            );


            phaseGrid.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   FILTERING
   ========================================================= */

phaseFilters.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                phaseFilters.forEach(
                    (filterButton) => {

                        filterButton
                            .classList
                            .remove(
                                "active"
                            );

                    }
                );


                button.classList.add(
                    "active"
                );


                renderPhases(
                    button.dataset.filter
                );

            }
        );

    }
);


/* =========================================================
   PHASE DRAWER
   ========================================================= */

function openPhaseDrawer(
    phase
) {

    document.getElementById(
        "drawerNumber"
    ).textContent =
        `PHASE ${String(
            phase.number
        ).padStart(
            2,
            "0"
        )}`;


    document.getElementById(
        "drawerTitle"
    ).textContent =
        phase.title;


    const drawerStatus =
        document.getElementById(
            "drawerStatus"
        );


    drawerStatus.textContent =
        getStatusText(
            phase.status
        ).toUpperCase();


    drawerStatus.className =
        `drawer-status ${phase.status}`;


    document.getElementById(
        "drawerSummary"
    ).textContent =
        phase.summary;


    document.getElementById(
        "drawerObjective"
    ).textContent =
        phase.objective;


    populateTags(
        phase.concepts
    );


    populateList(
        "drawerTasks",
        phase.tasks
    );


    populateList(
        "drawerEvidence",
        phase.evidence
    );


    drawerOverlay.hidden =
        false;


    phaseDrawer.classList.add(
        "open"
    );


    phaseDrawer.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "drawer-open"
    );

}


function closePhaseDrawer() {

    phaseDrawer.classList.remove(
        "open"
    );


    phaseDrawer.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "drawer-open"
    );


    setTimeout(
        () => {

            drawerOverlay.hidden =
                true;

        },
        280
    );

}


drawerClose.addEventListener(
    "click",
    closePhaseDrawer
);


drawerOverlay.addEventListener(
    "click",
    closePhaseDrawer
);


document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            phaseDrawer.classList.contains(
                "open"
            )
        ) {

            closePhaseDrawer();

        }

    }
);


/* =========================================================
   DRAWER CONTENT
   ========================================================= */

function populateTags(
    concepts
) {

    const container =
        document.getElementById(
            "drawerConcepts"
        );


    container.innerHTML = "";


    concepts.forEach(
        (concept) => {

            const tag =
                document.createElement(
                    "span"
                );


            tag.textContent =
                concept;


            container.appendChild(
                tag
            );

        }
    );

}


function populateList(
    elementId,
    items
) {

    const list =
        document.getElementById(
            elementId
        );


    list.innerHTML = "";


    items.forEach(
        (item) => {

            const li =
                document.createElement(
                    "li"
                );


            li.textContent =
                item;


            list.appendChild(
                li
            );

        }
    );

}


/* =========================================================
   PROGRESS
   ========================================================= */

function updateProgress() {

    const completedPhases =
        labPhases.filter(
            (phase) =>
                phase.status ===
                "complete"
        );


    const currentPhase =
        labPhases.find(
            (phase) =>
                phase.status ===
                "current"
        );


    const total =
        labPhases.length;


    const completed =
        completedPhases.length;


    const percentage =
        Math.round(
            (
                completed /
                total
            ) *
            100
        );


    completedCount.textContent =
        completed;


    totalCount.textContent =
        total;


    progressPercentage.textContent =
        `${percentage}%`;


    const degrees =
        (
            percentage /
            100
        ) *
        360;


    progressRing.style.setProperty(
        "--progress",
        `${degrees}deg`
    );


    if (currentPhase) {

        currentPhaseTitle.textContent =
            currentPhase.title;


        currentPhaseSummary.textContent =
            currentPhase.summary;

    }
    else {

        currentPhaseTitle.textContent =
            "Lab Complete";


        currentPhaseSummary.textContent =
            "All planned Kubernetes engineering phases are complete.";

    }

}


/* =========================================================
   STATUS TEXT
   ========================================================= */

function getStatusText(
    status
) {

    const labels = {

        complete:
            "Complete",

        current:
            "Active",

        upcoming:
            "Upcoming"

    };


    return (
        labels[status] ||
        status
    );

}


/* =========================================================
   ARCHITECTURE INTERACTION
   ========================================================= */

const architectureNodes =
    document.querySelectorAll(
        ".architecture-node"
    );


const inspectorCategory =
    document.getElementById(
        "inspectorCategory"
    );

const inspectorTitle =
    document.getElementById(
        "inspectorTitle"
    );

const inspectorDescription =
    document.getElementById(
        "inspectorDescription"
    );

const inspectorPurpose =
    document.getElementById(
        "inspectorPurpose"
    );


architectureNodes.forEach(
    (node) => {

        node.addEventListener(
            "click",
            () => {

                const key =
                    node.dataset.component;


                const component =
                    architectureData[key];


                if (!component) {
                    return;
                }


                architectureNodes.forEach(
                    (architectureNode) => {

                        architectureNode
                            .classList
                            .remove(
                                "active"
                            );

                    }
                );


                if (
                    key === "pod"
                ) {

                    document
                        .querySelectorAll(
                            '[data-component="pod"]'
                        )
                        .forEach(
                            (pod) => {

                                pod
                                    .classList
                                    .add(
                                        "active"
                                    );

                            }
                        );

                }
                else {

                    node.classList.add(
                        "active"
                    );

                }


                inspectorCategory.textContent =
                    component.category;


                inspectorTitle.textContent =
                    component.title;


                inspectorDescription.textContent =
                    component.description;


                inspectorPurpose.textContent =
                    component.purpose;

            }
        );

    }
);


/* =========================================================
   ACTIVE DESKTOP NAV
   ========================================================= */

const desktopLinks =
    document.querySelectorAll(
        ".desktop-nav a"
    );


const trackedSections = [
    "overview",
    "mission",
    "journey",
    "architecture",
    "evidence",
    "stack"
];


function updateActiveNavigation() {

    let activeSection =
        "";


    trackedSections.forEach(
        (sectionId) => {

            const section =
                document.getElementById(
                    sectionId
                );


            if (!section) {
                return;
            }


            const bounds =
                section
                    .getBoundingClientRect();


            if (
                bounds.top <= 170 &&
                bounds.bottom >= 170
            ) {

                activeSection =
                    sectionId;

            }

        }
    );


    desktopLinks.forEach(
        (link) => {

            const target =
                link
                    .getAttribute(
                        "href"
                    )
                    .replace(
                        "#",
                        ""
                    );


            link.classList.toggle(
                "active",
                target ===
                    activeSection
            );

        }
    );

}


window.addEventListener(
    "scroll",
    updateActiveNavigation
);


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


const revealObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry
                            .target
                            .classList
                            .add(
                                "visible"
                            );


                        revealObserver
                            .unobserve(
                                entry.target
                            );

                    }

                }
            );

        },

        {
            threshold: 0.10
        }

    );


revealElements.forEach(
    (element) => {

        revealObserver.observe(
            element
        );

    }
);


/* =========================================================
   INITIALIZE
   ========================================================= */

function initializeLab() {

    initializeTheme();

    renderPhases();

    updateProgress();

    updateScrollUI();

    updateActiveNavigation();

}


initializeLab();