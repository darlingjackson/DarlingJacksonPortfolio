/* ============================================================
   KUBERNETES PLATFORM LAB
   Darling Jackson Portfolio

   TABLE OF CONTENTS
   ------------------------------------------------------------
   01. Theme
   02. Roadmap Data
   03. Roadmap Rendering
   04. Lab Evidence Drawer
   05. Accordion
   06. Command Copy
   07. Build Flow Animation
   08. Reveal on Scroll
   09. Hero Terminal Animation
   ============================================================ */


/* ============================================================
   01. THEME
   ============================================================ */

const root = document.documentElement;

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("portfolio-theme");

const prefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
).matches;


if (savedTheme) {

    root.dataset.theme = savedTheme;

} else {

    root.dataset.theme = prefersDark
        ? "dark"
        : "light";

}


themeToggle?.addEventListener(
    "click",
    () => {

        const currentTheme =
            root.dataset.theme;

        const newTheme =
            currentTheme === "dark"
                ? "light"
                : "dark";

        root.dataset.theme =
            newTheme;

        localStorage.setItem(
            "portfolio-theme",
            newTheme
        );

    }
);


/* ============================================================
   02. ROADMAP DATA
   ============================================================ */

const roadmapData = [

    {
        number: "00",
        phase: "Environment",
        title: "Tooling & Local Setup",
        description:
            "Docker Desktop, WSL 2, Visual Studio Code, container tooling, and Docker CLI.",
        status: "complete",
        statusLabel: "Validated"
    },

    {
        number: "01",
        phase: "Docker Foundations",
        title: "First Container",
        description:
            "Built an image and ran a containerized Node.js web application on localhost:3000.",
        status: "complete",
        statusLabel: "Validated",
        labId: "first-container"
    },

    {
        number: "02",
        phase: "Docker Foundations",
        title: "Images & Containers",
        description:
            "Working with image layers, container lifecycle, management commands, and build behavior.",
        status: "active",
        statusLabel: "Next"
    },

    {
        number: "03",
        phase: "Docker",
        title: "Data & Volumes",
        description:
            "Persistent data, volumes, bind mounts, and container filesystem behavior.",
        status: "planned",
        statusLabel: "Planned"
    },

    {
        number: "04",
        phase: "Docker",
        title: "Container Networking",
        description:
            "Container-to-container communication, networks, ports, and application connectivity.",
        status: "planned",
        statusLabel: "Planned"
    },

    {
        number: "05",
        phase: "Docker",
        title: "Multi-Container Applications",
        description:
            "Running application components across multiple coordinated containers.",
        status: "planned",
        statusLabel: "Planned"
    },

    {
        number: "06",
        phase: "Docker",
        title: "Docker Compose",
        description:
            "Defining and running multi-container environments with Compose.",
        status: "planned",
        statusLabel: "Planned"
    },

    {
        number: "07",
        phase: "Containers",
        title: "Container Deployment",
        description:
            "Preparing and deploying containerized applications beyond the local workstation.",
        status: "planned",
        statusLabel: "Planned"
    },

    {
        number: "08",
        phase: "Kubernetes",
        title: "Kubernetes Foundations",
        description:
            "Clusters, Pods, kubectl, desired state, and Kubernetes architecture.",
        status: "planned",
        statusLabel: "Planned"
    },

    {
        number: "09",
        phase: "Kubernetes",
        title: "Workloads & Core Concepts",
        description:
            "Deployments, ReplicaSets, Services, scaling, and workload management.",
        status: "planned",
        statusLabel: "Planned"
    },

    {
        number: "10",
        phase: "Kubernetes",
        title: "Storage",
        description:
            "Persistent storage and data management for Kubernetes workloads.",
        status: "planned",
        statusLabel: "Planned"
    },

    {
        number: "11",
        phase: "Kubernetes",
        title: "Networking",
        description:
            "Service communication, traffic routing, and Kubernetes networking.",
        status: "planned",
        statusLabel: "Planned"
    },

    {
        number: "12",
        phase: "AWS",
        title: "Amazon EKS",
        description:
            "Applying the Kubernetes concepts in a managed AWS Kubernetes environment.",
        status: "planned",
        statusLabel: "Target"
    }

];


/* ============================================================
   03. ROADMAP RENDERING
   ============================================================ */

const roadmap =
    document.getElementById("roadmap");


