"use strict";


/* ==========================================================================
   KUBERNETES PLATFORM LAB
   HANDS-ON ENGINEERING JOURNAL

   Shared site behavior:
   ../../js/script.js

   This file handles only:
   - Lab data
   - Mini-lab rendering
   - Mini-lab accordion behavior
   - Lab filtering
   - Command copy buttons
   - Lab-specific navigation
   ========================================================================== */


document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* ==================================================================
           01. LAB DATA
           ================================================================== */

        const labSections = [


/* ==============================================================
   SECTION 01
   GETTING STARTED
   ============================================================== */

{

    number:
        1,

    title:
        "Getting Started",

    phase:
        "docker",

    lessons:
        "14 / 16 lessons",

    duration:
        "1h 10m",

    status:
        "verified",

    current:
        false,


    /* ----------------------------------------------------------
       OBJECTIVE
       ---------------------------------------------------------- */

    objective:
        "Prepare my Windows 11 development environment for Docker and verify the setup by building an image, creating a container, publishing the application port, and successfully running my first containerized application.",



    /* ----------------------------------------------------------
       TOOLS
       ---------------------------------------------------------- */

    tools: [

        {
            name:
                "Windows 11",

            detail:
                "Host Operating System",

            icon:
                "logos:microsoft-windows-icon"
        },

        {
            name:
                "Docker Desktop",

            detail:
                "Container Platform",

            icon:
                "logos:docker-icon"
        },

        {
            name:
                "Visual Studio Code",

            detail:
                "Development Environment",

            icon:
                "logos:visual-studio-code"
        },

        {
            name:
                "Docker Extension",

            detail:
                "VS Code Container Integration",

            icon:
                "logos:docker-icon"
        }

    ],



    /* ----------------------------------------------------------
       WORK COMPLETED
       ---------------------------------------------------------- */

    completed: [

        "Confirmed Visual Studio Code was already installed and ready to use.",

        "Installed Docker Desktop on Windows 11.",

        "Installed the Docker extension for Visual Studio Code.",

        "Started Docker Desktop from the command line.",

        "Used docker info to verify that the Docker client and Docker engine were communicating correctly.",

        "Created the Lab-001 workspace for the first hands-on container exercise.",

        "Worked with app.mjs, helpers.mjs, package.json, and my first Dockerfile.",

        "Completed the Get Your Hands Dirty exercise.",

        "Built my first Docker image and tagged it as lab-001.",

        "Created a named container called lab-001-container.",

        "Published container port 3000 to port 3000 on my local Windows machine.",

        "Opened localhost:3000 and verified that the application was running from inside the Docker container.",

        "Used the Docker extension in Visual Studio Code to view the running container and Docker image.",

        "Captured the running application and VS Code Docker container view as lab evidence.",

        "Stopped the container after verification to release localhost port 3000."

    ],



    /* ----------------------------------------------------------
       COMMAND LOG

       Successful workflow only.
       Troubleshooting commands are documented separately below.
       ---------------------------------------------------------- */

    commands: [

        "docker desktop start",

        "docker info",

        "docker build -t lab-001 .",

        "docker run --name lab-001-container -p 3000:3000 lab-001",

        "docker stop lab-001-container",

        "docker ps",

        "docker ps -a"

    ],



    /* ----------------------------------------------------------
       DOCKERFILE
       ---------------------------------------------------------- */

    dockerfile:
`FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "app.mjs"]`,



    /* ----------------------------------------------------------
       LAB FILES
       ---------------------------------------------------------- */

    files: [

        "app.mjs",

        "helpers.mjs",

        "package.json",

        "dockerfile",

        "first-container.png"

    ],

            /* ----------------------------------------------------------
        TROUBLESHOOTING
        Actual issues encountered during Lab-001
        ---------------------------------------------------------- */

        issues: [

            {
                problem:
                    "PowerShell initially did not recognize the docker command.",

                resolution:
                    "Confirmed that Docker was installed by locating docker.exe under the Docker Desktop installation. After restarting Visual Studio Code and later restarting the workstation, the Docker CLI became available from the integrated PowerShell terminal.",

                lesson:
                    "Docker can be installed on the system even when the terminal does not yet recognize the docker command. The CLI executable, terminal environment, and Docker engine are separate pieces of the setup."
            },


            {
                problem:
                    "The VS Code Containers extension could not connect to Docker and displayed: Failed to connect. Is Docker running?",

                resolution:
                    "Verified that Docker Desktop was installed and running, then confirmed Docker engine communication from the terminal. Once Docker Desktop and the engine were available, the Containers extension connected successfully.",

                lesson:
                    "The VS Code Docker extension does not run Docker itself. It connects to the Docker environment, so Docker Desktop and the Docker engine must be running before containers and images can be displayed."
            },


            {
                problem:
                    "Docker commands failed because the Docker engine was not running when I returned to the lab.",

                resolution:
                    "Started Docker Desktop from PowerShell with docker desktop start and then used docker info to confirm that the Docker client could communicate with the Docker engine.",

                lesson:
                    "Having the Docker CLI installed does not mean the Docker engine is currently running. docker info is a useful way to verify end-to-end communication."
            },


            {
                problem:
                    "The command docker build -t Lab-001 . failed with an invalid tag error.",

                resolution:
                    "Changed the image name to lowercase and rebuilt it successfully with docker build -t lab-001 .",

                lesson:
                    "Docker repository and image names must be lowercase."
            }

        ],



    /* ----------------------------------------------------------
       LAB EVIDENCE
       ---------------------------------------------------------- */

    screenshot: {

        src:
            "images/first-container.png",

        alt:
            "First Docker container running on localhost 3000 with the Docker Containers extension open in Visual Studio Code",

        label:
            "LAB-001 // CONTAINER VERIFICATION",

        title:
            "First Docker Container Running Successfully",

        caption:
            "The application is running at localhost:3000 while the Docker extension in Visual Studio Code shows the active container and the lab-001 image. This verifies the complete Lab-001 workflow from image build to running container."

    },



    /* ----------------------------------------------------------
       TAKEAWAY
       ---------------------------------------------------------- */

    takeaway:
        "This lab gave me my first complete Docker workflow. I started Docker Desktop, verified the Docker engine, used a Dockerfile to build the lab-001 image, created the lab-001-container from that image, published port 3000, verified the application in the browser and through the VS Code Docker extension, and then stopped the container when I was finished."

},



            /* ==============================================================
               SECTION 02
               DOCKER IMAGES & CONTAINERS
               ============================================================== */

            {

                number:
                    2,

                title:
                    "Docker Images & Containers: The Core Building Blocks",

                phase:
                    "docker",

                lessons:
                    "8 / 28 lessons",

                duration:
                    "2h 17m",

                status:
                    "active",

                current:
                    true,


                objective:
                    "Build a stronger understanding of Docker images and containers by creating, running, stopping, inspecting, rebuilding, and troubleshooting a containerized Node.js application.",


                tools: [

                    {
                        name:
                            "Docker Desktop",

                        detail:
                            "Container Runtime",

                        icon:
                            "logos:docker-icon"
                    },

                    {
                        name:
                            "Node.js",

                        detail:
                            "Application Runtime",

                        icon:
                            "logos:nodejs-icon"
                    },

                    {
                        name:
                            "Express",

                        detail:
                            "Web Application",

                        icon:
                            "simple-icons:express"
                    },

                    {
                        name:
                            "PowerShell",

                        detail:
                            "Command Line",

                        icon:
                            "simple-icons:powershell"
                    }

                ],


                completed: [

                    "Built a Node.js and Express application for container practice.",

                    "Created a Dockerfile for the application.",

                    "Built the application into a Docker image.",

                    "Created and started containers from that image.",

                    "Mapped localhost port 3000 to the application's container port.",

                    "Verified the containerized application in the browser.",

                    "Practiced listing running and stopped containers.",

                    "Practiced listing Docker images.",

                    "Stopped containers from the command line.",

                    "Observed the relationship between source code, the built image, and the running container.",

                    "Confirmed that changing source code does not change an image that was already built."

                ],


                commands: [

                    "docker build -t lab-pulse .",

                    "docker image ls",

                    "docker ps",

                    "docker ps -a",

                    "docker run --name lab-pulse-container -p 3000:80 lab-pulse",

                    "docker stop lab-pulse-container"

                ],


                issues: [

                    {

                        problem:
                            "Port already allocated",

                        resolution:
                            "Used docker ps to identify containers already using the host port and stopped the conflicting containers before starting the new container.",

                        lesson:
                            "Only one process can bind to the same host port at a time."

                    },

                    {

                        problem:
                            "Incorrect image reference",

                        resolution:
                            "Used docker image ls to confirm the local image name and identifier before running the container again.",

                        lesson:
                            "Image IDs, repository names, and tags are different ways Docker identifies images."

                    },

                    {

                        problem:
                            "Source code changed but the containerized application did not",

                        resolution:
                            "Rebuilt the Docker image and recreated the container.",

                        lesson:
                            "A Docker image is a snapshot. Code changes require a new image build unless a different development workflow such as a bind mount is being used."

                    }

                ],


                takeaway:
                    "The Dockerfile defines how the image is built, the image is the reusable artifact, and a container is the running instance created from that image."

            },



            /* ==============================================================
               SECTION 03
               ============================================================== */

            {

                number:
                    3,

                title:
                    "Managing Data & Working with Volumes",

                phase:
                    "docker",

                lessons:
                    "0 / 25 lessons",

                duration:
                    "1h 57m",

                status:
                    "queued",

                planned: [

                    "Understand the lifecycle of data inside containers.",

                    "Compare temporary container data with persistent data.",

                    "Work with Docker volumes.",

                    "Work with bind mounts.",

                    "Observe what happens to data when containers are removed or recreated."

                ]

            },



            /* ==============================================================
               SECTION 04
               ============================================================== */

            {

                number:
                    4,

                title:
                    "Networking: (Cross-)Container Communication",

                phase:
                    "docker",

                lessons:
                    "0 / 14 lessons",

                duration:
                    "51m",

                status:
                    "queued",

                planned: [

                    "Understand how containers communicate with external services.",

                    "Create Docker networks.",

                    "Connect containers to one another.",

                    "Explore Docker DNS service discovery.",

                    "Document container networking behavior and troubleshooting."

                ]

            },



            /* ==============================================================
               SECTION 05
               ============================================================== */

            {

                number:
                    5,

                title:
                    "Building Multi-Container Applications with Docker",

                phase:
                    "docker",

                lessons:
                    "0 / 12 lessons",

                duration:
                    "1h 20m",

                status:
                    "queued",

                planned: [

                    "Build an application that uses multiple containers.",

                    "Separate application responsibilities into services.",

                    "Connect the services through Docker networking.",

                    "Document container dependencies and communication."

                ]

            },



            /* ==============================================================
               SECTION 06
               ============================================================== */

            {

                number:
                    6,

                title:
                    "Docker Compose: Elegant Multi-Container Orchestration",

                phase:
                    "docker",

                lessons:
                    "0 / 12 lessons",

                duration:
                    "58m",

                status:
                    "queued",

                planned: [

                    "Create a Docker Compose configuration.",

                    "Define multiple services.",

                    "Define networks and persistent storage.",

                    "Start and stop an application stack as a unit.",

                    "Compare Compose with manual Docker commands."

                ]

            },



            /* ==============================================================
               SECTION 07
               ============================================================== */

            {

                number:
                    7,

                title:
                    'Working with "Utility Containers" & Executing Commands in Containers',

                phase:
                    "docker",

                lessons:
                    "0 / 9 lessons",

                duration:
                    "30m",

                status:
                    "queued",

                planned: [

                    "Run temporary utility containers.",

                    "Execute commands inside running containers.",

                    "Practice interactive container workflows.",

                    "Document when utility containers are useful."

                ]

            },



            /* ==============================================================
               SECTION 08
               ============================================================== */

            {

                number:
                    8,

                title:
                    "A More Complex Setup: A Laravel & PHP Dockerized Project",

                phase:
                    "docker",

                lessons:
                    "0 / 13 lessons",

                duration:
                    "1h 17m",

                status:
                    "queued",

                planned: [

                    "Study a more complex containerized application architecture.",

                    "Observe service separation.",

                    "Use networking and persistent storage together.",

                    "Document how Docker patterns scale beyond a single application container."

                ]

            },



            /* ==============================================================
               SECTION 09
               ============================================================== */

            {

                number:
                    9,

                title:
                    "Deploying Docker Containers",

                phase:
                    "docker",

                lessons:
                    "0 / 39 lessons",

                duration:
                    "3h 54m",

                status:
                    "queued",

                planned: [

                    "Compare local container execution with deployed containers.",

                    "Explore deployment workflows.",

                    "Study managed container services.",

                    "Document deployment configuration and cleanup."

                ]

            },



            /* ==============================================================
               SECTION 10
               ============================================================== */

            {

                number:
                    10,

                title:
                    "Docker & Containers - A Summary",

                phase:
                    "docker",

                lessons:
                    "0 / 8 lessons",

                duration:
                    "18m",

                status:
                    "queued",

                planned: [

                    "Review image and container fundamentals.",

                    "Review volumes and networking.",

                    "Consolidate the Docker commands used throughout the lab.",

                    "Document Docker lessons learned before moving into Kubernetes."

                ]

            },



            /* ==============================================================
               SECTION 11
               ============================================================== */

            {

                number:
                    11,

                title:
                    "Getting Started with Kubernetes",

                phase:
                    "kubernetes",

                lessons:
                    "0 / 11 lessons",

                duration:
                    "44m",

                status:
                    "queued",

                planned: [

                    "Move from individual containers into container orchestration.",

                    "Understand why Kubernetes exists.",

                    "Identify control-plane and Worker Node responsibilities.",

                    "Connect Docker concepts to Kubernetes architecture."

                ]

            },



            /* ==============================================================
               SECTION 12
               ============================================================== */

            {

                number:
                    12,

                title:
                    "Kubernetes in Action - Diving into the Core Concepts",

                phase:
                    "kubernetes",

                lessons:
                    "0 / 27 lessons",

                duration:
                    "2h 33m",

                status:
                    "queued",

                planned: [

                    "Create Kubernetes resources.",

                    "Work with Pods.",

                    "Work with Deployments.",

                    "Work with Services.",

                    "Use kubectl to inspect resources.",

                    "Observe Kubernetes desired-state reconciliation."

                ]

            },



            /* ==============================================================
               SECTION 13
               ============================================================== */

            {

                number:
                    13,

                title:
                    "Managing Data & Volumes with Kubernetes",

                phase:
                    "kubernetes",

                lessons:
                    "0 / 18 lessons",

                duration:
                    "1h 45m",

                status:
                    "queued",

                planned: [

                    "Explore Kubernetes storage concepts.",

                    "Compare Docker storage with Kubernetes storage.",

                    "Work with Kubernetes volume approaches.",

                    "Observe storage behavior when workloads are recreated."

                ]

            },



            /* ==============================================================
               SECTION 14
               ============================================================== */

            {

                number:
                    14,

                title:
                    "Kubernetes Networking",

                phase:
                    "kubernetes",

                lessons:
                    "0 / 17 lessons",

                duration:
                    "1h 47m",

                status:
                    "queued",

                planned: [

                    "Explore Pod communication.",

                    "Work with Kubernetes Services.",

                    "Study DNS-based service discovery.",

                    "Document Kubernetes networking behavior."

                ]

            },



            /* ==============================================================
               SECTION 15
               ============================================================== */

            {

                number:
                    15,

                title:
                    "Kubernetes - Deployment (AWS EKS)",

                phase:
                    "eks",

                lessons:
                    "0 / 16 lessons",

                duration:
                    "1h 38m",

                status:
                    "queued",

                planned: [

                    "Connect Kubernetes concepts to AWS.",

                    "Study Amazon EKS architecture.",

                    "Deploy Kubernetes workloads using AWS infrastructure.",

                    "Document managed control-plane responsibilities.",

                    "Capture deployment and cleanup steps."

                ]

            },



            /* ==============================================================
               SECTION 16
               ============================================================== */

            {

                number:
                    16,

                title:
                    "Roundup & Next Steps",

                phase:
                    "eks",

                lessons:
                    "0 / 5 lessons",

                duration:
                    "15m",

                status:
                    "queued",

                planned: [

                    "Review the Docker-to-Kubernetes journey.",

                    "Identify concepts requiring additional hands-on practice.",

                    "Create final command and troubleshooting references.",

                    "Define the next platform engineering labs."

                ]

            }

        ];



        /* ==================================================================
           02. PHASE CONFIGURATION
           ================================================================== */

        const phaseData = {

            docker: {

                number:
                    "PHASE 01",

                title:
                    "Docker + Container Foundations",

                range:
                    "SECTIONS 01 — 10",

                icon:
                    "logos:docker-icon"

            },


            kubernetes: {

                number:
                    "PHASE 02",

                title:
                    "Kubernetes Core",

                range:
                    "SECTIONS 11 — 14",

                icon:
                    "logos:kubernetes"

            },

            eks: {

                number:
                    "PHASE 03",

                title:
                    "AWS EKS Deployment",

                range:
                    "SECTIONS 15 — 16",

                icon:
                    "simple-icons:amazonwebservices"

            }
        };



        /* ==================================================================
           03. ELEMENTS
           ================================================================== */

        const timeline =
            document.getElementById(
                "labTimeline"
            );


        const filterButtons =
            [
                ...document.querySelectorAll(
                    "[data-lab-filter]"
                )
            ];


        const labNavLinks =
            [
                ...document.querySelectorAll(
                    "[data-lab-nav]"
                )
            ];



        /* ==================================================================
           04. HELPERS
           ================================================================== */

        function padNumber(
            number
        ) {

            return String(
                number
            ).padStart(
                2,
                "0"
            );

        }



        function sectionsForPhase(
            phase
        ) {

            return labSections.filter(
                section =>
                    section.phase ===
                    phase
            );

        }



        /* ==================================================================
           05. RENDER LIST
           ================================================================== */

        function renderList(
            items,
            className = ""
        ) {

            if (
                !items ||
                items.length === 0
            ) {

                return `
                    <p>
                        Nothing recorded yet.
                    </p>
                `;

            }


            return `
                <ul class="${className}">
                    ${items
                        .map(
                            item => `
                                <li>
                                    ${item}
                                </li>
                            `
                        )
                        .join("")}
                </ul>
            `;

        }



        /* ==================================================================
           06. RENDER TOOLS
           ================================================================== */

        function renderTools(
            tools
        ) {

            if (
                !tools ||
                tools.length === 0
            ) {

                return `
                    <p>
                        Tooling will be documented as the lab is completed.
                    </p>
                `;

            }


            return `
                <div class="mini-lab-tools">

                    ${tools
                        .map(
                            tool => `
                                <div class="mini-lab-tool">

                                    <iconify-icon
                                        icon="${tool.icon}"
                                        aria-hidden="true"
                                    ></iconify-icon>

                                    <div>

                                        <strong>
                                            ${tool.name}
                                        </strong>

                                        <span>
                                            ${tool.detail}
                                        </span>

                                    </div>

                                </div>
                            `
                        )
                        .join("")}

                </div>
            `;

        }



        /* ==================================================================
           07. RENDER COMMANDS
           ================================================================== */

        function renderCommands(
            commands
        ) {

            if (
                !commands ||
                commands.length === 0
            ) {

                return `
                    <p>
                        Commands will be recorded when this mini lab is reached.
                    </p>
                `;

            }


            return `
                <div class="command-stack">

                    ${commands
                        .map(
                            command => `
                                <div class="command-row">

                                    <span>
                                        $
                                    </span>

                                    <code>
                                        ${command
                                            .replaceAll(
                                                "<",
                                                "&lt;"
                                            )
                                            .replaceAll(
                                                ">",
                                                "&gt;"
                                            )}
                                    </code>

                                    <button
                                        class="command-copy"
                                        type="button"
                                        data-copy-command="${encodeURIComponent(command)}"
                                    >
                                        COPY
                                    </button>

                                </div>
                            `
                        )
                        .join("")}

                </div>
            `;

        }



        /* ==================================================================
           08. RENDER DOCKERFILE
           ================================================================== */

        function renderDockerfile(
            dockerfile
        ) {

            if (!dockerfile) {
                return "";
            }


            const escaped =
                dockerfile
                    .replaceAll(
                        "&",
                        "&amp;"
                    )
                    .replaceAll(
                        "<",
                        "&lt;"
                    )
                    .replaceAll(
                        ">",
                        "&gt;"
                    );


            return `
                <div class="lab-detail lab-detail--wide">

                    <div class="lab-detail__heading">

                        <span>
                            DF
                        </span>

                        <strong>
                            FIRST DOCKERFILE
                        </strong>

                    </div>


                    <div class="lab-code-window">

                        <div class="lab-code-window__header">

                            <div>
                                <i></i>
                                <i></i>
                                <i></i>
                            </div>

                            <span>
                                Lab-001/dockerfile
                            </span>

                            <strong>
                                DOCKERFILE
                            </strong>

                        </div>


                        <pre><code>${escaped}</code></pre>

                    </div>


                    <div class="dockerfile-explainer">


                        <div>

                            <span>
                                FROM
                            </span>

                            <p>
                                Starts with the Node.js 14 base image.
                            </p>

                        </div>


                        <div>

                            <span>
                                WORKDIR
                            </span>

                            <p>
                                Sets /app as the working directory inside the image.
                            </p>

                        </div>


                        <div>

                            <span>
                                COPY
                            </span>

                            <p>
                                Copies dependency and application files into the image.
                            </p>

                        </div>


                        <div>

                            <span>
                                RUN
                            </span>

                            <p>
                                Installs the application's Node.js dependencies.
                            </p>

                        </div>


                        <div>

                            <span>
                                EXPOSE
                            </span>

                            <p>
                                Documents that the application uses port 3000.
                            </p>

                        </div>


                        <div>

                            <span>
                                CMD
                            </span>

                            <p>
                                Starts app.mjs when the container runs.
                            </p>

                        </div>


                    </div>

                </div>
            `;

        }



        /* ==================================================================
           09. RENDER FILE TREE
           ================================================================== */

        function renderFiles(
            files
        ) {

            if (
                !files ||
                files.length === 0
            ) {

                return "";
            }


            return `
                <div class="lab-file-tree">

                    <strong>
                        Lab-001/
                    </strong>

                    ${files
                        .map(
                            (
                                file,
                                index
                            ) => {

                                const final =
                                    index ===
                                    files.length - 1;


                                return `
                                    <span>
                                        ${final
                                            ? "└──"
                                            : "├──"}
                                        ${file}
                                    </span>
                                `;

                            }
                        )
                        .join("")}

                </div>
            `;

        }



        /* ==================================================================
           10. RENDER SCREENSHOT
           ================================================================== */

        function renderScreenshot(
            screenshot
        ) {

            if (!screenshot) {
                return "";
            }


            return `
                <div class="lab-detail lab-detail--wide">

                    <div class="lab-detail__heading">

                        <span>
                            ◉
                        </span>

                        <strong>
                            LAB EVIDENCE
                        </strong>

                    </div>


                    <figure class="lab-evidence__figure">


                        <div class="lab-evidence__image">

                            <img
                                src="${screenshot.src}"
                                alt="${screenshot.alt}"
                                loading="lazy"
                            >

                            <span class="lab-evidence__status">
                                ● VERIFIED
                            </span>

                        </div>


                        <figcaption>

                            <span>
                                ${screenshot.label}
                            </span>

                            <strong>
                                ${screenshot.title}
                            </strong>

                            <p>
                                ${screenshot.caption}
                            </p>

                        </figcaption>

                    </figure>

                </div>
            `;

        }



        /* ==================================================================
           11. RENDER ISSUES
           ================================================================== */

        function renderIssues(
            issues
        ) {

            if (
                !issues ||
                issues.length === 0
            ) {

                return `
                    <div class="lab-verification">

                        <span>
                            ✓
                        </span>

                        <div>

                            <strong>
                                NO ISSUES RECORDED
                            </strong>

                            <p>
                                The exercise completed successfully and the
                                running container verified the environment.
                            </p>

                        </div>

                    </div>
                `;

            }


            return `
                <div class="issue-stack">

                    ${issues
                        .map(
                            issue => `
                                <article class="issue-card">

                                    <div class="issue-card__heading">

                                        <span>
                                            ISSUE
                                        </span>

                                        <strong>
                                            ${issue.problem}
                                        </strong>

                                    </div>


                                    <p>

                                        <strong>
                                            Resolution:
                                        </strong>

                                        ${issue.resolution}

                                    </p>


                                    <p>

                                        <strong>
                                            Lesson:
                                        </strong>

                                        ${issue.lesson}

                                    </p>

                                </article>
                            `
                        )
                        .join("")}

                </div>
            `;

        }



        /* ==================================================================
           12. FIRST CONTAINER FLOW
           ================================================================== */

        function renderFirstContainerFlow(
            section
        ) {

            if (
                section.number !==
                1
            ) {

                return "";
            }


            return `
                <div class="lab-detail lab-detail--wide">

                    <div class="lab-detail__heading">

                        <span>
                            →
                        </span>

                        <strong>
                            FIRST CONTAINER WORKFLOW
                        </strong>

                    </div>


                    <div class="first-container-flow">


                        <div>

                            <span>
                                01
                            </span>

                            <strong>
                                APPLICATION
                            </strong>

                            <small>
                                app.mjs
                            </small>

                        </div>


                        <i></i>


                        <div>

                            <span>
                                02
                            </span>

                            <strong>
                                DOCKERFILE
                            </strong>

                            <small>
                                Build Instructions
                            </small>

                        </div>


                        <i></i>


                        <div>

                            <span>
                                03
                            </span>

                            <strong>
                                IMAGE
                            </strong>

                            <small>
                                Built Artifact
                            </small>

                        </div>


                        <i></i>


                        <div>

                            <span>
                                04
                            </span>

                            <strong>
                                CONTAINER
                            </strong>

                            <small>
                                Running Instance
                            </small>

                        </div>


                        <i></i>


                        <div>

                            <span>
                                05
                            </span>

                            <strong>
                                LOCALHOST
                            </strong>

                            <small>
                                :3000
                            </small>

                        </div>


                    </div>

                </div>
            `;

        }



        /* ==================================================================
           13. QUEUED LAB DETAILS
           ================================================================== */

        function renderQueuedDetails(
            section
        ) {

            return `
                <div class="lab-detail-grid">


                    <div class="lab-detail lab-detail--wide">

                        <div class="lab-detail__heading">

                            <span>
                                →
                            </span>

                            <strong>
                                PLANNED MINI LAB
                            </strong>

                        </div>


                        <div class="lab-planned">

                            <span>
                                QUEUED
                            </span>

                            <div>

                                <strong>
                                    This section has not been reached yet.
                                </strong>

                                <p>
                                    Work, commands, troubleshooting notes,
                                    artifacts, and evidence will be added here
                                    as I reach this section of the lab.
                                </p>

                            </div>

                        </div>

                    </div>



                    <div class="lab-detail lab-detail--wide">

                        <div class="lab-detail__heading">

                            <span>
                                +
                            </span>

                            <strong>
                                PLANNED FOCUS
                            </strong>

                        </div>


                        ${renderList(
                            section.planned
                        )}

                    </div>


                </div>
            `;

        }



        /* ==================================================================
           14. ACTIVE / VERIFIED LAB DETAILS
           ================================================================== */

        function renderCompletedDetails(
            section
        ) {

            return `
                <div class="lab-detail-grid">


                    <!-- Mission -->

                    <div class="lab-detail">

                        <div class="lab-detail__heading">

                            <span>
                                01
                            </span>

                            <strong>
                                LAB OBJECTIVE
                            </strong>

                        </div>

                        <p>
                            ${section.objective}
                        </p>

                    </div>



                    <!-- Tools -->

                    <div class="lab-detail">

                        <div class="lab-detail__heading">

                            <span>
                                02
                            </span>

                            <strong>
                                TOOLING
                            </strong>

                        </div>

                        ${renderTools(
                            section.tools
                        )}

                    </div>



                    <!-- Work -->

                    <div class="lab-detail lab-detail--wide">

                        <div class="lab-detail__heading">

                            <span>
                                ✓
                            </span>

                            <strong>
                                WORK COMPLETED
                            </strong>

                        </div>

                        ${renderList(
                            section.completed,
                            "lab-checklist"
                        )}

                    </div>



                    ${renderDockerfile(
                        section.dockerfile
                    )}



                    ${section.files
                        ? `
                            <div class="lab-detail">

                                <div class="lab-detail__heading">

                                    <span>
                                        FS
                                    </span>

                                    <strong>
                                        LAB FILES
                                    </strong>

                                </div>

                                ${renderFiles(
                                    section.files
                                )}

                            </div>
                        `
                        : ""
                    }



                    ${section.files
                        ? `
                            <div class="lab-detail">

                                <div class="lab-detail__heading">

                                    <span>
                                        APP
                                    </span>

                                    <strong>
                                        APPLICATION STACK
                                    </strong>

                                </div>

                                <p>
                                    Node.js application packaged into a Docker
                                    image and started as a container with port
                                    3000 published to the local machine.
                                </p>

                            </div>
                        `
                        : ""
                    }



                    <!-- Commands -->

                    <div class="lab-detail lab-detail--wide">

                        <div class="lab-detail__heading">

                            <span>
                                $
                            </span>

                            <strong>
                                COMMAND LOG
                            </strong>

                        </div>

                        ${renderCommands(
                            section.commands
                        )}

                    </div>



                    ${renderFirstContainerFlow(
                        section
                    )}



                    ${renderScreenshot(
                        section.screenshot
                    )}



                    <!-- Troubleshooting -->

                    <div class="lab-detail lab-detail--wide">

                        <div class="lab-detail__heading">

                            <span>
                                !
                            </span>

                            <strong>
                                TROUBLESHOOTING LOG
                            </strong>

                        </div>

                        ${renderIssues(
                            section.issues
                        )}

                    </div>



                    <!-- Takeaway -->

                    <div class="lab-detail lab-detail--wide">

                        <div class="lab-detail__heading">

                            <span>
                                →
                            </span>

                            <strong>
                                KEY TAKEAWAY
                            </strong>

                        </div>

                        <p>
                            ${section.takeaway}
                        </p>

                    </div>


                </div>
            `;

        }



        /* ==================================================================
           15. STATUS CONFIG
           ================================================================== */

        function statusFor(
            section
        ) {

            if (
                section.status ===
                "verified"
            ) {

                return {

                    className:
                        "lab-status--verified",

                    label:
                        "✓ LAB VERIFIED"

                };

            }


            if (
                section.status ===
                "active"
            ) {

                return {

                    className:
                        "lab-status--active",

                    label:
                        "● CURRENT"

                };

            }


            return {

                className:
                    "lab-status--queued",

                label:
                    "○ QUEUED"

            };

        }



        /* ==================================================================
           16. BUILD MINI LAB
           ================================================================== */

        function buildLabModule(
            section
        ) {

            const number =
                padNumber(
                    section.number
                );


            const status =
                statusFor(
                    section
                );


            return `
                <article
                    class="
                        lab-module
                        reveal
                        ${section.current
                            ? "is-current"
                            : ""}
                    "
                    id="section-${number}"
                    data-phase="${section.phase}"
                    data-status="${section.status}"
                    data-section="${section.number}"
                >


                    <button
                        class="lab-module__summary"
                        type="button"
                        data-lab-toggle
                        aria-expanded="false"
                        aria-controls="lab-panel-${number}"
                    >


                        <span class="lab-module__number">
                            ${number}
                        </span>



                        <div class="lab-module__identity">


                            <div class="lab-module__kicker">

                                <span>
                                    MINI LAB
                                </span>


                                ${section.current
                                    ? `
                                        <span>
                                            //
                                        </span>

                                        <span>
                                            CURRENT FOCUS
                                        </span>
                                    `
                                    : ""
                                }

                            </div>


                            <h4>
                                ${section.title}
                            </h4>


                            <div class="lab-module__meta">

                                <span>
                                    ${section.lessons}
                                </span>

                                <span>
                                    ${section.duration}
                                </span>

                            </div>


                        </div>



                        <span
                            class="
                                lab-status
                                ${status.className}
                            "
                        >
                            ${status.label}
                        </span>



                        <span
                            class="lab-module__chevron"
                            aria-hidden="true"
                        >
                            ↓
                        </span>


                    </button>



                   <div
    class="lab-module__details"
    id="lab-panel-${number}"
    hidden
>

    ${section.status === "queued"
        ? renderQueuedDetails(
            section
        )
        : renderCompletedDetails(
            section
        )
    }


            <!-- =================================================
                BOTTOM CLOSE CONTROL
            ================================================== -->

            <div class="lab-module__footer">

                <button
                    class="lab-close-button"
                    type="button"
                    data-lab-close
                >

                    <span aria-hidden="true">
                        ↑
                    </span>

                    <strong>
                        CLOSE MINI LAB
                    </strong>

                    <small>
                        Return to section overview
                    </small>

                </button>

            </div>

        </div>


                </article>
            `;

        }



        /* ==================================================================
           17. BUILD PHASE
           ================================================================== */

        function buildPhase(
            phaseKey
        ) {

            const phase =
                phaseData[
                    phaseKey
                ];


            const sections =
                sectionsForPhase(
                    phaseKey
                );


            return `
                <section
                    class="lab-phase"
                    id="${phaseKey}"
                    data-lab-phase="${phaseKey}"
                >


                    <header class="lab-phase__header">


                        <div class="lab-phase__icon">

                            <iconify-icon
                                icon="${phase.icon}"
                                aria-hidden="true"
                            ></iconify-icon>

                        </div>



                        <div class="lab-phase__heading">

                            <span>
                                ${phase.number}
                            </span>

                            <h3>
                                ${phase.title}
                            </h3>

                        </div>



                        <div class="lab-phase__range">
                            ${phase.range}
                        </div>


                    </header>



                    <div class="lab-phase__stack">

                        ${sections
                            .map(
                                buildLabModule
                            )
                            .join("")}

                    </div>


                </section>
            `;

        }



        /* ==================================================================
           18. RENDER LAB
           ================================================================== */

        function renderLab() {

            if (!timeline) {
                return;
            }


            timeline.innerHTML =
                [
                    buildPhase(
                        "docker"
                    ),

                    buildPhase(
                        "kubernetes"
                    ),

                    buildPhase(
                        "eks"
                    )
                ]
                    .join("");

        }


        renderLab();



        /* ==================================================================
           19. ACCORDION
           ================================================================== */

        function allModules() {

            return [
                ...document.querySelectorAll(
                    ".lab-module"
                )
            ];

        }



        function setModuleOpen(
            module,
            open
        ) {

            const toggle =
                module.querySelector(
                    "[data-lab-toggle]"
                );


            const details =
                module.querySelector(
                    ".lab-module__details"
                );


            if (
                !toggle ||
                !details
            ) {

                return;

            }


            module.classList.toggle(
                "is-open",
                open
            );


            toggle.setAttribute(
                "aria-expanded",
                String(open)
            );


            details.hidden =
                !open;

        }



        function closeOtherModules(
            activeModule
        ) {

            allModules()
                .forEach(
                    module => {

                        if (
                            module !==
                            activeModule
                        ) {

                            setModuleOpen(
                                module,
                                false
                            );

                        }

                    }
                );

        }



        timeline?.addEventListener(
            "click",
            event => {

                const toggle =
                    event.target.closest(
                        "[data-lab-toggle]"
                    );


                if (!toggle) {
                    return;
                }


                const module =
                    toggle.closest(
                        ".lab-module"
                    );


                if (!module) {
                    return;
                }


                const isOpen =
                    module.classList.contains(
                        "is-open"
                    );


                closeOtherModules(
                    module
                );


                setModuleOpen(
                    module,
                    !isOpen
                );

            }
        );