function createRoadmapCard(item) {

    const card =
        document.createElement(
            item.labId
                ? "button"
                : "article"
        );


    card.className =
        [
            "roadmap-card",

            item.status === "complete"
                ? "roadmap-card--complete"
                : "",

            item.status === "active"
                ? "roadmap-card--active"
                : ""

        ]
        .filter(Boolean)
        .join(" ");


    if (item.labId) {

        card.type =
            "button";

        card.dataset.openLab =
            item.labId;

    }


    const statusClass =
        item.status === "complete"
            ? "roadmap-status--complete"
            : item.status === "active"
                ? "roadmap-status--active"
                : "";


    card.innerHTML = `

        <span class="roadmap-card__number">
            ${item.number}
        </span>

        <div class="roadmap-card__content">

            <span class="roadmap-card__phase">
                ${item.phase}
            </span>

            <h3>
                ${item.title}
            </h3>

            <p>
                ${item.description}
            </p>

        </div>

        <span class="roadmap-status ${statusClass}">
            ${item.statusLabel}
        </span>

    `;


    return card;

}


roadmapData.forEach(
    item => {

        roadmap?.appendChild(
            createRoadmapCard(item)
        );

    }
);


/* ============================================================
   04. LAB EVIDENCE DRAWER
   ============================================================ */

const labDrawer =
    document.getElementById(
        "labDrawer"
    );

const drawerBackdrop =
    document.getElementById(
        "drawerBackdrop"
    );

const drawerClose =
    document.getElementById(
        "drawerClose"
    );


function openLabDrawer() {

    if (!labDrawer) {

        return;

    }


    labDrawer.classList.add(
        "is-open"
    );

    drawerBackdrop?.classList.add(
        "is-visible"
    );

    labDrawer.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "drawer-open"
    );


    setTimeout(
        () => {

            drawerClose?.focus();

        },
        300
    );

}


function closeLabDrawer() {

    labDrawer?.classList.remove(
        "is-open"
    );

    drawerBackdrop?.classList.remove(
        "is-visible"
    );

    labDrawer?.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "drawer-open"
    );

}


document.addEventListener(
    "click",
    event => {

        const trigger =
            event.target.closest(
                "[data-open-lab]"
            );


        if (!trigger) {

            return;

        }


        const labId =
            trigger.dataset.openLab;


        if (
            labId ===
            "first-container"
        ) {

            openLabDrawer();

        }

    }
);


drawerClose?.addEventListener(
    "click",
    closeLabDrawer
);


drawerBackdrop?.addEventListener(
    "click",
    closeLabDrawer
);


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            labDrawer?.classList.contains(
                "is-open"
            )
        ) {

            closeLabDrawer();

        }

    }
);


/* ============================================================
   05. ACCORDION
   ============================================================ */

const accordionTriggers =
    document.querySelectorAll(
        ".accordion-trigger"
    );


accordionTriggers.forEach(
    trigger => {

        trigger.addEventListener(
            "click",
            () => {

                const item =
                    trigger.closest(
                        ".accordion-item"
                    );


                const alreadyOpen =
                    item.classList.contains(
                        "is-open"
                    );


                document
                    .querySelectorAll(
                        ".accordion-item"
                    )
                    .forEach(
                        otherItem => {

                            otherItem.classList.remove(
                                "is-open"
                            );

                        }
                    );


                if (!alreadyOpen) {

                    item.classList.add(
                        "is-open"
                    );

                }

            }
        );

    }
);


/* ============================================================
   06. COPY COMMANDS
   ============================================================ */

const copyButtons =
    document.querySelectorAll(
        ".copy-command"
    );


copyButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            async () => {

                const command =
                    button.dataset.command;


                if (!command) {

                    return;

                }


                const decodedCommand =
                    command
                        .replaceAll(
                            "&lt;",
                            "<"
                        )
                        .replaceAll(
                            "&gt;",
                            ">"
                        );


                try {

                    await navigator.clipboard.writeText(
                        decodedCommand
                    );


                    const oldHTML =
                        button.innerHTML;


                    button.innerHTML = `

                        <iconify-icon
                            icon="solar:check-circle-linear"
                        ></iconify-icon>

                        Copied

                    `;


                    setTimeout(
                        () => {

                            button.innerHTML =
                                oldHTML;

                        },
                        1500
                    );

                } catch {

                    console.warn(
                        "Clipboard access was unavailable."
                    );

                }

            }
        );

    }
);


/* ============================================================
   07. BUILD FLOW ANIMATION
   ============================================================ */

const buildNodes =
    Array.from(
        document.querySelectorAll(
            "[data-flow-step]"
        )
    );

const replayFlow =
    document.getElementById(
        "replayFlow"
    );

let buildFlowTimer =
    null;


function clearBuildFlow() {

    buildNodes.forEach(
        node => {

            node.classList.remove(
                "is-active"
            );

        }
    );

}


function runBuildFlow() {

    clearTimeout(
        buildFlowTimer
    );

    clearBuildFlow();


    let index =
        0;


    function activateNext() {

        if (
            index >
            0
        ) {

            buildNodes[
                index - 1
            ]?.classList.remove(
                "is-active"
            );

        }


        if (
            index >=
            buildNodes.length
        ) {

            buildNodes[
                buildNodes.length - 1
            ]?.classList.add(
                "is-active"
            );

            return;

        }


        buildNodes[
            index
        ]?.classList.add(
            "is-active"
        );


        index +=
            1;


        buildFlowTimer =
            setTimeout(
                activateNext,
                900
            );

    }


    activateNext();

}


replayFlow?.addEventListener(
    "click",
    runBuildFlow
);


/* ============================================================
   08. REVEAL ON SCROLL
   ============================================================ */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(
                entry => {

                    if (
                        !entry.isIntersecting
                    ) {

                        return;

                    }


                    entry.target.classList.add(
                        "is-visible"
                    );


                    revealObserver.unobserve(
                        entry.target
                    );

                }
            );

        },

        {
            threshold:
                0.12
        }

    );


revealElements.forEach(
    element => {

        revealObserver.observe(
            element
        );

    }
);


/* ============================================================
   AUTO-RUN BUILD FLOW WHEN VISIBLE
   ============================================================ */

const buildFlow =
    document.getElementById(
        "buildFlow"
    );


if (buildFlow) {

    const flowObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            runBuildFlow();

                            flowObserver.disconnect();

                        }

                    }
                );

            },

            {
                threshold:
                    0.35
            }

        );


    flowObserver.observe(
        buildFlow
    );

}


/* ============================================================
   09. HERO TERMINAL ANIMATION
   ============================================================ */

const typingCommand =
    document.getElementById(
        "typingCommand"
    );


const terminalCommands = [

    "docker build .",

    "docker images",

    "docker run -p 3000:3000 <IMAGE_ID>",

    "localhost:3000 ✓"

];


let terminalCommandIndex =
    0;


function cycleTerminalCommand() {

    if (!typingCommand) {

        return;

    }


    terminalCommandIndex =
        (
            terminalCommandIndex + 1
        )
        %
        terminalCommands.length;


    typingCommand.animate(

        [
            {
                opacity: 1,
                transform: "translateY(0)"
            },

            {
                opacity: 0,
                transform: "translateY(-5px)"
            }

        ],

        {
            duration:
                180,

            fill:
                "forwards"
        }

    )
    .finished
    .then(
        () => {

            typingCommand.textContent =
                terminalCommands[
                    terminalCommandIndex
                ];


            typingCommand.animate(

                [
                    {
                        opacity: 0,
                        transform: "translateY(5px)"
                    },

                    {
                        opacity: 1,
                        transform: "translateY(0)"
                    }

                ],

                {
                    duration:
                        220,

                    fill:
                        "forwards"
                }

            );

        }
    );

}


setInterval(
    cycleTerminalCommand,
    3000
);

/* ============================================================
   TROUBLESHOOTING CONSOLE
   ============================================================ */

const troubleshootingCards =
    document.querySelectorAll(
        "[data-troubleshoot]"
    );


const troubleshootingTitle =
    document.getElementById(
        "troubleshootingTitle"
    );


const troubleshootingStatus =
    document.getElementById(
        "troubleshootingStatus"
    );


const troubleshootingProblem =
    document.getElementById(
        "troubleshootingProblem"
    );


const troubleshootingExplanation =
    document.getElementById(
        "troubleshootingExplanation"
    );


const troubleshootingCommands =
    document.getElementById(
        "troubleshootingCommands"
    );


/* ============================================================
   TROUBLESHOOTING DATA
   ============================================================ */