/* ==================================================================
   BOTTOM MINI LAB CLOSE BUTTON

   Allows the user to collapse a long mini lab without scrolling
   back to the card header manually.
   ================================================================== */

timeline?.addEventListener(
    "click",
    event => {

        const closeButton =
            event.target.closest(
                "[data-lab-close]"
            );


        if (!closeButton) {
            return;
        }


        const module =
            closeButton.closest(
                ".lab-module"
            );


        if (!module) {
            return;
        }


        /*
         * Collapse the mini lab using the same accordion
         * function used by the top section control.
         */

        setModuleOpen(
            module,
            false
        );


        /*
         * Bring the section header back into view after the
         * long content collapses.
         */

        window.requestAnimationFrame(
            () => {

                module.scrollIntoView(
                    {
                        behavior:
                            "smooth",

                        block:
                            "start"
                    }
                );

            }
        );

    }
);

        /* ==================================================================
           20. OPEN INITIAL MINI LAB
           ================================================================== */

        function openInitialLab() {

            const hash =
                window.location.hash;


            let target =
                null;


            if (
                hash &&
                hash.startsWith(
                    "#section-"
                )
            ) {

                target =
                    document.querySelector(
                        hash
                    );

            }


            if (!target) {

                target =
                    document.querySelector(
                        ".lab-module.is-current"
                    );

            }


            if (target) {

                setModuleOpen(
                    target,
                    true
                );

            }

        }


        openInitialLab();



        /* ==================================================================
           21. FILTERS
           ================================================================== */

        function filterLabs(
            filter
        ) {

            const modules =
                allModules();


            modules.forEach(
                module => {

                    const phase =
                        module.dataset.phase;


                    const status =
                        module.dataset.status;


                    let visible =
                        false;


                    if (
                        filter ===
                        "all"
                    ) {

                        visible =
                            true;

                    }


                    else if (
                        filter ===
                        "active"
                    ) {

                        visible =
                            status ===
                            "active";

                    }


                    else {

                        visible =
                            phase ===
                            filter;

                    }


                    module.hidden =
                        !visible;

                }
            );



            document
                .querySelectorAll(
                    "[data-lab-phase]"
                )
                .forEach(
                    phase => {

                        const visibleModules =
                            [
                                ...phase.querySelectorAll(
                                    ".lab-module"
                                )
                            ]
                                .some(
                                    module =>
                                        !module.hidden
                                );


                        phase.hidden =
                            !visibleModules;

                    }
                );

        }



        filterButtons.forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const filter =
                            button.dataset.labFilter ||
                            "all";


                        filterButtons.forEach(
                            item => {

                                const active =
                                    item ===
                                    button;


                                item.classList.toggle(
                                    "is-active",
                                    active
                                );


                                item.setAttribute(
                                    "aria-pressed",
                                    String(active)
                                );

                            }
                        );


                        filterLabs(
                            filter
                        );

                    }
                );

            }
        );



        /* ==================================================================
           22. COPY COMMAND
           ================================================================== */

        async function copyText(
            text
        ) {

            if (
                navigator.clipboard &&
                window.isSecureContext
            ) {

                await navigator.clipboard.writeText(
                    text
                );

                return;

            }



            const textArea =
                document.createElement(
                    "textarea"
                );


            textArea.value =
                text;


            textArea.style.position =
                "fixed";


            textArea.style.opacity =
                "0";


            document.body.appendChild(
                textArea
            );


            textArea.select();


            document.execCommand(
                "copy"
            );


            textArea.remove();

        }



        timeline?.addEventListener(
            "click",
            async event => {

                const button =
                    event.target.closest(
                        "[data-copy-command]"
                    );


                if (!button) {
                    return;
                }


                event.stopPropagation();


                const command =
                    decodeURIComponent(
                        button.dataset.copyCommand ||
                        ""
                    );


                if (!command) {
                    return;
                }


                const original =
                    button.textContent;


                try {

                    await copyText(
                        command
                    );


                    button.textContent =
                        "COPIED";


                    button.classList.add(
                        "is-copied"
                    );


                    window.setTimeout(
                        () => {

                            button.textContent =
                                original;


                            button.classList.remove(
                                "is-copied"
                            );

                        },
                        1200
                    );

                }


                catch {

                    button.textContent =
                        "FAILED";


                    window.setTimeout(
                        () => {

                            button.textContent =
                                original;

                        },
                        1200
                    );

                }

            }
        );



        /* ==================================================================
           23. LAB NAVIGATION
           ================================================================== */

        function activateLabNav(
            sectionName
        ) {

            labNavLinks.forEach(
                link => {

                    link.classList.toggle(
                        "is-active",
                        link.dataset.labNav ===
                        sectionName
                    );

                }
            );

        }



        if (
            "IntersectionObserver" in
            window
        ) {

            const targets =
                [
                    document.getElementById(
                        "home"
                    ),

                    document.getElementById(
                        "docker"
                    ),

                    document.getElementById(
                        "kubernetes"
                    ),

                    document.getElementById(
                        "eks"
                    )
                ]
                    .filter(
                        Boolean
                    );


            const observer =
                new IntersectionObserver(
                    entries => {

                        const visible =
                            entries
                                .filter(
                                    entry =>
                                        entry.isIntersecting
                                )
                                .sort(
                                    (
                                        first,
                                        second
                                    ) =>
                                        second.intersectionRatio -
                                        first.intersectionRatio
                                );


                        if (
                            visible.length ===
                            0
                        ) {

                            return;

                        }


                        activateLabNav(
                            visible[
                                0
                            ]
                                .target
                                .id
                        );

                    },
                    {

                        rootMargin:
                            "-20% 0px -65% 0px",

                        threshold:
                            [
                                0.05,
                                0.15,
                                0.3
                            ]

                    }
                );


            targets.forEach(
                target => {

                    observer.observe(
                        target
                    );

                }
            );

        }


    }
);