const troubleshootingData = {

    stopped: {

        title:
            "Container Stopped",

        status:
            "INVESTIGATION",

        problem:
            "The container exited shortly after it started.",

        explanation:
            "The first step was to confirm the container had stopped instead of assuming Docker itself failed. I listed all containers, including stopped ones, and then checked the container output to see what caused the application to exit.",

        commands: [

            {
                purpose:
                    "Show running and stopped containers",

                command:
                    "docker ps -a"
            },

            {
                purpose:
                    "Read the application output from the stopped container",

                command:
                    "docker logs <CONTAINER_ID>"
            }

        ],

        resolution:
            "The container was able to start, but the Node.js application was crashing inside it. That narrowed the problem down to the application files rather than Docker itself."

    },


    import: {

        title:
            "Import Mismatch",

        status:
            "ROOT CAUSE",

        problem:
            "The application import referenced a filename that did not match the file inside the image.",

        explanation:
            "Because the original application container exited, I started an interactive container from the image and inspected the files packaged inside it. This helped me confirm the mismatch between the helper filename and the import used by app.mjs.",

        commands: [

            {
                purpose:
                    "Start an interactive shell from the image",

                command:
                    "docker run -it <IMAGE_ID> sh"
            },

            {
                purpose:
                    "List the application files inside the container",

                command:
                    "ls"
            },

            {
                purpose:
                    "Inspect the application source if needed",

                command:
                    "cat app.mjs"
            },

            {
                purpose:
                    "Leave the interactive container shell",

                command:
                    "exit"
            }

        ],

        resolution:
            "I corrected the filename/import mismatch in the source code so Node.js could successfully locate the helper module."

    },


    rebuild: {

        title:
            "Image Rebuild",

        status:
            "REBUILD",

        problem:
            "Fixing the source file did not change the Docker image I had already built.",

        explanation:
            "The existing image still contained the old application files. After making the source-code correction, I had to build a new image before creating another container.",

        commands: [

            {
                purpose:
                    "Build a new image using the corrected source",

                command:
                    "docker build ."
            },

            {
                purpose:
                    "View the available Docker images",

                command:
                    "docker images"
            },

            {
                purpose:
                    "Run a container from the newly built image",

                command:
                    "docker run -p 3000:3000 <IMAGE_ID>"
            }

        ],

        resolution:
            "The rebuilt image contained the corrected application files. A new container created from that image was able to start the application successfully."

    },


    port: {

        title:
            "Port Conflict",

        status:
            "NETWORK / PORT",

        problem:
            "Docker could not bind the new container to host port 3000 because another container was already using it.",

        explanation:
            "The error showed that port 3000 was already allocated. I checked the running containers to identify what was using the port, stopped the conflicting container, and then started the updated container.",

        commands: [

            {
                purpose:
                    "See which containers are currently running",

                command:
                    "docker ps"
            },

            {
                purpose:
                    "Stop the container already using port 3000",

                command:
                    "docker stop <CONTAINER_ID>"
            },

            {
                purpose:
                    "Start the updated container on port 3000",

                command:
                    "docker run -p 3000:3000 <IMAGE_ID>"
            }

        ],

        resolution:
            "After the conflicting container released port 3000, the updated container could bind to localhost:3000 successfully."

    }

};


/* ============================================================
   RENDER TROUBLESHOOTING ISSUE
   ============================================================ */

function renderTroubleshootingIssue(
    key
) {

    const issue =
        troubleshootingData[
            key
        ];


    if (!issue) {

        return;

    }


    /* Update selected card */

    troubleshootingCards
        .forEach(
            card => {

                card.classList.toggle(
                    "is-active",
                    card.dataset.troubleshoot === key
                );

            }
        );


    /* Update text */

    troubleshootingTitle.textContent =
        issue.title;


    troubleshootingStatus.textContent =
        issue.status;


    troubleshootingProblem.textContent =
        issue.problem;


    troubleshootingExplanation.textContent =
        issue.explanation;


    /* Build command list */

    troubleshootingCommands.innerHTML =
        issue.commands
            .map(
                item => `

                    <div class="troubleshooting-command">

                        <span class="troubleshooting-command__purpose">
                            ${item.purpose}
                        </span>


                        <div class="troubleshooting-command__line">

                            ${item.command}

                            <button
                                class="command-copy"
                                type="button"
                                data-copy-command="${item.command.replaceAll('"', '&quot;')}"
                                aria-label="Copy command"
                            >

                                <iconify-icon
                                    icon="solar:copy-linear"
                                ></iconify-icon>

                            </button>

                        </div>

                    </div>

                `
            )
            .join("")
        +

        `

            <div class="troubleshooting-resolution">

                <strong>
                    Resolution:
                </strong>

                ${issue.resolution}

            </div>

        `;


    /* Re-bind copy buttons */

    bindTroubleshootingCopyButtons();

}


/* ============================================================
   COPY COMMAND
   ============================================================ */

function bindTroubleshootingCopyButtons() {

    document
        .querySelectorAll(
            "[data-copy-command]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    async event => {

                        /*
                         * Prevent clicking copy from
                         * doing anything else.
                         */
                        event.stopPropagation();


                        const command =
                            button.dataset.copyCommand;


                        try {

                            await navigator
                                .clipboard
                                .writeText(
                                    command
                                );


                            const original =
                                button.innerHTML;


                            button.innerHTML = `

                                <iconify-icon
                                    icon="solar:check-circle-linear"
                                ></iconify-icon>

                            `;


                            setTimeout(
                                () => {

                                    button.innerHTML =
                                        original;

                                },
                                1200
                            );

                        } catch {

                            console.warn(
                                "Unable to copy command."
                            );

                        }

                    }
                );

            }
        );

}


/* ============================================================
   CARD EVENTS
   ============================================================ */

troubleshootingCards
    .forEach(
        card => {

            card.addEventListener(
                "click",
                () => {

                    renderTroubleshootingIssue(
                        card.dataset.troubleshoot
                    );

                }
            );

        }
    );


/* ============================================================
   INITIAL ISSUE
   ============================================================ */

renderTroubleshootingIssue(
    "stopped"
);